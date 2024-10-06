import { Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { fileToGenerativePart } from 'src/utils/functions';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private genAiFlashModel: GenerativeModel;
  constructor(private readonly configService: ConfigService) {
    // Access your API key as an environment variable (see "Set up your API key" above)
    this.genAI = new GoogleGenerativeAI(
      this.configService.get('GEMINI_API_KEY'),
    );

    // The Gemini 1.5 models are versatile and work with most use cases
    this.genAiFlashModel = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
  }

  async getPromptResponse(prompt: string): Promise<string> {
    const result = await this.genAiFlashModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }

  async getPromptWithImageResponse(
    images: Array<Express.Multer.File>,
    prompt: string,
  ): Promise<string> {
    try {
      const imageParts = await Promise.all(
        images.map((image) => fileToGenerativePart(image.path, image.mimetype)),
      );

      const result = await this.genAiFlashModel.generateContent([
        prompt,
        ...imageParts,
      ]);

      const response = result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error('Error detallado:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        errorDetails: error.errorDetails,
      });
      throw new Error(
        `Error al procesar la solicitud de Gemini: ${error.message}`,
      );
    }
  }
}
