"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const logger_service_1 = require("../common/services/logger.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    usersService;
    jwtService;
    loggerService;
    constructor(usersService, jwtService, loggerService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.loggerService = loggerService;
    }
    async register(registerDto) {
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
        }
        catch (error) {
            this.loggerService.logBusinessError('Registration failed', {
                action: 'register',
                metadata: { email: registerDto.email, error: error.message }
            });
            throw error;
        }
    }
    async login(loginDto) {
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
                throw new common_1.UnauthorizedException('Invalid email or password');
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
        }
        catch (error) {
            this.loggerService.logBusinessError('Login failed', {
                action: 'login',
                metadata: { email: loginDto.email, error: error.message }
            });
            throw error;
        }
    }
    async validateUser(email, password) {
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
    excludePassword(user) {
        const { password, ...result } = user;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        logger_service_1.LoggerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map