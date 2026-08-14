import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: [
        '@nuxt/icon',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@oro.ad/nuxt-claude-devtools',
        '@nuxtjs/robots',
    ],

    i18n: {
        locales: [
            {
                code: 'en-US',
                iso: 'en-US',
                name: 'English',
            },
            {
                code: 'pt-BR',
                iso: 'pt-BR',
                name: 'Português',
            },
        ],
        defaultLocale: 'en-US',
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_locale',
            redirectOn: 'root',
            cookieDomain: undefined,
            cookieCrossOrigin: false,
            alwaysRedirect: false,
            fallbackLocale: 'en-US',
        },
        vueI18n: '~/i18n.config.ts',
    },

    // Environment variables for dynamic configuration
    app: {
        /* NUXT_APP_BASE_URL=/prefix/ node .output/server/index.mjs */
        /* baseURL: '/blog/', */

        head: {
            htmlAttrs: {
                lang: 'pt-BR',
            },
            title: 'Tiago França - Blog | Senior Backend Engineer',
            meta: [
                {
                    name: 'description',
                    content:
                        'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação. Aprenda algo novo a cada leitura.',
                },
                {
                    property: 'og:title',
                    content: 'Tiago França - Blog',
                },
                {
                    property: 'og:description',
                    content:
                        'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.',
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:image',
                    content: 'https://picsum.photos/id/10/1200/630',
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
                {
                    name: 'twitter:title',
                    content: 'Tiago França - Blog',
                },
                {
                    name: 'twitter:description',
                    content:
                        'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.',
                },
                {
                    name: 'twitter:image',
                    content: 'https://picsum.photos/id/10/1200/630',
                },
                {
                    name: 'keywords',
                    content: 'backend, PHP, Laravel, APIs, PostgreSQL, Docker, DevOps, desenvolvimento',
                },
                {
                    name: 'author',
                    content: 'Tiago França',
                },
                {
                    name: 'robots',
                    content: 'index, follow',
                },
                {
                    'http-equiv': 'content-type',
                    content: 'text/html; charset=UTF-8',
                },
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://googleapis.com',
                },
                {
                    rel: 'canonical',
                    href: 'http://localhost:3000/',
                },
            ],
        },
    },

    // Vue compiler options to register custom elements
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => {
                return (
                    tag &&
                    [
                        'iconify-icon',
                        // 'IconifyIcon',
                        //
                    ].includes(tag)
                );
            },
        },
    },

    // Component auto-import configuration
    components: {
        dirs: [
            {
                path: '~/components',
                pathPrefix: false,
            },
        ],
    },

    // Runtime configuration for environment-dependent values
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            blogTitle: process.env.NUXT_PUBLIC_BLOG_TITLE || 'Tiago França',
            blogAuthor: process.env.NUXT_PUBLIC_BLOG_AUTHOR || 'Tiago França',
            blogDescription:
                process.env.NUXT_PUBLIC_BLOG_DESCRIPTION ||
                'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.',
            searchMinScore: parseFloat(process.env.NUXT_PUBLIC_SEARCH_MIN_SCORE || '0.6'),
            disqusShortname: process.env.NUXT_PUBLIC_DISQUS_SHORTNAME || '',
            twitterHandle: process.env.NUXT_PUBLIC_TWITTER_HANDLE || '',
            canonicalUrl: process.env.NUXT_PUBLIC_CANONICAL_URL || '',
            githubUrl: process.env.NUXT_PUBLIC_GITHUB_URL || '',
            linkedinUrl: process.env.NUXT_PUBLIC_LINKEDIN_URL || '',
            googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
        },
    },

    // Add FuseJS to Vite
    vite: {
        ssr: {
            external: [],
        },
    },

    claudeDevtools: {
        enabled: true,
        claude: {
            command: 'claude', // Path to Claude CLI
            args: [
                '--allow-dangerously-skip-permissions',
                '--dangerously-skip-permissions',
                '--permission-mode',
                'acceptEdits',
            ], // Additional CLI arguments
        },
    },
    robots: {
        blockNonSeoBots: true,
        // blockAiBots: true,
    },
    alias: {
        images: fileURLToPath(new URL('./assets/images', import.meta.url)),
        style: fileURLToPath(new URL('./assets/style', import.meta.url)),
        data: fileURLToPath(new URL('./assets/other/data', import.meta.url)),
    },
});
