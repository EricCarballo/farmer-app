import { ApiProperty } from "@nestjs/swagger";

export class FutureWeatherResponseDTO {
    @ApiProperty()
    predictedTemperature: number;
  
    @ApiProperty()
    predictedCondition: string;
  
    // Agrega más propiedades según sea necesario
  }