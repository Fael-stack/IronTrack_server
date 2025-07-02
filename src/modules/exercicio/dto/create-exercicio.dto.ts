import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, ValidateIf } from 'class-validator';

export class CreateExercicioDto {
  
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  grupoMuscular?: string;

  @ValidateIf(o => o.duracaoMinutos !== undefined)  // só valida se duracaoMinutos estiver presente
  @IsNumber({}, { message: 'Duração deve ser um número' })
  @Min(1, { message: 'Duração mínima é 1 minuto' })
  duracaoMinutos?: number;
}