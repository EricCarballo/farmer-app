import { Controller, Get, Query } from '@nestjs/common';
import { WeatherQueryDto } from 'src/dto/WeatherQueryDto';
import { WeatherAPIService } from 'src/providers/weatherAPI/http.service';

@Controller('apis-controller')
export class ApisController {
  constructor(private readonly weatherService: WeatherAPIService) {}

  @Get('current')
  public async getCurrentWeather(@Query() query: WeatherQueryDto) {
    return await this.weatherService.getCurrentWeather(query);
  }

  @Get('forecast')
  public async getForecastWeather(@Query() query: WeatherQueryDto) {
    return await this.weatherService.getForecastWeather(query);
  }

  @Get('future')
  public async getFutureWeather(@Query() query: WeatherQueryDto) {
    return await this.weatherService.getFutureWeather(query);
  }
}
