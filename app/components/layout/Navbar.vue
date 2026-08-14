<template>
    <nav class="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl">
                    <span class="text-red-600 dark:text-red-400">Tiago</span>
                    <span class="text-gray-700 dark:text-gray-300">França</span>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-8">
                    <NuxtLink
                        to="/"
                        class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        {{ $t('nav.home') }}
                    </NuxtLink>
                    <NuxtLink
                        to="/"
                        class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        {{ $t('nav.posts') }}
                    </NuxtLink>
                    <NuxtLink
                        to="/about"
                        class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        {{ $t('nav.about') }}
                    </NuxtLink>

                    <!-- Search Bar -->
                    <form @submit.prevent="handleSearch" class="hidden lg:flex items-center gap-2 bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-1 focus-within:ring-2 focus-within:ring-red-600">
                        <Icon name="mdi:magnify" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <input
                            v-model="searchInput"
                            type="text"
                            :placeholder="$t('nav.search')"
                            class="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none w-32"
                        />
                    </form>
                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-2">
                    <!-- Mobile Menu Button -->
                    <button
                        @click="isMenuOpen = !isMenuOpen"
                        class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-gray-300"
                        aria-label="Toggle menu"
                    >
                        <Icon name="mdi:menu" class="w-5 h-5" />
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div v-if="isMenuOpen" class="md:hidden border-t border-gray-200 dark:border-slate-700 py-4 space-y-3">
                <NuxtLink
                    to="/"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                    @click="isMenuOpen = false"
                >
                    {{ $t('nav.home') }}
                </NuxtLink>
                <NuxtLink
                    to="/"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                    @click="isMenuOpen = false"
                >
                    {{ $t('nav.posts') }}
                </NuxtLink>
                <NuxtLink
                    to="/about"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                    @click="isMenuOpen = false"
                >
                    {{ $t('nav.about') }}
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const isMenuOpen = ref(false)
    const searchInput = ref('')

    function handleSearch(): void {
        if (!searchInput.value.trim()) {
            return
        }

        router.push(`/posts/search?q=${encodeURIComponent(searchInput.value)}`)
        searchInput.value = ''
    }
</script>
