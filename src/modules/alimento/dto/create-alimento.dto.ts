import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateAlimentoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsNumber({}, { message: 'Calorias deve ser um número' })
  @Min(0, { message: 'Calorias não pode ser negativa' })
  calorias!: number;

  @IsNumber({}, { message: 'Proteínas deve ser um número' })
  @Min(0, { message: 'Proteínas não pode ser negativa' })
  proteinas!: number;

  @IsNumber({}, { message: 'Carboidratos deve ser um número' })
  @Min(0, { message: 'Carboidratos não pode ser negativo' })
  carboidratos!: number;

  @IsNumber({}, { message: 'Gorduras deve ser um número' })
  @Min(0, { message: 'Gorduras não pode ser negativa' })
  gorduras!: number;
}