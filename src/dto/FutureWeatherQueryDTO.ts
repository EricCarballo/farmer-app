import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FutureWeatherQueryDTO {
  @ApiProperty({
    description:
      'Ubicación para la consulta meteorológica. Puede ser un código postal de EE. UU., un nombre de ciudad o coordenadas geográficas.',
    type: String,
  })
  @IsString()
  q: string;

  @ApiPropertyOptional({
    description:
      'Fecha específica para la consulta en formato yyyy-MM-dd. Debe estar entre la fecha actual y los próximos 14 días.',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsString()
  dt?: string;

  @ApiPropertyOptional({
    description:
      'Código de idioma para la respuesta. Permite obtener la descripción de las condiciones meteorológicas en el idioma deseado.',
    type: String,
  })
  @IsOptional()
  @IsString()
  lang?: string;
}
