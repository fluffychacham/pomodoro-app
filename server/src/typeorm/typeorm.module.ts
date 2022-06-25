import { Module } from "@nestjs/common";
import * as typeorm from "@nestjs/typeorm";
import { config } from "dotenv";

config();

@Module({
  imports: [typeorm.TypeOrmModule.forRoot()],
})
export class TypeOrmModule {}
