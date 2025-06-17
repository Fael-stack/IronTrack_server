import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type DietaDocument = Dieta & Document;

@Schema()
export class Dieta {
  @Prop({ required: true })
  nome!: string;

  @Prop()
  objetivo!: string;

  @Prop({ type: Types.ObjectId, ref: "Usuario" })
  usuari!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Alimento" }] })
  alimentos!: Types.ObjectId[];
}

export const DietaSchema = SchemaFactory.createForClass(Dieta);
