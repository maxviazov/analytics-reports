import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating traffic
 */
export class CreateTrafficDto {
  /**
   * The source of the traffic (e.g., "google", "facebook")
   * @example "google"
   */
  @ApiProperty({
    description: 'The source of the traffic (e.g., "google", "facebook")',
    example: 'google',
  })
  @IsString()
  trafficSource: string;

  /**
   * The ID of the location associated with the traffic
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the location associated with the traffic',
    example: 1,
  })
  @IsInt()
  locationId: number;

  /**
   * The ID of the landing page associated with the traffic
   * @example 2
   */
  @ApiProperty({
    description: 'The ID of the landing page associated with the traffic',
    example: 2,
  })
  @IsInt()
  landingPageId: number;

  /**
   * The ID of the user associated with the traffic
   * @example 3
   */
  @ApiProperty({
    description: 'The ID of the user associated with the traffic',
    example: 3,
  })
  @IsInt()
  userId: number;

  constructor(
    trafficSource: string,
    locationId: number,
    landingPageId: number,
    userId: number,
  ) {
    this.trafficSource = trafficSource;
    this.locationId = locationId;
    this.landingPageId = landingPageId;
    this.userId = userId;
  }
}
