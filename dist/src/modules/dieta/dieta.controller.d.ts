import { DietaService } from "./dieta.service";
import { CreateDietaDto } from "./dto/create-dieta.dto";
import { UpdateDietaDto } from "./dto/update-dieta.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
export declare class DietaController {
    private readonly dietaService;
    private readonly encryptService;
    constructor(dietaService: DietaService, encryptService: EncryptService);
    create(createDietaDto: CreateDietaDto): Promise<import("./schema/dieta.schema").Dieta>;
    findAll(): string;
    findOne(id: string): Promise<import("./schema/dieta.schema").Dieta>;
    update(id: string, updateDietaDto: UpdateDietaDto): Promise<import("./schema/dieta.schema").Dieta>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
