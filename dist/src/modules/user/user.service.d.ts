import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserSchema } from "./schema/user.schema";
import { Model } from "mongoose";
export declare class UserService {
    private readonly userSchema;
    constructor(userSchema: Model<UserSchema>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): string;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDTO: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
