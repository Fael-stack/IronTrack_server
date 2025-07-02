import { Injectable, NotFoundException } from "@nestjs/common"; 
import { InjectModel } from "@nestjs/mongoose";
import { CreateExercicioDto } from "./dto/create-exercicio.dto";
import { UpdateExercicioDto } from "./dto/update-exercicio.dto";
import { Exercicio, ExercicioDocument } from "./schema/exercicio.schema";
import { Model } from "mongoose";
import { validateId } from "src/utils/validate.id";

@Injectable()
export class ExercicioService {
  constructor(
    @InjectModel(Exercicio.name)
    private readonly exercicioModel: Model<ExercicioDocument>,
  ) {}

  create(createExercicioDto: CreateExercicioDto): Promise<Exercicio> {
    const newExercicio = new this.exercicioModel(createExercicioDto);
    return newExercicio.save();
  }

  findAll(): Promise<Exercicio[]> {
    return this.exercicioModel.find().exec();
  }

  async findOne(id: string): Promise<Exercicio> {
    validateId(id);
    const exercicio = await this.exercicioModel.findById(id).exec();
    if (!exercicio) {
      throw new NotFoundException(`Exercicio com id: ${id} não encontrado`);
    }
    return exercicio;
  }

  async update(id: string, updateExercicioDto: UpdateExercicioDto): Promise<Exercicio> {
    validateId(id);
    const exercicio = await this.exercicioModel
      .findByIdAndUpdate(id, updateExercicioDto, { new: true })
      .exec();
    if (!exercicio) {
      throw new NotFoundException(`Exercicio com id: ${id} não encontrado`);
    }
    return exercicio;
  }

  async delete(id: string): Promise<{ message: string }> {
    validateId(id);
    const exercicio = await this.exercicioModel.findByIdAndDelete(id).exec();
    if (!exercicio) {
      throw new NotFoundException(`Exercicio com id ${id} não encontrado`);
    }
    return { message: `Exercicio com id: ${id} deletado com sucesso` };
  }
}