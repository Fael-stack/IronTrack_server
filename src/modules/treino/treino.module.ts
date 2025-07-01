// src/modules/treino/treino.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreinoController } from './treino.controller';
import { TreinoService } from './treino.service';
import { TreinoPreDefinidoService } from './treino-pre-definido.service';
import { Treino, TreinoSchema } from './schema/treino.schema';

// 1. Importe o novo schema e a classe
import { PreDefinido, PreDefinidoSchema } from './schema/pre-definido.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Treino.name, schema: TreinoSchema },
      // 2. Adicione o novo schema à lista
      { name: PreDefinido.name, schema: PreDefinidoSchema },
    ]),
  ],
  controllers: [TreinoController],
  // 3. Garanta que o TreinoPreDefinidoService está nos providers
  providers: [TreinoService, TreinoPreDefinidoService],
})
export class TreinoModule {}