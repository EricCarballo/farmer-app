import { Request } from 'express';
import * as fs from 'fs';

export function editFileName(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) {
  const originalFileName = file.originalname;
  callback(null, originalFileName);
}

export function validateImageFile(
  req: Request,
  file: Express.Multer.File,
  callback: any,
) {
  const originalFileName = file.originalname;
  if (!originalFileName.match(/\.(jpg|png|jpeg|gif)$/)) {
    return callback(new Error('Not a valid image'), false);
  }
  callback(null, originalFileName);
}

export async function fileToGenerativePart(path: string, mimeType: string) {
  try {
    const fileData = await fs.promises.readFile(path);
    return {
      inlineData: {
        data: fileData.toString('base64'),
        mimeType,
      },
    };
  } catch (error) {
    console.error(`Error al procesar el archivo ${path}:`, error);
    throw new Error(`Error al procesar el archivo: ${error.message}`);
  }
}
