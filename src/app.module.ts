import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AlimentoModule } from './modules/alimento/alimento.module';
import { DietaModule } from './modules/dieta/dieta.module';
import { AuthModule } from './modules/auth-login/auth.module';
import { ExercicioModule } from './modules/exercicio/exercicio.module';
import { TreinadorModule } from './modules/treinador/treinador.module';
import { TreinoModule } from './modules/treino/treino.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 🔧 Torna disponível para todos os módulos

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    AlimentoModule,
    DietaModule,
    AuthModule,
    ExercicioModule,
    TreinadorModule,
    TreinoModule,
    UserModule,
  ],
})
export class AppModule {}
