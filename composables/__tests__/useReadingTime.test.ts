import { describe, it, expect } from 'vitest'
import { getReadingTime } from '../useReadingTime'

describe('useReadingTime', () => {
  it('calculates reading time correctly', () => {
    const words200 = Array(200).fill('word').join(' ')
    expect(getReadingTime(words200)).toBe(1)

    const words1000 = Array(1000).fill('word').join(' ')
    expect(getReadingTime(words1000)).toBe(5)

    const words250 = Array(250).fill('word').join(' ')
    expect(getReadingTime(words250)).toBe(2)
  })

  it('handles HTML tags', () => {
    const text = '<p>This is a test</p>'.repeat(50)
    expect(getReadingTime(text)).toBe(1)
  })

  it('handles markdown', () => {
    const text = '# Title\n\n**Bold text** here'.repeat(50)
    expect(getReadingTime(text)).toBeGreaterThan(0)
  })

  it('handles empty content', () => {
    expect(getReadingTime('')).toBe(0)
  })
})
