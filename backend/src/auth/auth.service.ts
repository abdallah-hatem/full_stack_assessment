import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';
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

  async register(registerDto: RegisterDto): Promise<AuthResult> {
    this.loggerService.logAuth('Registration attempt started', {
      action: 'register',
      metadata: { email: registerDto.email, name: registerDto.name }
    });

    try {
      const user = await this.usersService.create(registerDto);
      const payload = { sub: user.id, email: user.email };

      this.loggerService.logAuth('User registered successfully', {
        userId: user.id,
        action: 'register',
        metadata: { email: user.email }
      });

      this.loggerService.logUserAction('register', user.id, 'user_account', {
        email: user.email,
        name: user.name
      });

      return {
        access_token: this.jwtService.sign(payload),
        user: this.excludePassword(user),
      };
    } catch (error) {
      this.loggerService.logBusinessError('Registration failed', {
        action: 'register',
        metadata: { email: registerDto.email, error: error.message }
      });
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResult> {
    this.loggerService.logAuth('Login attempt started', {
      action: 'login',
      metadata: { email: loginDto.email }
    });

    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);

      if (!user) {
        this.loggerService.logValidation('Invalid credentials provided', {
          action: 'login',
          metadata: { email: loginDto.email }
        });
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = { sub: user.id, email: user.email };

      this.loggerService.logAuth('User logged in successfully', {
        userId: user.id,
        action: 'login',
        metadata: { email: user.email }
      });

      this.loggerService.logUserAction('login', user.id, 'user_session');

      return {
        access_token: this.jwtService.sign(payload),
        user: this.excludePassword(user),
      };
    } catch (error) {
      this.loggerService.logBusinessError('Login failed', {
        action: 'login',
        metadata: { email: loginDto.email, error: error.message }
      });
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    this.loggerService.debug('Validating user credentials', {
      action: 'validate_user',
      metadata: { email }
    });

    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      this.loggerService.debug('User credentials validated successfully', {
        userId: user.id,
        action: 'validate_user'
      });
      return user;
    }

    this.loggerService.debug('User credentials validation failed', {
      action: 'validate_user',
      metadata: { email }
    });
    return null;
  }

  // helper functions
  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...result } = user;
    return result;
  }
}
