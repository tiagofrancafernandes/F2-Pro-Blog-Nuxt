<template>
    <div v-if="!isLoading">
        <div v-if="page">
            <!-- Hero Header -->
            <section class="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-800 dark:to-slate-900 text-white py-12 sm:py-16">
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <!-- Breadcrumbs -->
                    <div class="mb-4 flex items-center gap-2 text-emerald-100 text-sm">
                        <NuxtLink to="/" class="hover:text-white transition-colors">
                            {{ $t('nav.home') }}
                        </NuxtLink>
                        <span>/</span>
                        <span class="text-emerald-200">
                            {{ $t('sitemap.pageLinks') || 'Pages' }}
                        </span>
                        <span>/</span>
                        <span class="truncate max-w-[200px] sm:max-w-xs text-white font-medium">
                            {{ pageTitle }}
                        </span>
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            {{ pageTitle }}
                        </h1>
                        <span
                            v-if="page.updatedAt"
                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 self-start sm:self-auto"
                        >
                            <Icon name="mdi:calendar-clock" class="w-4 h-4" />
                            {{ isPt ? 'Atualizado em' : 'Updated' }} {{ formatDate(page.updatedAt) }}
                        </span>
                    </div>

                    <p
                        v-if="pageDescription"
                        class="mt-4 text-emerald-100/90 text-base sm:text-lg max-w-3xl"
                    >
                        {{ pageDescription }}
                    </p>
                </div>
            </section>

            <!-- Main Document Content -->
            <div class="bg-white dark:bg-slate-900 min-h-[50vh]">
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <!-- Table of Contents Sidebar -->
                        <div
                            v-if="headings.length > 0"
                            class="lg:col-span-1 order-last lg:order-first"
                        >
                            <TableOfContents :headings="headings" />
                        </div>

                        <!-- Markdown Content Body -->
                        <div
                            :class="[
                                headings.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4 max-w-4xl mx-auto',
                            ]"
                        >
                            <div
                                class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                                v-html="renderedContent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 404 / Page Not Found State -->
        <div v-else class="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-20">
            <Icon
                name="mdi:file-document-remove-outline"
                class="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4"
            />
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ isPt ? 'Página não encontrada' : 'Page not found' }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                {{ isPt
                    ? 'A página solicitada não foi localizada ou foi movida.'
                    : 'The requested document could not be found or has been moved.'
                }}
            </p>
            <NuxtLink
                to="/"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
            >
                <Icon name="mdi:arrow-left" class="w-4 h-4" />
                {{ isPt ? 'Voltar para a Home' : 'Back to Home' }}
            </NuxtLink>
        </div>
    </div>

    <!-- Loading State -->
    <div
        v-else
        class="flex flex-col items-center justify-center py-28 min-h-[50vh]"
    >
        <LoadingSpinner
            size="lg"
            :text="isPt ? 'Carregando página...' : 'Loading document...'"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { useI18n } from 'vue-i18n'
    import { useMarkdown } from '~/composables/useMarkdown'
    import { useSEOMeta } from '~/composables/useSEOMeta'

    interface PageTranslation {
        title: string
        description: string
        content: string
    }

    interface StaticPageData {
        id: string
        slug: string
        aliases?: string[]
        date?: string
        updatedAt?: string
        status: string
        translations: {
            'en-US': PageTranslation
            'pt-BR': PageTranslation
            [key: string]: PageTranslation | undefined
        }
    }

    interface Heading {
        level: number
        text: string
        id: string
    }

    const route = useRoute()
    const { locale } = useI18n()
    const { renderMarkdown, extractMarkdownHeadings } = useMarkdown()

    const rawData = ref<StaticPageData | null>(null)
    const isLoading = ref(true)
    const headings = ref<Heading[]>([])

    const isPt = computed(() => {
        return locale.value.startsWith('pt')
    })

    const activeLocale = computed<'en-US' | 'pt-BR'>(() => {
        if (locale.value.startsWith('pt')) {
            return 'pt-BR'
        }

        return 'en-US'
    })

    const page = computed<StaticPageData | null>(() => {
        return rawData.value
    })

    const currentTranslation = computed<PageTranslation | null>(() => {
        if (!rawData.value?.translations) {
            return null
        }

        const translations = rawData.value.translations
        return translations[activeLocale.value] || translations['pt-BR'] || translations['en-US'] || null
    })

    const pageTitle = computed(() => {
        return currentTranslation.value?.title || rawData.value?.slug || ''
    })

    const pageDescription = computed(() => {
        return currentTranslation.value?.description || ''
    })

    const renderedContent = computed(() => {
        const markdown = currentTranslation.value?.content || ''

        if (!markdown) {
            return ''
        }

        return renderMarkdown(markdown)
    })

    useSEOMeta({
        title: () => `${pageTitle.value} - Tiago França`,
        description: () => pageDescription.value,
        type: 'article',
    })

    watch(
        () => currentTranslation.value?.content,
        (newContent) => {
            if (!newContent) {
                headings.value = []
                return
            }

            headings.value = extractMarkdownHeadings(newContent)
        },
        { immediate: true },
    )

    function formatDate(dateStr?: string): string {
        if (!dateStr) {
            return ''
        }

        try {
            const date = new Date(dateStr)
            return date.toLocaleDateString(activeLocale.value, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        } catch {
            return dateStr
        }
    }

    async function loadPage(): Promise<void> {
        const slugParam = (route.params.slug as string) || ''

        if (!slugParam) {
            rawData.value = null
            isLoading.value = false
            return
        }

        isLoading.value = true

        try {
            // First attempt to load by exact slug
            let response = await fetch(`/data/pages/data/${slugParam}.json`)

            // If not found, try to look up alias in pages index
            if (!response.ok) {
                try {
                    const indexRes = await fetch('/data/pages/index.json')

                    if (indexRes.ok) {
                        const indexData = await indexRes.json()
                        const matched = indexData.pages?.find(
                            (p: any) => p.slug === slugParam || p.aliases?.includes(slugParam),
                        )

                        if (matched?.slug) {
                            response = await fetch(`/data/pages/data/${matched.slug}.json`)
                        }
                    }
                } catch {
                    // Fallthrough to handle not ok response
                }
            }

            if (!response.ok) {
                rawData.value = null
                return
            }

            const data: StaticPageData = await response.json()
            rawData.value = data
        } catch (error) {
            console.error('Failed to load static page:', error)
            rawData.value = null
        } finally {
            isLoading.value = false
        }
    }

    onMounted(async () => {
        await loadPage()
    })

    watch(
        () => route.params.slug,
        async () => {
            await loadPage()
        },
    )
</script>
