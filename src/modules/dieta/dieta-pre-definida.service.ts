// src/modules/treino/dieta-pre-definida.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PreDefinido, PreDefinidoDocument } from './schema/pre-definido_dieta.schema';
import { DIETAS_PARA_GANHAR_MASSA, DIETAS_PARA_PERDER_GORDURA } from './data/pre-definido_dieta.data';

@Injectable()
export class DietaPreDefinidaService implements OnModuleInit {
  constructor(
    @InjectModel(PreDefinido.name)
    private preDefinidoModel: Model<PreDefinidoDocument>,
  ) {}

  // Executado ao iniciar o módulo
  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const count = await this.preDefinidoModel.countDocuments();
    if (count === 0) {
      console.log('Populando o banco de dados com dietas pré-definidas...');
      const todasAsDietas = [
        ...DIETAS_PARA_GANHAR_MASSA,
        ...DIETAS_PARA_PERDER_GORDURA,
      ];
      await this.preDefinidoModel.insertMany(todasAsDietas);
      console.log('Banco de dados populado com sucesso!');
    }
  }

  async getDietaPorObjetivo(objetivo: string): Promise<PreDefinido[]> {
    return this.preDefinidoModel.find({ objetivo }).exec();
  }
}