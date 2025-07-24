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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repositories/user.repository");
const logger_service_1 = require("../common/services/logger.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    userRepository;
    loggerService;
    constructor(userRepository, loggerService) {
        this.userRepository = userRepository;
        this.loggerService = loggerService;
    }
    async create(createUserDto) {
        this.loggerService.logDatabase('Creating new user', {
            action: 'create_user',
            metadata: { email: createUserDto.email, name: createUserDto.name }
        });
        try {
            const existingUser = await this.userRepository.findByEmail(createUserDto.email);
            if (existingUser) {
                this.loggerService.logValidation('User creation failed - email already exists', {
                    action: 'create_user',
                    metadata: { email: createUserDto.email }
                });
                throw new common_1.ConflictException('User with this email already exists');
            }
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const userData = {
                ...createUserDto,
                password: hashedPassword,
            };
            const user = await this.userRepository.create(userData);
            this.loggerService.logDatabase('User created successfully', {
                userId: user.id,
                action: 'create_user',
                metadata: { email: user.email }
            });
            return user;
        }
        catch (error) {
            this.loggerService.logSystemError('User creation failed', error, {
                action: 'create_user',
                metadata: { email: createUserDto.email }
            });
            throw error;
        }
    }
    async findAll() {
        this.loggerService.logDatabase('Fetching all users', { action: 'find_all_users' });
        return this.userRepository.findAll();
    }
    async findAllWithPagination(page, limit) {
        this.loggerService.logDatabase('Fetching users with pagination', {
            action: 'find_users_paginated',
            metadata: { page, limit }
        });
        return this.userRepository.findAllWithPagination(page, limit);
    }
    async findById(id) {
        this.loggerService.logDatabase('Finding user by ID', {
            action: 'find_user_by_id',
            metadata: { userId: id }
        });
        try {
            const user = await this.userRepository.findById(id);
            if (!user) {
                this.loggerService.logValidation('User not found', {
                    action: 'find_user_by_id',
                    metadata: { userId: id }
                });
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            this.loggerService.logSystemError('Error finding user by ID', error, {
                action: 'find_user_by_id',
                metadata: { userId: id }
            });
            throw error;
        }
    }
    async findByEmail(email) {
        this.loggerService.debug('Finding user by email', {
            action: 'find_user_by_email',
            metadata: { email }
        });
        return this.userRepository.findByEmail(email);
    }
    async update(id, updateUserDto) {
        this.loggerService.logDatabase('Updating user', {
            userId: id,
            action: 'update_user',
            metadata: { updateFields: Object.keys(updateUserDto) }
        });
        try {
            await this.findById(id);
            if (updateUserDto.password) {
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
                this.loggerService.logAuth('User password updated', {
                    userId: id,
                    action: 'update_password'
                });
            }
            const user = await this.userRepository.update(id, updateUserDto);
            this.loggerService.logDatabase('User updated successfully', {
                userId: id,
                action: 'update_user'
            });
            this.loggerService.logUserAction('update_profile', id, 'user_account', {
                updatedFields: Object.keys(updateUserDto)
            });
            return user;
        }
        catch (error) {
            this.loggerService.logSystemError('User update failed', error, {
                userId: id,
                action: 'update_user'
            });
            throw error;
        }
    }
    async remove(id) {
        this.loggerService.logDatabase('Deleting user', {
            userId: id,
            action: 'delete_user'
        });
        try {
            await this.findById(id);
            await this.userRepository.delete(id);
            this.loggerService.logDatabase('User deleted successfully', {
                userId: id,
                action: 'delete_user'
            });
            this.loggerService.logUserAction('delete_account', id, 'user_account');
        }
        catch (error) {
            this.loggerService.logSystemError('User deletion failed', error, {
                userId: id,
                action: 'delete_user'
            });
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        logger_service_1.LoggerService])
], UsersService);
//# sourceMappingURL=users.service.js.map