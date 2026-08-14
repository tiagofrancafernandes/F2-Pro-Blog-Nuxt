<template>
    <div v-if="headings.length > 0" class="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 sticky top-24">
        <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-6 uppercase tracking-wider">
            {{ $t('post.onThisPage') || 'On this page' }}
        </h3>

        <nav class="space-y-1">
            <a
                v-for="(heading, index) in headings"
                :key="index"
                :href="`#${heading.id}`"
                @click.prevent="scrollToHeading(heading.id)"
                :class="[
                    'block py-2 px-3 transition-all duration-200 relative group',
                    activeHeading === heading.id
                        ? 'text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-slate-700'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
                ]"
            >
                <!-- Active indicator bar -->
                <div
                    v-if="activeHeading === heading.id"
                    class="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r"
                />

                <span
                    :class="[
                        'text-xs font-semibold mr-2',
                        activeHeading === heading.id
                            ? 'text-red-600 dark:text-red-400'
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
    import { ref, onMounted, onUnmounted } from 'vue'

    interface Heading {
        id: string
        text: string
        level: number
    }

    defineProps<{
        headings: Heading[]
    }>()

    const activeHeading = ref<string>('')

    function scrollToHeading(id: string): void {
        const element = document.getElementById(id)

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    function updateActiveHeading(): void {
        const headingElements = document.querySelectorAll('h2, h3')
        let closestHeading = ''
        let closestDistance = Infinity

        headingElements.forEach((element) => {
            const rect = element.getBoundingClientRect()
            const distance = Math.abs(rect.top - 200)

            if (distance < closestDistance) {
                closestDistance = distance
                closestHeading = element.id
            }
        })

        activeHeading.value = closestHeading
    }

    onMounted(() => {
        updateActiveHeading()
        window.addEventListener('scroll', updateActiveHeading)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', updateActiveHeading)
    })
</script>
