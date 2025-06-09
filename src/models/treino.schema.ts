import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TreinoDocument = Treino & Document;

@Schema()
export class Treino {
  @Prop({ required: true })
  nome!: string;

  @Prop()
  objetivo!: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario' })
  usuario!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Exercicio' }] })
  exercicios!: Types.ObjectId[];
}

export const TreinoSchema = SchemaFactory.createForClass(Treino);
