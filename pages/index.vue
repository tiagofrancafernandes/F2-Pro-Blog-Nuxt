<template>
  <div>
    <useHead>
      <title>Tiago França - Technical Blog</title>
      <meta name="description" content="Technical blog about development, software architecture, and best practices" />
    </useHead>

    <!-- Hero Section -->
    <section class="bg-red-600 dark:bg-red-700 text-white py-16 sm:py-24">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl sm:text-5xl font-bold mb-4">
              Real Insights on Development, Architecture & Business
            </h1>
            <p class="text-lg sm:text-xl mb-8 text-red-100">
              Learn from my experience building scalable systems, leading technical teams, and growing businesses.
            </p>
            <button class="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors">
              Subscribe Now
            </button>
          </div>
          <div class="hidden md:flex items-center justify-center">
            <div class="w-64 h-64 bg-red-500 rounded-lg opacity-20"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tags Section -->
    <section class="border-b border-gray-200 dark:border-slate-700 py-6">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="activeTag = activeTag === tag ? null : tag"
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              activeTag === tag
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </section>

    <!-- Posts Grid -->
    <section class="py-16">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="i in 6" :key="i" class="h-64 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
        </div>

        <div v-else-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow"
          >
            <div class="flex gap-4">
              <div class="flex-1">
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {{ formatDate(post.date) }} • {{ post.readTime }} min read
                </div>
                <NuxtLink
                  :to="`/posts/${post.slug}`"
                  class="block text-lg font-semibold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 mb-2"
                >
                  {{ post.title }}
                </NuxtLink>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {{ post.description }}
                </p>
                <div class="flex flex-wrap gap-1 mb-4">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
                <NuxtLink
                  :to="`/posts/${post.slug}`"
                  class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm"
                >
                  Read More →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="text-center py-16">
          <p class="text-gray-600 dark:text-gray-400">No posts found in this category.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '#app'

interface Post {
  id: number
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  category: string
  tags: string[]
}

const posts = ref<Post[]>([])
const isLoading = ref(true)
const activeTag = ref<string | null>(null)

const allTags = computed(() => {
  const tags = new Set<string>()
  posts.value.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredPosts = computed(() => {
  if (!activeTag.value) {
    return posts.value
  }
  return posts.value.filter((post) => post.tags.includes(activeTag.value!))
})

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const response = await fetch('/data/posts/index.json')
    const data = await response.json()
    posts.value = data.posts || data
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
