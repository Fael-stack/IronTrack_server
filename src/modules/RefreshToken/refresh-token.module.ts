// src/modules/RefreshToken/refresh-token.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './RefreshToken.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
  ],
  exports: [
    MongooseModule, // exporta para permitir injeção em outros módulos
  ],
})
export class RefreshTokenModule {}
