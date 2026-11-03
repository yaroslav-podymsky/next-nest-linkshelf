import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

type AuthRequest = { user: { userId: string; email: string } };

@Controller('tags')
@UseGuards(AuthGuard('jwt'))
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.tagsService.findAllByUser(req.user.userId);
  }

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateTagDto) {
    return this.tagsService.create(req.user.userId, dto);
  }
}
