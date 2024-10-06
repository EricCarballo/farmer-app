import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { ApiGeminiModule } from 'src/api-gemini/api-gemini.module';

@Module({
  providers: [AnalysisService],
  controllers: [AnalysisController],
  imports: [ProvidersModule, ApiGeminiModule]
})
export class WeatherAnalysisModule {}
