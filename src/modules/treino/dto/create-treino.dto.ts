import { IsString, IsNotEmpty, IsMongoId, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateTreinoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsString()
  objetivo?: string;

  @IsMongoId({ message: 'ID de usuário inválido' })
  usuario!: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'A lista de exercícios não pode estar vazia' })
  @IsMongoId({ each: true, message: 'ID de exercício inválido' })
  exercicios!: string[];
}