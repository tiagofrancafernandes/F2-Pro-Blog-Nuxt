<template>
    <nav
        class="fixed top-0 z-50 w-full border-b shadow-sm transition-colors"
        :style="{
            borderBottomColor: borderColor,
            backgroundColor: bgColor,
        }"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <NuxtLink to="/" class="flex items-center gap-1">
                        <span
                            class="font-bold text-xl transition-colors"
                            :style="{ color: appConfig.public.colors.primary }"
                        >
                            Tiago
                        </span>
                        <span
                            class="font-bold text-xl transition-colors"
                            :style="{ color: appConfig.public.colors.secondary }"
                        >
                            França
                        </span>
                    </NuxtLink>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center gap-8">
                    <NuxtLink
                        to="/"
                        :style="{ color: textColor }"
                        class="transition-all duration-200 hover:opacity-70"
                        :class="{ 'font-semibold': route.path === '/' }"
                    >
                        Home
                    </NuxtLink>

                    <NuxtLink
                        to="/posts"
                        :style="{ color: textColor }"
                        class="transition-all duration-200 hover:opacity-70"
                        :class="{ 'font-semibold': route.path === '/posts' }"
                    >
                        Posts
                    </NuxtLink>

                    <NuxtLink
                        to="/about"
                        :style="{ color: textColor }"
                        class="transition-all duration-200 hover:opacity-70"
                        :class="{ 'font-semibold': route.path === '/about' }"
                    >
                        Sobre
                    </NuxtLink>
                </div>

                <!-- Dark Mode Toggle, Search & Mobile Menu -->
                <div class="flex items-center gap-4">
                    <ClientOnly>
                        <button
                            type="button"
                            @click="searchOpen = true"
                            class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            :style="{ color: textColor }"
                            aria-label="Search posts"
                            title="Search (Cmd+K)"
                        >
                            <Icon icon="fa7-solid:magnifying-glass" class="w-5 h-5" />
                        </button>

                        <button
                            type="button"
                            @click="toggleDarkMode"
                            :style="{
                                color: isDark ? appConfig.public.colors.dark.primary : appConfig.public.colors.primary,
                            }"
                            class="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Toggle dark mode"
                        >
                            <Icon v-if="isDark" icon="fa7-solid:sun" class="w-5 h-5" />
                            <Icon v-else icon="fa7-solid:moon" class="w-5 h-5" />
                        </button>

                        <button
                            type="button"
                            @click="isMenuOpen = !isMenuOpen"
                            class="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            :style="{ color: textColor }"
                            aria-label="Toggle mobile menu"
                        >
                            <Icon icon="fa7-solid:bars" class="w-5 h-5" />
                        </button>
                    </ClientOnly>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div v-if="isMenuOpen" class="md:hidden pb-4 space-y-2">
                <NuxtLink
                    to="/"
                    :style="{ color: textColor }"
                    class="block px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    :class="{ 'font-semibold': route.path === '/' }"
                >
                    Home
                </NuxtLink>

                <NuxtLink
                    to="/posts"
                    :style="{ color: textColor }"
                    class="block px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    :class="{ 'font-semibold': route.path === '/posts' }"
                >
                    Posts
                </NuxtLink>

                <NuxtLink
                    to="/about"
                    :style="{ color: textColor }"
                    class="block px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    :class="{ 'font-semibold': route.path === '/about' }"
                >
                    Sobre
                </NuxtLink>
            </div>
        </div>

        <!-- Search Modal -->
        <SearchModal :isOpen="searchOpen" :posts="allPosts" @close="searchOpen = false" />
    </nav>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import SearchModal from '~/components/search/SearchModal.vue';

const appConfig = useAppConfig();
const colorMode = useColorMode();
const route = useRoute();
const isMenuOpen = ref(false);
const searchOpen = ref(false);
const allPosts = ref([])

const isDark = computed(() => {
    return colorMode.preference === 'dark';
});

const textColor = computed(() => {
    return isDark.value ? appConfig.public.colors.dark.text : '#1f2937';
});

const borderColor = computed(() => {
    return isDark.value ? appConfig.public.colors.dark.surface : '#e5e7eb';
});

const bgColor = computed(() => {
    return isDark.value ? appConfig.public.colors.dark.bg : '#ffffff';
});

onMounted(async () => {
    try {
        const res = await fetch('/server/data/posts/index.json');
        const data = await res.json();
        allPosts.value = data.posts || data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
});

const toggleDarkMode = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
</script>
