import { Document, Types } from "mongoose";
export type DietaDocument = Dieta & Document;
export declare class Dieta {
    nome: string;
    objetivo: string;
    usuari: Types.ObjectId;
    alimentos: Types.ObjectId[];
}
export declare const DietaSchema: import("mongoose").Schema<Dieta, import("mongoose").Model<Dieta, any, any, any, Document<unknown, any, Dieta, any, {}> & Dieta & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Dieta, Document<unknown, {}, import("mongoose").FlatRecord<Dieta>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Dieta> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
