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
});
