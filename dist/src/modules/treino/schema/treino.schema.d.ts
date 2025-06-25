import { Document, Types } from "mongoose";
export type TreinoDocument = Treino & Document;
export declare class Treino {
    nome: string;
    objetivo: string;
    usuario: Types.ObjectId;
    exercicios: Types.ObjectId[];
}
export declare const TreinoSchema: import("mongoose").Schema<Treino, import("mongoose").Model<Treino, any, any, any, Document<unknown, any, Treino, any> & Treino & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Treino, Document<unknown, {}, import("mongoose").FlatRecord<Treino>, {}> & import("mongoose").FlatRecord<Treino> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
