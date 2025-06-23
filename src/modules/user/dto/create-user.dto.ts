import { IsString, IsNotEmpty, MinLength, Validate, } from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsString()
    @MinLength(5)
    senha!: string;

    @IsString()
    @Validate(Match, ['senha'], {
        message: 'As senhas não batem :('
    })
    confirmarSenha!: string;

    @IsString()
    email!: string;


    @IsString()
    usuario!: string;

   
}