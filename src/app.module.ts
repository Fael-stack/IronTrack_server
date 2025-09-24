import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AlimentoModule } from './modules/alimento/alimento.module';
import { DietaModule } from './modules/dieta/dieta.module';
import { AuthModule } from './modules/auth-login/auth.module';
import { ExercicioModule } from './modules/exercicio/exercicio.module';
import { TreinadorModule } from './modules/treinador/treinador.module';
import { TreinoModule } from './modules/treino/treino.module'; // ✅ importar o módulo correto
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/iron_track_server',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    // Seus módulos
    AlimentoModule,
    DietaModule,
    AuthModule,
    ExercicioModule,
    TreinadorModule,
    TreinoModule, // ✅ aqui vai o módulo, não o controller
    UserModule,
  ],
})
export class AppModule {}
