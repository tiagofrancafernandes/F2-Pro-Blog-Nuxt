<template>
    <div v-if="posts.length > 0" class="mb-8">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {{ $t('post.relatedTutorials') || 'Related Tutorials' }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink
                v-for="post in posts"
                :key="post.slug"
                :to="`/posts/${post.slug}`"
                class="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow"
            >
                <div class="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
                    {{ $t('post.tutorial') || 'TUTORIAL' }}
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {{ getPostTitle(post) }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {{ getPostDescription(post) }}
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500 dark:text-gray-500">
                        {{ post.readTime }} {{ $t('posts.readTime') }}
                    </span>
                    <Icon name="mdi:arrow-right" class="w-4 h-4 text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform" />
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
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
        readTime: number
        category: string
    }

    const { locale } = useI18n()

    defineProps<{
        posts: Post[]
    }>()

    function getPostTitle(post: Post): string {
        const currentLocale = locale.value as 'en-US' | 'pt-BR'
        return post.translations[currentLocale]?.title || post.translations['en-US'].title
    }

    function getPostDescription(post: Post): string {
        const currentLocale = locale.value as 'en-US' | 'pt-BR'
        return post.translations[currentLocale]?.description || post.translations['en-US'].description
    }
</script>
