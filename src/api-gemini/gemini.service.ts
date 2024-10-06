import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private genAI: any;
  private genAiProModel: any;
  constructor(private readonly configService: ConfigService) {
    // Access your API key as an environment variable (see "Set up your API key" above)
    this.genAI = new GoogleGenerativeAI(
      this.configService.get('GEMINI_API_KEY'),
    );

    // The Gemini 1.5 models are versatile and work with most use cases
    this.genAiProModel = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  getHello() {
    return this.configService.get('GEMINI_API_KEY');
  }

  async getPromptResponse(prompt: string): Promise<string> {
    const result = await this.genAiProModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }
}
