import { CreateTreinadorDto } from "./dto/create-treinador.dto";
import { UpdateTreinadorDto } from "./dto/update-treinador.dto";
import { Treinador, TreinadorDocument } from "./schema/treinador.schema";
import { Model } from "mongoose";
export declare class TreinadorService {
    private readonly treinadorModel;
    constructor(treinadorModel: Model<TreinadorDocument>);
    create(createTreinadorDto: CreateTreinadorDto): Promise<Treinador>;
    findAll(): Promise<Treinador[]>;
    findOne(id: string): Promise<Treinador>;
    update(id: string, updateTreinadorDto: UpdateTreinadorDto): Promise<Treinador>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
