import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TreinoDocument = Treino & Document;

@Schema({ timestamps: { createdAt: 'creation_moment', updatedAt: false } })
export class Treino {
  @Prop({ required: true })
  name!: string;

  @Prop()
  day_time!: string;

  @Prop()
  week_day!: string;

  @Prop({ type: [String], default: [] })
  exercises!: string[];

  @Prop()
  description!: string;

    @Prop()
    duration!: number; 
}

export const TreinoSchema = SchemaFactory.createForClass(Treino);
