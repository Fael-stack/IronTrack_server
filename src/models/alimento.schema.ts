import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlimentoDocument = Alimento & Document;

@Schema()
export class Alimento {
  @Prop({ required: true })
  nome!: string;

  @Prop()
  calorias!: number;

  @Prop()
  proteinas!: number;

  @Prop()
  carboidratos!: number;

  @Prop()
  gorduras!: number;
}

export const AlimentoSchema = SchemaFactory.createForClass(Alimento);
