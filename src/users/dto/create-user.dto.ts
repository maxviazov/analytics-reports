import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a User
 */
export class CreateUserDto {
  /**
   * ID of the associated account
   * @example 123
   */
  @ApiProperty({ example: 123, description: 'ID of the associated account' })
  @IsInt()
  accountId: number;

  /**
   * ID of the associated location
   * @example 456
   */
  @ApiProperty({ example: 456, description: 'ID of the associated location' })
  @IsInt()
  locationId: number;

  /**
   * Preferred language of the user
   * @example 'en'
   */
  @ApiProperty({ example: 'en', description: 'Preferred language of the user' })
  @IsString()
  language: string;

  /**
   * Data related to user connections
   * @example '{"friends": ["user1", "user2"]}'
   */
  @ApiProperty({
    example: '{"friends": ["user1", "user2"]}',
    description: 'Data related to user connections',
  })
  @IsString()
  connectionsData: string;

  /**
   * ID of the associated onboarding process
   * @example 789
   */
  @ApiProperty({
    example: 789,
    description: 'ID of the associated onboarding process',
  })
  @IsInt()
  onboardingId: number;

  constructor(
    accountId: number,
    locationId: number,
    language: string,
    connectionsData: string,
    onboardingId: number,
  ) {
    this.accountId = accountId;
    this.locationId = locationId;
    this.language = language;
    this.connectionsData = connectionsData;
    this.onboardingId = onboardingId;
  }
}
