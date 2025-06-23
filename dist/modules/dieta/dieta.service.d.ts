import { CreateDietaDto } from "./dto/create-dieta.dto";
import { UpdateDietaDto } from "./dto/update-dieta.dto";
export declare class DietaService {
    create(createDietaDto: CreateDietaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDietaDto: UpdateDietaDto): string;
    remove(id: number): string;
}
