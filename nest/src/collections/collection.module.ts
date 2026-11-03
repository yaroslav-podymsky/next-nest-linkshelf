import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { CollectionsController } from './collection.controller';
import { CollectionsService } from './collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
