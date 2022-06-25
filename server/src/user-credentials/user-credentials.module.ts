import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserCredentials } from "./user-credentials.entity";
import { UserCredentialService } from "./user-credentials.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserCredentials])],
  providers: [UserCredentialService],
  exports: [UserCredentialService],
})
export class UserCredentialsModule {}
