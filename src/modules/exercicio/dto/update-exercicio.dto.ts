import { PartialType } from "@nestjs/mapped-types";
import { CreateExercicioDto } from "./create-exercicio.dto";

export class UpdateExercicioDto extends PartialType(CreateExercicioDto) {}
