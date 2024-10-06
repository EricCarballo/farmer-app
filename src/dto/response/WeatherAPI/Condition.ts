import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class Condition {
    @ApiProperty()
    @IsString()
    text: string;

    @ApiProperty()
    @IsString()
    icon: string;

    @ApiProperty()
    @IsNumber()
    code: number;
}