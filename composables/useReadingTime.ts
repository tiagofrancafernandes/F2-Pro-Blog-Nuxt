import { computed, Ref } from 'vue'

const WORDS_PER_MINUTE = 200

function countWords(text: string): number {
  // Remove HTML/markdown tags
  const clean = text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[#*`\[\](){}]/g, '') // Remove markdown characters
    .trim()

  // Count words
  return clean.split(/\s+/).filter((word) => word.length > 0).length
}

export function useReadingTime(content: string | Ref<string>) {
  return computed(() => {
    const text = typeof content === 'string' ? content : content.value
    const wordCount = countWords(text)
    return Math.ceil(wordCount / WORDS_PER_MINUTE)
  })
}

export function getReadingTime(content: string): number {
  const wordCount = countWords(content)
  return Math.ceil(wordCount / WORDS_PER_MINUTE)
}
