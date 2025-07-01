import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// Usamos 'UserDocument' para evitar conflito com a constante 'UserSchema' abaixo.
// Esta é a forma recomendada pelo NestJS para resolver os erros de tipagem.
export type UserDocument = HydratedDocument<User>;

@Schema({
  // Adiciona os campos createdAt e updatedAt automaticamente. É uma ótima prática!
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  nome!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  senha!: string;

  // Mantive sua relação com Treinador. Ótima adição!
  // Se o treinador for opcional, você pode mudar a propriedade para:
  // @Prop({ type: Types.ObjectId, ref: 'Treinador', required: false })
  // treinador?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Treinador' })
  treinador!: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
