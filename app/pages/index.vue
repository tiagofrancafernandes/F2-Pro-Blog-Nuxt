<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-red-600 dark:bg-red-700 text-white py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                            {{ $t('hero.title') }}
                        </h1>
                        <p class="text-lg sm:text-xl mb-8 text-red-100">
                            {{ $t('hero.subtitle') }}
                        </p>
                        <button class="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors">
                            {{ $t('hero.cta') }}
                        </button>
                    </div>
                    <div class="hidden md:flex items-center justify-center">
                        <div class="w-64 h-64 bg-red-500 rounded-lg opacity-20"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tags Section -->
        <section class="border-b border-gray-200 dark:border-slate-700 py-6">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="tag in allTags"
                        :key="tag"
                        @click="toggleTag(tag)"
                        :class="getTagClass(tag)"
                    >
                        {{ tag }}
                    </button>
                </div>
            </div>
        </section>

        <!-- Posts Grid -->
        <section class="py-16">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="i in 6" :key="i" class="h-64 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                </div>

                <div v-else-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article
                        v-for="post in filteredPosts"
                        :key="post.slug"
                        class="border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow"
                    >
                        <div class="flex gap-4">
                            <div class="flex-1">
                                <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    {{ formatDate(post.date) }} • {{ post.readTime }} {{ $t('posts.readTime') }}
                                </div>
                                <NuxtLink
                                    :to="`/posts/${post.slug}`"
                                    class="block text-lg font-semibold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 mb-2"
                                >
                                    {{ getPostTitle(post) }}
                                </NuxtLink>
                                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {{ getPostDescription(post) }}
                                </p>
                                <div class="flex flex-wrap gap-1 mb-4">
                                    <span
                                        v-for="t in post.tags"
                                        :key="t"
                                        class="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full"
                                    >
                                        {{ t }}
                                    </span>
                                </div>
                                <NuxtLink
                                    :to="`/posts/${post.slug}`"
                                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm"
                                >
                                    {{ $t('posts.readMore') }} →
                                </NuxtLink>
                            </div>
                        </div>
                    </article>
                </div>

                <div v-else class="text-center py-16">
                    <p class="text-gray-600 dark:text-gray-400">{{ $t('posts.noResults') }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'
    import { useI18n } from 'vue-i18n'

    interface PostTranslations {
        'en-US': {
            title: string
            description: string
            content: string
        }
        'pt-BR': {
            title: string
            description: string
            content: string
        }
    }

    interface Post {
        id: number
        slug: string
        translations: PostTranslations
        date: string
        readTime: number
        category: string
        tags: string[]
    }

    const { locale } = useI18n()
    const posts = ref<Post[]>([])
    const isLoading = ref(true)
    const activeTag = ref<string | null>(null)

    const allTags = computed(() => {
        const tags = new Set<string>()
        posts.value.forEach((post) => {
            post.tags.forEach((tag) => tags.add(tag))
        })
        return Array.from(tags).sort()
    })

    const filteredPosts = computed(() => {
        if (!activeTag.value) {
            return posts.value
        }

        return posts.value.filter((post) => post.tags.includes(activeTag.value!))
    })

    function getPostTitle(post: Post): string {
        const currentLocale = locale.value as 'en-US' | 'pt-BR'
        return post.translations[currentLocale]?.title || post.translations['en-US'].title
    }

    function getPostDescription(post: Post): string {
        const currentLocale = locale.value as 'en-US' | 'pt-BR'
        return post.translations[currentLocale]?.description || post.translations['en-US'].description
    }

    function formatDate(date: string): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    function toggleTag(tag: string): void {
        activeTag.value = activeTag.value === tag ? null : tag
    }

    function getTagClass(tag: string): string {
        if (activeTag.value === tag) {
            return 'px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-red-600 text-white'
        }

        return 'px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
    }

    onMounted(async () => {
        if (isLoading.value === false) {
            return
        }

        try {
            const response = await fetch('/data/posts/index.json')

            if (!response.ok) {
                isLoading.value = false
                return
            }

            const data = await response.json()
            posts.value = data.posts || data
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        } finally {
            isLoading.value = false
        }
    })
</script>
