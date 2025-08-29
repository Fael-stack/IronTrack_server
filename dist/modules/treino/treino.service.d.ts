import { CreateTreinoDto } from "./dto/create-treino.dto";
import { UpdateTreinoDto } from "./dto/update-treino.dto";
import { Treino, TreinoDocument } from "./schema/treino.schema";
import { Model } from "mongoose";
export declare class TreinoService {
    private readonly treinoModel;
    constructor(treinoModel: Model<TreinoDocument>);
    create(createTreinoDto: CreateTreinoDto): Promise<Treino>;
    findAll(): Promise<Treino[]>;
    findOne(id: string): Promise<Treino>;
    update(id: string, updateTreinoDto: UpdateTreinoDto): Promise<Treino>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
