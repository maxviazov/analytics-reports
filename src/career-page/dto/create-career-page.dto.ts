import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a Career Page
 */
export class CreateCareerPageDto {
  /**
   * The type of the career page (e.g., "profile", "project")
   * @example "profile"
   */
  @ApiProperty({
    description: 'The type of the career page (e.g., "profile", "project")',
    example: 'profile',
  })
  @IsString()
  pageType: string;

  /**
   * Visibility status of the page, either "public" or "private"
   * @example "public"
   */
  @ApiProperty({
    description: 'Visibility status of the page, either "public" or "private"',
    example: 'public',
  })
  @IsString()
  publicPrivate: string;

  /**
   * Date when the page was deleted (optional)
   * @example "2024-07-20T00:00:00.000Z"
   */
  @ApiProperty({
    description: 'Date when the page was deleted (optional)',
    type: String,
    format: 'date-time',
    required: false,
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  deleteDate?: Date;

  /**
   * Number of views the page has received
   * @example 100
   */
  @ApiProperty({
    description: 'Number of views the page has received',
    example: 100,
  })
  @IsInt()
  views: number;

  /**
   * Number of members following the page
   * @example 50
   */
  @ApiProperty({
    description: 'Number of members following the page',
    example: 50,
  })
  @IsInt()
  members: number;

  /**
   * ID of the user who created the page
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user who created the page',
    example: 1,
  })
  @IsInt()
  userId: number;

  constructor(
    pageType: string,
    publicPrivate: string,
    views: number,
    members: number,
    userId: number,
    deleteDate?: Date,
  ) {
    this.pageType = pageType;
    this.publicPrivate = publicPrivate;
    this.views = views;
    this.members = members;
    this.userId = userId;
    this.deleteDate = deleteDate;
  }
}
