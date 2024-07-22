import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a Hiring record
 */
export class CreateHiringDto {
  /**
   * The total number of candidates
   * @example 100
   */
  @ApiProperty({
    description: 'The total number of candidates',
    example: 100,
  })
  @IsInt()
  candidates: number;

  /**
   * The number of active candidates
   * @example 75
   */
  @ApiProperty({
    description: 'The number of active candidates',
    example: 75,
  })
  @IsInt()
  activeCandidates: number;

  /**
   * The number of disqualified candidates
   * @example 25
   */
  @ApiProperty({
    description: 'The number of disqualified candidates',
    example: 25,
  })
  @IsInt()
  disqualifiedCandidates: number;

  /**
   * The number of stages in the hiring process
   * @example 5
   */
  @ApiProperty({
    description: 'The number of stages in the hiring process',
    example: 5,
  })
  @IsInt()
  numberOfStages: number;

  /**
   * The ID of the job associated with this hiring process
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the job associated with this hiring process',
    example: 1,
  })
  @IsInt()
  jobId: number;

  constructor(
    candidates: number,
    activeCandidates: number,
    disqualifiedCandidates: number,
    numberOfStages: number,
    jobId: number,
  ) {
    this.candidates = candidates;
    this.activeCandidates = activeCandidates;
    this.disqualifiedCandidates = disqualifiedCandidates;
    this.numberOfStages = numberOfStages;
    this.jobId = jobId;
  }
}
