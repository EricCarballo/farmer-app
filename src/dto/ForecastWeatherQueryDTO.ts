import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ForecastWeatherQueryDTO {
  @ApiProperty({
    description: 'Ubicación para la consulta meteorológica. Puede ser un código postal de EE. UU., un nombre de ciudad o coordenadas geográficas.',
    type: String,
  })
  @IsString()
  q: string;

  @ApiProperty({
    description: 'Número de días para el pronóstico meteorológico. El valor debe estar entre 1 y 14.',
    type: Number,
    minimum: 1,
    maximum: 14,
  })
  @IsNumber()
  days: number;

  @ApiPropertyOptional({
    description: 'Fecha específica para la consulta en formato yyyy-MM-dd. Debe estar entre la fecha actual y los próximos 14 días.',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsString()
  dt?: string;

  @ApiPropertyOptional({
    description: 'Fecha y hora en formato Unix para la consulta. Debe corresponder a una fecha entre hoy y los próximos 14 días.',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  unixdt?: number;

  @ApiPropertyOptional({
    description: 'Hora específica para la consulta (en formato 24 horas). Por ejemplo, para las 5 p.m., se debe indicar hour=17.',
    type: Number,
    minimum: 0,
    maximum: 23,
  })
  @IsOptional()
  @IsNumber()
  hour?: number;

  @ApiPropertyOptional({
    description: 'Código de idioma para la respuesta. Permite obtener la descripción de las condiciones meteorológicas en el idioma deseado.',
    type: String,
  })
  @IsOptional()
  @IsString()
  lang?: string;

  @ApiPropertyOptional({
    description: 'Indica si se deben incluir alertas meteorológicas en la respuesta. Valores posibles: "yes" o "no".',
    type: String,
    enum: ['yes', 'no'],
  })
  @IsOptional()
  @IsString()
  alerts?: string;

  @ApiPropertyOptional({
    description: 'Indica si se deben incluir datos de calidad del aire en la respuesta. Valores posibles: "yes" o "no".',
    type: String,
    enum: ['yes', 'no'],
  })
  @IsOptional()
  @IsString()
  aqi?: string;

  @ApiPropertyOptional({
    description: 'Intervalo de tiempo para los datos del pronóstico. Por ejemplo, tp=15 para intervalos de 15 minutos. Disponible solo para clientes Enterprise.',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  tp?: number;
}
