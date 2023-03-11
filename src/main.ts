import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
   const PORT = process.env.PORT || 5000
   const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
  .setTitle('Первое приложение на Nest JS')
  .setDescription('Документация REST API')
  .setVersion('1.0.0')
  .addTag('Resam')
  .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/api/docs',app,document)

  await  app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
 }

 start()


//пакет для автоматической документации
// npm i @nestjs/swagger swagger-ui-express

//команды для генерации файлов через CLI
//nest generate service
//nest generate module
//nest generate controller

// пакет для работы с JWT-токеном + пакет для шифрования поролей
//npm i @nestjs/jwt bcryptjs

//сервис, в котором можно декодировать токен
//jwt.io
