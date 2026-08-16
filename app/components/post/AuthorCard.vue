<template>
    <div class="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 mb-8">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t('post.writtenBy') || 'Written by' }}
        </h3>
        <div class="flex gap-4">
            <div
                class="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex-shrink-0 flex items-center justify-center"
            >
                <Icon name="mdi:account" class="w-8 h-8 text-white" />
            </div>
            <div class="flex-1">
                <h4 class="font-semibold text-gray-900 dark:text-white">
                    {{ author.name }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {{ author.title }}
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {{ author.bio }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Author {
    name: string;
    title: string;
    bio: string;
}

defineProps<{
    author: Author;
}>();
</script>
