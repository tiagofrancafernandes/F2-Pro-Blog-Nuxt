<template>
    <div class="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
        <div class="flex gap-3">
            <iconify-icon
                icon="fa7-solid:lightbulb"
                class="flex-shrink-0 text-2xl text-amber-600 dark:text-amber-400"
            ></iconify-icon>
            <div>
                <h3 class="font-semibold text-amber-900 dark:text-amber-100">TLDR</h3>
                <p class="mt-1 text-sm text-amber-800 dark:text-amber-200">{{ tldr }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    tldr: string
}

defineProps<Props>()
</script>
