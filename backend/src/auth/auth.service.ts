import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';
import { Log, LogDebug, LogExtractors } from 'src/common/decorators/log.decorator';
import { LoggerService } from 'src/common/services/logger.service';
import * as bcrypt from 'bcryptjs';

export interface AuthResult {
  access_token: string;
  user: Omit<User, 'password'>;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  @Log({ 
    action: 'register',
    extractContext: {
      fromArgs: LogExtractors.emailFromDto,
      fromResult: (result: AuthResult) => ({
        userId: result.user.id,
        email: result.user.email,
        name: result.user.name,
      }),
      fromError: LogExtractors.emailFromError,
    },
    messages: {
      start: 'Registration attempt started',
      success: 'User registered successfully',
      error: 'Registration failed',
    }
  })
  async register(registerDto: RegisterDto): Promise<AuthResult> {
    const user = await this.usersService.create(registerDto);
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user: this.excludePassword(user),
    };
  }

  @Log({ 
    action: 'login',
    extractContext: {
      fromArgs: (args) => ({ email: args[0]?.email }),
      fromResult: (result: AuthResult) => ({
        userId: result.user.id,
        email: result.user.email,
      }),
      fromError: (error, args) => ({
        email: args[0]?.email,
        errorMessage: error.message,
      }),
    },
    messages: {
      start: 'Login attempt started',
      success: 'User logged in successfully',
      error: 'Login failed',
    }
  })
  async login(loginDto: LoginDto): Promise<AuthResult> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user: this.excludePassword(user),
    };
  }

  @LogDebug('validate_user')
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // helper functions
  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...result } = user;
    return result;
  }
}
