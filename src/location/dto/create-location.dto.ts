import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a Location
 */
export class CreateLocationDto {
  /**
   * The continent where the location is situated
   * @example 'North America'
   */
  @ApiProperty({
    example: 'North America',
    description: 'The continent where the location is situated',
  })
  @IsString()
  continent: string;

  /**
   * The country where the location is situated
   * @example 'United States'
   */
  @ApiProperty({
    example: 'United States',
    description: 'The country where the location is situated',
  })
  @IsString()
  country: string;

  /**
   * The state or region where the location is situated
   * @example 'California'
   */
  @ApiProperty({
    example: 'California',
    description: 'The state or region where the location is situated',
  })
  @IsString()
  state: string;

  /**
   * The city where the location is situated
   * @example 'San Francisco'
   */
  @ApiProperty({
    example: 'San Francisco',
    description: 'The city where the location is situated',
  })
  @IsString()
  city: string;

  constructor(continent: string, country: string, state: string, city: string) {
    this.continent = continent;
    this.country = country;
    this.state = state;
    this.city = city;
  }
}
