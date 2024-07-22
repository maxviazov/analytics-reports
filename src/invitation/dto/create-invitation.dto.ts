import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating an invitation.
 */
export class CreateInvitationDto {
  /**
   * The date when the invitation was sent.
   * @example '2024-07-20T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date when the invitation was sent',
    type: String,
    format: 'date-time',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDate()
  sentDate: Date;

  /**
   * The date when the invitation was accepted (optional).
   * @example '2024-07-21T00:00:00.000Z'
   */
  @ApiProperty({
    description: 'The date when the invitation was accepted (optional)',
    type: String,
    format: 'date-time',
    required: false,
    example: '2024-07-21T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  acceptedDate?: Date;

  /**
   * The status of the invitation (e.g., "Accepted", "Pending").
   * @example 'Accepted'
   */
  @ApiProperty({
    description: 'The status of the invitation',
    type: String,
    example: 'Accepted',
  })
  @IsString()
  status: string;

  /**
   * The ID of the user associated with the invitation.
   * @example 1
   */
  @ApiProperty({
    description: 'The ID of the user associated with the invitation',
    type: Number,
    example: 1,
  })
  @IsInt()
  userId: number;

  constructor(
    sentDate: Date,
    status: string,
    userId: number,
    acceptedDate?: Date,
  ) {
    this.sentDate = sentDate;
    this.status = status;
    this.userId = userId;
    this.acceptedDate = acceptedDate;
  }
}
