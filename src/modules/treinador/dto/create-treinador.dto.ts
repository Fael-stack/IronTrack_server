import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateTreinadorDto {
  @IsString()
  @IsNotEmpty({ message: 'O código é obrigatório' })
  codigo!: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsString()
  @IsOptional()
  especialidade?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR', { message: 'Telefone inválido' })
  telefone?: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha!: string;
}