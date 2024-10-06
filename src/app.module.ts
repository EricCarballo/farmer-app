import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ApisController } from './apis-controller/apis-controller.controller';
import { ProvidersModule } from './providers/providers.module';
import { ApiGeminiModule } from './api-gemini/api-gemini.module';
import { WeatherAnalysisModule } from './weather-analysis/weather-analysis.module';

@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MulterModule.register({ //Configuracion Global
    //   dest: './upload', // Esta es la carpeta donde se guardarán los archivos
    // }),
    ProvidersModule,
    ApiGeminiModule,
    WeatherAnalysisModule,
  ],
  controllers: [ApisController],
})
export class AppModule {}
