import { ApiProperty } from '@nestjs/swagger';
import { Current } from './Current';
import { Location } from './Location';

export class CurrentWeatherResponseDTO {
  @ApiProperty()
  location: Location;

  @ApiProperty()
  current: Current;
}
