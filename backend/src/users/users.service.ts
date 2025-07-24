import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoggerService } from 'src/common/services/logger.service';
import * as bcrypt from 'bcryptjs';
import { Pagination } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.loggerService.logDatabase('Creating new user', {
      action: 'create_user',
      metadata: { email: createUserDto.email, name: createUserDto.name }
    });

    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(createUserDto.email);
      if (existingUser) {
        this.loggerService.logValidation('User creation failed - email already exists', {
          action: 'create_user',
          metadata: { email: createUserDto.email }
        });
        throw new ConflictException('User with this email already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Create user with hashed password
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
    } catch (error) {
      this.loggerService.logSystemError('User creation failed', error, {
        action: 'create_user',
        metadata: { email: createUserDto.email }
      });
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    this.loggerService.logDatabase('Fetching all users', { action: 'find_all_users' });
    return this.userRepository.findAll();
  }

  async findAllWithPagination(
    page: number,
    limit: number,
  ): Promise<Pagination<User>> {
    this.loggerService.logDatabase('Fetching users with pagination', {
      action: 'find_users_paginated',
      metadata: { page, limit }
    });
    return this.userRepository.findAllWithPagination(page, limit);
  }

  async findById(id: string): Promise<User> {
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
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.loggerService.logSystemError('Error finding user by ID', error, {
        action: 'find_user_by_id',
        metadata: { userId: id }
      });
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    this.loggerService.debug('Finding user by email', {
      action: 'find_user_by_email',
      metadata: { email }
    });
    return this.userRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.loggerService.logDatabase('Updating user', {
      userId: id,
      action: 'update_user',
      metadata: { updateFields: Object.keys(updateUserDto) }
    });

    try {
      // Check if user exists
      await this.findById(id);

      // If password is being updated, hash it
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
    } catch (error) {
      this.loggerService.logSystemError('User update failed', error, {
        userId: id,
        action: 'update_user'
      });
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    this.loggerService.logDatabase('Deleting user', {
      userId: id,
      action: 'delete_user'
    });

    try {
      // Check if user exists
      await this.findById(id);
      await this.userRepository.delete(id);
      
      this.loggerService.logDatabase('User deleted successfully', {
        userId: id,
        action: 'delete_user'
      });

      this.loggerService.logUserAction('delete_account', id, 'user_account');
    } catch (error) {
      this.loggerService.logSystemError('User deletion failed', error, {
        userId: id,
        action: 'delete_user'
      });
      throw error;
    }
  }
}
