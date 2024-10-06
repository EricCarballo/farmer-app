import { ApiProperty } from "@nestjs/swagger";
import { CurrentWeatherResponseDTO } from "./CurrentWeatherResponseDTO";

export class ForecastWeatherResponseDTO {
    @ApiProperty({ type: [CurrentWeatherResponseDTO] })
    dailyForecasts: CurrentWeatherResponseDTO[];
  
    // Agrega más propiedades según sea necesario
  }