import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Log, LogDebug, LogExtractors } from 'src/common/decorators/log.decorator';
import { LoggerService } from 'src/common/services/logger.service';
import * as bcrypt from 'bcryptjs';
import { Pagination } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {}

  @Log({ 
    action: 'create_user',
    extractContext: {
      fromArgs: LogExtractors.emailFromDto,
      fromResult: LogExtractors.userFromResult,
      fromError: LogExtractors.emailFromError,
    },
    messages: {
      start: 'Creating new user',
      success: 'User created successfully',
      error: 'User creation failed',
    }
  })
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create user with hashed password
    const userData = {
      ...createUserDto,
      password: hashedPassword,
    };

    return this.userRepository.create(userData);
  }

  @Log({ 
    action: 'find_all_users',
    messages: {
      start: 'Fetching all users',
      success: 'All users fetched successfully',
    }
  })
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Log({ 
    action: 'find_users_paginated',
    extractContext: {
      fromArgs: (args) => ({ page: args[0], limit: args[1] }),
    },
    messages: {
      start: 'Fetching users with pagination',
      success: 'Paginated users fetched successfully',
    }
  })
  async findAllWithPagination(
    page: number,
    limit: number,
  ): Promise<Pagination<User>> {
    return this.userRepository.findAllWithPagination(page, limit);
  }

  @Log({ 
    action: 'find_user_by_id',
    extractContext: {
      fromArgs: LogExtractors.userIdFromArgs,
      fromResult: LogExtractors.userFromResult,
    },
    messages: {
      start: 'Finding user by ID',
      success: 'User found successfully',
      error: 'User not found',
    }
  })
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @LogDebug('find_user_by_email')
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  @Log({ 
    action: 'update_user',
    extractContext: {
      fromArgs: (args) => ({ 
        userId: args[0], 
        updateFields: Object.keys(args[1] || {}) 
      }),
      fromResult: LogExtractors.userFromResult,
    },
    messages: {
      start: 'Updating user',
      success: 'User updated successfully',
      error: 'User update failed',
    }
  })
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if user exists
    await this.findById(id);

    // If password is being updated, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.userRepository.update(id, updateUserDto);
  }

  @Log({ 
    action: 'delete_user',
    extractContext: {
      fromArgs: LogExtractors.userIdFromArgs,
    },
    messages: {
      start: 'Deleting user',
      success: 'User deleted successfully',
      error: 'User deletion failed',
    }
  })
  async remove(id: string): Promise<void> {
    // Check if user exists
    await this.findById(id);
    await this.userRepository.delete(id);
  }
}
