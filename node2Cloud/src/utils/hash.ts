import bcrypt from 'bcrypt'

export class Hash {
  private static saltRounds: number = 10

  static async create(plainText: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds)
      return await bcrypt.hash(plainText, salt)
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create hash: ${error.message}`)
      }
      throw new Error('Failed to create hash')
    }
  }

  static async compare(password: string, hashPass: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashPass)
      return isMatch
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to compare hash: ${error.message}`)
      }
      throw new Error('Failed to compare hash')
    }
  }

  static isHashed(value: string): boolean {
    return value.startsWith('$2b$') || value.startsWith('$2a$') || value.startsWith('$2y$')
  }
}
