import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { configuration } from '@Config/index';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { Environment } from '@/Common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV !== Environment.LOCAL
        ? ['warn', 'error', 'fatal']
        : undefined,
  });

  // Helmet - Security Middleware
  app.use(helmet());

  // API Version
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Cross-Origin Resource Sharing (CORS)
  // This is set to generic to not disturb any frontend integrations or tests
  const origin = '*';
  app.enableCors({ origin });

  // Compression - Reduce Response Size
  app.use(compression());

  // Swagger OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Shortlet API')
    .setDescription('OpenAPI swagger documentation for Shortlet backend')
    .addTag('Countries', 'Operations related to countries external API')
    .addTag(
      'Health',
      'Health checks for application and countries external API',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Listen to serve
  await app.listen(configuration().appPort);
}
bootstrap();
