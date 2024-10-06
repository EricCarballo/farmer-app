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
import { PromptBody } from 'src/dto/PromptBodyDTO';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, validateImageFile } from 'src/utils/functions';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @HttpCode(HttpStatus.OK)
  @Post('prompt')
  getPromptResponse(@Body() body: PromptBody) {
    return this.geminiService.getPromptResponse(body.prompt);
  }

  @HttpCode(HttpStatus.OK)
  @Post('prompt-with-image')
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
    @Body() body: PromptBody,
  ) {
    return this.geminiService.getPromptWithImageResponse(images, body.prompt);
  }
}
