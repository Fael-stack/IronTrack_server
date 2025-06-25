import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateTreinadorDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsString()
  especialidade?: string;

  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsString()
  @IsPhoneNumber('BR', { message: 'Telefone inválido' })
  telefone?: string;
}