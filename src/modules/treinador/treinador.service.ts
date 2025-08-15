import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTreinadorDto } from "./dto/create-treinador.dto";
import { UpdateTreinadorDto } from "./dto/update-treinador.dto";
import { Treinador, TreinadorDocument } from "./schema/treinador.schema";
import { Model } from "mongoose";
import { validateId } from "src/utils/validate.id";

@Injectable()
export class TreinadorService {
  constructor(
    @InjectModel(Treinador.name)
    private readonly treinadorModel: Model<TreinadorDocument>,
  ) {}

  create(createTreinadorDto: CreateTreinadorDto): Promise<Treinador> {
    const newTreinador = new this.treinadorModel(createTreinadorDto);
    return newTreinador.save();
  }

  findAll(): Promise<Treinador[]> {
    return this.treinadorModel.find().exec();
  }

  async findOne(id: string): Promise<Treinador> {
    validateId(id);
    const treinador = await this.treinadorModel.findById(id).exec();
    if (!treinador) {
      throw new NotFoundException(`Treinador com id: ${id} não encontrado`);
    }
    return treinador;
  }

  async update(id: string, updateTreinadorDto: UpdateTreinadorDto): Promise<Treinador> {
    validateId(id);
    const treinador = await this.treinadorModel
      .findByIdAndUpdate(id, updateTreinadorDto, { new: true })
      .exec();
    if (!treinador) {
      throw new NotFoundException(`Treinador com id: ${id} não encontrado`);
    }
    return treinador;
  }

  async delete(id: string): Promise<{ message: string }> {
    validateId(id);
    const treinador = await this.treinadorModel.findByIdAndDelete(id).exec();
    if (!treinador) {
      throw new NotFoundException(`Treinador com id ${id} não encontrado`);
    }
    return { message: `Treinador com id: ${id} deletado com sucesso` };
  }
}