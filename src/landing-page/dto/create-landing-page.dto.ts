import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a landing page
 */
export class CreateLandingPageDto {
  /**
   * The type of the landing page
   * @example 'home', 'product', 'contact'
   */
  @ApiProperty({
    description: 'The type of the landing page',
    example: 'home',
  })
  @IsString()
  pageType: string;

  /**
   * The session time in seconds
   * @example 300
   */
  @ApiProperty({
    description: 'The session time in seconds',
    example: 300,
  })
  @IsInt()
  sessionTime: number;

  /**
   * The number of pages visited during the session
   * @example 5
   */
  @ApiProperty({
    description: 'The number of pages visited during the session',
    example: 5,
  })
  @IsInt()
  numberOfPageVisited: number;

  constructor(
    pageType: string,
    sessionTime: number,
    numberOfPageVisited: number,
  ) {
    this.pageType = pageType;
    this.sessionTime = sessionTime;
    this.numberOfPageVisited = numberOfPageVisited;
  }
}
