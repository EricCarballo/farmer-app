import { Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { ForecastWeatherQueryDTO } from 'src/dto/ForecastWeatherQueryDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Analysis')
@Controller('analisis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('')
  @ApiOperation({
    summary: 'Obtener análisis climático y recomendaciones para un cultivo',
    description:
      'Obtiene el pronóstico del clima y pasa los datos a Gemini para generar un análisis con recomendaciones específicas para el cultivo proporcionado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pronóstico del clima obtenido exitosamente.',
    //type: RespuestaDTO,
  })
  async getAnalysisWeather(
    @Query() query: ForecastWeatherQueryDTO,
    @Query('cultivo') tipoCultivo: string,
  ) {
    return await this.analysisService.getAnalysisWeather(query, tipoCultivo);
  }
}
