import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentWeatherQueryDTO } from 'src/dto/CurrentWeatherQueryDTO';
import { ForecastWeatherQueryDTO } from 'src/dto/ForecastWeatherQueryDTO';
import { FutureWeatherQueryDTO } from 'src/dto/FutureWeatherQueryDTO';
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
  public async getCurrentWeather(@Query() query: CurrentWeatherQueryDTO) {
    return await this.weatherService.getCurrentWeather(query);
  }

  @Get('forecast')
  @ApiOperation({
    summary: 'Obtener el pronóstico del clima',
    description:
      'Obtiene el pronóstico meteorológico basado en los días solicitados y otros parámetros del query.',
  })
  public async getForecastWeather(@Query() query: ForecastWeatherQueryDTO) {
    return await this.weatherService.getForecastWeather(query);
  }

  @Get('future')
  @ApiOperation({
    summary: 'Obtener el clima futuro',
    description:
      'Obtiene la predicción del clima para una fecha futura especificada en el query.',
  })
  public async getFutureWeather(@Query() query: FutureWeatherQueryDTO) {
    return await this.weatherService.getFutureWeather(query);
  }
}
