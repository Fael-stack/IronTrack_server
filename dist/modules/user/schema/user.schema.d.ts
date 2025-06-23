import { Document, Types } from "mongoose";
export type UsuarioDocument = Usuario & Document;
export declare class Usuario {
    nome: string;
    email: string;
    senha: string;
    treinador: Types.ObjectId;
}
export declare const UsuarioSchema: import("mongoose").Schema<Usuario, import("mongoose").Model<Usuario, any, any, any, Document<unknown, any, Usuario, any> & Usuario & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuario, Document<unknown, {}, import("mongoose").FlatRecord<Usuario>, {}> & import("mongoose").FlatRecord<Usuario> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
