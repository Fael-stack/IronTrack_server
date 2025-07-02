import { ExercicioService } from "./exercicio.service";
import { CreateExercicioDto } from "./dto/create-exercicio.dto";
import { UpdateExercicioDto } from "./dto/update-exercicio.dto";
import { EncryptService } from "src/utils/encrypt/encrypt.service";
export declare class ExercicioController {
    private readonly exercicioService;
    private readonly encryptService;
    constructor(exercicioService: ExercicioService, encryptService: EncryptService);
    create(createExercicioDto: CreateExercicioDto): Promise<import("./schema/exercicio.schema").Exercicio>;
    findAll(): Promise<import("./schema/exercicio.schema").Exercicio[]>;
    findOne(id: string): Promise<import("./schema/exercicio.schema").Exercicio>;
    update(id: string, updateExercicioDto: UpdateExercicioDto): Promise<import("./schema/exercicio.schema").Exercicio>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
