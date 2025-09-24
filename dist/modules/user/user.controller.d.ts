import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
export declare class UserController {
    private readonly userService;
    private readonly encryptService;
    constructor(userService: UserService, encryptService: EncryptService);
    create(createUserDto: CreateUserDto): Promise<import("./schema/user.schema").User>;
    findAll(): Promise<import("./schema/user.schema").User[]>;
    findOne(id: string): Promise<import("./schema/user.schema").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schema/user.schema").User>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
