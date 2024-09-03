import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=new DocumentBuilder()
  .setTitle('API DOCs')
  .setDescription('I am asleep, and I want to kill Paulina')
  .setVersion('1.0')
  .addTag('Dishes')
  .build()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
    })
  );
  // Activar CORS para cualquier origen
  app.enableCors({
    origin: '*', // Permitir todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  });
  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('documentationswagger',app,document);
  await app.listen(3000);
}
bootstrap();
