import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { Condition } from './Condition';
import { ApiProperty } from '@nestjs/swagger';

export class Day {
  @ApiProperty()
  @IsNumber()
  maxtemp_c: number;

  @ApiProperty()
  @IsNumber()
  maxtemp_f: number;

  @ApiProperty()
  @IsNumber()
  mintemp_c: number;

  @ApiProperty()
  @IsNumber()
  mintemp_f: number;

  @ApiProperty()
  @IsNumber()
  avgtemp_c: number;

  @ApiProperty()
  @IsNumber()
  avgtemp_f: number;

  @ApiProperty()
  @IsNumber()
  maxwind_mph: number;

  @ApiProperty()
  @IsNumber()
  maxwind_kph: number;

  @ApiProperty()
  @IsNumber()
  totalprecip_mm: number;

  @ApiProperty()
  @IsNumber()
  totalprecip_in: number;

  @ApiProperty()
  @IsNumber()
  totalsnow_cm: number;

  @ApiProperty()
  @IsNumber()
  avgvis_km: number;

  @ApiProperty()
  @IsNumber()
  avgvis_miles: number;

  @ApiProperty()
  @IsNumber()
  avghumidity: number;

  @ApiProperty()
  @IsNumber()
  daily_will_it_rain: number;

  @ApiProperty()
  @IsNumber()
  daily_chance_of_rain: number;

  @ApiProperty()
  @IsNumber()
  daily_will_it_snow: number;

  @ApiProperty()
  @IsNumber()
  daily_chance_of_snow: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Condition)
  condition: Condition;

  @ApiProperty()
  @IsNumber()
  uv: number;
}
