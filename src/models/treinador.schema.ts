import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TreinadorDocument = Treinador & Document;

@Schema()
export class Treinador {
  @Prop({ required: true })
  nome!: string;

  @Prop()
  especialidade!: string;

  @Prop({ unique: true })
  emai!: string;

  @Prop()
  telefone!: string;
}

export const TreinadorSchema = SchemaFactory.createForClass(Treinador);
