<template>
    <div v-if="!isLoading">
        <div v-if="post">
            <!-- Hero -->
            <section class="bg-emerald-600 dark:bg-emerald-700 text-white py-12 sm:py-16">
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div class="mb-4 flex items-center gap-2 text-emerald-100">
                        <NuxtLink to="/" class="hover:text-white">{{ $t('nav.home') }}</NuxtLink>
                        <span>/</span>
                        <NuxtLink :to="`/posts/search?category=${post?.category}`" class="hover:text-white">
                            {{ post?.category }}
                        </NuxtLink>
                        <span>/</span>
                        <span>{{ getPostTitle() }}</span>
                    </div>
                    <div class="flex items-start justify-between mb-4">
                        <h1 class="text-4xl sm:text-5xl font-bold">{{ getPostTitle() }}</h1>
                        <span v-if="post.status !== 'published'" :class="getStatusBadgeClass()">
                            {{ post.status.toUpperCase() }}
                        </span>
                    </div>
                    <div class="flex flex-wrap gap-4 text-emerald-100 text-sm">
                        <span>{{ formatDate(post.date) }}</span>
                        <span>{{ post.readTime }} {{ $t('posts.readTime') }}</span>
                        <span>{{ post.category }}</span>
                    </div>
                </div>
            </section>

            <!-- Featured Image -->
            <section
                v-if="post.coverImage"
                class="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700"
            >
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
                    <ImageWithFallback
                        :src="post.coverImage"
                        :alt="getPostTitle()"
                        container-class="w-full h-80 rounded-lg overflow-hidden"
                        image-class="w-full h-full object-cover"
                    />
                </div>
            </section>

            <!-- Content -->
            <div class="bg-white dark:bg-slate-900">
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-6">
                        <!-- Table of Contents Sidebar -->
                        <div class="lg:col-span-1 order-last lg:order-first">
                            <TableOfContents :headings="headings" />
                        </div>

                        <!-- Main Content -->
                        <div class="lg:col-span-3">
                            <article>
                                <MarkdownRenderer :content="post.content" />
                            </article>

                            <!-- CTA Section -->
                            <div class="mt-16 p-8 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg">
                                <h2 class="text-2xl font-bold mb-2">{{ $t('post.cta') }}</h2>
                                <p class="mb-4">{{ $t('post.ctaDescription') }}</p>
                                <button
                                    class="px-6 py-2 bg-white text-emerald-600 font-semibold rounded hover:bg-emerald-50 transition-colors"
                                >
                                    {{ $t('post.ctaButton') }}
                                </button>
                            </div>
                        </div>

                        <!-- Sidebar -->
                        <div class="lg:col-span-1">
                            <div class="sticky top-20 space-y-6">
                                <!-- Tags -->
                                <div class="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                                    <h3 class="font-semibold text-gray-900 dark:text-white mb-3">
                                        {{ $t('post.tags') }}
                                    </h3>
                                    <div class="flex flex-wrap gap-2">
                                        <NuxtLink
                                            v-for="tag in post.tags"
                                            :key="tag"
                                            :to="`/posts/search?tags=${tag}`"
                                            class="text-xs px-2 py-1 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white transition-colors"
                                        >
                                            {{ tag }}
                                        </NuxtLink>
                                    </div>
                                </div>

                                <!-- Share -->
                                <div class="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                                    <SocialShare
                                        :url="shareUrl"
                                        :title="getPostTitle()"
                                        :description="post?.description"
                                        :hashtags="post?.tags"
                                        :label="$t('post.share')"
                                    />
                                </div>

                                <!-- Navigation -->
                                <div class="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                                    <NuxtLink
                                        to="/"
                                        class="block text-center px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors font-medium"
                                    >
                                        {{ $t('post.backToPosts') }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-16">
            <p class="text-gray-600 dark:text-gray-400">{{ $t('posts.noResults') }}</p>
            <NuxtLink to="/" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 mt-4 inline-block">
                {{ $t('post.backToPosts') }}
            </NuxtLink>
        </div>
    </div>

    <div v-else class="flex text-center py-16 justify-center content-center min-h-48 py-24">
        <span class="text-gray-600 dark:text-gray-400">{{ $t('post.loading') }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useMarkdown } from '~/composables/useMarkdown';

interface PostData {
    id: number;
    slug: string;
    translations: {
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
    };
    date: string;
    readTime: number;
    category: string;
    tags: string[];
    status: 'published' | 'draft' | 'archived';
    coverImage?: string;
}

interface Post {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    date: string;
    readTime: number;
    category: string;
    tags: string[];
    status: 'published' | 'draft' | 'archived';
    coverImage?: string;
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

const route = useRoute();
const { locale } = useI18n();
const { renderMarkdown, extractHeadings: extractMarkdownHeadings } = useMarkdown();

const post = ref<Post | null>(null);
const isLoading = ref(true);
const headings = ref<Heading[]>([]);

const shareUrl = computed(() => {
    if (!process.server) {
        return `${window.location.origin}/posts/${route.params.slug}`;
    }

    return '';
});

function getPostTitle(): string {
    if (!post.value) {
        return '';
    }

    return post.value.title;
}

function getStatusBadgeClass(): string {
    if (!post.value) {
        return '';
    }

    const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold';

    if (post.value.status === 'draft') {
        return `${baseClasses} bg-yellow-200 text-yellow-800`;
    }

    if (post.value.status === 'archived') {
        return `${baseClasses} bg-gray-200 text-gray-800`;
    }

    return baseClasses;
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
}


async function copyLink(): Promise<void> {
    const url = `${window.location.origin}/posts/${route.params.slug}`;

    try {
        await navigator.clipboard.writeText(url);
        alert('Link copied!');
    } catch (error) {
        console.error('Failed to copy link:', error);
    }
}

function mapPostData(data: PostData): Post {
    const currentLocale = locale.value as 'en-US' | 'pt-BR';
    const translations = data.translations[currentLocale] || data.translations['en-US'];

    return {
        id: data.id,
        slug: data.slug,
        title: translations.title,
        description: translations.description,
        content: translations.content,
        date: data.date,
        readTime: data.readTime,
        category: data.category,
        tags: data.tags,
        status: data.status,
        coverImage: data.coverImage,
    };
}

onMounted(async () => {
    if (isLoading.value === false) {
        return;
    }

    try {
        const slug = route.params.slug as string;
        const response = await fetch(`/data/posts/data/${slug}.json`);

        if (!response.ok) {
            post.value = null;
            isLoading.value = false;
            return;
        }

        const data: PostData = await response.json();
        post.value = mapPostData(data);
        headings.value = extractMarkdownHeadings(post.value.content || '');
    } catch (error) {
        console.error('Failed to fetch post:', error);
        post.value = null;
    } finally {
        isLoading.value = false;
    }
});
</script>
