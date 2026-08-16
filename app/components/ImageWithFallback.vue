<template>
    <div :class="containerClass">
        <img v-if="showImage" :src="src" :alt="alt" :class="imageClass" @error="handleImageError" />
        <div v-else :class="fallbackClass">
            <svg class="w-full h-full text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    src?: string;
    alt: string;
    containerClass?: string;
    imageClass?: string;
    fallbackClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
    containerClass: 'w-full h-40 overflow-hidden bg-gray-100 dark:bg-slate-800 rounded-lg',
    imageClass: 'w-full h-full object-cover group-hover:scale-105 transition-transform',
    fallbackClass: 'w-full h-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 rounded-lg',
});

const showImage = ref(!!props.src && props.src.trim() !== '');

function handleImageError(): void {
    showImage.value = false;
}
</script>
