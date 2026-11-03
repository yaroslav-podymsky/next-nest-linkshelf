import { IsIn, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { LINK_STATUSES, type LinkStatus } from '../link-status';

export class UpdateLinkDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsIn(LINK_STATUSES)
  status?: LinkStatus;
}
