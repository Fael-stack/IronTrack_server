import { Document, Types } from 'mongoose';
export type RefreshTokenDocument = RefreshToken & Document;
export declare class RefreshToken {
    longToken: string;
    userId: Types.ObjectId;
    expiresAt: Date;
    revoked: boolean;
    userAgent?: string;
    ipAddress?: string;
}
export declare const RefreshTokenSchema: import("mongoose").Schema<RefreshToken, import("mongoose").Model<RefreshToken, any, any, any, Document<unknown, any, RefreshToken, any, {}> & RefreshToken & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RefreshToken, Document<unknown, {}, import("mongoose").FlatRecord<RefreshToken>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<RefreshToken> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
