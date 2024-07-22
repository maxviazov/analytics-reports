import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing the onboarding process.
 */
@Entity('onboarding')
export class Onboarding {
  /**
   * Unique identifier for the onboarding record.
   * @example 1
   */
  @ApiProperty({ example: 1, description: 'Unique identifier for the onboarding record.' })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The number of steps completed in the onboarding process.
   * Default is 0.
   * @example 5
   */
  @ApiProperty({ example: 5, description: 'The number of steps completed in the onboarding process. Default is 0.' })
  @Column({ default: 0 })
  stepsCompleted: number;

  /**
   * The date when the onboarding process was completed (optional).
   * @example '2023-07-20'
   */
  @ApiProperty({
    example: '2023-07-20',
    description: 'The date when the onboarding process was completed (optional).',
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  completeDate: Date | null;

  /**
   * Users associated with the onboarding process.
   */
  @ApiProperty({ type: () => [User], description: 'Users associated with the onboarding process.' })
  @OneToMany(() => User, (user) => user.onBoarding)
  users!: User[];

  constructor(stepsCompleted: number, completeDate: Date | null) {
    this.stepsCompleted = stepsCompleted;
    this.completeDate = completeDate;
  }
}
