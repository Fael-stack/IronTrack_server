import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nome!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  senha!: string;

  @Prop({ type: Types.ObjectId, ref: 'Treinador' })
  treinador!: Types.ObjectId; // usuário pode ter um treinador
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
