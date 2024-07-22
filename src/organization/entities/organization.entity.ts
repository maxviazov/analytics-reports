import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Entity representing an organization.
 */
@Entity('organizations')
export class Organization {
  /**
   * Unique identifier for the organization.
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The name of the organization.
   */
  @Column({ type: 'varchar', length: 255 })
  organizationName: string;

  /**
   * The type of the organization.
   */
  @Column({ type: 'varchar', length: 255 })
  organizationType: string;

  /**
   * The date when the organization was created.
   */
  @Column({ type: 'date' })
  createDate: Date;

  /**
   * The date when the organization was last updated.
   */
  @Column({ type: 'date' })
  updateDate: Date;

  /**
   * The user who created the organization.
   */
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(
    organizationName: string,
    organizationType: string,
    createDate: Date,
    updateDate: Date,
    user: User,
  ) {
    this.organizationName = organizationName;
    this.organizationType = organizationType;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.user = user;
  }
}
