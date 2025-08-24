import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MoreThan, Repository } from 'typeorm'
import { Url } from '../entities/url.entity'
import { OnEvent } from '@nestjs/event-emitter'
import { SlugGenerator } from '../utils/slug-generator'
import { Events } from 'src/app.constants'

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>
  ) {}

  private async create(dto: Partial<Url>): Promise<Url> {
    const url = this.urlRepository.create({
      ...dto,
    })
    return this.urlRepository.save(url)
  }

  /**
   * Saves the original url and generates a custom slug
   * @param url - the url the slug will redirect to
   * @returns Url Object containing the slug and url
   */
  async createWithGeneratedSlug(url: string, userId?: string): Promise<Url> {
    let slug = SlugGenerator.generateFromText(url)
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      const exists = await this.findBySlug(slug)

      if (!exists) {
        break
      }
      // include timestamp in case someone else already created
      // a record with the underlying url
      slug = SlugGenerator.generateWithTimestamp(url)

      attempts++
    }

    // One last chance to get a unique slug
    if (attempts >= maxAttempts) {
      slug = SlugGenerator.generate()
    }

    return this.create({
      originalUrl: url,
      slug,
      createdById: userId,
    })
  }

  /**
   * Gets the url record for the underlying slug
   * @param slug - the url the slug will redirect to
   * @returns Url Object containing the slug and url
   */
  async findBySlug(slug: string): Promise<Url | null> {
    return this.urlRepository.findOne({ where: { slug } })
  }

  /**
   * Increases the url click count
   * @param id - id of the url record
   * @returns an update result { affected: number }
   */
  async incrementClickCount(id: string): Promise<void> {
    await this.urlRepository.increment({ id }, 'clickCount', 1)
  }

  /**
   * updates the Url record with a custom slug
   * @param id - id of the url record
   * @param newSlug - custom slug for the url record
   * @returns the updated url record
   */
  async updateSlug(id: string, newSlug: string): Promise<Url | null> {
    await this.urlRepository.update(id, { slug: newSlug })
    return this.urlRepository.findOne({ where: { id } })
  }

  /**
   * updates the Url record with a user id
   * @param id - id of the url record
   * @param createdById -user Id
   * @returns the updated url record
   */
  async updateUrlOwner(id: string, createdById: string): Promise<Url | null> {
    const url = await this.urlRepository.findOne({ where: { id } })
    if (url?.createdById) {
      throw new Error('Cannot change owner!')
    }
    await this.urlRepository.update(id, { createdById })
    return this.urlRepository.findOne({ where: { id } })
  }

  /**
   * return most cliked urls
   * @param userId - User who created the short url
   * @param limit - number of url records to retrieved
   * @param skip - number of url records to skip
   * @returns List of Url records - Promise<Url[]>
   */
  async findMostPopular(userId: string, limit: number = 10, skip: number = 0): Promise<Url[]> {
    return this.urlRepository.find({
      order: { clickCount: 'DESC' },
      take: limit,
      skip: skip,
      where: {
        createdById: userId,
        clickCount: MoreThan(0),
      },
    })
  }

  /**
   * return most cliked urls
   * @param limit - number of url records to retrieved
   * @returns List of Url records - Promise<Url[]>
   */
  async findRecentUrls(limit: number = 10, userId: string): Promise<Url[]> {
    return this.urlRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      where: {
        createdById: userId,
      },
    })
  }

  /**
   * return number of urls per user
   * @param userId - user id
   * @returns Number
   */
  async count(userId: string): Promise<number> {
    return this.urlRepository.count({
      where: {
        createdById: userId,
      },
    })
  }

  /**
   * return number of urls per user
   * @param userId - user id
   * @returns Number
   */
  async countClicks(userId: string): Promise<number | null> {
    return this.urlRepository.sum('clickCount', {
      createdById: userId,
    })
  }

  /**
   * deletes a url record from the database
   * @param limit - number of url records to retrieved
   * @returns Delete result - Promise<{ affected: number }>
   */
  async remove(id: string): Promise<void> {
    await this.urlRepository.delete(id)
  }

  @OnEvent(Events.URL_CLICKED)
  async handleOrderCreatedEvent(url: Url) {
    await this.incrementClickCount(url.id)
  }
}
