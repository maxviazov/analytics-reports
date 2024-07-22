import { IsBoolean, IsDate, IsDecimal, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a billing entry
 */
export class CreateBillingDto {
  /**
   * Date of the payment
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date of the payment',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  paymentDates: Date;

  /**
   * Sum of the payment
   * @example 100.50
   */
  @ApiProperty({
    description: 'Sum of the payment',
    type: Number,
    example: 100.5,
  })
  @IsDecimal()
  paymentSum: number;

  /**
   * Indicates if the payment failed
   * @example true
   */
  @ApiProperty({
    description: 'Indicates if the payment failed',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  failedPayment: boolean;

  /**
   * Date of the failed payment (if applicable)
   * @example '2024-07-21T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'Date of the failed payment (if applicable)',
    type: String,
    format: 'date-time',
    example: '2024-07-21T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  failedPaymentDate?: Date;

  /**
   * Sum of the failed payment (if applicable)
   * @example 50.00
   */
  @ApiProperty({
    description: 'Sum of the failed payment (if applicable)',
    type: Number,
    example: 50.0,
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  failedPaymentSum?: number;

  /**
   * Indicates if the failed payment paused the account
   * @example false
   */
  @ApiProperty({
    description: 'Indicates if the failed payment paused the account',
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  failedPaymentPausedAccount: boolean;

  /**
   * Monthly budget for billing
   * @example 500.00
   */
  @ApiProperty({
    description: 'Monthly budget for billing',
    type: Number,
    example: 500.0,
  })
  @IsDecimal()
  billingMonthlyBudget: number;

  /**
   * ID of the associated business account
   * @example 123
   */
  @ApiProperty({
    description: 'ID of the associated business account',
    type: Number,
    example: 123,
  })
  @IsInt()
  businessAccountId: number;

  constructor(
    paymentDates: Date,
    paymentSum: number,
    failedPayment: boolean,
    failedPaymentPausedAccount: boolean,
    billingMonthlyBudget: number,
    businessAccountId: number,
    failedPaymentDate?: Date,
    failedPaymentSum?: number,
  ) {
    this.paymentDates = paymentDates;
    this.paymentSum = paymentSum;
    this.failedPayment = failedPayment;
    this.failedPaymentPausedAccount = failedPaymentPausedAccount;
    this.billingMonthlyBudget = billingMonthlyBudget;
    this.businessAccountId = businessAccountId;
    this.failedPaymentDate = failedPaymentDate;
    this.failedPaymentSum = failedPaymentSum;
  }
}
