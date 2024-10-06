import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentWeatherQueryDTO } from 'src/dto/CurrentWeatherQueryDTO';
import { ForecastWeatherQueryDTO } from 'src/dto/ForecastWeatherQueryDTO';
import { FutureWeatherQueryDTO } from 'src/dto/FutureWeatherQueryDTO';
import { CurrentWeatherResponseDTO } from 'src/dto/response/WeatherAPI/CurrentWeatherResponseDTO';
import { ForecastWeatherResponseDTO } from 'src/dto/response/WeatherAPI/ForecastWeatherResponseDTO';
import { FutureWeatherResponseDTO } from 'src/dto/response/WeatherAPI/FutureWeatherResponseDTO';
import { WeatherAPIService } from 'src/providers/weatherAPI/http.service';

@ApiTags('API-Weather')
@Controller('apis-controller')
export class ApisController {
  constructor(private readonly weatherService: WeatherAPIService) {}

  @Get('current')
  @ApiOperation({
    summary: 'Obtener el clima actual',
    description:
      'Obtiene el clima actual basado en el query proporcionado, como ciudad o coordenadas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Clima actual obtenido exitosamente.',
    type: CurrentWeatherResponseDTO,
  })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  public async getCurrentWeather(@Query() query: CurrentWeatherQueryDTO) {
    return await this.weatherService.getCurrentWeather(query);
  }

  @Get('forecast')
  @ApiOperation({
    summary: 'Obtener el pronóstico del clima',
    description:
      'Obtiene el pronóstico meteorológico basado en los días solicitados y otros parámetros del query.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pronóstico del clima obtenido exitosamente.',
    type: ForecastWeatherResponseDTO,
  })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  public async getForecastWeather(@Query() query: ForecastWeatherQueryDTO) {
    return await this.weatherService.getForecastWeather(query);
  }

  @Get('future')
  @ApiOperation({
    summary: 'Obtener el clima futuro',
    description:
      'Obtiene la predicción del clima para una fecha futura especificada en el query.',
  })
  @ApiResponse({
    status: 200,
    description: 'Predicción del clima futuro obtenida exitosamente.',
    type: FutureWeatherResponseDTO,
  })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  public async getFutureWeather(@Query() query: FutureWeatherQueryDTO) {
    return await this.weatherService.getFutureWeather(query);
  }
}
