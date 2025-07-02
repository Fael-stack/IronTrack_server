// src/modules/dieta/dieta.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DietaController } from './dieta.controller';
import { DietaService } from './dieta.service';
import { DietaPreDefinidaService } from './dieta-pre-definida.service';
import { PreDefinido, PreDefinidoSchema } from './schema/pre-definido_dieta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PreDefinido.name, schema: PreDefinidoSchema },
    ]),
  ],
  controllers: [DietaController],
  providers: [DietaService, DietaPreDefinidaService],
})
export class DietaModule {}