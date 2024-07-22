import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessJob } from '../../business-job/entities/business-job.entity';

/**
 * Entity representing a Hiring record
 */
@Entity('hiring')
export class Hiring {
  /**
   * Unique identifier for the hiring record
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The total number of candidates
   */
  @Column({ type: 'int' })
  candidates: number;

  /**
   * The number of active candidates
   */
  @Column({ type: 'int' })
  activeCandidates: number;

  /**
   * The number of disqualified candidates
   */
  @Column({ type: 'int' })
  disqualifiedCandidates: number;

  /**
   * The number of stages in the hiring process
   */
  @Column({ type: 'int' })
  numberOfStages: number;

  /**
   * The job associated with this hiring process
   */
  @ManyToOne(() => BusinessJob, (businessJob) => businessJob.id)
  @JoinColumn({ name: 'job_id' })
  job: BusinessJob;

  constructor(
    id: number,
    candidates: number,
    activeCandidates: number,
    disqualifiedCandidates: number,
    numberOfStages: number,
    job: BusinessJob,
  ) {
    this.id = id;
    this.candidates = candidates;
    this.activeCandidates = activeCandidates;
    this.disqualifiedCandidates = disqualifiedCandidates;
    this.numberOfStages = numberOfStages;
    this.job = job;
  }
}
