import { computed } from 'vue'
import type { Ref } from 'vue'

interface Post {
  slug: string
  title: string
  description?: string
}

export function useShare(post: any) {
  const config = useAppConfig()
  const siteUrl = config.siteUrl || 'https://tiagofr.dev'

  const postUrl = computed(() => {
    const p = typeof post === 'object' && 'value' in post ? post.value : post
    return `${siteUrl}/posts/${p.slug}`
  })

  const postTitle = computed(() => {
    const p = typeof post === 'object' && 'value' in post ? post.value : post
    return encodeURIComponent(p.title)
  })

  const shareUrls = computed(() => {
    const url = postUrl.value
    const title = postTitle.value

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${title}%20${encodeURIComponent(url)}`,
      email: `mailto:?subject=${title}&body=${encodeURIComponent(url)}`,
    }
  })

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(postUrl.value)
      return true
    } catch (err) {
      console.error('Failed to copy:', err)
      return false
    }
  }

  return {
    shareUrls,
    copyUrl,
    postUrl,
  }
}
