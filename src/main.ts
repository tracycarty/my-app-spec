import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // serve frontend files from the "frontend" directory
  app.useStaticAssets(join(__dirname, '..', 'frontend'));

  const port = 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();
