import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUtil } from '../common/utils/response.util';
import { Request } from 'express';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const user = await this.usersService.create(createUserDto);
    // Custom message for user creation
    return ResponseUtil.created(
      user,
      `User ${createUserDto.name} has been created successfully`,
      req.url,
    );
  }

  @Get()
  // @Auth()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req: Request,
  ) {
    const { data, total, hasNextPage, hasPreviousPage } =
      await this.usersService.findAllWithPagination(page, limit);
    // Custom message based on results
    const message =
      data.length > 0 ? `Found ${data.length} user(s)` : 'No users found';

    return ResponseUtil.success(data, message, 200, req.url, {
      total,
      page,
      limit,
      hasNextPage,
      hasPreviousPage,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const user = await this.usersService.findById(id);
    return ResponseUtil.success(
      user,
      `User details retrieved successfully`,
      200,
      req.url,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return ResponseUtil.updated(
      user,
      'User profile updated successfully',
      req.url,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    await this.usersService.remove(id);
    return ResponseUtil.deleted(
      'User account has been permanently deleted',
      req.url,
    );
  }
}
