import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Location {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lon: number;

  @ApiProperty()
  @IsString()
  tz_id: string;

  @ApiProperty()
  @IsNumber()
  localtime_epoch: number;

  @ApiProperty()
  @IsString()
  localtime: string;
}
