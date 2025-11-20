import { describe, expect, it } from '@jest/globals'
import addNumber from '../src/add.js'

describe('Sample test', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(addNumber(1, 2)).toBe(3)
  })
})
