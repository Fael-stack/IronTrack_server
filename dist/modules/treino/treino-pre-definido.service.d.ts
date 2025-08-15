import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { PreDefinido, PreDefinidoDocument } from './schema/pre-definido.schema';
export declare class TreinoPreDefinidoService implements OnModuleInit {
    private preDefinidoModel;
    constructor(preDefinidoModel: Model<PreDefinidoDocument>);
    onModuleInit(): Promise<void>;
    private seedDatabase;
    getTreinoPorObjetivo(objetivo: string): Promise<PreDefinido[]>;
}
