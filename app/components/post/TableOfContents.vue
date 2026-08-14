<template>
    <div v-if="headings.length > 0" class="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 mb-8 sticky top-20">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Icon name="mdi:list" class="w-5 h-5" />
            {{ $t('post.onThisPage') || 'On this page' }}
        </h3>
        <nav class="space-y-2">
            <a
                v-for="(heading, index) in headings"
                :key="index"
                :href="`#${heading.id}`"
                :class="[
                    'block text-sm transition-colors',
                    heading.level === 2
                        ? 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 pl-4',
                ]"
            >
                <span class="text-xs text-gray-500 dark:text-gray-600 mr-2">{{ String(index + 1).padStart(2, '0') }}</span>
                {{ heading.text }}
            </a>
        </nav>
    </div>
</template>

<script setup lang="ts">
    interface Heading {
        id: string
        text: string
        level: number
    }

    defineProps<{
        headings: Heading[]
    }>()
</script>
