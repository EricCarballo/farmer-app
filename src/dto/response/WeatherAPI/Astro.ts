import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Astro {
  @ApiProperty()
  @IsString()
  sunrise: string;

  @ApiProperty()
  @IsString()
  sunset: string;

  @ApiProperty()
  @IsString()
  moonrise: string;

  @ApiProperty()
  @IsString()
  moonset: string;

  @ApiProperty()
  @IsString()
  moon_phase: string;

  @ApiProperty()
  @IsNumber()
  moon_illumination: number;

  @ApiProperty()
  @IsNumber()
  is_moon_up: number;

  @ApiProperty()
  @IsNumber()
  is_sun_up: number;
}
