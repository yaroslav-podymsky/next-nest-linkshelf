import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepo: Repository<Collection>,
  ) {}

  findAllByUser(userId: string): Promise<Collection[]> {
    return this.collectionsRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneForUser(userId: string, id: string): Promise<Collection> {
    const collection = await this.collectionsRepo.findOne({
      where: { id, userId },
    });
    if (!collection) {
      throw new NotFoundException('Collection not found');
    }
    return collection;
  }

  create(userId: string, title: string): Promise<Collection> {
    const collection = this.collectionsRepo.create({ userId, title });
    return this.collectionsRepo.save(collection);
  }

  async update(
    userId: string,
    id: string,
    title: string,
  ): Promise<Collection> {
    const collection = await this.collectionsRepo.findOne({
      where: { id, userId },
    });
    if (!collection) {
      throw new NotFoundException('Collection not found');
    }
    collection.title = title;
    return this.collectionsRepo.save(collection);
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.collectionsRepo.delete({ id, userId });
    if (!result.affected) {
      throw new NotFoundException('Collection not found');
    }
  }
}
