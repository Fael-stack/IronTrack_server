import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTreinoDto } from "./dto/create-treino.dto";
import { UpdateTreinoDto } from "./dto/update-treino.dto";
import { Treino, TreinoDocument } from "./schema/treino.schema";
import { Model } from "mongoose";
import { validateId } from "src/utils/validate.id";

@Injectable()
export class TreinoService {
  constructor(
    @InjectModel(Treino.name)
    private readonly treinoModel: Model<TreinoDocument>,
  ) {}

  create(createTreinoDto: CreateTreinoDto): Promise<Treino> {
    const newTreino = new this.treinoModel(createTreinoDto);
    return newTreino.save();
  }

  findAll(): Promise<Treino[]> {
    return this.treinoModel.find().exec();
  }

  async findOne(id: string): Promise<Treino> {
    validateId(id);
    const treino = await this.treinoModel.findById(id).exec();
    if (!treino) {
      throw new NotFoundException(`Treino com id: ${id} não encontrado`);
    }
    return treino;
  }

  async update(id: string, updateTreinoDto: UpdateTreinoDto): Promise<Treino> {
    validateId(id);
    const treino = await this.treinoModel
      .findByIdAndUpdate(id, updateTreinoDto, { new: true })
      .exec();
    if (!treino) {
      throw new NotFoundException(`Treino com id: ${id} não encontrado`);
    }
    return treino;
  }

  async delete(id: string): Promise<{ message: string }> {
    validateId(id);
    const treino = await this.treinoModel.findByIdAndDelete(id).exec();
    if (!treino) {
      throw new NotFoundException(`Treino com id ${id} não encontrado`);
    }
    return { message: `Treino com id: ${id} deletado com sucesso` };
  }
}