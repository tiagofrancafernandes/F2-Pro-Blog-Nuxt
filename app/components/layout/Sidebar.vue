<template>
    <aside class="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-neutral-50 dark:bg-neutral-800 overflow-y-auto">
        <div class="px-4 py-6 space-y-6">
            <!-- Categories Section -->
            <nav class="space-y-3">
                <h2 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 px-2">Categories</h2>

                <ul class="space-y-1">
                    <li v-for="category in categories" :key="category">
                        <NuxtLink
                            :to="`/category/${category.toLowerCase()}`"
                            :class="[
                                'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                {
                                    'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100':
                                        isActiveCategory(category),
                                    'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700':
                                        !isActiveCategory(category),
                                },
                            ]"
                        >
                            {{ category }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>

            <!-- About Card Section -->
            <div
                class="bg-white dark:bg-neutral-700 rounded-lg p-4 border-l-4"
                :style="{ borderLeftColor: appConfig.public.colors.primary }"
            >
                <h3 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">About</h3>

                <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {{ appConfig.public.blog.description }}
                </p>

                <div class="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-600">
                    <p class="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                        {{ appConfig.public.blog.author }}
                    </p>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const appConfig = useAppConfig();
const route = useRoute();

const categories = ref<string[]>(['Backend', 'Database', 'DevOps', 'Frontend', 'Tutorials']);

const isActiveCategory = (category: string): boolean => {
    return route.params.category === category.toLowerCase();
};
</script>
