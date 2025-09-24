// src/modules/treino/treino.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreinoService } from './treino.service';
import { TreinoController } from './treino.controller';
import { Treino, TreinoSchema } from './schema/treino.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Treino.name, schema: TreinoSchema }])],
  controllers: [TreinoController],
  providers: [TreinoService],
})
export class TreinoModule {}
