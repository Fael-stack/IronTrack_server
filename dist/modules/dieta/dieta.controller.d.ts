import { DietaService } from "./dieta.service";
import { CreateDietaDto } from "./dto/create-dieta.dto";
import { UpdateDietaDto } from "./dto/update-dieta.dto";
export declare class DietaController {
    private readonly dietaService;
    constructor(dietaService: DietaService);
    create(createDietaDto: CreateDietaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDietaDto: UpdateDietaDto): string;
    remove(id: string): string;
}
