<template>
    <div class="space-y-4">
        <!-- Social Share -->
        <div class="flex gap-2">
            <a
                href="#twitter"
                class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                title="Share on Twitter"
                aria-label="Share on Twitter"
            >
                <Icon name="mdi:twitter" class="w-5 h-5" />
            </a>
            <a
                href="#linkedin"
                class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
            >
                <Icon name="mdi:linkedin" class="w-5 h-5" />
            </a>
            <button
                @click="copyLink"
                class="flex-1 px-3 py-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors text-sm font-medium"
                :title="linkCopied ? 'Copied!' : 'Copy link'"
            >
                {{ linkCopied ? '✓ Copied' : 'Copy Link' }}
            </button>
        </div>

        <!-- Copy for AI -->
        <button
            @click="copyForAI"
            class="w-full px-4 py-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            :title="aiCopied ? 'Copied for AI!' : 'Copy for AI with metadata'"
        >
            <Icon name="mdi:robot" class="w-4 h-4" />
            {{ aiCopied ? '✓ Copied for AI' : 'Copy for AI' }}
        </button>

        <!-- Info Text -->
        <p class="text-xs text-gray-500 dark:text-gray-500 text-center">
            {{ $t('post.shareDescription') || 'Share this post or copy for AI tools' }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'

    interface Post {
        slug: string
        title: string
        author: string
        date: string
        readTime: number
        category: string
        tags: string[]
        content: string
    }

    interface PostProps {
        post: Post
    }

    const props = defineProps<PostProps>()

    const linkCopied = ref(false)
    const aiCopied = ref(false)
    const { locale } = useI18n()

    async function copyLink(): Promise<void> {
        const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${typeof window !== 'undefined' ? window.location.pathname : ''}`

        try {
            await navigator.clipboard.writeText(url)
            linkCopied.value = true
            setTimeout(() => {
                linkCopied.value = false
            }, 2000)
        } catch (error) {
            console.error('Failed to copy link:', error)
        }
    }

    async function copyForAI(): Promise<void> {
        const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
        const fullUrl = `${siteUrl}/posts/${props.post.slug}`

        const markdownContent = `---
title: "${props.post.title}"
author: "${props.post.author}"
date: "${props.post.date}"
source: "${fullUrl}"
category: "${props.post.category}"
tags: [${props.post.tags.map((t) => `"${t}"`).join(', ')}]
readTime: ${props.post.readTime}
copyright: "© 2026 Tiago França. All rights reserved."
language: "${locale.value}"
---

${props.post.content}

---

**Source:** ${fullUrl}
**Published:** ${new Date(props.post.date).toLocaleDateString(locale.value === 'pt-BR' ? 'pt-BR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })}
**Author:** ${props.post.author}
**© 2026 Tiago França. All rights reserved.**
`

        try {
            await navigator.clipboard.writeText(markdownContent)
            aiCopied.value = true
            setTimeout(() => {
                aiCopied.value = false
            }, 2000)
        } catch (error) {
            console.error('Failed to copy for AI:', error)
        }
    }
</script>
