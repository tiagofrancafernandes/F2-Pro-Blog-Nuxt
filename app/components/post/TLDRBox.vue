<template>
    <div
        v-if="tldr"
        class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8"
    >
        <div class="flex gap-3">
            <div class="flex-shrink-0">
                <Icon name="mdi:lightning-bolt" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="flex-1">
                <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">TL;DR</h3>
                <p class="text-sm text-blue-800 dark:text-blue-300">
                    {{ tldr }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    tldr: string | null | undefined;
}>();
</script>
