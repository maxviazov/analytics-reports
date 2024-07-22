import { IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating an organization.
 */
export class CreateOrganizationDto {
  /**
   * The name of the organization.
   * @example "TechCorp"
   */
  @ApiProperty({
    description: 'The name of the organization.',
    example: 'TechCorp',
  })
  @IsString()
  organizationName: string;

  /**
   * The type of the organization.
   * @example "Technology"
   */
  @ApiProperty({
    description: 'The type of the organization.',
    example: 'Technology',
  })
  @IsString()
  organizationType: string;

  /**
   * The date when the organization was created.
   * @example "2024-07-20T00:00:00.000Z"
   */
  @ApiProperty({
    description: 'The date when the organization was created.',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  createDate: Date;

  /**
   * The date when the organization was last updated.
   * @example "2024-07-21T00:00:00.000Z"
   */
  @ApiProperty({
    description: 'The date when the organization was last updated.',
    type: String,
    format: 'date-time',
    example: '2024-07-21T00:00:00.000Z',
  })
  @IsDate()
  updateDate: Date;

  /**
   * The ID of the user who created the organization.
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the user who created the organization.',
    example: 1,
  })
  @IsInt()
  userId: number;

  constructor(
    organizationName: string,
    organizationType: string,
    createDate: Date,
    updateDate: Date,
    userId: number,
  ) {
    this.organizationName = organizationName;
    this.organizationType = organizationType;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.userId = userId;
  }
}
