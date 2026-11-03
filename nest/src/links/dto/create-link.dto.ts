import { IsIn, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { LINK_STATUSES, type LinkStatus } from '../link-status';

export class CreateLinkDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsUrl()
  url: string;

  @IsString()
  @MinLength(1)
  collectionId: string;

  @IsOptional()
  @IsIn(LINK_STATUSES)
  status?: LinkStatus;
}
