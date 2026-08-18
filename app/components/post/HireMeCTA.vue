<template>
    <div
        class="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-800 dark:to-red-900 rounded-lg p-8 mb-8 text-white"
    >
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
                <h3 class="text-2xl font-bold mb-2">
                    {{ $t('post.hireMeTitle') || 'Ready to Work Together?' }}
                </h3>
                <p class="text-emerald-100">
                    {{ $t('post.hireMeDescription') || "Let's discuss your next project and how I can help." }}
                </p>
            </div>
            <a
                href="#contact"
                class="flex-shrink-0 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors whitespace-nowrap"
            >
                {{ $t('post.hireMeButton') || 'Hire Me' }}
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
// No script needed
</script>
