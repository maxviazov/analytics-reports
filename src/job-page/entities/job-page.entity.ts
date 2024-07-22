import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a Job Page
 */
@Entity('job_page')
export class JobPage {
  /**
   * Unique identifier for the job page
   */
  @ApiProperty({
    description: 'Unique identifier for the job page',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name of the job page
   */
  @ApiProperty({
    description: 'Name of the job page',
    example: 'Frontend Developer Job Page',
  })
  @Column({ type: 'varchar', length: 255 })
  pageName: string;

  /**
   * Description of the job page
   */
  @ApiProperty({
    description: 'Description of the job page',
    example: 'This page describes the Frontend Developer position.',
  })
  @Column({ type: 'text' })
  pageDescription: string;

  /**
   * Creation date of the job page
   */
  @ApiProperty({
    description: 'Creation date of the job page',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @Column({ type: 'date' })
  createDate: Date;

  /**
   * Last update date of the job page
   */
  @ApiProperty({
    description: 'Last update date of the job page',
    type: String,
    format: 'date-time',
    example: '2024-08-01T00:00:00.000Z',
  })
  @Column({ type: 'date' })
  updateDate: Date;

  /**
   * Number of views the job page has received
   */
  @ApiProperty({
    description: 'Number of views the job page has received',
    example: 150,
  })
  @Column({ type: 'int' })
  views: number;

  /**
   * Number of applications the job page has received
   */
  @ApiProperty({
    description: 'Number of applications the job page has received',
    example: 25,
  })
  @Column({ type: 'int' })
  applications: number;

  /**
   * The user who created the page
   */
  @ApiProperty({
    description: 'The user who created the page',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(
    id: number,
    pageName: string,
    pageDescription: string,
    createDate: Date,
    updateDate: Date,
    views: number,
    applications: number,
    user: User,
  ) {
    this.id = id;
    this.pageName = pageName;
    this.pageDescription = pageDescription;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.views = views;
    this.applications = applications;
    this.user = user;
  }
}
