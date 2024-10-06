import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Current } from './Current';
import { Astro } from './Astro';
import { Day } from './Day';
import { ApiProperty } from '@nestjs/swagger';

export class Forecastday {
  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsNumber()
  date_epoch: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Day)
  day: Day;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Astro)
  astro: Astro;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Current)
  hour: Current[];
}
