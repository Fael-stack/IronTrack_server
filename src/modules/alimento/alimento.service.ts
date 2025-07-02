import { Injectable, NotFoundException } from "@nestjs/common"; 
import { InjectModel } from "@nestjs/mongoose";
import { CreateAlimentoDto } from "./dto/create-alimento.dto";
import { UpdateAlimentoDto } from "./dto/update-alimento.dto";
import { Alimento, AlimentoDocument } from "./schema/alimento.schema";
import { Model } from "mongoose";
import { validateId } from "src/utils/validate.id";

@Injectable()
export class AlimentoService {
  constructor(
    @InjectModel(Alimento.name)
    private readonly alimentoModel: Model<AlimentoDocument>,
  ) {}

  create(createAlimentoDto: CreateAlimentoDto): Promise<Alimento> {
    const newAlimento = new this.alimentoModel(createAlimentoDto);
    return newAlimento.save();
  }

  findAll(): Promise<Alimento[]> {
    return this.alimentoModel.find().exec();
  }

  async findOne(id: string): Promise<Alimento> {
    validateId(id);
    const alimento = await this.alimentoModel.findById(id).exec();
    if (!alimento) {
      throw new NotFoundException(`Alimento com id: ${id} não encontrado`);
    }
    return alimento;
  }

  async update(id: string, updateAlimentoDto: UpdateAlimentoDto): Promise<Alimento> {
    validateId(id);
    const alimento = await this.alimentoModel
      .findByIdAndUpdate(id, updateAlimentoDto, { new: true })
      .exec();
    if (!alimento) {
      throw new NotFoundException(`Alimento com id: ${id} não encontrado`);
    }
    return alimento;
  }

  async delete(id: string): Promise<{ message: string }> {
    validateId(id);
    const alimento = await this.alimentoModel.findByIdAndDelete(id).exec();
    if (!alimento) {
      throw new NotFoundException(`Alimento com id ${id} não encontrado`);
    }
    return { message: `Alimento com id: ${id} deletado com sucesso` };
  }
}