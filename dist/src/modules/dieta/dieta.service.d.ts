import { CreateDietaDto } from "./dto/create-dieta.dto";
import { UpdateDietaDto } from "./dto/update-dieta.dto";
import { Dieta, DietaDocument } from "./schema/dieta.schema";
import { Model } from "mongoose";
export declare class DietaService {
    private readonly dietaModel;
    constructor(dietaModel: Model<DietaDocument>);
    create(createDietaDto: CreateDietaDto): Promise<Dieta>;
    findAll(): string;
    findOne(id: string): Promise<Dieta>;
    update(id: string, updateDietaDto: UpdateDietaDto): Promise<Dieta>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
