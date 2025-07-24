import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, req: Request): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("./entities/user.entity").User>>;
    findAll(page: number, limit: number, req: Request): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("./entities/user.entity").User[]>>;
    findOne(id: string, req: Request): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("./entities/user.entity").User>>;
    update(id: string, updateUserDto: UpdateUserDto, req: Request): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("./entities/user.entity").User>>;
    remove(id: string, req: Request): Promise<import("../common/interfaces/api-response.interface").ApiResponse<any>>;
}
