import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { PromptBodyDTO } from 'src/dto/PromptBodyDTO';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, validateImageFile } from 'src/utils/functions';
import { PromptBodyWithImagesDTO } from 'src/dto/PromptBodyWithImagesDTO';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('API-Gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @HttpCode(HttpStatus.OK)
  @Post('prompt')
  @ApiOperation({
    summary: 'Obtener respuesta para un prompt',
    description: 'Envía un prompt de texto a Gemini y obtiene una respuesta generada por la IA.',
  })
  getPromptResponse(@Body() body: PromptBodyDTO) {
    return this.geminiService.getPromptResponse(body.prompt);
  }

  @HttpCode(HttpStatus.OK)
  @Post('prompt-with-image')
  @ApiOperation({
    summary: 'Obtener respuesta para un prompt con imágenes',
    description: 'Envía un prompt de texto junto con imágenes para obtener una respuesta generada por la IA.',
  })
  @ApiConsumes('multipart/form-data') // Indica que este endpoint consume multipart/form-data
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      fileFilter: validateImageFile,
      storage: diskStorage({
        destination: 'upload',
        filename: editFileName,
      }),
    }),
  )
  getPromptWithImageResponse(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: PromptBodyWithImagesDTO,
  ) {
    return this.geminiService.getPromptWithImageResponse(images, body.prompt);
  }
}
