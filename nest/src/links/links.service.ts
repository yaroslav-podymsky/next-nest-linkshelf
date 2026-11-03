import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionsService } from '../collections/collection.service';
import { TagsService } from '../tags/tags.service';
import { Link } from './link.entity';
import type { LinkStatus } from './link-status';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linksRepo: Repository<Link>,
    private readonly collectionsService: CollectionsService,
    private readonly tagsService: TagsService,
  ) {}

  async findAll(
    userId: string,
    filters: {
      collectionId?: string;
      status?: LinkStatus;
      tagId?: string;
    },
  ): Promise<Link[]> {
    const qb = this.linksRepo
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.tags', 'tag')
      .where('link.userId = :userId', { userId })
      .orderBy('link.createdAt', 'DESC');

    if (filters.collectionId) {
      qb.andWhere('link.collectionId = :collectionId', {
        collectionId: filters.collectionId,
      });
    }

    if (filters.status) {
      qb.andWhere('link.status = :status', { status: filters.status });
    }

    if (filters.tagId) {
      qb.andWhere('tag.id = :tagId', { tagId: filters.tagId });
    }

    return qb.getMany();
  }

  async findOneForUser(userId: string, id: string): Promise<Link> {
    const link = await this.linksRepo.findOne({
      where: { id, userId },
      relations: { tags: true },
    });
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
      tags: [],
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

  async addTag(userId: string, linkId: string, tagId: string): Promise<Link> {
    const link = await this.findOneForUser(userId, linkId);
    const tag = await this.tagsService.findOneByIdForUser(userId, tagId);

    const alreadyLinked = link.tags.some((item) => item.id === tag.id);
    if (!alreadyLinked) {
      link.tags.push(tag);
      await this.linksRepo.save(link);
    }

    return this.findOneForUser(userId, linkId);
  }

  async removeTag(
    userId: string,
    linkId: string,
    tagId: string,
  ): Promise<Link> {
    const link = await this.findOneForUser(userId, linkId);
    await this.tagsService.findOneByIdForUser(userId, tagId);

    link.tags = link.tags.filter((item) => item.id !== tagId);
    await this.linksRepo.save(link);

    return this.findOneForUser(userId, linkId);
  }
}
