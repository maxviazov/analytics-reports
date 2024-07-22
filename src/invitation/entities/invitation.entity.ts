import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing an Invitation
 */
@Entity('invitations')
export class Invitation {
  /**
   * Unique identifier for the invitation
   */
  @ApiProperty({
    description: 'Unique identifier for the invitation',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The date when the invitation was sent
   */
  @ApiProperty({
    description: 'The date when the invitation was sent',
    type: String,
    format: 'date',
    example: '2024-07-20',
  })
  @Column({ type: 'date' })
  sentDate: Date;

  /**
   * The date when the invitation was accepted (optional)
   */
  @ApiProperty({
    description: 'The date when the invitation was accepted (optional)',
    type: String,
    format: 'date',
    required: false,
    example: '2024-07-21',
  })
  @Column({ type: 'date', nullable: true })
  acceptedDate: Date;

  /**
   * The status of the invitation (e.g., "Accepted", "Pending")
   */
  @ApiProperty({
    description: 'The status of the invitation (e.g., "Accepted", "Pending")',
    type: String,
    example: 'Accepted',
  })
  @Column({ type: 'varchar', length: 255 })
  status: string;

  /**
   * The user associated with the invitation
   */
  @ApiProperty({
    description: 'The user associated with the invitation',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(
    id: number,
    sentDate: Date,
    acceptedDate: Date,
    status: string,
    user: User,
  ) {
    this.id = id;
    this.sentDate = sentDate;
    this.acceptedDate = acceptedDate;
    this.status = status;
    this.user = user;
  }
}
