import {IsString, IsNotEmpty, IsOptional, IsMongoId, IsArray, ArrayNotEmpty,} from 'class-validator';

export class CreateDietaDto {
    
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsString()
  @IsOptional()
  objetivo?: string;

  @IsMongoId({ message: 'ID de usuário inválido' })
  usuari!: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'A lista de alimentos não pode estar vazia' })
  @IsMongoId({ each: true, message: 'ID de alimento inválido' })
  alimentos!: string[];
}
