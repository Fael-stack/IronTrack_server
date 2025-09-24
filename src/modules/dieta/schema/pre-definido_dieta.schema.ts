// src/modules/treino/schema/pre-definido.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Exporta o tipo do Documento para uso no serviço
export type PreDefinidoDocument = PreDefinido & Document;

@Schema({ timestamps: true }) // Adiciona campos createdAt e updatedAt automaticamente
export class PreDefinido {
  @Prop({ required: true })
  nome!: string;

  @Prop() // Opcional
  calorias?: number;

  @Prop() // Opcional
  proteinas?: number;

  @Prop() // Opcional
  carboidratos?: number;

  @Prop()
  gorduras?: number;

  @Prop({ required: true, index: true }) // Index para otimizar a busca
  objetivo!: string; // "ganhar-massa" ou "perder-gordura"

  @Prop({
    required: true,
    enum: ['segunda', 'terca', 'quarta', 'sexta'], // Garante que apenas estes valores sejam aceitos
  })
  dia!: string;
}

export const PreDefinidoSchema = SchemaFactory.createForClass(PreDefinido);