import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity('urls')
@Index('IDX_url_slug_clickCount', ['slug', 'clickCount'])
@Index('IDX_url_clickCount', ['clickCount'])
export class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  @Index('IDX_url_slug')
  slug: string

  @Column('text', { nullable: false })
  originalUrl: string

  @Column({ default: 0 })
  clickCount: number

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User | null

  @Column({ type: 'uuid', nullable: true })
  createdById: string | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
