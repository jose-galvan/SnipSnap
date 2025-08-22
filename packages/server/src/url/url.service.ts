import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Url } from '../entities/url.entity'

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>
  ) {}

  private generateSlug = (url: string) => url
  private generateRandom = () => Date.now().toString()

  async create(originalUrl: string, slug: string): Promise<Url> {
    const url = this.urlRepository.create({
      originalUrl,
      slug,
    })
    return this.urlRepository.save(url)
  }

  async createWithGeneratedSlug(originalUrl: string): Promise<Url> {
    let slug: string
    let attempts = 0
    const maxAttempts = 10

    // todo: Generate unique slug with collision handling
    do {
      slug = this.generateSlug(originalUrl)
      const existing = await this.findBySlug(slug)

      if (!existing) {
        break
      }

      //If collision, try with timestamp
      slug = this.generateSlug(`${originalUrl}|${Date.now()}`)
      attempts++
    } while (attempts < maxAttempts)

    if (attempts >= maxAttempts) {
      // todo: Fallback to random if still colliding

      slug = this.generateRandom()
    }

    return this.create(originalUrl, slug)
  }

  async findBySlug(slug: string): Promise<Url | null> {
    return this.urlRepository.findOne({ where: { slug } })
  }

  async incrementClickCount(id: string): Promise<void> {
    await this.urlRepository.increment({ id }, 'clickCount', 1)
  }

  async updateSlug(id: string, newSlug: string): Promise<Url | null> {
    await this.urlRepository.update(id, { slug: newSlug })
    return this.urlRepository.findOne({ where: { id } })
  }

  async regenerateSlug(id: string): Promise<Url | null> {
    const url = await this.urlRepository.findOne({ where: { id } })
    if (!url) {
      return null
    }

    const newSlug = this.generateSlug(url.originalUrl)
    return this.updateSlug(id, newSlug)
  }

  async findMostPopular(limit: number = 10): Promise<Url[]> {
    return this.urlRepository.find({
      order: { clickCount: 'DESC' },
      take: limit,
    })
  }

  async findRecentUrls(limit: number = 10): Promise<Url[]> {
    return this.urlRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    })
  }

  async remove(id: string): Promise<void> {
    await this.urlRepository.delete(id)
  }
}
