import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useShare } from '../useShare'

// Mock useAppConfig
vi.mock('#app', () => ({
  useAppConfig: () => ({
    siteUrl: 'http://localhost:3000',
  }),
}))

describe('useShare', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post Title',
    description: 'Test description',
  }

  it('generates correct share URLs', () => {
    const { shareUrls } = useShare(mockPost)

    expect(shareUrls.value.twitter).toContain('twitter.com/intent/tweet')
    expect(shareUrls.value.facebook).toContain('facebook.com/sharer')
    expect(shareUrls.value.linkedin).toContain('linkedin.com/sharing')
    expect(shareUrls.value.whatsapp).toContain('wa.me')
  })

  it('encodes URL properly', () => {
    const { postUrl } = useShare(mockPost)
    expect(postUrl.value).toContain('/posts/test-post')
  })

  it('encodes title in share URLs', () => {
    const { shareUrls } = useShare(mockPost)
    const encodedTitle = encodeURIComponent('Test Post Title')
    expect(shareUrls.value.twitter).toContain(encodedTitle)
  })

  it('handles email share URL', () => {
    const { shareUrls } = useShare(mockPost)
    expect(shareUrls.value.email).toContain('mailto:')
    expect(shareUrls.value.email).toContain('subject=')
  })
})
