import { Injectable, NotFoundException } from "@nestjs/common"; 
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User,UserSchema } from "./schema/user.schema";
import { Model } from "mongoose";
import { validateId } from "src/utils/validate.id";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<UserSchema>,
    ) { }


  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userSchema(createUserDto);
    return newUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<User> {

        validateId(id); // Valida o ID antes de fazer a busca
        const user = await this.userSchema.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User com id: ${id} não encontrado`);
        }
        return user;
    }

  async update(id: string, updateUserDTO: UpdateUserDto): Promise<User> {

        validateId(id); // Valida o ID antes de fazer a busca

        const user = await this.userSchema.findByIdAndUpdate(id, updateUserDTO, { new: true }).exec();
        if (!user) {
            throw new NotFoundException(`Estudante com id: ${id} não encontrado`);
        }
        return user;
    }

  async delete(id: string): Promise<{ message: string }> {

        validateId(id); // Valida o ID antes de fazer a busca

        const user = await this.userSchema.findByIdAndDelete(id).exec();
        if (!user) {
            throw new NotFoundException(`User com id ${id} não encontrado`);
        }
        return { message: `User com id: ${id} deletado com sucesso` };
    }   
}
