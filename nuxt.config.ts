// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: [
        '@nuxt/icon',
        // '@nuxtjs/algolia',
        '@nuxtjs/color-mode',
        // '@nuxtjs/i18n',
        // '@nuxtjs/seo',
        '@nuxtjs/tailwindcss',
        '@oro.ad/nuxt-claude-devtools',
    ],
});
