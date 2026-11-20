import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';

@Module({
  imports: [UsersModule],
  controllers: [AssociationsController],
  providers: [AssociationsService]
})
export class AssociationsModule {}
