export default defineAppConfig({
  public: {
    blog: {
      title: process.env.NUXT_PUBLIC_BLOG_TITLE || 'Tiago França',
      author: process.env.NUXT_PUBLIC_BLOG_AUTHOR || 'Tiago França',
      description: process.env.NUXT_PUBLIC_BLOG_DESCRIPTION || 'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.',
    },
    colors: {
      primary: '#ef4444',
      secondary: '#7c3aed',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      neutral: '#6b7280',
      dark: {
        primary: '#60a5fa',
        secondary: '#a78bfa',
        bg: '#0f172a',
        surface: '#1e293b',
        text: '#f1f5f9',
      },
    },
  },
  siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  search: {
    minScore: parseFloat(process.env.NUXT_PUBLIC_SEARCH_MIN_SCORE || '0.6'),
  },
  disqus: {
    shortname: process.env.NUXT_PUBLIC_DISQUS_SHORTNAME || '',
  },
  social: {
    twitterHandle: process.env.NUXT_PUBLIC_TWITTER_HANDLE || '',
  },
})
