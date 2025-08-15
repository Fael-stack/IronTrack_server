import { Document } from "mongoose";
export type ExercicioDocument = Exercicio & Document;
export declare class Exercicio {
    nome: string;
    descricao: string;
    grupoMuscular: string;
    duracaoMinutos: number;
}
export declare const ExercicioSchema: import("mongoose").Schema<Exercicio, import("mongoose").Model<Exercicio, any, any, any, Document<unknown, any, Exercicio, any, {}> & Exercicio & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Exercicio, Document<unknown, {}, import("mongoose").FlatRecord<Exercicio>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Exercicio> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
