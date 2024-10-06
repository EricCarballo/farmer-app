import { ApiProperty } from "@nestjs/swagger";
import { ForecastDTO } from "./ForecastDTO";

export class ProcessDataDTO {
    @ApiProperty({
      description: 'Ubicación para la consulta meteorológica.',
      type: String,
    })
    location: string;
  
    @ApiProperty({
      description: 'Pronósticos para la ubicación.',
      type: [ForecastDTO],
    })
    forecasts: ForecastDTO[];
  }
  
  export class RespuestaDTO {
    @ApiProperty({
      description: 'Respuesta del servicio Gemini.',
      type: String,
    })
    responseGemini: string;
  
    @ApiProperty({
      description: 'Datos del proceso meteorológico.',
      type: ProcessDataDTO,
    })
    processData: ProcessDataDTO;
  }