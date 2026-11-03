import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsModule } from '../collections/collection.module';
import { Link } from './link.entity';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), CollectionsModule],
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
