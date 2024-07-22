import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating an onboarding record.
 */
export class CreateOnboardingDto {
  /**
   * The number of steps completed in the onboarding process.
   * @example 5
   */
  @ApiProperty({
    description: 'The number of steps completed in the onboarding process',
    example: 5,
  })
  @IsInt()
  stepsCompleted: number;

  /**
   * The average time taken to complete the onboarding steps, in seconds (optional).
   * @example 120
   */
  @ApiProperty({
    description:
      'The average time taken to complete the onboarding steps, in seconds (optional)',
    example: 120,
    required: false,
  })
  @IsOptional()
  @IsInt()
  averageCompletionTime?: number;

  constructor(stepsCompleted: number, averageCompletionTime?: number) {
    this.stepsCompleted = stepsCompleted;
    this.averageCompletionTime = averageCompletionTime;
  }
}
