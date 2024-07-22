import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../location/entities/location.entity';
import { LandingPage } from '../../landing-page/entities/landing-page.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing traffic data
 */
@Entity('traffic')
export class Traffic {
  /**
   * Unique identifier for the traffic record
   * @example 1
   */
  @ApiProperty({
    description: 'Unique identifier for the traffic record',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The source of the traffic (e.g., "google", "facebook")
   * @example "google"
   */
  @ApiProperty({
    description: 'The source of the traffic (e.g., "google", "facebook")',
    example: 'google',
  })
  @Column({ type: 'varchar', length: 255 })
  trafficSource: string;

  /**
   * The location associated with the traffic
   * @example { id: 1, city: 'San Francisco' }
   */
  @ApiProperty({
    description: 'The location associated with the traffic',
    example: { id: 1, city: 'San Francisco' },
  })
  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  /**
   * The landing page associated with the traffic
   * @example { id: 1, pageType: 'home' }
   */
  @ApiProperty({
    description: 'The landing page associated with the traffic',
    example: { id: 1, pageType: 'home' },
  })
  @ManyToOne(() => LandingPage, (landingPage) => landingPage.id)
  @JoinColumn({ name: 'landing_page_id' })
  landingPage: LandingPage;

  /**
   * The user associated with the traffic
   * @example { id: 1, name: 'John Doe' }
   */
  @ApiProperty({
    description: 'The user associated with the traffic',
    example: { id: 1, name: 'John Doe' },
  })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(
    trafficSource: string,
    location: Location,
    landingPage: LandingPage,
    user: User,
  ) {
    this.trafficSource = trafficSource;
    this.location = location;
    this.landingPage = landingPage;
    this.user = user;
  }
}
