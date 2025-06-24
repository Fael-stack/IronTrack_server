import { Injectable, NotFoundException } from "@nestjs/common"; 
import { InjectModel } from "@nestjs/mongoose";
import { CreateDietaDto } from "./dto/create-dieta.dto";
import { UpdateDietaDto } from "./dto/update-dieta.dto";
import { Dieta, DietaDocument } from "./schema/dieta.schema";
import { Model } from "mongoose";
import { validateId } from "src/utils/validate.id";

@Injectable()
export class DietaService {

  constructor(
    @InjectModel(Dieta.name) private readonly dietaModel: Model<DietaDocument>,
  ) {}

  create(createDietaDto: CreateDietaDto): Promise<Dieta> {
    const newDieta = new this.dietaModel(createDietaDto);
    return newDieta.save();
  }

  findAll() {
    return `This action returns all dieta`;
  }

  async findOne(id: string): Promise<Dieta> {
    validateId(id);
    const dieta = await this.dietaModel.findById(id).exec();
    if (!dieta) {
      throw new NotFoundException(`Dieta com id: ${id} não encontrada`);
    }
    return dieta;
  }

  async update(id: string, updateDietaDto: UpdateDietaDto): Promise<Dieta> {
    validateId(id);
    const dieta = await this.dietaModel.findByIdAndUpdate(id, updateDietaDto, { new: true }).exec();
    if (!dieta) {
      throw new NotFoundException(`Dieta com id: ${id} não encontrada`);
    }
    return dieta;
  }

  async delete(id: string): Promise<{ message: string }> {
    validateId(id);
    const dieta = await this.dietaModel.findByIdAndDelete(id).exec();
    if (!dieta) {
      throw new NotFoundException(`Dieta com id ${id} não encontrada`);
    }
    return { message: `Dieta com id: ${id} deletada com sucesso` };
  }
