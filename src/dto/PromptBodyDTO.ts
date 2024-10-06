import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PromptBodyDTO {
  @ApiProperty({
    description: 'Prompt para gemini',
    type: String,
  })
  @IsString()
  prompt: string;
}
