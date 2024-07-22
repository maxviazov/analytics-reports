import { IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a post
 */
export class CreatePostDto {
  /**
   * Type of the post (e.g., "text", "video")
   * @example "text"
   */
  @ApiProperty({
    description: 'Type of the post (e.g., "text", "video")',
    type: String,
    example: 'text',
  })
  @IsString()
  postType: string;

  /**
   * Content of the post
   * @example "This is an example post content."
   */
  @ApiProperty({
    description: 'Content of the post',
    type: String,
    example: 'This is an example post content.',
  })
  @IsString()
  content: string;

  /**
   * Date when the post was created
   * @example "2024-07-20T00:00:00.000Z"
   */
  @ApiProperty({
    description: 'Date when the post was created',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  createDate: Date;

  /**
   * Date when the post was last updated
   * @example "2024-07-21T00:00:00.000Z"
   */
  @ApiProperty({
    description: 'Date when the post was last updated',
    type: String,
    format: 'date-time',
    example: '2024-07-21T00:00:00.000Z',
  })
  @IsDate()
  updateDate: Date;

  /**
   * Number of views the post has received
   * @example 100
   */
  @ApiProperty({
    description: 'Number of views the post has received',
    type: Number,
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
    type: Number,
    example: 10,
  })
  @IsInt()
  comments: number;

  /**
   * Number of likes on the post
   * @example 25
   */
  @ApiProperty({
    description: 'Number of likes on the post',
    type: Number,
    example: 25,
  })
  @IsInt()
  likes: number;

  /**
   * ID of the user who created the post
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user who created the post',
    type: Number,
    example: 1,
  })
  @IsInt()
  userId: number;

  constructor(
    postType: string,
    content: string,
    createDate: Date,
    updateDate: Date,
    views: number,
    comments: number,
    likes: number,
    userId: number,
  ) {
    this.postType = postType;
    this.content = content;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.views = views;
    this.comments = comments;
    this.likes = likes;
    this.userId = userId;
  }
}
