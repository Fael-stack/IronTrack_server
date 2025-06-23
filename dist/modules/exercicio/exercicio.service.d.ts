import { CreateExercicioDto } from "./dto/create-exercicio.dto";
import { UpdateExercicioDto } from "./dto/update-exercicio.dto";
export declare class ExercicioService {
    create(createExercicioDto: CreateExercicioDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateExercicioDto: UpdateExercicioDto): string;
    remove(id: number): string;
}
