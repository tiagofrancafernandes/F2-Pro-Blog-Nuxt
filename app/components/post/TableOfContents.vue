<template>
    <div v-if="headings.length > 0" class="bg-gray-50 dark:bg-slate-800 rounded-lg p-0 sticky top-34">
        <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-3 p-4 uppercase tracking-wider">
            {{ $t('post.onThisPage') || 'On this page' }}
        </h3>

        <nav class="space-y-1 p-2">
            <a
                v-for="(heading, index) in headings"
                :key="index"
                :href="`#${heading.id}`"
                @click.prevent="scrollToHeading(heading.id)"
                :class="[
                    'block py-2 transition-all duration-200 relative group',
                    getHeadingClasses(heading.level),
                    activeHeading === heading.id
                        ? 'text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-slate-700'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
                ]"
            >
                <!-- Active indicator bar -->
                <div
                    v-if="activeHeading === heading.id"
                    class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 rounded-r"
                />

                <span
                    :class="[
                        'text-xs font-semibold mr-2',
                        activeHeading === heading.id
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-gray-400 dark:text-gray-600',
                    ]"
                >
                    {{ String(index + 1).padStart(2, '0') }}
                </span>
                {{ heading.text }}
            </a>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Heading {
    id: string;
    text: string;
    level: number;
}

defineProps<{
    headings: Heading[];
}>();

const activeHeading = ref<string>('');

function getHeadingClasses(level: number): string {
    const paddingMap: Record<number, string> = {
        2: 'px-3',
        3: 'px-6',
    };

    return paddingMap[level] || 'px-3';
}

function scrollToHeading(id: string): void {
    if (!import.meta.client) {
        return;
    }

    const element = id ? document.getElementById(id) : null;
    const clearance = 130; // folga

    if (element) {
        const elementPosition = element?.getBoundingClientRect().top + window.pageYOffset;
        // element?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        window?.scrollTo({
            top: Math.abs(elementPosition - clearance),
            behavior: 'smooth'
        });
    }
}

function updateActiveHeading(): void {
    const headingElements = document.querySelectorAll('h2, h3');
    let closestHeading = '';
    let closestDistance = Infinity;

    headingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const clearance = 300; // folga
        const distance = Math.abs(rect.top);

        if (distance < closestDistance) {
            // closestDistance = Math.abs(distance - clearance);
            closestDistance = distance;
            closestHeading = element.id;
        }
    });

    activeHeading.value = closestHeading;
}

onMounted(() => {
    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading);
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveHeading);
});
</script>
