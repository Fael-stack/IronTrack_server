import { IsString, IsNotEmpty, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateTreinadorDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsString()
  @IsOptional()
  especialidade?: string;

  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber(null, { message: 'Telefone inválido' })
  telefone?: string;
}