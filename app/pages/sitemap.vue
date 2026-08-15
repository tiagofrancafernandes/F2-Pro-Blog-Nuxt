<template>
    <div class="min-h-screen bg-white dark:bg-slate-900">
        <!-- Hero Section -->
        <section class="bg-red-600 dark:bg-red-700 text-white py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                    {{ $t('sitemap.title') }}
                </h1>
                <p class="text-red-100 text-lg max-w-2xl">
                    {{ $t('sitemap.description') }}
                </p>
            </div>
        </section>

        <!-- Main Content -->
        <section class="py-16 sm:py-24">
            <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <!-- Landing Pages Section -->
                <div class="mb-16">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        {{ $t('sitemap.landingPages') }}
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <NuxtLink
                            v-for="page in landingPages"
                            :key="page.slug"
                            :to="`/lp/${page.slug}`"
                            class="p-6 border-2 border-gray-200 dark:border-slate-700 rounded-lg hover:border-red-600 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
                        >
                            <div class="flex items-start justify-between mb-3">
                                <h3 class="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                                    {{ getPageTitle(page) }}
                                </h3>
                                <Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-400 group-hover:text-red-600 flex-shrink-0" />
                            </div>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                {{ getPageDescription(page) }}
                            </p>
                        </NuxtLink>
                    </div>
                </div>

                <!-- Main Pages Section -->
                <div class="border-t border-gray-200 dark:border-slate-700 pt-16">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        {{ $t('sitemap.mainPages') }}
                    </h2>

                    <ul class="space-y-4">
                        <li>
                            <NuxtLink
                                to="/"
                                class="text-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                            >
                                {{ $t('nav.home') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/"
                                class="text-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                            >
                                {{ $t('nav.posts') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/about"
                                class="text-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                            >
                                {{ $t('nav.about') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/hire-me"
                                class="text-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                            >
                                {{ $t('nav.hireMe') }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useI18n } from 'vue-i18n'

    const { locale } = useI18n()
    const landingPages = ref<any[]>([])

    function getPageTitle(page: any): string {
        return page.translations[locale.value]?.title || page.translations['en-US']?.title
    }

    function getPageDescription(page: any): string {
        return page.translations[locale.value]?.description || page.translations['en-US']?.description
    }

    onMounted(async () => {
        try {
            const response = await fetch('/data/lp/index.json')
            const data = await response.json()
            landingPages.value = data.landingPages
        } catch (error) {
            console.error('Failed to load landing pages index:', error)
        }
    })
</script>

<i18n lang="json">
{
    "en-US": {
        "sitemap": {
            "title": "Sitemap",
            "description": "Explore all available pages and learning resources.",
            "landingPages": "Learning Programs",
            "mainPages": "Main Pages"
        }
    },
    "pt-BR": {
        "sitemap": {
            "title": "Mapa do Site",
            "description": "Explore todas as páginas disponíveis e recursos de aprendizado.",
            "landingPages": "Programas de Aprendizado",
            "mainPages": "Páginas Principais"
        }
    }
}
</i18n>
