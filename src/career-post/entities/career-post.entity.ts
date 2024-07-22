import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CareerPage } from '../../career-page/entities/career-page.entity';

/**
 * Entity representing a Career Post
 */
@Entity('career_posts')
export class CareerPost {
  /**
   * Unique identifier for the career post
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Date when the post was created (optional)
   */
  @Column({ type: 'date', nullable: true })
  createDate: Date;

  /**
   * Date when the post was deleted (optional)
   */
  @Column({ type: 'date', nullable: true })
  deleteDate: Date;

  /**
   * Number of views the post has received
   */
  @Column({ type: 'int' })
  views: number;

  /**
   * Number of comments on the post
   */
  @Column({ type: 'int' })
  comments: number;

  /**
   * Number of likes on the post
   */
  @Column({ type: 'int' })
  likes: number;

  /**
   * The career page to which the post belongs
   */
  @ManyToOne(() => CareerPage, (careerPage) => careerPage.id)
  @JoinColumn({ name: 'career_page_id' })
  careerPage: CareerPage;

  constructor(
    id: number,
    createDate: Date,
    deleteDate: Date,
    views: number,
    comments: number,
    likes: number,
    careerPage: CareerPage,
  ) {
    this.id = id;
    this.createDate = createDate;
    this.deleteDate = deleteDate;
    this.views = views;
    this.comments = comments;
    this.likes = likes;
    this.careerPage = careerPage;
  }
}
