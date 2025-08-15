// src/modules/treino/treino-pre-definido.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PreDefinido, PreDefinidoDocument } from './schema/pre-definido.schema';
import { TREINOS_PARA_GANHAR_MASSA, TREINOS_PARA_PERDER_GORDURA } from './data/pre-definidos.data';

@Injectable()
export class TreinoPreDefinidoService implements OnModuleInit {
  constructor(
    @InjectModel(PreDefinido.name)
    private preDefinidoModel: Model<PreDefinidoDocument>,
  ) {}

  // Este método será executado assim que o módulo for inicializado
  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const count = await this.preDefinidoModel.countDocuments();
    // Só popula o banco se ele estiver vazio, para não duplicar dados
    if (count === 0) {
      console.log('Populando o banco de dados com treinos pré-definidos...');
      const todosOsTreinos = [
        ...TREINOS_PARA_GANHAR_MASSA,
        ...TREINOS_PARA_PERDER_GORDURA,
      ];
      await this.preDefinidoModel.insertMany(todosOsTreinos);
      console.log('Banco de dados populado com sucesso!');
    }
  }

  async getTreinoPorObjetivo(objetivo: string): Promise<PreDefinido[]> {
    return this.preDefinidoModel.find({ objetivo }).exec();
  }
}