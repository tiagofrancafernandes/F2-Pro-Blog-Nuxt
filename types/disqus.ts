declare global {
  interface Window {
    DISQUS?: {
      reset: (config: any) => void
      getThreads: () => any[]
    }
    disqus_config?: () => void
    disqus_identifier?: string
    disqus_title?: string
    disqus_url?: string
    disqus_shortname?: string
  }
}

export {}
