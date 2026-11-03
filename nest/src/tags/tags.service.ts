import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepo: Repository<Tag>,
  ) {}

  findAllByUser(userId: string): Promise<Tag[]> {
    return this.tagsRepo.find({
      where: { userId },
      order: { name: 'ASC' },
    });
  }

  async findOneByIdForUser(userId: string, id: string): Promise<Tag> {
    const tag = await this.tagsRepo.findOne({ where: { id, userId } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async create(userId: string, data: { name: string }): Promise<Tag> {
    const existing = await this.tagsRepo.findOne({
      where: { userId, name: data.name },
    });
    if (existing) {
      throw new ConflictException('Tag already exists');
    }

    const tag = this.tagsRepo.create({
      name: data.name,
      userId,
    });
    return this.tagsRepo.save(tag);
  }
}
