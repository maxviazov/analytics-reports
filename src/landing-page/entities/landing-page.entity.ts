import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a Landing Page
 */
@Entity('landing_page')
export class LandingPage {
  /**
   * Unique identifier for the landing page
   * @example 1
   */
  @ApiProperty({
    description: 'Unique identifier for the landing page',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The type of the landing page
   * @example 'home', 'product', 'contact'
   */
  @ApiProperty({
    description: 'The type of the landing page',
    example: 'home',
  })
  @Column({ type: 'varchar', length: 255 })
  pageType: string;

  /**
   * The session time in seconds
   * @example 300
   */
  @ApiProperty({
    description: 'The session time in seconds',
    example: 300,
  })
  @Column({ type: 'int' })
  sessionTime: number;

  /**
   * The number of pages visited during the session
   * @example 5
   */
  @ApiProperty({
    description: 'The number of pages visited during the session',
    example: 5,
  })
  @Column({ type: 'int' })
  numberOfPageVisited: number;

  constructor(
    pageType: string,
    sessionTime: number,
    numberOfPageVisited: number,
  ) {
    this.pageType = pageType;
    this.sessionTime = sessionTime;
    this.numberOfPageVisited = numberOfPageVisited;
  }
}
