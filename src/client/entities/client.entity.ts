import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessAccount } from '../../business-account/entities/business-account.entity';

/**
 * Entity representing a Client
 */
@Entity('client')
export class Client {
  /**
   * Unique identifier for the client
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Current plan of the client
   */
  @Column({ type: 'varchar', length: 255 })
  currentPlan: string;

  /**
   * Indicates if the client is on a free plan
   */
  @Column({ type: 'boolean' })
  free: boolean;

  /**
   * Indicates if the client is on a premium trial
   */
  @Column({ type: 'boolean' })
  premiumTrial: boolean;

  /**
   * Indicates if the client is on a premium plan
   */
  @Column({ type: 'boolean' })
  premium: boolean;

  /**
   * Start date of the client's plan
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * End date of the client's plan
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * The business account associated with the client
   */
  @ManyToOne(() => BusinessAccount, (businessAccount) => businessAccount.id)
  @JoinColumn({ name: 'business_account_id' })
  businessAccount: BusinessAccount;

  constructor(
    id: number,
    currentPlan: string,
    free: boolean,
    premiumTrial: boolean,
    premium: boolean,
    startDate: Date,
    endDate: Date,
    businessAccount: BusinessAccount,
  ) {
    this.id = id;
    this.currentPlan = currentPlan;
    this.free = free;
    this.premiumTrial = premiumTrial;
    this.premium = premium;
    this.startDate = startDate;
    this.endDate = endDate;
    this.businessAccount = businessAccount;
  }
}
