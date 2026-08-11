<template>
    <div>
        <!-- Hero Section -->
        <section class="overflow-hidden px-4 py-24 sm:px-6 md:py-32 lg:px-8">
            <div class="mx-auto max-w-3xl space-y-6 text-center">
                <h1 class="text-5xl font-bold leading-tight text-neutral-900 dark:text-white sm:text-6xl">
                    Bem-vindo ao Blog
                </h1>

                <p class="text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.
                    Aprendia algo novo a cada leitura.
                </p>

                <div class="flex justify-center gap-4">
                    <NuxtLink
                        to="#posts"
                        class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                    >
                        <span>Explorar Posts</span>
                        <iconify-icon icon="fa7-solid:arrow-down"></iconify-icon>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Posts Section -->
        <section id="posts" class="px-4 py-24 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-7xl">
                <!-- Section Header -->
                <div class="mb-12 space-y-2">
                    <h2 class="text-4xl font-bold text-neutral-900 dark:text-white">Últimos Posts</h2>
                    <p class="text-lg text-neutral-600 dark:text-neutral-400">
                        Conteúdo fresco e informativo para sua jornada de desenvolvimento
                    </p>
                </div>

                <!-- Loading State -->
                <div v-if="isLoading" class="space-y-6">
                    <div
                        v-for="i in 3"
                        :key="`skeleton-${i}`"
                        class="h-96 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
                    ></div>
                </div>

                <!-- Posts Grid -->
                <div v-else-if="enrichedPosts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <PostCard v-for="post in enrichedPosts" :key="post.id" :post="post" />
                </div>

                <!-- Empty State -->
                <div v-else class="flex flex-col items-center justify-center space-y-4 py-16">
                    <iconify-icon
                        icon="fa7-solid:inbox"
                        class="text-6xl text-neutral-400 dark:text-neutral-600"
                    ></iconify-icon>
                    <p class="text-neutral-600 dark:text-neutral-400">Nenhum post disponível no momento</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useHead } from '#app';

interface PostIndex {
    id: number;
    slug: string;
    title: string;
    category: string;
    status: string;
    date: string;
}

interface PostData {
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

interface EnrichedPost extends PostIndex, PostData {}

const postsIndex = ref<PostIndex[]>([]);
const postsData = ref<Map<string, PostData>>(new Map());
const isLoading = ref(true);

const enrichedPosts = computed<EnrichedPost[]>(() => {
    return postsIndex.value
        .map((indexPost) => {
            const data = postsData.value.get(indexPost.slug);
            return data ? { ...indexPost, ...data } : indexPost;
        })
        .filter((post): post is EnrichedPost => {
            return postsData.value.has(post.slug);
        });
});

async function fetchPosts(): Promise<void> {
    try {
        isLoading.value = true;

        // Fetch index
        const indexResponse = await fetch('/data/posts/index.json');
        const indexData = await indexResponse.json();
        postsIndex.value = indexData.posts ?? indexData;

        // Fetch individual posts
        const dataMap = new Map<string, PostData>();
        for (const post of postsIndex.value) {
            const postResponse = await fetch(`/data/posts/data/${post.slug}.json`);
            const postData = await postResponse.json();
            dataMap.set(post.slug, postData);
        }

        postsData.value = dataMap;
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    fetchPosts();
});

useHead({
    title: 'Tiago França - Blog | Senior Backend Engineer',
    meta: [
        {
            name: 'description',
            content: 'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação. Aprenda algo novo a cada leitura.',
        },
        {
            property: 'og:title',
            content: 'Tiago França - Blog',
        },
        {
            property: 'og:description',
            content: 'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:image',
            content: 'https://picsum.photos/id/10/1200/630',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: 'Tiago França - Blog',
        },
        {
            name: 'twitter:description',
            content: 'Explore artigos sobre desenvolvimento, arquitetura de software, e melhores práticas em programação.',
        },
        {
            name: 'twitter:image',
            content: 'https://picsum.photos/id/10/1200/630',
        },
        {
            name: 'keywords',
            content: 'backend, PHP, Laravel, APIs, PostgreSQL, Docker, DevOps, desenvolvimento',
        },
        {
            name: 'author',
            content: 'Tiago França',
        },
        {
            name: 'robots',
            content: 'index, follow',
        },
        {
            httpEquiv: 'content-type',
            content: 'text/html; charset=UTF-8',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'http://localhost:3000/',
        },
    ],
});
</script>
