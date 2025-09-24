import { CreateExercicioDto } from "./dto/create-exercicio.dto";
import { UpdateExercicioDto } from "./dto/update-exercicio.dto";
import { Exercicio, ExercicioDocument } from "./schema/exercicio.schema";
import { Model } from "mongoose";
export declare class ExercicioService {
    private readonly exercicioModel;
    constructor(exercicioModel: Model<ExercicioDocument>);
    create(createExercicioDto: CreateExercicioDto): Promise<Exercicio>;
    findAll(): Promise<Exercicio[]>;
    findOne(id: string): Promise<Exercicio>;
    update(id: string, updateExercicioDto: UpdateExercicioDto): Promise<Exercicio>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
