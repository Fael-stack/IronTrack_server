import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExercicioDocument = Exercicio & Document;

@Schema()
export class Exercicio {
  @Prop({ required: true })
  nome!: string;

  @Prop()
  descricao!: string;

  @Prop()
  grupoMuscular!: string;

  @Prop()
  duracaoMinutos!: number;
}

export const ExercicioSchema = SchemaFactory.createForClass(Exercicio);
