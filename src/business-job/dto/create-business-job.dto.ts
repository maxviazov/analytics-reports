import { IsBoolean, IsDate, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a BusinessJob
 */
export class CreateBusinessJobDto {
  /**
   * ID of the company
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the company',
    example: 1,
  })
  @IsInt()
  companyId: number;

  /**
   * ID of the business account
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the business account',
    example: 1,
  })
  @IsInt()
  businessAccountId: number;

  /**
   * Publish date of the job
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Publish date of the job',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  publishDate: Date;

  /**
   * ID of the location
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the location',
    example: 1,
  })
  @IsInt()
  locationId: number;

  /**
   * ID of the job page
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the job page',
    example: 1,
  })
  @IsInt()
  jobPageId: number;

  /**
   * Indicates if the job is hiring
   * @example true
   */
  @ApiProperty({
    description: 'Indicates if the job is hiring',
    example: true,
  })
  @IsBoolean()
  hiring: boolean;

  /**
   * Date when the job became active (optional)
   * @example '2024-07-21T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date when the job became active (optional)',
    type: String,
    format: 'date-time',
    example: '2024-07-21T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  jobActiveDate?: Date;

  /**
   * Date when the job was paused (optional)
   * @example '2024-07-22T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date when the job was paused (optional)',
    type: String,
    format: 'date-time',
    example: '2024-07-22T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  jobPausedDate?: Date;

  /**
   * Date when the job was deleted (optional)
   * @example '2024-07-23T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date when the job was deleted (optional)',
    type: String,
    format: 'date-time',
    example: '2024-07-23T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  jobDeletedDate?: Date;

  /**
   * ID of the user
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the user',
    example: 1,
  })
  @IsInt()
  userId: number;

  constructor(
    companyId: number,
    businessAccountId: number,
    publishDate: Date,
    locationId: number,
    jobPageId: number,
    hiring: boolean,
    userId: number,
    jobActiveDate?: Date,
    jobPausedDate?: Date,
    jobDeletedDate?: Date,
  ) {
    this.companyId = companyId;
    this.businessAccountId = businessAccountId;
    this.publishDate = publishDate;
    this.locationId = locationId;
    this.jobPageId = jobPageId;
    this.hiring = hiring;
    this.userId = userId;
    this.jobActiveDate = jobActiveDate;
    this.jobPausedDate = jobPausedDate;
    this.jobDeletedDate = jobDeletedDate;
  }
}
