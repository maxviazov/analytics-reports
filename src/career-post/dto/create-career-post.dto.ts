import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a Career Post
 */
export class CreateCareerPostDto {
  /**
   * Title of the post
   * @example 'My Career Journey'
   */
  @ApiProperty({
    description: 'Title of the post',
    example: 'My Career Journey',
  })
  @IsString()
  title: string;
  /**
   * Content of the post
   * @example 'This is the content of my career journey post...'
   */
  @ApiProperty({
    description: 'Content of the post',
    example: 'This is the content of my career journey post...',
  })
  @IsString()
  content: string;
  /**
   * Date when the post was created (optional)
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiPropertyOptional({
    description: 'Date when the post was created (optional)',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  createDate?: Date;
  /**
   * Date when the post was deleted (optional)
   * @example '2024-07-25T00:00:00.000Z'
   */
  @ApiPropertyOptional({
    description: 'Date when the post was deleted (optional)',
    type: String,
    format: 'date-time',
    example: '2024-07-25T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  deleteDate?: Date;
  /**
   * Number of views the post has received
   * @example 100
   */
  @ApiProperty({
    description: 'Number of views the post has received',
    example: 100,
  })
  @IsInt()
  views: number;
  /**
   * Number of comments on the post
   * @example 10
   */
  @ApiProperty({
    description: 'Number of comments on the post',
    example: 10,
  })
  @IsInt()
  comments: number;
  /**
   * Number of likes on the post
   * @example 50
   */
  @ApiProperty({
    description: 'Number of likes on the post',
    example: 50,
  })
  @IsInt()
  likes: number;
  /**
   * ID of the career page to which the post belongs
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the career page to which the post belongs',
    example: 1,
  })
  @IsInt()
  careerPageId: number;

  constructor(
    title: string,
    content: string,
    createDate: Date,
    deleteDate: Date,
    views: number,
    comments: number,
    likes: number,
    careerPageId: number,
  ) {
    this.title = title;
    this.content = content;
    this.createDate = createDate;
    this.deleteDate = deleteDate;
    this.views = views;
    this.comments = comments;
    this.likes = likes;
    this.careerPageId = careerPageId;
  }
}
