<template>
    <NuxtLink :to="`/posts/${post.slug}`" class="group block h-full">
        <article
            :class="[
                'h-full flex flex-col rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden transition-all duration-300',
                {
                    'shadow-lg border-primary dark:border-primary': isHovered,
                    'shadow-md': !isHovered,
                },
            ]"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
        >
            <!-- Image Container -->
            <div class="relative h-48 w-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                <img
                    :src="post.image"
                    :alt="post.title"
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <!-- Content Container -->
            <div class="flex flex-1 flex-col p-4">
                <!-- Category Badge -->
                <div class="mb-3 flex items-start">
                    <span
                        class="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white transition-colors duration-300"
                        :style="{ backgroundColor: appConfig.public.colors.primary }"
                    >
                        {{ post.category }}
                    </span>
                </div>

                <!-- Title -->
                <h2
                    :class="[
                        'mb-2 text-lg font-semibold leading-tight line-clamp-2 transition-colors duration-300',
                        {
                            'text-primary dark:text-primary': isHovered,
                            'text-neutral-900 dark:text-neutral-100': !isHovered,
                        },
                    ]"
                >
                    {{ post.title }}
                </h2>

                <!-- Spacer -->
                <div class="flex-1" />

                <!-- Meta Information -->
                <div
                    class="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700 pt-3 text-xs text-neutral-600 dark:text-neutral-400"
                >
                    <time :datetime="post.publishedAt">
                        {{ formattedDate }}
                    </time>

                    <ReadingTime :content="post.content" />
                </div>
            </div>
        </article>
    </NuxtLink>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ReadingTime from '~/components/posts/ReadingTime.vue';

interface Post {
    slug: string;
    title: string;
    category: string;
    image: string;
    readTime: string | number;
    publishedAt: string;
    content: string;
}

const props = defineProps<{
    post: Post;
}>();

const appConfig = useAppConfig();
const isHovered = ref<boolean>(false);

const formattedDate = computed<string>(() => {
    const date = new Date(props.post.publishedAt);

    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
});
</script>
