import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ApisController } from './apis-controller/apis-controller.controller';
import { ProvidersModule } from './providers/providers.module';
import { ApiGeminiModule } from './api-gemini/api-gemini.module';


@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: 'upload',
    }),
    ProvidersModule,
    ApiGeminiModule,
  ],
  controllers: [ApisController],
})
export class AppModule {}
