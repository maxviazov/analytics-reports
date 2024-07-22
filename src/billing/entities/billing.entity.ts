import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessAccount } from '../../business-account/entities/business-account.entity';

/**
 * Entity representing a billing record
 */
@Entity('billing')
export class Billing {
  /**
   * Unique identifier for the billing record
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Date of the payment
   */
  @Column({ type: 'date' })
  paymentDates: Date;

  /**
   * Sum of the payment
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  paymentSum: number;

  /**
   * Indicates if the payment failed
   */
  @Column({ type: 'boolean' })
  failedPayment: boolean;

  /**
   * Date of the failed payment (if applicable)
   */
  @Column({ type: 'date', nullable: true })
  failedPaymentDate?: Date;

  /**
   * Sum of the failed payment (if applicable)
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  failedPaymentSum?: number;

  /**
   * Indicates if the failed payment paused the account
   */
  @Column({ type: 'boolean' })
  failedPaymentPausedAccount: boolean;

  /**
   * Monthly budget for billing
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  billingMonthlyBudget: number;

  /**
   * Associated business account
   */
  @ManyToOne(() => BusinessAccount, (businessAccount) => businessAccount.id)
  @JoinColumn({ name: 'business_account_id' })
  businessAccount: BusinessAccount;

  constructor(
    paymentDates: Date,
    paymentSum: number,
    failedPayment: boolean,
    failedPaymentPausedAccount: boolean,
    billingMonthlyBudget: number,
    businessAccount: BusinessAccount,
  ) {
    this.paymentDates = paymentDates;
    this.paymentSum = paymentSum;
    this.failedPayment = failedPayment;
    this.failedPaymentPausedAccount = failedPaymentPausedAccount;
    this.billingMonthlyBudget = billingMonthlyBudget;
    this.businessAccount = businessAccount;
  }
}
