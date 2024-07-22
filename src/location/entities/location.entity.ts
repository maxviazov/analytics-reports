import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity representing a Location
 */
@Entity('locations')
export class Location {
  /**
   * Unique identifier for the location
   * @example 1
   */
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the location',
  })
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The continent where the location is situated
   * @example 'North America'
   */
  @ApiProperty({
    example: 'North America',
    description: 'The continent where the location is situated',
  })
  @Column()
  continent: string;

  /**
   * The country where the location is situated
   * @example 'United States'
   */
  @ApiProperty({
    example: 'United States',
    description: 'The country where the location is situated',
  })
  @Column()
  country: string;

  /**
   * The state or region where the location is situated
   * @example 'California'
   */
  @ApiProperty({
    example: 'California',
    description: 'The state or region where the location is situated',
  })
  @Column()
  state: string;

  /**
   * The city where the location is situated
   * @example 'San Francisco'
   */
  @ApiProperty({
    example: 'San Francisco',
    description: 'The city where the location is situated',
  })
  @Column()
  city: string;

  constructor(continent: string, country: string, state: string, city: string) {
    this.continent = continent;
    this.country = country;
    this.state = state;
    this.city = city;
  }
}
