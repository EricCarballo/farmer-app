import { Controller, Get, Query } from '@nestjs/common';
import { WeatherQueryDto } from 'src/dto/WeatherQueryDto';
import { WeatherAPIService } from 'src/providers/weatherAPI/http.service';

@Controller('apis-controller')
export class ApisController {
  constructor(private readonly weatherService: WeatherAPIService) {}

  @Get('current')
  public async getCurrentWeather(
    @Query('q') q: string,
    @Query('lang') lang?: string,
  ) {
    return await this.weatherService.getCurrentWeather(q, lang);
  }

  @Get('forecast')
  public async getForecastWeather(@Query() query: WeatherQueryDto) {
    return await this.weatherService.getForecastWeather(query);
  }

  @Get('future')
  public async getFutureWeather(
    @Query('q') q: string,
    @Query('lang') lang?: string,
  ) {
    return await this.weatherService.getFutureWeather(q, lang);
  }
}
