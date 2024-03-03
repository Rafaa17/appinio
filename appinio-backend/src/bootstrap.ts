import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Appinio API')
    .setDescription('Appinio API description')
    .setVersion('1.0')
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${methodKey}From${controllerKey}`,
  };

  const document = SwaggerModule.createDocument(app, config, documentOptions);

  return {
    app,
    document,
  };
}
