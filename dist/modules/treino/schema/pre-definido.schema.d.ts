import { Document } from 'mongoose';
export type PreDefinidoDocument = PreDefinido & Document;
export declare class PreDefinido {
    nome: string;
    grupoMuscular?: string;
    series?: string;
    duracaoMinutos?: number;
    objetivo: string;
    dia: string;
}
export declare const PreDefinidoSchema: import("mongoose").Schema<PreDefinido, import("mongoose").Model<PreDefinido, any, any, any, Document<unknown, any, PreDefinido, any, {}> & PreDefinido & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PreDefinido, Document<unknown, {}, import("mongoose").FlatRecord<PreDefinido>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PreDefinido> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
