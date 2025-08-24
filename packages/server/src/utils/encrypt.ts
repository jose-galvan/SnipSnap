import * as crypto from 'crypto'

/**
 * Encrypts the provided text using PBKDF2 algorithm with the given salt.
 * @param text The text to encrypt.
 * @param salt The salt to use for encryption.
 * @returns {Promise<string>} A Promise that resolves with the encrypted text.
 */
export const encryptWithSalt = (text: string, salt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(text, salt, 10000, 64, 'sha512', (error, key) => {
      if (error) {
        reject(error)
      }
      resolve(key.toString('base64'))
    })
  })
}
