import { CreateAlimentoDto } from "./dto/create-alimento.dto";
import { UpdateAlimentoDto } from "./dto/update-alimento.dto";
import { Alimento, AlimentoDocument } from "./schema/alimento.schema";
import { Model } from "mongoose";
export declare class AlimentoService {
    private readonly alimentoModel;
    constructor(alimentoModel: Model<AlimentoDocument>);
    create(createAlimentoDto: CreateAlimentoDto): Promise<Alimento>;
    findAll(): Promise<Alimento[]>;
    findOne(id: string): Promise<Alimento>;
    update(id: string, updateAlimentoDto: UpdateAlimentoDto): Promise<Alimento>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
