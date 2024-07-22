import { IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a Job Page
 */
export class CreateJobPageDto {
  /**
   * Name of the job page
   * @example 'Frontend Developer Job Page'
   */
  @ApiProperty({
    description: 'Name of the job page',
    example: 'Frontend Developer Job Page',
  })
  @IsString()
  pageName: string;

  /**
   * Description of the job page
   * @example 'This page describes the Frontend Developer position.'
   */
  @ApiProperty({
    description: 'Description of the job page',
    example: 'This page describes the Frontend Developer position.',
  })
  @IsString()
  pageDescription: string;

  /**
   * Creation date of the job page
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Creation date of the job page',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  createDate: Date;

  /**
   * Last update date of the job page
   * @example '2024-08-01T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Last update date of the job page',
    type: String,
    format: 'date-time',
    example: '2024-08-01T00:00:00.000Z',
  })
  @IsDate()
  updateDate: Date;

  /**
   * Number of views the job page has received
   * @example 150
   */
  @ApiProperty({
    description: 'Number of views the job page has received',
    example: 150,
  })
  @IsInt()
  views: number;

  /**
   * Number of applications the job page has received
   * @example 25
   */
  @ApiProperty({
    description: 'Number of applications the job page has received',
    example: 25,
  })
  @IsInt()
  applications: number;

  /**
   * ID of the user who created the job page
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user who created the job page',
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
    applications: number,
    userId: number,
  ) {
    this.pageName = pageName;
    this.pageDescription = pageDescription;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.views = views;
    this.applications = applications;
    this.userId = userId;
  }
}
