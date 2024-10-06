import { IsString } from "class-validator";

export class PromptBody {
  @IsString()
  prompt: string;
}
