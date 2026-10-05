<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-emerald-600 dark:bg-emerald-700 text-white py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div class="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold uppercase tracking-wider">
                            <Icon name="mdi:book-open-page-variant" class="w-4 h-4" />
                            <span>{{ $t('nav.posts') }}</span>
                        </div>
                        <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                            {{ $t('hero.title') }}
                        </h1>
                        <p class="text-lg sm:text-xl text-emerald-100">
                            {{ $t('hero.subtitle') }}
                        </p>
                    </div>
                    <div class="hidden md:flex items-center justify-center">
                        <div class="w-64 h-64 bg-emerald-500 rounded-lg opacity-20 flex items-center justify-center">
                            <Icon name="mdi:post-outline" class="w-32 h-32 text-white opacity-40" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tags Section -->
        <section class="border-b border-gray-200 dark:border-slate-700 py-6 bg-gray-50/50 dark:bg-slate-900/50">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between gap-4 flex-wrap">
                    <div class="flex flex-wrap gap-2 items-center">
                        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-2">Tags:</span>
                        <button
                            v-for="tag in allTags"
                            :key="tag"
                            @click="toggleTag(tag)"
                            :class="getTagClass(tag)"
                        >
                            {{ tag }}
                        </button>
                    </div>
                    <NuxtLink
                        to="/posts/search"
                        class="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                        <Icon name="mdi:magnify" class="w-4 h-4" />
                        <span>{{ $t('nav.search') }}</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Posts Grid -->
        <section class="py-16">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 min-h-64">
                    <LoadingSpinner size="lg" :text="$t('posts.loading')" />
                </div>

                <div v-else-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article
                        v-for="post in filteredPosts"
                        :key="post.slug"
                        class="shadow shadow-gray-200 dark:shadow-slate-700 rounded-lg overflow-hidden hover:shadow-md dark:hover:shadow-lg hover:shadow-emerald-400 dark:hover:shadow-emerald-500 transition-all group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800"
                    >
                        <NuxtLink :to="`/posts/${post.slug}`">
                            <ImageWithFallback :src="post.coverImage" :alt="getPostTitle(post)" />
                        </NuxtLink>

                        <div class="p-6">
                            <NuxtLink
                                :to="`/posts/${post.slug}`"
                                class="block text-lg font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 mb-2 transition-colors"
                            >
                                {{ getPostTitle(post) }}
                            </NuxtLink>

                            <div class="flex items-center justify-between mb-2">
                                <div class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                    {{ post.category }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ formatDate(post.date) }}
                                </div>
                            </div>

                            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {{ getPostDescription(post) }}
                            </p>

                            <div class="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                                <div class="flex flex-wrap gap-1">
                                    <NuxtLink
                                        v-for="tag in post.tags"
                                        :key="tag"
                                        :to="`/posts/search?tags=${tag}`"
                                        class="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        {{ tag }}
                                    </NuxtLink>
                                </div>
                                <span class="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                                    {{ post.readTime }} {{ $t('posts.readTime') }}
                                </span>
                            </div>

                            <NuxtLink
                                :to="`/posts/${post.slug}`"
                                class="block text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-medium text-sm mt-4"
                            >
                                {{ $t('posts.readMore') }} →
                            </NuxtLink>
                        </div>
                    </article>
                </div>

                <div v-else class="text-center py-16">
                    <Icon name="mdi:file-document-outline" class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4 opacity-50" />
                    <p class="text-gray-600 dark:text-gray-400 text-lg">{{ $t('posts.noResults') }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSEOMeta } from '~/composables/useSEOMeta';

interface PostTranslations {
    'en-US': {
        title: string;
        description: string;
        content: string;
    };
    'pt-BR': {
        title: string;
        description: string;
        content: string;
    };
}

interface Post {
    id: number;
    slug: string;
    translations: PostTranslations;
    date: string;
    readTime: number;
    category: string;
    tags: string[];
    coverImage?: string;
}

const { locale, t } = useI18n();
const posts = ref<Post[]>([]);
const isLoading = ref(true);
const activeTag = ref<string | null>(null);

useSEOMeta({
    title: () => `${t('nav.posts')} - Tiago França`,
    description: () => t('hero.subtitle'),
});

const allTags = computed(() => {
    const tags = new Set<string>();
    posts.value.forEach((post) => {
        post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
});

const filteredPosts = computed(() => {
    if (!activeTag.value) {
        return posts.value;
    }

    return posts.value.filter((post) => post.tags.includes(activeTag.value!));
});

function getPostTitle(post: Post): string {
    const currentLocale = locale.value as 'en-US' | 'pt-BR';
    return post.translations[currentLocale]?.title || post.translations['en-US'].title;
}

function getPostDescription(post: Post): string {
    const currentLocale = locale.value as 'en-US' | 'pt-BR';
    return post.translations[currentLocale]?.description || post.translations['en-US'].description;
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString(locale.value === 'pt-BR' ? 'pt-BR' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function toggleTag(tag: string): void {
    activeTag.value = activeTag.value === tag ? null : tag;
}

function getTagClass(tag: string): string {
    if (activeTag.value === tag) {
        return 'px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-emerald-600 text-white';
    }

    return 'px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700';
}

onMounted(async () => {
    try {
        const response = await fetch('/data/posts/index.json');

        if (!response.ok) {
            isLoading.value = false;
            return;
        }

        const data = await response.json();
        posts.value = data.posts || data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>
