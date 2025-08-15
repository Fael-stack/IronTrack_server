import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs'; 

@Injectable()
export class EncryptService {
  private readonly saltRounds = 10;

  async encrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword); // ✅ agora com await
  }

  async createUser(senha: string, confirmarSenha: string): Promise<{ mensagem: string; senhaCriptografada: string }> {
    if (senha !== confirmarSenha) {
      throw new Error('As senhas não coincidem!');
    }

    const hashedPassword = await this.encrypt(senha);

    return { mensagem: 'Usuário criado com sucesso!', senhaCriptografada: hashedPassword };
  }
}
