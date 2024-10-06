import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Condition } from './Condition';
import { ApiProperty } from '@nestjs/swagger';

export class Current {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  last_updated_epoch?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  last_updated?: string;

  @ApiProperty()
  @IsNumber()
  temp_c: number;

  @ApiProperty()
  @IsNumber()
  temp_f: number;

  @ApiProperty()
  @IsNumber()
  is_day: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Condition)
  condition: Condition;

  @ApiProperty()
  @IsNumber()
  wind_mph: number;

  @ApiProperty()
  @IsNumber()
  wind_kph: number;

  @ApiProperty()
  @IsNumber()
  wind_degree: number;

  @ApiProperty()
  @IsString()
  wind_dir: string;

  @ApiProperty()
  @IsNumber()
  pressure_mb: number;

  @ApiProperty()
  @IsNumber()
  pressure_in: number;

  @ApiProperty()
  @IsNumber()
  precip_mm: number;

  @ApiProperty()
  @IsNumber()
  precip_in: number;

  @ApiProperty()
  @IsNumber()
  humidity: number;

  @ApiProperty()
  @IsNumber()
  cloud: number;

  @ApiProperty()
  @IsNumber()
  feelslike_c: number;

  @ApiProperty()
  @IsNumber()
  feelslike_f: number;

  @ApiProperty()
  @IsNumber()
  windchill_c: number;

  @ApiProperty()
  @IsNumber()
  windchill_f: number;

  @ApiProperty()
  @IsNumber()
  heatindex_c: number;

  @ApiProperty()
  @IsNumber()
  heatindex_f: number;

  @ApiProperty()
  @IsNumber()
  dewpoint_c: number;

  @ApiProperty()
  @IsNumber()
  dewpoint_f: number;

  @ApiProperty()
  @IsNumber()
  vis_km: number;

  @ApiProperty()
  @IsNumber()
  vis_miles: number;

  @ApiProperty()
  @IsNumber()
  uv: number;

  @ApiProperty()
  @IsNumber()
  gust_mph: number;

  @ApiProperty()
  @IsNumber()
  gust_kph: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  time_epoch?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  time?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  snow_cm?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  will_it_rain?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  chance_of_rain?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  will_it_snow?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  chance_of_snow?: number;
}
