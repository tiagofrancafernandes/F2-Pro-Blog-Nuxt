// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: [
        '@nuxt/icon',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        '@oro.ad/nuxt-claude-devtools',
    ],

    // Environment variables for dynamic configuration
    app: {
        head: {
            htmlAttrs: {
                lang: 'pt-BR',
            },
        },
    },

    // App config with dynamic values from environment
    appConfig: {
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        blogTitle: process.env.NUXT_PUBLIC_BLOG_TITLE || 'Tiago França',
        blogAuthor: process.env.NUXT_PUBLIC_BLOG_AUTHOR || 'Tiago França',
        blogDescription: process.env.NUXT_PUBLIC_BLOG_DESCRIPTION || 'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.',
    },
});
