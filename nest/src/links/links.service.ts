import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionsService } from '../collections/collection.service';
import { Link } from './link.entity';
import type { LinkStatus } from './link-status';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linksRepo: Repository<Link>,
    private readonly collectionsService: CollectionsService,
  ) {}

  findAll(
    userId: string,
    filters: { collectionId?: string; status?: LinkStatus },
  ): Promise<Link[]> {
    return this.linksRepo.find({
      where: {
        userId,
        ...(filters.collectionId ? { collectionId: filters.collectionId } : {}),
        ...(filters.status ? { status: filters.status } : {}),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneForUser(userId: string, id: string): Promise<Link> {
    const link = await this.linksRepo.findOne({ where: { id, userId } });
    if (!link) {
      throw new NotFoundException('Link not found');
    }
    return link;
  }

  async create(
    userId: string,
    data: {
      title: string;
      url: string;
      collectionId: string;
      status?: LinkStatus;
    },
  ): Promise<Link> {
    await this.collectionsService.findOneForUser(userId, data.collectionId);

    const link = this.linksRepo.create({
      userId,
      title: data.title,
      url: data.url,
      collectionId: data.collectionId,
      status: data.status ?? 'todo',
    });

    return this.linksRepo.save(link);
  }

  async update(
    userId: string,
    id: string,
    data: { title?: string; url?: string; status?: LinkStatus },
  ): Promise<Link> {
    const link = await this.findOneForUser(userId, id);

    if (data.title !== undefined) link.title = data.title;
    if (data.url !== undefined) link.url = data.url;
    if (data.status !== undefined) link.status = data.status;

    return this.linksRepo.save(link);
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.linksRepo.delete({ id, userId });
    if (!result.affected) {
      throw new NotFoundException('Link not found');
    }
  }
}
