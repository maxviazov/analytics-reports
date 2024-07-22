import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a business company
 */
export class CreateBusinessCompanyDto {
  /**
   * The ID of the business account
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the business account',
    example: 1,
  })
  @IsInt()
  businessAccountId: number;

  /**
   * The date the business company was created
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date the business company was created',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  createDate: Date;

  /**
   * The date the business company was last updated
   * @example '2024-07-21T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date the business company was last updated',
    type: String,
    format: 'date-time',
    example: '2024-07-21T00:00:00.000Z',
  })
  @IsDate()
  updateDate: Date;

  /**
   * The ID of the location
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the location',
    example: 1,
  })
  @IsInt()
  locationId: number;

  /**
   * The type of the business company
   * @example 'Retail'
   */
  @ApiProperty({
    description: 'The type of the business company',
    example: 'Retail',
  })
  @IsString()
  type: string;

  /**
   * The number of views on the company page
   * @example 100
   */
  @ApiProperty({
    description: 'The number of views on the company page',
    example: 100,
  })
  @IsInt()
  companyPageViews: number;

  /**
   * The date the business became active (if applicable)
   * @example '2024-08-01T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date the business became active (if applicable)',
    type: String,
    format: 'date-time',
    example: '2024-08-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  businessActiveDate?: Date;

  /**
   * The date the business was paused (if applicable)
   * @example '2024-09-01T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date the business was paused (if applicable)',
    type: String,
    format: 'date-time',
    example: '2024-09-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  businessPausedDate?: Date;

  /**
   * The date the business was deleted (if applicable)
   * @example '2024-10-01T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date the business was deleted (if applicable)',
    type: String,
    format: 'date-time',
    example: '2024-10-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  businessDeletedDate?: Date;

  /**
   * The ID of the user
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the user',
    example: 1,
  })
  @IsInt()
  userId: number;

  constructor(
    businessAccountId: number,
    createDate: Date,
    updateDate: Date,
    locationId: number,
    type: string,
    companyPageViews: number,
    userId: number,
    businessActiveDate?: Date,
    businessPausedDate?: Date,
    businessDeletedDate?: Date,
  ) {
    this.businessAccountId = businessAccountId;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.locationId = locationId;
    this.type = type;
    this.companyPageViews = companyPageViews;
    this.userId = userId;
    this.businessActiveDate = businessActiveDate;
    this.businessPausedDate = businessPausedDate;
    this.businessDeletedDate = businessDeletedDate;
  }
}
