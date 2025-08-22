import * as crypto from 'crypto'

const DEFAULT_LENGTH = 7
//note: you can include numbers if you want your slug to include numbers
const CHARS_ALLOWED = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export class SlugGenerator {

  /**
   * Generates a random slug
   * @param length custom length for the slug
   * @returns a random slug
   */
  static generate(length: number = DEFAULT_LENGTH): string {
    let slug = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * CHARS_ALLOWED.length)
      slug += CHARS_ALLOWED[randomIndex]
    }
    return slug
  }


  /**
   * Generates an slug based on string/text 
   * @param text - the original text for the slug
   * @param length - custom length for the slug
   * @returns an slug representing the string
   */
  static generateFromText(text: string, length: number = DEFAULT_LENGTH): string {
    
    const hash = crypto.createHash('sha256').update(text).digest('hex')
    let slug = ''

    // this uses BigInt for precise results using otherwise 64-bit number 
    // can result in incorrect index for the allowed chars
    let hashInt = BigInt('0x' + hash.substring(0, 16))
    
    while (slug.length < length) {
      const remainder = Number(hashInt % BigInt(CHARS_ALLOWED.length))
      slug = CHARS_ALLOWED[remainder] + slug
      hashInt = hashInt / BigInt(CHARS_ALLOWED.length)
    }
    
    return slug
  }

  /**
   * Generates an slug, appends timestamp to avoid collisions
   * @param text - the original text for the slug
   * @param length - custom slug length
   * @returns an slug with timestamp
   */
  static generateWithTimestamp(text: string, length: number = DEFAULT_LENGTH): string {
    return this.generateFromText(`${text}${Date.now().toString()}`, length)
  }
}
