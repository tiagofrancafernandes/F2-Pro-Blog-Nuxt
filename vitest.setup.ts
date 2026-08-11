import { vi } from 'vitest'

const appConfig = {
  public: {
    blog: {
      title: 'Tiago França',
      author: 'Tiago França',
      description: 'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.',
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
  siteUrl: 'http://localhost:3000',
  search: {
    minScore: 0.6,
  },
  disqus: {
    shortname: '',
  },
  social: {
    twitterHandle: '',
  },
}

global.useAppConfig = () => appConfig
