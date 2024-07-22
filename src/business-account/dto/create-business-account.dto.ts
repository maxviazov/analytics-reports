import { IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a business account
 */
export class CreateBusinessAccountDto {
  /**
   * Account ID
   * @example 1
   */
  @ApiProperty({
    description: 'Account ID',
    example: 1,
  })
  @IsInt()
  accountId: number;

  /**
   * Onboarding ID
   * @example 123
   */
  @ApiProperty({
    description: 'Onboarding ID',
    example: 123,
  })
  @IsInt()
  onboardingId: number;

  /**
   * Name of the business
   * @example 'My Business'
   */
  @ApiProperty({
    description: 'Name of the business',
    example: 'My Business',
  })
  @IsString()
  businessName: string;

  /**
   * Type of the business
   * @example 'Retail'
   */
  @ApiProperty({
    description: 'Type of the business',
    example: 'Retail',
  })
  @IsString()
  businessType: string;

  /**
   * Date when the business account was created
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date when the business account was created',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  /**
   * Date when the business account was last updated
   * @example '2024-07-21T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date when the business account was last updated',
    type: String,
    format: 'date-time',
    example: '2024-07-21T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date;

  constructor(
    accountId: number,
    onboardingId: number,
    businessName: string,
    businessType: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.accountId = accountId;
    this.onboardingId = onboardingId;
    this.businessName = businessName;
    this.businessType = businessType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
