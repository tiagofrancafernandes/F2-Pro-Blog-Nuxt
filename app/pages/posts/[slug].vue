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
        <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <!-- Post Content -->
        <template v-else-if="post">
            <PostDetail :post="post" />

            <!-- Back to Home -->
            <div class="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700">
                <NuxtLink
                    to="/"
                    class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                    <span class="text-lg">←</span>
                    Voltar para Home
                </NuxtLink>
            </div>
        </template>

        <!-- Not Found -->
        <div v-else class="flex flex-col justify-center items-center min-h-screen px-4">
            <div class="text-center max-w-md">
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Post não encontrado
                </h1>

                <p class="text-gray-600 dark:text-gray-400 mb-8">
                    Desculpe, o post que você está procurando não existe ou foi removido.
                </p>

                <NuxtLink
                    to="/"
                    class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    Voltar para Home
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
