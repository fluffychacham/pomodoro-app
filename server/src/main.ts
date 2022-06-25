import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    cors({
      origin: true,
      credentials: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Example")
    .setDescription("Example api documentation")
    .setVersion("1.0")
    .addTag("example")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(4000);
}
bootstrap();
