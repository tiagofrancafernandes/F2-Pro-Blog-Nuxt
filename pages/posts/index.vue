<template>
    <div>
        <!-- Header Section -->
        <section class="px-4 py-12 sm:px-6 lg:px-8 border-b" :style="{ borderColor: borderColor, backgroundColor: headerBgColor }">
            <div class="mx-auto max-w-7xl space-y-4">
                <h1 class="text-5xl font-bold" :style="{ color: textPrimary }">
                    Todos os Posts
                </h1>
                <p class="text-xl" :style="{ color: textSecondary }">
                    Explore a coleção completa de artigos sobre desenvolvimento
                </p>
            </div>
        </section>

        <!-- Main Content -->
        <section class="px-4 py-12 sm:px-6 lg:px-8" :style="{ backgroundColor: bgPrimary }">
            <div class="mx-auto max-w-7xl space-y-8">
                <!-- Filter Section -->
                <div class="space-y-4">
                    <h2 class="text-lg font-semibold" :style="{ color: textPrimary }">
                        Filtrar por Categoria
                    </h2>
                    <div class="flex flex-wrap gap-2">
                        <button
                            @click="selectedCategory = null"
                            class="px-4 py-2 rounded-lg font-medium transition-all"
                            :style="{
                                backgroundColor: selectedCategory === null ? primaryColor : filterBgColor,
                                color: selectedCategory === null ? '#ffffff' : textPrimary,
                                borderColor: borderColor,
                            }"
                        >
                            Todos
                        </button>
                        <button
                            v-for="category in categories"
                            :key="category"
                            @click="selectedCategory = category"
                            class="px-4 py-2 rounded-lg font-medium transition-all"
                            :style="{
                                backgroundColor: selectedCategory === category ? primaryColor : filterBgColor,
                                color: selectedCategory === category ? '#ffffff' : textPrimary,
                                borderColor: borderColor,
                            }"
                        >
                            {{ category }}
                        </button>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="isLoading" class="space-y-6">
                    <div
                        v-for="i in 3"
                        :key="`skeleton-${i}`"
                        class="h-96 animate-pulse rounded-lg"
                        :style="{ backgroundColor: skeletonColor }"
                    ></div>
                </div>

                <!-- Posts Grid -->
                <div v-else-if="filteredPosts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
                </div>

                <!-- Empty State -->
                <div v-else class="flex flex-col items-center justify-center space-y-4 py-16">
                    <iconify-icon
                        icon="fa7-solid:inbox"
                        class="text-6xl"
                        :style="{ color: textTertiary }"
                    ></iconify-icon>
                    <p :style="{ color: textSecondary }">
                        Nenhum post encontrado nesta categoria
                    </p>
                </div>

                <!-- Stats -->
                <div class="text-center text-sm" :style="{ color: textSecondary }">
                    Mostrando {{ filteredPosts.length }} de {{ enrichedPosts.length }} posts
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useHead } from '#app'

interface PostIndex {
    id: number
    slug: string
    title: string
    category: string
    status: string
    date: string
}

interface PostData {
    id: number
    slug: string
    title: string
    description: string
    content: string
    image: string
    category: string
    date: string
    readTime: number
    author: string
}

interface EnrichedPost extends PostIndex, PostData {}

const appConfig = useAppConfig()
const colorMode = useColorMode()

const postsIndex = ref<PostIndex[]>([])
const postsData = ref<Map<string, PostData>>(new Map())
const isLoading = ref(true)
const selectedCategory = ref<string | null>(null)

// Design system colors
const isDark = computed(() => colorMode.preference === 'dark')

const primaryColor = computed(() => isDark.value ? '#f87171' : '#ef4444')
const bgPrimary = computed(() => isDark.value ? '#0f0f0f' : '#ffffff')
const headerBgColor = computed(() => isDark.value ? '#1a1a1a' : '#f9fafb')
const filterBgColor = computed(() => isDark.value ? '#2d2d2d' : '#e5e7eb')
const borderColor = computed(() => isDark.value ? '#404040' : '#e5e7eb')
const textPrimary = computed(() => isDark.value ? '#f5f5f5' : '#111827')
const textSecondary = computed(() => isDark.value ? '#bfbfbf' : '#6b7280')
const textTertiary = computed(() => isDark.value ? '#999999' : '#9ca3af')
const skeletonColor = computed(() => isDark.value ? '#2d2d2d' : '#e5e7eb')

const enrichedPosts = computed<EnrichedPost[]>(() => {
    return postsIndex.value
        .map((indexPost) => {
            const data = postsData.value.get(indexPost.slug)
            return data ? { ...indexPost, ...data } : indexPost
        })
        .filter((post): post is EnrichedPost => {
            return postsData.value.has(post.slug)
        })
})

const categories = computed<string[]>(() => {
    const cats = new Set(enrichedPosts.value.map((p) => p.category))
    return Array.from(cats).sort()
})

const filteredPosts = computed<EnrichedPost[]>(() => {
    if (!selectedCategory.value) {
        return enrichedPosts.value
    }
    return enrichedPosts.value.filter((p) => p.category === selectedCategory.value)
})

async function fetchPosts(): Promise<void> {
    try {
        isLoading.value = true

        // Fetch index
        const indexResponse = await fetch('/data/posts/index.json')
        const indexData = await indexResponse.json()
        postsIndex.value = indexData.posts ?? indexData

        // Fetch individual posts
        const dataMap = new Map<string, PostData>()
        for (const post of postsIndex.value) {
            const postResponse = await fetch(`/data/posts/data/${post.slug}.json`)
            const postData = await postResponse.json()
            dataMap.set(post.slug, postData)
        }

        postsData.value = dataMap
    } catch (error) {
        console.error('Error fetching posts:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchPosts()
})

useHead({
    title: `Posts - ${appConfig.public.blog.title}`,
    meta: [
        {
            name: 'description',
            content: 'Explore todos os artigos do blog sobre desenvolvimento de software',
        },
    ],
})
</script>
