<template>
    <div class="min-h-screen bg-white dark:bg-slate-900">
        <!-- Header Section -->
        <section class="bg-red-600 dark:bg-red-700 text-white py-12 sm:py-16">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                    {{ $t('search.title') }}
                </h1>
                <p class="text-red-100 text-lg max-w-2xl">
                    {{ buildSearchDescription() }}
                </p>
            </div>
        </section>

        <!-- Filters Section -->
        <section class="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <!-- Active Filters -->
                <div v-if="hasActiveFilters" class="mb-8">
                    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wider">
                        {{ $t('search.activeFilters') }}
                    </h3>
                    <div class="flex flex-wrap gap-3">
                        <!-- Search Query Badge -->
                        <div v-if="searchQuery" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            <span class="text-sm font-medium">{{ searchQuery }}</span>
                            <button @click="removeSearchQuery" class="ml-2 hover:opacity-70">
                                <Icon name="mdi:close" class="w-4 h-4" />
                            </button>
                        </div>

                        <!-- Category Badge -->
                        <div v-if="selectedCategory" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                            <span class="text-sm font-medium">{{ $t('search.category') }}: {{ selectedCategory }}</span>
                            <button @click="removeCategory" class="ml-2 hover:opacity-70">
                                <Icon name="mdi:close" class="w-4 h-4" />
                            </button>
                        </div>

                        <!-- Tag Badges -->
                        <div v-for="tag in selectedTags" :key="tag" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            <span class="text-sm font-medium">{{ tag }}</span>
                            <button @click="removeTag(tag)" class="ml-2 hover:opacity-70">
                                <Icon name="mdi:close" class="w-4 h-4" />
                            </button>
                        </div>

                        <!-- Clear All Button -->
                        <button
                            @click="clearAllFilters"
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-full transition-colors"
                        >
                            {{ $t('search.clearAll') }}
                        </button>
                    </div>
                </div>

                <!-- No Filters Message -->
                <div v-else class="text-center py-12">
                    <Icon name="mdi:magnify" class="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4 opacity-50" />
                    <p class="text-gray-600 dark:text-gray-400 text-lg">
                        {{ $t('search.noFilters') }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">
                        {{ $t('search.noFiltersHint') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Results Section -->
        <section v-if="hasActiveFilters" class="py-12 sm:py-16">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <!-- Results Count -->
                <div class="mb-8">
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                        {{ $t('search.found', { count: filteredPosts.length }) }}
                    </p>
                </div>

                <!-- No Results -->
                <div v-if="filteredPosts.length === 0" class="text-center py-16">
                    <Icon name="mdi:file-document-outline" class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4 opacity-50" />
                    <p class="text-gray-600 dark:text-gray-400 text-xl font-medium">
                        {{ $t('search.noResults') }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-500 text-sm mt-2 max-w-md mx-auto">
                        {{ $t('search.noResultsHint') }}
                    </p>
                </div>

                <!-- Results List -->
                <div v-else class="space-y-6">
                    <article
                        v-for="post in filteredPosts"
                        :key="post.slug"
                        class="flex flex-col sm:flex-row gap-6 p-6 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 hover:shadow-lg transition-all group"
                    >
                        <!-- Image -->
                        <ImageWithFallback
                            :src="post.imageUrl"
                            :alt="post.title"
                            container-class="flex-shrink-0 w-full sm:w-48 h-32 sm:h-40 rounded-lg overflow-hidden"
                        />

                        <!-- Content -->
                        <div class="flex-1 flex flex-col justify-between">
                            <!-- Title & Meta -->
                            <div>
                                <div class="flex flex-wrap items-center gap-2 mb-3">
                                    <span class="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                                        {{ post.category }}
                                    </span>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">
                                        {{ formatDate(post.date) }}
                                    </span>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">
                                        {{ post.readTime }} {{ $t('posts.readTime') }}
                                    </span>
                                </div>

                                <NuxtLink
                                    :to="`/posts/${post.slug}`"
                                    class="block group/link mb-2"
                                >
                                    <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover/link:text-red-600 dark:group-hover/link:text-red-400 transition-colors">
                                        {{ getPostTitle(post) }}
                                    </h3>
                                </NuxtLink>

                                <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                    {{ getPostDescription(post) }}
                                </p>
                            </div>

                            <!-- Tags & CTA -->
                            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div class="flex flex-wrap gap-2">
                                    <NuxtLink
                                        v-for="tag in post.tags"
                                        :key="tag"
                                        :to="`/posts/search?tags=${tag}`"
                                        class="text-xs px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                                    >
                                        {{ tag }}
                                    </NuxtLink>
                                </div>

                                <NuxtLink
                                    :to="`/posts/${post.slug}`"
                                    class="inline-flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm transition-colors"
                                >
                                    {{ $t('posts.readMore') }}
                                    <Icon name="mdi:arrow-right" class="w-4 h-4" />
                                </NuxtLink>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useI18n } from 'vue-i18n'

    interface PostData {
        id: number
        slug: string
        translations: {
            'en-US': {
                title: string
                description: string
                content: string
            }
            'pt-BR': {
                title: string
                description: string
                content: string
            }
        }
        date: string
        readTime: number
        category: string
        tags: string[]
        imageUrl: string
        status: 'published' | 'draft' | 'archived'
    }

    interface Post {
        id: number
        slug: string
        title: string
        description: string
        date: string
        readTime: number
        category: string
        tags: string[]
        imageUrl: string
        status: 'published' | 'draft' | 'archived'
    }

    const route = useRoute()
    const router = useRouter()
    const { locale, t } = useI18n()

    const allPosts = ref<Post[]>([])
    const searchQuery = ref('')
    const selectedTags = ref<string[]>([])
    const selectedCategory = ref('')

    const hasActiveFilters = computed(() => {
        return searchQuery.value || selectedTags.value.length > 0 || selectedCategory.value
    })

    const filteredPosts = computed(() => {
        return allPosts.value.filter((post) => {
            const matchesSearch = !searchQuery.value ||
                post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.value.toLowerCase())

            const matchesCategory = !selectedCategory.value || post.category === selectedCategory.value

            const matchesTags = selectedTags.value.length === 0 ||
                selectedTags.value.some((tag) => post.tags.includes(tag))

            return matchesSearch && matchesCategory && matchesTags
        })
    })

    function formatDate(date: string): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    function getPostTitle(post: Post): string {
        return post.title
    }

    function getPostDescription(post: Post): string {
        return post.description
    }

    function buildSearchDescription(): string {
        if (!hasActiveFilters.value) {
            return t('search.noFilters')
        }

        const parts: string[] = []

        if (searchQuery.value) {
            parts.push(`"${searchQuery.value}"`)
        }

        if (selectedCategory.value) {
            parts.push(`${t('search.category')}: ${selectedCategory.value}`)
        }

        if (selectedTags.value.length > 0) {
            parts.push(`${t('search.tags')}: ${selectedTags.value.join(', ')}`)
        }

        return parts.join(' • ')
    }

    function removeSearchQuery(): void {
        searchQuery.value = ''
        updateUrl()
    }

    function removeCategory(): void {
        selectedCategory.value = ''
        updateUrl()
    }

    function removeTag(tag: string): void {
        selectedTags.value = selectedTags.value.filter((t) => t !== tag)
        updateUrl()
    }

    function clearAllFilters(): void {
        searchQuery.value = ''
        selectedTags.value = []
        selectedCategory.value = ''
        router.push('/posts/search')
    }

    function updateUrl(): void {
        const params = new URLSearchParams()

        if (searchQuery.value) {
            params.set('q', searchQuery.value)
        }

        if (selectedCategory.value) {
            params.set('category', selectedCategory.value)
        }

        if (selectedTags.value.length > 0) {
            params.set('tags', selectedTags.value.join(','))
        }

        const queryString = params.toString()
        router.push(`/posts/search${queryString ? `?${queryString}` : ''}`)
    }

    function loadFiltersFromRoute(): void {
        const q = route.query.q as string | undefined
        const category = route.query.category as string | undefined
        const tags = route.query.tags as string | undefined

        if (q) {
            searchQuery.value = q
        }

        if (category) {
            selectedCategory.value = category
        }

        if (tags) {
            selectedTags.value = tags.split(',').filter((tag) => tag.trim())
        }
    }

    function mapPostData(data: PostData): Post {
        const currentLocale = locale.value as 'en-US' | 'pt-BR'
        const translations = data.translations[currentLocale] || data.translations['en-US']

        return {
            id: data.id,
            slug: data.slug,
            title: translations.title,
            description: translations.description,
            date: data.date,
            readTime: data.readTime,
            category: data.category,
            tags: data.tags,
            imageUrl: data.imageUrl,
            status: data.status,
        }
    }

    onMounted(async () => {
        try {
            const response = await fetch('/data/posts/index.json')

            if (!response.ok) {
                return
            }

            const data = await response.json()
            const posts = data.posts || []

            allPosts.value = posts.map((post: PostData) => mapPostData(post))
            loadFiltersFromRoute()
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        }
    })
</script>

<i18n lang="json">
{
    "en-US": {
        "search": {
            "title": "Search Articles",
            "activeFilters": "Active Filters",
            "noFilters": "No search filters applied",
            "noFiltersHint": "Use the search bar above or click on a category or tag to find articles",
            "found": "Found {count} article(s)",
            "noResults": "No articles found",
            "noResultsHint": "Try adjusting your search filters or using different keywords",
            "category": "Category",
            "tags": "Tags",
            "clearAll": "Clear All Filters"
        }
    },
    "pt-BR": {
        "search": {
            "title": "Pesquisar Artigos",
            "activeFilters": "Filtros Ativos",
            "noFilters": "Nenhum filtro de pesquisa aplicado",
            "noFiltersHint": "Use a barra de pesquisa acima ou clique em uma categoria ou tag para encontrar artigos",
            "found": "Encontrados {count} artigo(s)",
            "noResults": "Nenhum artigo encontrado",
            "noResultsHint": "Tente ajustar seus filtros de pesquisa ou use palavras-chave diferentes",
            "category": "Categoria",
            "tags": "Tags",
            "clearAll": "Limpar Todos os Filtros"
        }
    }
}
</i18n>
