<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import SearchModal from '~/components/search/SearchModal.vue';
import ReadingTime from '~/components/posts/ReadingTime.vue';
import ShareButtons from '~/components/posts/ShareButtons.vue';
import DisqusComments from '~/components/comments/DisqusComments.vue';
import TagFilter from '~/components/tags/TagFilter.vue';
import TLDRBox from '~/components/posts/TLDRBox.vue';
import TableOfContents from '~/components/posts/TableOfContents.vue';

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
    tags?: string[];
    tldr?: string;
}

const route = useRoute();
const post = ref<Post | null>(null);
const allPosts = ref<Post[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const searchOpen = ref(false);

onMounted(async () => {
    const slug = route.params.slug as string;

    try {
        // Fetch index for search/tags
        const indexRes = await fetch('/data/posts/index.json');

        if (indexRes.ok) {
            const indexData = await indexRes.json();
            allPosts.value = indexData.posts || indexData;
        }

        // Fetch specific post
        const postRes = await fetch(`/data/posts/data/${slug}.json`);

        if (!postRes.ok) {
            throw new Error('Post não encontrado');
        }

        const data: Post = await postRes.json();
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

const { shortname, isEnabled: disqusEnabled } = useDisqus();
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-900">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
            <div class="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>

        <!-- Post Content -->
        <template v-else-if="post">
            <section class="min-h-screen bg-white dark:bg-gray-900">
                <PostDetail :post="post" />

                <!-- TLDR Box -->
                <div class="mx-auto max-w-3xl px-4 py-12">
                    <TLDRBox v-if="post.tldr" :tldr="post.tldr" />

                    <!-- Table of Contents -->
                    <TableOfContents v-if="post.content" :content="post.content" />

                    <!-- Reading Time -->
                    <div v-if="post.content" class="mt-8 flex items-center gap-4">
                        <ReadingTime :content="post.content" />
                    </div>

                    <!-- Share Buttons -->
                    <div class="mt-12">
                        <ShareButtons :post="post" />
                    </div>

                    <!-- Tags -->
                    <div v-if="post.tags && post.tags.length > 0" class="mt-12">
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                Tags
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                <NuxtLink
                                    v-for="tag in post.tags"
                                    :key="tag"
                                    :to="{ query: { tag } }"
                                    class="px-3 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors text-sm"
                                >
                                    {{ tag }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <!-- Disqus Comments -->
                    <DisqusComments
                        v-if="disqusEnabled && post.slug"
                        :shortname="shortname"
                        :identifier="post.slug"
                        :title="post.title"
                        :url="`${useRuntimeConfig().public.siteUrl}/posts/${post.slug}`"
                    />
                </div>
            </section>
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

        <!-- Search Modal -->
        <SearchModal :isOpen="searchOpen" :posts="allPosts" @close="searchOpen = false" />
    </div>
</template>
