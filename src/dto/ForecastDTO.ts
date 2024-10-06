import { ApiProperty } from "@nestjs/swagger";
import { HourlyForecastDTO } from "./HourlyForecastDTO";
import { Condition } from "./enum/Condition";

export class ForecastDTO {
    @ApiProperty({
      description: 'Fecha del pronóstico.',
      type: String, // Puedes cambiar esto a Date si lo prefieres
    })
    date: string; // Asegúrate de que sea un string en formato ISO
  
    @ApiProperty({
      description: 'Temperatura máxima esperada.',
      type: Number,
    })
    maxTemp: number;
  
    @ApiProperty({
      description: 'Temperatura mínima esperada.',
      type: Number,
    })
    minTemp: number;
  
    @ApiProperty({
      description: 'Temperatura promedio esperada.',
      type: Number,
    })
    avgTemp: number;
  
    @ApiProperty({
      description: 'Velocidad máxima del viento en km/h.',
      type: Number,
    })
    maxWind: number;
  
    @ApiProperty({
      description: 'Precipitación total esperada en mm.',
      type: Number,
    })
    totalPrecip: number;
  
    @ApiProperty({
      description: 'Humedad promedio en porcentaje.',
      type: Number,
    })
    avgHumidity: number;
  
    @ApiProperty({
      description: 'Condición meteorológica del día.',
      enum: Condition,
    })
    condition: Condition;
  
    @ApiProperty({
      description: 'Hora del amanecer.',
      type: String,
    })
    sunrise: string;
  
    @ApiProperty({
      description: 'Hora del atardecer.',
      type: String,
    })
    sunset: string;
  
    @ApiProperty({
      description: 'Pronóstico horario para el día.',
      type: [HourlyForecastDTO],
    })
    hourlyForecast: HourlyForecastDTO[];
  }