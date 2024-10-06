import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition } from './enum/Condition';

export class HourlyForecastDTO {
  @ApiProperty({
    description: 'Hora del pronóstico horario en formato HH:mm.',
    type: String,
  })
  time: string;

  @ApiProperty({
    description: 'Temperatura en la hora especificada.',
    type: Number,
  })
  temp: number;

  @ApiProperty({
    description: 'Condición meteorológica en la hora especificada.',
    enum: Condition, // Enum para las condiciones meteorológicas
  })
  condition: Condition;

  @ApiProperty({
    description: 'Probabilidad de lluvia en porcentaje.',
    type: Number,
  })
  chanceOfRain: number;
}