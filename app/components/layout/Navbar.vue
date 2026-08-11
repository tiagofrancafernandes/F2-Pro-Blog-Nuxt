<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center justify-between px-4 py-4">
            <!-- Logo/Brand -->
            <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100">
                <div
                    class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                    :style="{ backgroundColor: appConfig.public.colors.primary }"
                >
                    T
                </div>
                <span>{{ appConfig.public.blog.title }}</span>
            </NuxtLink>

            <!-- Navigation Links -->
            <div class="flex items-center gap-8">
                <NuxtLink
                    to="/"
                    :class="[
                        'text-sm font-medium transition-colors',
                        {
                            'text-blue-600 dark:text-blue-400': $route.path === '/',
                            'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100':
                                $route.path !== '/',
                        },
                    ]"
                >
                    Home
                </NuxtLink>

                <NuxtLink
                    to="/about"
                    :class="[
                        'text-sm font-medium transition-colors',
                        {
                            'text-blue-600 dark:text-blue-400': $route.path === '/about',
                            'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100':
                                $route.path !== '/about',
                        },
                    ]"
                >
                    About
                </NuxtLink>

                <!-- Dark Mode Toggle -->
                <button
                    @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
                    :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
                    class="p-2 rounded-lg transition-colors text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                    <svg
                        v-if="colorMode.value === 'light'"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    <svg
                        v-else
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.464 14.536l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zm10.607-2.121a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const colorMode = useColorMode();
</script>
