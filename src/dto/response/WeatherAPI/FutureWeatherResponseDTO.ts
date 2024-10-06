import { ApiProperty } from '@nestjs/swagger';
import { Forecast } from './Forecast';
import { Location } from './Location';

export class FutureWeatherResponseDTO {
  @ApiProperty()
  location: Location;

  @ApiProperty()
  forecast: Forecast;
}
