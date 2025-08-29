import { PartialType } from "@nestjs/mapped-types";
import { CreateTreinadorDto } from "./create-treinador.dto";

export class UpdateTreinadorDto extends PartialType(CreateTreinadorDto) {}
