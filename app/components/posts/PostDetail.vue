<template>
    <article class="mx-auto max-w-3xl px-4 py-12">
        <!-- Back Link -->
        <div class="mb-8">
            <NuxtLink
                to="/"
                :class="[
                    'inline-flex items-center gap-2 text-sm font-medium transition-colors',
                    {
                        'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300':
                            true,
                    },
                ]"
            >
                <iconify-icon icon="fa7-solid:arrow-left" class="h-4 w-4"></iconify-icon>
                Voltar para posts
            </NuxtLink>
        </div>

        <!-- Category Badge -->
        <div class="mb-6">
            <span
                class="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white transition-all"
                :style="{ backgroundColor: appConfig.public.colors.primary }"
            >
                {{ post.category }}
            </span>
        </div>

        <!-- Title -->
        <h1 class="mb-6 text-4xl font-bold text-neutral-900 dark:text-neutral-50">
            {{ post.title }}
        </h1>

        <!-- Meta Information -->
        <div
            class="mb-8 flex flex-wrap gap-6 border-b border-neutral-200 pb-8 dark:border-neutral-700"
        >
            <!-- Date -->
            <div class="flex items-center gap-2">
                <iconify-icon
                    icon="fa7-solid:calendar"
                    class="h-4 w-4 text-neutral-600 dark:text-neutral-400"
                ></iconify-icon>
                <span class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ formatDate(post.date) }}
                </span>
            </div>

            <!-- Author -->
            <div class="flex items-center gap-2">
                <iconify-icon
                    icon="fa7-solid:user"
                    class="h-4 w-4 text-neutral-600 dark:text-neutral-400"
                ></iconify-icon>
                <span class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ post.author }}
                </span>
            </div>

            <!-- Read Time -->
            <div class="flex items-center gap-2">
                <iconify-icon
                    icon="fa7-solid:clock"
                    class="h-4 w-4 text-neutral-600 dark:text-neutral-400"
                ></iconify-icon>
                <span class="text-sm text-neutral-600 dark:text-neutral-400">
                    {{ post.readTime }} min
                </span>
            </div>
        </div>

        <!-- Cover Image -->
        <div class="mb-12 overflow-hidden rounded-lg">
            <img
                :src="post.coverImage"
                :alt="post.title"
                class="h-96 w-full object-cover"
            />
        </div>

        <!-- Content -->
        <div class="prose dark:prose-invert prose-neutral max-w-none">
            <div v-html="post.content"></div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * TypeScript interface for Post
 */
interface Post {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    coverImage: string;
    category: string;
    date: string;
    readTime: number;
    author: string;
}

/**
 * Props definition
 */
defineProps<{
    post: Post;
}>();

/**
 * Global app config for colors
 */
const appConfig = useAppConfig();

/**
 * Format date to readable format
 */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};
</script>

<style scoped>
:deep(.prose) {
    color: rgb(23, 23, 23);
}

:deep(.dark .prose) {
    color: rgb(241, 245, 249);
}

:deep(.prose h2) {
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 2.25rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: rgb(23, 23, 23);
}

:deep(.dark .prose h2) {
    color: rgb(241, 245, 249);
}

:deep(.prose h3) {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: rgb(23, 23, 23);
}

:deep(.dark .prose h3) {
    color: rgb(241, 245, 249);
}

:deep(.prose p) {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    line-height: 1.75;
}

:deep(.prose a) {
    color: rgb(37, 99, 235);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
}

:deep(.prose a:hover) {
    color: rgb(29, 78, 216);
}

:deep(.dark .prose a) {
    color: rgb(96, 165, 250);
}

:deep(.dark .prose a:hover) {
    color: rgb(147, 197, 253);
}

:deep(.prose code) {
    background-color: rgb(243, 244, 246);
    color: rgb(17, 24, 39);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    font-weight: 500;
}

:deep(.dark .prose code) {
    background-color: rgb(31, 41, 55);
    color: rgb(243, 244, 246);
}

:deep(.prose pre) {
    background-color: rgb(31, 41, 55);
    color: rgb(243, 244, 246);
    padding: 1.5rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
}

:deep(.prose blockquote) {
    border-left: 4px solid rgb(229, 231, 235);
    padding-left: 1rem;
    font-style: italic;
    color: rgb(75, 85, 99);
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
}

:deep(.dark .prose blockquote) {
    border-left-color: rgb(55, 65, 81);
    color: rgb(156, 163, 175);
}

:deep(.prose ul),
:deep(.prose ol) {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    padding-left: 1.625rem;
}

:deep(.prose li) {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

:deep(.prose hr) {
    border-color: rgb(229, 231, 235);
    margin-top: 2rem;
    margin-bottom: 2rem;
}

:deep(.dark .prose hr) {
    border-color: rgb(55, 65, 81);
}
</style>
