import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Entity representing a Post
 */
@Entity('posts')
export class Post {
  /**
   * Unique identifier for the post
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Type of the post (e.g., "text", "video")
   */
  @Column({ type: 'varchar', length: 255 })
  postType: string;

  /**
   * Content of the post
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * Date when the post was created
   */
  @Column({ type: 'date' })
  createDate: Date;

  /**
   * Date when the post was last updated
   */
  @Column({ type: 'date' })
  updateDate: Date;

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
   * The user who created the post
   */
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(
    postType: string,
    content: string,
    createDate: Date,
    updateDate: Date,
    views: number,
    comments: number,
    likes: number,
    user: User,
  ) {
    this.postType = postType;
    this.content = content;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.views = views;
    this.comments = comments;
    this.likes = likes;
    this.user = user;
  }
}
