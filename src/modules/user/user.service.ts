import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema'; // Importe também o UserDocument
import { validateId } from 'src/utils/validate.id';

@Injectable()
export class UserService {
  
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  
  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

 
  async findOne(id: string): Promise<User> {
    validateId(id); // Valida o ID antes de fazer a busca
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User com id: ${id} não encontrado`);
    }
    return user;
  }

  async update(id: string, updateUserDTO: UpdateUserDto): Promise<User> {
    validateId(id); // Valida o ID antes de fazer a busca

    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDTO, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`Usuário com id: ${id} não encontrado`);
    }
    return user;
  }


  async delete(id: string): Promise<{ message: string }> {
    validateId(id); // Valida o ID antes de fazer a busca

    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User com id ${id} não encontrado`);
    }
    return { message: `User com id: ${id} deletado com sucesso` };
  }
}
