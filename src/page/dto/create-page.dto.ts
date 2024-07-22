import { IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a Page
 */
export class CreatePageDto {
  /**
   * The name of the page
   * @example 'My Page'
   */
  @ApiProperty({
    description: 'The name of the page',
    example: 'My Page',
  })
  @IsString()
  pageName: string;

  /**
   * The description of the page
   * @example 'This is a description of my page'
   */
  @ApiProperty({
    description: 'The description of the page',
    example: 'This is a description of my page',
  })
  @IsString()
  pageDescription: string;

  /**
   * The date the page was created
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date the page was created',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  createDate: Date;

  /**
   * The date the page was last updated
   * @example '2024-07-21T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date the page was last updated',
    type: String,
    format: 'date-time',
    example: '2024-07-21T00:00:00.000Z',
  })
  @IsDate()
  updateDate: Date;

  /**
   * The number of views the page has received
   * @example 100
   */
  @ApiProperty({
    description: 'The number of views the page has received',
    example: 100,
  })
  @IsInt()
  views: number;

  /**
   * The number of followers the page has
   * @example 50
   */
  @ApiProperty({
    description: 'The number of followers the page has',
    example: 50,
  })
  @IsInt()
  followers: number;

  /**
   * The ID of the user who created the page
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the user who created the page',
    example: 1,
  })
  @IsInt()
  userId: number;

  constructor(
    pageName: string,
    pageDescription: string,
    createDate: Date,
    updateDate: Date,
    views: number,
    followers: number,
    userId: number,
  ) {
    this.pageName = pageName;
    this.pageDescription = pageDescription;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.views = views;
    this.followers = followers;
    this.userId = userId;
  }
}
