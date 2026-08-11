<template>
    <div v-if="headings.length > 0" class="mb-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
        <h3 class="mb-3 font-semibold text-neutral-900 dark:text-white">Table of Contents</h3>
        <nav class="space-y-2">
            <a
                v-for="heading in headings"
                :key="heading.id"
                :href="`#${heading.id}`"
                :class="[
                    'block text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400',
                    {
                        'pl-0 text-neutral-700 dark:text-neutral-300': heading.level === 2,
                        'pl-4 text-neutral-600 dark:text-neutral-400': heading.level === 3,
                        'pl-8 text-neutral-500 dark:text-neutral-500': heading.level === 4,
                    },
                ]"
            >
                {{ heading.text }}
            </a>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Heading {
    id: string
    level: number
    text: string
}

interface Props {
    content: string
}

const props = defineProps<Props>()

const headings = computed<Heading[]>(() => {
    const lines = props.content.split('\n')
    const extractedHeadings: Heading[] = []

    lines.forEach((line) => {
        const match = line.match(/^(#{2,4})\s+(.+)$/)

        if (match) {
            const level = match[1].length
            const text = match[2].trim()
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')

            extractedHeadings.push({
                id,
                level,
                text,
            })
        }
    })

    return extractedHeadings
})
</script>
