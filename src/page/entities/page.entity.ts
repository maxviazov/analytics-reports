import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Entity representing a Page
 */
@Entity('pages')
export class Page {
  /**
   * Unique identifier for the page
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The name of the page
   */
  @Column({ type: 'varchar', length: 255 })
  pageName: string;

  /**
   * The description of the page
   */
  @Column({ type: 'text' })
  pageDescription: string;

  /**
   * The date the page was created
   */
  @Column({ type: 'date' })
  createDate: Date;

  /**
   * The date the page was last updated
   */
  @Column({ type: 'date' })
  updateDate: Date;

  /**
   * The number of views the page has received
   */
  @Column({ type: 'int' })
  views: number;

  /**
   * The number of followers the page has
   */
  @Column({ type: 'int' })
  followers: number;

  /**
   * The user who created the page
   */
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(
    pageName: string,
    pageDescription: string,
    createDate: Date,
    updateDate: Date,
    views: number,
    followers: number,
    user: User,
  ) {
    this.pageName = pageName;
    this.pageDescription = pageDescription;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.views = views;
    this.followers = followers;
    this.user = user;
  }
}
