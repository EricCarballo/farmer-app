import { Global, Module } from '@nestjs/common';
import { WeatherAPIService } from './weatherAPI/http.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [WeatherAPIService],
  exports: [WeatherAPIService]
})
export class ProvidersModule {}
