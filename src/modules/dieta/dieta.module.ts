// src/modules/dieta/dieta.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DietaService } from './dieta.service';

import { PreDefinido, PreDefinidoSchema } from './schema/pre-definido_dieta.schema';
import { Dieta, DietaSchema } from './schema/dieta.schema'; // Import Dieta and DietaSchema

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PreDefinido.name, schema: PreDefinidoSchema },
      { name: Dieta.name, schema: DietaSchema }, // Add this line
    ]),
  ],

})
export class DietaModule {}