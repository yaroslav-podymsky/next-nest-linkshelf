import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollectionsService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

type AuthRequest = { user: { userId: string; email: string } };

@Controller('collections')
@UseGuards(AuthGuard('jwt'))
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.collectionsService.findAllByUser(req.user.userId);
  }

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateCollectionDto) {
    return this.collectionsService.create(req.user.userId, dto.title);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(req.user.userId, id, dto.title);
  }

  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.collectionsService.remove(req.user.userId, id);
  }
}
