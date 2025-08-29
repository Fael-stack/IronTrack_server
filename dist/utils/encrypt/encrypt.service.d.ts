export declare class EncryptService {
    private readonly saltRounds;
    encrypt(password: string): Promise<string>;
    comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>;
    createUser(senha: string, confirmarSenha: string): Promise<{
        mensagem: string;
        senhaCriptografada: string;
    }>;
}
