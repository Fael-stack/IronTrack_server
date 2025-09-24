import { Model } from 'mongoose';
import { Treino, TreinoDocument } from './schema/treino.schema';
import { CreateTreinoDto } from './dto/create-treino.dto';
export declare class TreinoService {
    private treinoModel;
    constructor(treinoModel: Model<TreinoDocument>);
    create(createTreinoDto: CreateTreinoDto): Promise<Treino>;
    findAll(): Promise<Treino[]>;
    findOne(id: string): Promise<Treino | null>;
}
