import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { CollectionsController } from './collection.controller';
import { CollectionsService } from './collection.service';
import { Link } from '../links/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, Link])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
