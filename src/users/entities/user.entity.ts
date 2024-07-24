import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { Location } from '../../location/entities/location.entity';
import { Onboarding } from '../../onboarding/entities/onboarding.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a User
 */
@Entity('users')
export class User {
  /**
   * Unique identifier for the user
   * @example 1
   */
  @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Associated account of the user
   * @example { id: 1, name: 'John Doe' }
   */
  @ApiProperty({
    example: { id: 1, name: 'John Doe' },
    description: 'Associated account of the user',
  })
  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  /**
   * Associated location of the user
   * @example { id: 1, city: 'San Francisco' }
   */
  @ApiProperty({
    example: { id: 1, city: 'San Francisco' },
    description: 'Associated location of the user',
  })
  @ManyToOne(() => Location)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  /**
   * Preferred language of the user
   * @example 'en'
   */
  @ApiProperty({ example: 'en', description: 'Preferred language of the user' })
  @Column({ length: 50 })
  language: string;

  /**
   * Data related to user connections
   * @example '{"friends": ["user1", "user2"]}'
   */
  @ApiProperty({
    example: '{"friends": ["user1", "user2"]}',
    description: 'Data related to user connections',
  })
  @Column({ name: 'connections_data', length: 255 })
  connectionsData: string;

  /**
   * Associated onboarding process of the user
   * @example { id: 1, stepsCompleted: 3 }
   */
  @ApiProperty({
    example: { id: 1, stepsCompleted: 3 },
    description: 'Associated onboarding process of the user',
  })
  @ManyToOne(() => Onboarding)
  @JoinColumn({ name: 'onboarding_id' })
  onBoarding: Onboarding;

  constructor(
    account: Account,
    location: Location,
    language: string,
    connectionsData: string,
    onBoarding: Onboarding,
  ) {
    this.account = account;
    this.location = location;
    this.language = language;
    this.connectionsData = connectionsData;
    this.onBoarding = onBoarding;
  }
}
