import { ApiProperty } from "@nestjs/swagger";

export class CurrentWeatherResponseDTO {
    @ApiProperty()
    temperature: number;
  
    @ApiProperty()
    condition: string;
  
    @ApiProperty()
    humidity: number;
  
    // Agrega más propiedades según sea necesario
  }