import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoggerService } from 'src/common/services/logger.service';
import { Pagination } from 'src/common/interfaces/api-response.interface';
export declare class UsersService {
    private readonly userRepository;
    private readonly loggerService;
    constructor(userRepository: UserRepository, loggerService: LoggerService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findAllWithPagination(page: number, limit: number): Promise<Pagination<User>>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}
