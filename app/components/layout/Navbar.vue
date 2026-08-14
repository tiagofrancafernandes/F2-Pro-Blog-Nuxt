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
                        Home
                    </NuxtLink>
                    <NuxtLink
                        to="/"
                        class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        Posts
                    </NuxtLink>
                    <a
                        href="#about"
                        class="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        About
                    </a>
                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-2">
                    <!-- Language Selector -->
                    <select
                        :value="$i18n.locale"
                        @change="changeLanguage($event)"
                        class="px-2 py-1 text-sm rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        aria-label="Select language"
                    >
                        <option value="en-US">English</option>
                        <option value="pt-BR">Português</option>
                    </select>

                    <!-- Theme Toggle -->
                    <button
                        @click="toggleTheme"
                        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
                    >
                        <Icon
                            :name="colorMode.value === 'dark' ? 'mdi:sun' : 'mdi:moon'"
                            class="w-5 h-5"
                        />
                    </button>

                    <!-- Mobile Menu Button -->
                    <button
                        @click="isMenuOpen = !isMenuOpen"
                        class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
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
                    Home
                </NuxtLink>
                <NuxtLink
                    to="/"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                    @click="isMenuOpen = false"
                >
                    Posts
                </NuxtLink>
                <a
                    href="#about"
                    class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                    About
                </a>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const isMenuOpen = ref(false)
    const colorMode = useColorMode()
    const { locale } = useI18n()

    function toggleTheme() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }

    function changeLanguage(event: Event) {
        const target = event.target as HTMLSelectElement
        locale.value = target.value
        localStorage.setItem('language', target.value)
    }
</script>
