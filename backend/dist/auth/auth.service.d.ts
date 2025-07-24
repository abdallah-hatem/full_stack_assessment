import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';
import { LoggerService } from 'src/common/services/logger.service';
export interface AuthResult {
    access_token: string;
    user: Omit<User, 'password'>;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly loggerService;
    constructor(usersService: UsersService, jwtService: JwtService, loggerService: LoggerService);
    register(registerDto: RegisterDto): Promise<AuthResult>;
    login(loginDto: LoginDto): Promise<AuthResult>;
    validateUser(email: string, password: string): Promise<User | null>;
    private excludePassword;
}
