<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

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

const route = useRoute();
const post = ref<Post | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    const slug = route.params.slug as string;

    try {
        const response = await fetch(`/data/posts/data/${slug}.json`);

        if (!response.ok) {
            throw new Error('Post não encontrado');
        }

        const data: Post = await response.json();
        post.value = data;

        useHead({
            title: `${data.title} | Blog`,
            meta: [
                {
                    name: 'description',
                    content: data.description,
                },
            ],
        });
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Erro ao carregar o post';
        console.error('Erro ao buscar post:', err);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-900">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
            <div class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>

        <!-- Post Content -->
        <template v-else-if="post">
            <PostDetail :post="post" />
        </template>

        <!-- Not Found -->
        <div v-else class="flex min-h-screen flex-col items-center justify-center px-4">
            <div class="max-w-md text-center">
                <h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                    Post não encontrado
                </h1>

                <p class="mb-8 text-gray-600 dark:text-gray-400">
                    Desculpe, o post que você está procurando não existe ou foi removido.
                </p>

                <NuxtLink
                    to="/"
                    class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Voltar para Home
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
