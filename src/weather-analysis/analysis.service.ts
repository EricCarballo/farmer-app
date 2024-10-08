import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/api-gemini/gemini.service';
import { ForecastWeatherQueryDTO } from 'src/dto/ForecastWeatherQueryDTO';
import { WeatherAPIService } from 'src/providers/weatherAPI/http.service';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly weatherAPIService: WeatherAPIService,
    private readonly geminiService: GeminiService,
  ) {}

  async getAnalysisWeather(
    query: ForecastWeatherQueryDTO,
    tipoCultivo: string,
  ) {
    const forecastWeather =
      await this.weatherAPIService.getForecastWeather(query);

    const processData = this.processWeatherData(forecastWeather);
    const promptDataWeather = this.createGeminiPromptV2(processData, tipoCultivo);
    const responseGemini =
      await this.geminiService.getPromptResponse(promptDataWeather);
    return { responseGemini, forecastWeather };
  }

  private processWeatherData(data: any) {
    const location = data.location;
    const forecasts = data.forecast.forecastday.map((forecast) => ({
      date: forecast.date,
      maxTemp: forecast.day.maxtemp_c,
      minTemp: forecast.day.mintemp_c,
      avgTemp: forecast.day.avgtemp_c,
      maxWind: forecast.day.maxwind_kph,
      totalPrecip: forecast.day.totalprecip_mm,
      avgHumidity: forecast.day.avghumidity,
      condition: forecast.day.condition.text,
      sunrise: forecast.astro.sunrise,
      sunset: forecast.astro.sunset,
      hourlyForecast: forecast.hour.map((hour) => ({
        time: hour.time,
        temp: hour.temp_c,
        condition: hour.condition.text,
        chanceOfRain: hour.chance_of_rain,
      })),
    }));

    return {
      location: `${location.name}, ${location.region}, ${location.country}`,
      forecasts: forecasts,
    };
  }

  createGeminiPrompt(weatherData: any, tipoCultivo: string) {
    const singleDayPrompt = (forecast) => `
Fecha: ${forecast.date}
Temperatura: Máxima ${forecast.maxTemp}°C, Mínima ${forecast.minTemp}°C, Promedio ${forecast.avgTemp}°C
Viento máximo: ${forecast.maxWind} km/h
Precipitación total: ${forecast.totalPrecip} mm
Humedad promedio: ${forecast.avgHumidity}%
Condición general: ${forecast.condition}
Amanecer: ${forecast.sunrise}, Atardecer: ${forecast.sunset}

Pronóstico por horas:
${forecast.hourlyForecast
  .map(
    (hour) =>
      `${hour.time}: ${hour.temp}°C, ${hour.condition}, ${hour.chanceOfRain}% de probabilidad de lluvia`,
  )
  .join('\n')}
`;

    const forecastsPrompt = weatherData.forecasts
      .map(singleDayPrompt)
      .join('\n\n');

    return `Analiza los siguientes datos meteorológicos para ${weatherData.location} con enfoque en el cultivo de *${tipoCultivo}*:

${forecastsPrompt}

Con base en estos datos, proporciona un análisis detallado del clima para el período proporcionado, enfocado en ayudar a los agricultores con el cultivo de *${tipoCultivo}*. Incluye lo siguiente:

1. *Resumen general del período:* Proporciona un resumen de las condiciones climáticas promedio para el período completo.
2. *Tendencias climáticas notables:* Menciona si se esperan tendencias de calor, frío, humedad o precipitaciones prolongadas.
3. *Programación del riego:* Ofrece recomendaciones sobre el riego de *${tipoCultivo}* basándote en la previsión de precipitaciones, humedad y temperatura. Incluye la cantidad de agua recomendada o si deben ajustar los sistemas de riego.
4. *Protección ante heladas o calor extremo:* Advierte sobre cualquier posible riesgo de temperaturas extremas y sugiere medidas de protección para *${tipoCultivo}*.
5. *Prevención de enfermedades:* Basado en la humedad y las condiciones climáticas, ofrece recomendaciones para evitar la aparición de enfermedades en *${tipoCultivo}*, como hongos.
6. *Planes de siembra y cosecha:* Proporciona sugerencias sobre los mejores días para sembrar o cosechar *${tipoCultivo}*, tomando en cuenta las condiciones ideales de humedad y temperatura.
7. *Aplicación de fertilizantes y pesticidas:* Recomienda los mejores momentos para aplicar productos químicos en *${tipoCultivo}*, evitando días con lluvias o vientos fuertes.
8. *Prevención de daños por tormentas o fenómenos climáticos extremos:* Proporciona recomendaciones específicas para proteger *${tipoCultivo}* en caso de tormentas o vientos fuertes.
9. *Optimización de la polinización:* Ofrece sugerencias para maximizar la polinización natural o manual de *${tipoCultivo}*, basándote en las condiciones climáticas previstas (viento, temperatura).
10. *Advertencias climáticas potencialmente peligrosas:* Identifica cualquier día con condiciones climáticas extremas que puedan representar un riesgo para *${tipoCultivo}*.
11. *Cualquier otra observación relevante:* Menciona cualquier patrón climático adicional que pueda afectar *${tipoCultivo}* durante el período analizado.

Por favor, estructura tu respuesta en párrafos claros y concisos, organizando la información por días y proporcionando recomendaciones específicas para *${tipoCultivo}*.
`;
  }

  createGeminiPromptV2(weatherData: any, tipoCultivo: string) {
    // Primero, verificamos si el tipo de cultivo es válido
    const invalidInputMessage = `
  # Error: Tipo de Cultivo No Válido
  
  Lo siento, pero "${tipoCultivo}" no parece ser un tipo de cultivo válido. Por favor, ingrese un cultivo agrícola real, como por ejemplo:
  - Frutas (manzanas, fresas, uvas)
  - Verduras (tomates, zanahorias, lechugas)
  - Cereales (maíz, trigo, arroz)
  - Otros cultivos agrícolas
  
  Este sistema está diseñado para ayudar a agricultores con cultivos reales.
  `;

    // Lista de palabras clave agrícolas para validación básica
    const palabrasClaveAgricolas = [
      'fruta',
      'verdura',
      'hortaliza',
      'cereal',
      'árbol',
      'planta',
      'semilla',
      'cultivo',
      'cosecha',
      'huerto',
      'jardín',
      'agricultura',
    ];

    // Verificar si el tipo de cultivo contiene alguna palabra clave agrícola
    const esValido =
      palabrasClaveAgricolas.some((palabra) =>
        tipoCultivo.toLowerCase().includes(palabra.toLowerCase()),
      ) ||
      // Añadir algunas validaciones específicas para cultivos comunes
      /^(manzana|pera|fresa|tomate|maíz|trigo|arroz|papa|frijol|calabaza)s?$/i.test(
        tipoCultivo,
      );

    if (!esValido) {
      return invalidInputMessage;
    }

    const singleDayPrompt = (forecast) => `
  Fecha: ${forecast.date}
  Temperatura: Máxima ${forecast.maxTemp}°C, Mínima ${forecast.minTemp}°C, Promedio ${forecast.avgTemp}°C
  Viento máximo: ${forecast.maxWind} km/h
  Precipitación total: ${forecast.totalPrecip} mm
  Humedad promedio: ${forecast.avgHumidity}%
  Condición general: ${forecast.condition}
  Amanecer: ${forecast.sunrise}, Atardecer: ${forecast.sunset}
  
  Pronóstico por horas:
  ${forecast.hourlyForecast
    .map(
      (hour) =>
        `${hour.time}: ${hour.temp}°C, ${hour.condition}, ${hour.chanceOfRain}% de probabilidad de lluvia`,
    )
    .join('\n')}
  `;

    const forecastsPrompt = weatherData.forecasts
      .map(singleDayPrompt)
      .join('\n\n');

    return `
  # Análisis Meteorológico para Agricultura
  
  ## Ubicación y Cultivo
  Análisis meteorológico para **${weatherData.location}** enfocado en el cultivo de **${tipoCultivo}**
  
  ## Datos Meteorológicos
  ${forecastsPrompt}
  
  ---
  
  Por favor, proporciona un análisis detallado en formato Markdown que incluya:
  
  1. **Resumen General del Período**
     - Condiciones climáticas promedio
     - Impacto esperado en ${tipoCultivo}
  
  2. **Tendencias Climáticas Notables**
     - Patrones de temperatura
     - Patrones de precipitación
     - Implicaciones para ${tipoCultivo}
  
  3. **Recomendaciones de Manejo**
     - Programación de riego
     - Protección contra temperaturas extremas
     - Prevención de enfermedades
     - Momentos óptimos para siembra/cosecha
     - Aplicación de fertilizantes y pesticidas
  
  4. **Alertas y Precauciones**
     - Condiciones adversas previstas
     - Medidas preventivas recomendadas
  
  5. **Optimización del Cultivo**
     - Estrategias de polinización
     - Ajustes en prácticas agrícolas
  
  Por favor, estructura la respuesta en Markdown, utilizando:
  - Encabezados (#, ##, ###)
  - Listas con viñetas (-)
  - Texto en negrita (**) para puntos importantes
  - Tablas para datos comparativos si es necesario
  
  Mantén un tono profesional pero accesible, orientado a agricultores prácticos.
  `;
  }
}
