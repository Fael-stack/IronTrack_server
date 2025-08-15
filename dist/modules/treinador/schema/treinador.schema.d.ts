import { Document } from "mongoose";
export type TreinadorDocument = Treinador & Document;
export declare class Treinador {
    nome: string;
    especialidade: string;
    email: string;
    telefone: string;
}
export declare const TreinadorSchema: import("mongoose").Schema<Treinador, import("mongoose").Model<Treinador, any, any, any, Document<unknown, any, Treinador, any, {}> & Treinador & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Treinador, Document<unknown, {}, import("mongoose").FlatRecord<Treinador>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Treinador> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
