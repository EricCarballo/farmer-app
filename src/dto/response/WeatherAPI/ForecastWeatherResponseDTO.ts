import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Location } from './Location';
import { Current } from './Current';
import { Forecast } from './Forecast';
import { ApiProperty } from '@nestjs/swagger';

export class ForecastWeatherResponseDTO {
  @ApiProperty()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Current)
  current: Current;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Forecast)
  forecast: Forecast;
}
