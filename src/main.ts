import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for a specific origin (e.g., localhost:3002)
  app.enableCors({
    origin: 'http://localhost:3002',  // or use '*' for all origins
    methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
  });

  await app.listen(3333);
}
bootstrap();
