import { SlugGenerator } from './slug-generator'

describe('SlugGenerator', () => {

  describe('generate', () => {
    it('should generate random slugs with the default length', () => {
      const slug1 = SlugGenerator.generate()
      const slug2 = SlugGenerator.generate()

      expect(slug1).toHaveLength(7)
      expect(slug2).toHaveLength(7)
      expect(slug1).not.toBe(slug2)
    })

    it('generate slug with custom length', () => {
      const slug = SlugGenerator.generate(5)
      expect(slug).toHaveLength(5)
    })
  })

  describe('generateFromText', () => {
    it('should generate the same slug twice', () => {
      const url = 'https://chopchop.io/mySlug'
      const slug1 = SlugGenerator.generateFromText(url)
      const slug2 = SlugGenerator.generateFromText(url)

      expect(slug1).toBe(slug2)
      expect(slug1).toHaveLength(7)
    })

    it('should generate different slugs for the same url', () => {
      const url1 = 'https://chopchop.io/mySlug'
      const url2 = 'https://chopchop.io/mySlug2'

      const slug1 = SlugGenerator.generateFromText(url1)
      const slug2 = SlugGenerator.generateFromText(url2)

      expect(slug1).not.toBe(slug2)
    })

    it('should respect custom length', () => {
      const url = 'https://chopchop.io/mySlug'
      const slug = SlugGenerator.generateFromText(url, 10)
      expect(slug).toHaveLength(10)
    })
  })

  describe('generateWithTimestamp', () => {
    it('should generate different slugs for same URL at different times', async () => {
      const url = 'https://chopchop.io/mySlug'
      const slug1 = SlugGenerator.generateWithTimestamp(url)

      // delay generation for a different result
      await new Promise(resolve => setTimeout(resolve, 10))

      const slug2 = SlugGenerator.generateWithTimestamp(url)

      expect(slug1).not.toBe(slug2)
      expect(slug1).toHaveLength(7)
      expect(slug2).toHaveLength(7)
    })
  })
})
