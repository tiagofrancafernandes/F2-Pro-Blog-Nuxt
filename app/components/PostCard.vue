<template>
    <NuxtLink :to="`/posts/${post.slug}`" class="group block h-full transition-all duration-300 hover:shadow-lg">
        <div
            class="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
        >
            <!-- Cover Image -->
            <div class="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                    :src="post.coverImage"
                    :alt="post.title"
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <!-- Content -->
            <div class="flex flex-1 flex-col justify-between p-6">
                <!-- Header -->
                <div class="space-y-3">
                    <!-- Category -->
                    <div class="inline-block">
                        <span
                            class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        >
                            {{ post.category }}
                        </span>
                    </div>

                    <!-- Title -->
                    <h3
                        class="text-lg font-bold leading-tight text-neutral-900 transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    >
                        {{ post.title }}
                    </h3>

                    <!-- Description -->
                    <p class="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                        {{ post.description }}
                    </p>
                </div>

                <!-- Footer -->
                <div
                    class="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800"
                >
                    <div class="flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-500">
                        <!-- Date -->
                        <time :datetime="post.date" class="flex items-center gap-1">
                            <iconify-icon icon="fa7-solid:calendar" class="text-neutral-400"></iconify-icon>
                            {{ formatDate(post.date) }}
                        </time>

                        <!-- Read Time -->
                        <span v-if="post.readTime" class="flex items-center gap-1">
                            <iconify-icon icon="fa7-solid:hourglass-end" class="text-neutral-400"></iconify-icon>
                            {{ post.readTime }} min
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
interface PostCard {
    id: number;
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    coverImage: string;
    readTime?: number;
}

defineProps<{
    post: PostCard;
}>();

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
</script>
