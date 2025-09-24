import { PartialType } from '@nestjs/mapped-types';
import { CreateTreinoDto } from './create-treino.dto';

export class UpdateTreinoDto extends PartialType(CreateTreinoDto) {}
