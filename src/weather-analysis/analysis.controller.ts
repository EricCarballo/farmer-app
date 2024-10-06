import { Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { WeatherQueryDto } from 'src/dto/WeatherQueryDto';

@Controller('analisis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('')
  async getAnalysisWeather(@Query() query: WeatherQueryDto, @Query("cultivo") tipoCultivo:string) {
    return await this.analysisService.getAnalysisWeather(query, tipoCultivo);
  }
}
