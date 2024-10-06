import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { Forecastday } from "./ForecastDay";
import { ApiProperty } from "@nestjs/swagger";

export class Forecast {
    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Forecastday)
    forecastday: Forecastday[];
}