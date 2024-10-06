import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class PromptBodyWithImagesDTO {
  @ApiProperty({
    description: 'Prompt para gemini',
    type: String,
  })
  @IsString()
  prompt: string;

  @ApiProperty({
    description: 'Lista de imágenes como archivos',
    type: 'string',
    format: 'binary',
  })
  @IsArray()
  images: Express.Multer.File[];
}
