import { Document } from "mongoose";
export type AlimentoDocument = Alimento & Document;
export declare class Alimento {
    nome: string;
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
}
export declare const AlimentoSchema: import("mongoose").Schema<Alimento, import("mongoose").Model<Alimento, any, any, any, Document<unknown, any, Alimento, any> & Alimento & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Alimento, Document<unknown, {}, import("mongoose").FlatRecord<Alimento>, {}> & import("mongoose").FlatRecord<Alimento> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
