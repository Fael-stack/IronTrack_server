import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Treino, TreinoDocument } from './schema/treino.schema';
import { CreateTreinoDto } from './dto/create-treino.dto';

@Injectable()
export class TreinoService {
  constructor(
    @InjectModel(Treino.name) private treinoModel: Model<TreinoDocument>,
  ) {}

  async create(createTreinoDto: CreateTreinoDto): Promise<Treino> {
    const createdTreino = new this.treinoModel(createTreinoDto);
    return createdTreino.save();
  }

  async findAll(): Promise<Treino[]> {
    return this.treinoModel.find().exec();
  }

  async findOne(id: string): Promise<Treino | null> {
    return this.treinoModel.findById(id).exec();
  }
}
