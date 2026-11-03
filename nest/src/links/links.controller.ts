import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LINK_STATUSES, type LinkStatus } from './link-status';
import { LinksService } from './links.service';

type AuthRequest = { user: { userId: string; email: string } };

class LinksQueryDto {
  @IsOptional()
  @IsString()
  collectionId?: string;

  @IsOptional()
  @IsIn(LINK_STATUSES)
  status?: LinkStatus;
}

@Controller('links')
@UseGuards(AuthGuard('jwt'))
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  findAll(@Req() req: AuthRequest, @Query() query: LinksQueryDto) {
    return this.linksService.findAll(req.user.userId, {
      collectionId: query.collectionId,
      status: query.status,
    });
  }

  @Get(':id')
  findOne(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.linksService.findOneForUser(req.user.userId, id);
  }

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateLinkDto) {
    return this.linksService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateLinkDto,
  ) {
    return this.linksService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.linksService.remove(req.user.userId, id);
  }
}
