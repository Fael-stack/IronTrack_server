import { Document } from 'mongoose';
export type TreinoDocument = Treino & Document;
export declare class Treino {
    name: string;
    day_time: string;
    week_day: string;
    exercises: string[];
    description: string;
    duration: number;
}
export declare const TreinoSchema: import("mongoose").Schema<Treino, import("mongoose").Model<Treino, any, any, any, Document<unknown, any, Treino, any, {}> & Treino & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Treino, Document<unknown, {}, import("mongoose").FlatRecord<Treino>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Treino> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
