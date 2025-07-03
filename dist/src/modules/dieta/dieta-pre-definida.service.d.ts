import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { PreDefinido, PreDefinidoDocument } from './schema/pre-definido_dieta.schema';
export declare class DietaPreDefinidaService implements OnModuleInit {
    private preDefinidoModel;
    constructor(preDefinidoModel: Model<PreDefinidoDocument>);
    onModuleInit(): Promise<void>;
    private seedDatabase;
    getDietaPorObjetivo(objetivo: string): Promise<PreDefinido[]>;
}
