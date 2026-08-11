export default defineAppConfig({
  blog: {
    title: process.env.NUXT_PUBLIC_BLOG_TITLE || 'Tiago França',
    author: process.env.NUXT_PUBLIC_BLOG_AUTHOR || 'Tiago França',
    description: process.env.NUXT_PUBLIC_BLOG_DESCRIPTION || 'Explore artigos sobre desenvolvimento...',
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
