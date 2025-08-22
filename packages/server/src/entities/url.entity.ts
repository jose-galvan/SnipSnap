import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'

@Entity('urls')
@Index('IDX_url_slug_clickCount', ['slug', 'clickCount'])
@Index('IDX_url_clickCount', ['clickCount'])
export class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @Index('IDX_url_slug')
  slug: string

  @Column('text')
  originalUrl: string

  @Column({ default: 0 })
  clickCount: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}