import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // 1. Mova a configuração do ValidationPipe para cá
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Remove campos que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro se campos extras forem enviados
      transform: true,            // Transforma os dados de entrada para o tipo do DTO
    }),
  );

  // 2. Mova a configuração do Swagger para cá
  const config = new DocumentBuilder()
    .setTitle('IronTrack API')
    .setDescription('Documentação completa da API do servidor IronTrack')
    .setVersion('1.0')
    .addTag('Treinos', 'Endpoints relacionados a planos de treino')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // 3. A inicialização do servidor deve ser a última coisa
  await app.listen(process.env.PORT ?? 4000);
}

// 4. A chamada da função permanece no final
void bootstrap();