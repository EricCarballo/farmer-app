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
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @HttpCode(HttpStatus.OK)
  @Post('prompt')
  getPromptResponse(@Body() body: PromptBody) {
    return this.geminiService.getPromptResponse(body.prompt);
  }

  @UseInterceptors(FilesInterceptor('images', 10))
  @HttpCode(HttpStatus.OK)
  @Post('prompt-with-image')
  getPromptWithImageResponse(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: PromptBody,
  ) {
    console.log(images);
    console.log(body);
    return true;
  }
}
