<template>
    <div
        class="flex flex-col items-center justify-center gap-3 py-6"
        :class="{ 'w-full': fullWidth }"
        role="status"
        aria-live="polite"
    >
        <svg
            :class="[
                'animate-spin text-emerald-500 dark:text-emerald-400',
                sizeClasses,
            ]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>

        <span
            v-if="text"
            class="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
            {{ text }}
        </span>
        <span class="sr-only">{{ text || 'Carregando...' }}</span>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    interface Props {
        size?: 'sm' | 'md' | 'lg'
        text?: string
        fullWidth?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        size: 'md',
        text: '',
        fullWidth: true,
    })

    const sizeClasses = computed(() => {
        if (props.size === 'sm') {
            return 'w-5 h-5'
        }

        if (props.size === 'lg') {
            return 'w-10 h-10'
        }

        return 'w-7 h-7'
    })
</script>
