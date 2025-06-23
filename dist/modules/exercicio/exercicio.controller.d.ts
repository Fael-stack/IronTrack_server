import { ExercicioService } from "./exercicio.service";
import { CreateExercicioDto } from "./dto/create-exercicio.dto";
import { UpdateExercicioDto } from "./dto/update-exercicio.dto";
export declare class ExercicioController {
    private readonly exercicioService;
    constructor(exercicioService: ExercicioService);
    create(createExercicioDto: CreateExercicioDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateExercicioDto: UpdateExercicioDto): string;
    remove(id: string): string;
}
