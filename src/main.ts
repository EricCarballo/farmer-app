import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Farmer's app")
    .setDescription('The farmer API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(3008);

  console.log('-------------------------------------');
  console.log(`READY ON: ${await app.getUrl()}`);
  console.log(`SWAGGER: ${await app.getUrl()}/api/swagger`);
  console.log('-------------------------------------');
}
bootstrap();
