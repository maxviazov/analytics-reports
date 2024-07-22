import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Entity representing a Career Page
 */
@Entity('career_pages')
export class CareerPage {
  /**
   * Unique identifier for the career page
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The user who created the page
   */
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * Date when the page was deleted (optional)
   */
  @Column({ type: 'date', nullable: true })
  deleteDate: Date;

  /**
   * The type of the career page (e.g., "profile", "project")
   */
  @Column({ type: 'varchar', length: 255 })
  pageType: string;

  /**
   * Visibility status of the page, either "public" or "private"
   */
  @Column({ type: 'varchar', length: 50 })
  publicPrivate: string;

  /**
   * Number of views the page has received
   */
  @Column({ type: 'int' })
  views: number;

  /**
   * Number of members following the page
   */
  @Column({ type: 'int' })
  members: number;

  constructor(
    user: User,
    deleteDate: Date,
    pageType: string,
    publicPrivate: string,
    views: number,
    members: number,
  ) {
    this.user = user;
    this.deleteDate = deleteDate;
    this.pageType = pageType;
    this.publicPrivate = publicPrivate;
    this.views = views;
    this.members = members;
  }
}
