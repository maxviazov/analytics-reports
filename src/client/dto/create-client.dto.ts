import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a Client
 */
export class CreateClientDto {
  /**
   * Current plan of the client
   * @example 'Basic'
   */
  @ApiProperty({
    description: 'Current plan of the client',
    type: String,
    example: 'Basic',
  })
  @IsString()
  currentPlan: string;

  /**
   * Indicates if the client is on a free plan
   * @example true
   */
  @ApiProperty({
    description: 'Indicates if the client is on a free plan',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  free: boolean;

  /**
   * Indicates if the client is on a premium trial
   * @example false
   */
  @ApiProperty({
    description: 'Indicates if the client is on a premium trial',
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  premiumTrial: boolean;

  /**
   * Indicates if the client is on a premium plan
   * @example false
   */
  @ApiProperty({
    description: 'Indicates if the client is on a premium plan',
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  premium: boolean;

  /**
   * Start date of the client's plan
   * @example '2023-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: "Start date of the client's plan",
    type: String,
    format: 'date-time',
    example: '2023-07-20T00:00:00.000Z',
  })
  @IsDate()
  startDate: Date;

  /**
   * End date of the client's plan
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: "End date of the client's plan",
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  endDate: Date;

  /**
   * ID of the associated business account
   * @example 1
   */
  @ApiProperty({
    description: 'ID of the associated business account',
    type: Number,
    example: 1,
  })
  @IsInt()
  businessAccountId: number;

  constructor(
    currentPlan: string,
    free: boolean,
    premiumTrial: boolean,
    premium: boolean,
    startDate: Date,
    endDate: Date,
    businessAccountId: number,
  ) {
    this.currentPlan = currentPlan;
    this.free = free;
    this.premiumTrial = premiumTrial;
    this.premium = premium;
    this.startDate = startDate;
    this.endDate = endDate;
    this.businessAccountId = businessAccountId;
  }
}
