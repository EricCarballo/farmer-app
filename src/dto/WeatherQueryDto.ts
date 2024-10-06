import { IsOptional, IsString, IsNumber } from 'class-validator';

export class WeatherQueryDto {
  @IsString()
  q: string;

  @IsNumber()
  days: number;

  @IsOptional()
  @IsString()
  dt?: string;

  @IsOptional()
  @IsString()
  unixdt?: string;

  @IsOptional()
  @IsNumber()
  hour?: number;

  @IsOptional()
  @IsString()
  lang?: string;

  @IsOptional()
  @IsString()
  alerts?: string;

  @IsOptional()
  @IsString()
  aqi?: string;

  @IsOptional()
  @IsNumber()
  tp?: number;
}
