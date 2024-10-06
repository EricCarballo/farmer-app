import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ErrorManager } from 'src/utils/error.mangaer';
import { WeatherRequestBuilder } from 'src/builders/WeatherRequestBuilder';
import apiConfig from '../../config/apiConfig.json';
import { WeatherQueryDto } from 'src/dto/WeatherQueryDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherAPIService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async getCurrentWeather(q: string, lang?: string) {
    try {
      const builder = new WeatherRequestBuilder(q).setLang(lang);
      const params = builder.build();
      const url = `${apiConfig.apiWeather.baseUrl}${apiConfig.apiWeather.currentWeather}?${params}&key=${this.configService.get('WEATHER_API_KEY')}`;
      console.log(url);
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getForecastWeather(query: WeatherQueryDto) {
    try {
      const builder = new WeatherRequestBuilder(query.q)
        .setDays(query?.days)
        .setDt(query?.dt)
        .setUnixDt(query?.unixdt)
        .setHour(query.hour)
        .setLang(query.lang)
        .setAlerts(query?.alerts)
        .setAqi(query?.aqi)
        .setTp(query?.tp);
      const params = builder.build();
      const url = `${apiConfig.apiWeather.baseUrl}${apiConfig.apiWeather.forecastWeather}?${params}&key=${this.configService.get('WEATHER_API_KEY')}`;

      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getFutureWeather(q: string, dt?: string, lang?: string) {
    try {
      const builder = new WeatherRequestBuilder(q).setDt(dt).setLang(lang);
      const params = builder.build();
      const url = `${apiConfig.apiWeather.baseUrl}${apiConfig.apiWeather.futureWeather}?${params}&key=${this.configService.get('WEATHER_API_KEY')}`;

      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
