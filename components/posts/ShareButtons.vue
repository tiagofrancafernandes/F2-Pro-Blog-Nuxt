<template>
    <div class="space-y-3">
        <h4 class="text-sm font-semibold text-neutral-900 dark:text-white">
            Share this post
        </h4>

        <div class="flex flex-wrap gap-2">
            <!-- Twitter -->
            <a
                :href="shareUrls.twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1D9BF0] hover:bg-[#1a8cd8] text-white text-sm font-medium transition-colors"
                aria-label="Share on Twitter"
            >
                <iconify-icon icon="fa7-brands:twitter" class="w-4 h-4" />
                <span class="hidden sm:inline">Twitter</span>
            </a>

            <!-- Facebook -->
            <a
                :href="shareUrls.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1877F2] hover:bg-[#165dbf] text-white text-sm font-medium transition-colors"
                aria-label="Share on Facebook"
            >
                <iconify-icon icon="fa7-brands:facebook-f" class="w-4 h-4" />
                <span class="hidden sm:inline">Facebook</span>
            </a>

            <!-- LinkedIn -->
            <a
                :href="shareUrls.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#084b9f] text-white text-sm font-medium transition-colors"
                aria-label="Share on LinkedIn"
            >
                <iconify-icon icon="fa7-brands:linkedin-in" class="w-4 h-4" />
                <span class="hidden sm:inline">LinkedIn</span>
            </a>

            <!-- WhatsApp -->
            <a
                :href="shareUrls.whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-medium transition-colors"
                aria-label="Share on WhatsApp"
            >
                <iconify-icon icon="fa7-brands:whatsapp" class="w-4 h-4" />
                <span class="hidden sm:inline">WhatsApp</span>
            </a>

            <!-- Copy Link -->
            <button
                @click="handleCopy"
                :class="[
                    'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    {
                        'bg-green-600 text-white': copySuccess,
                        'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600': !copySuccess,
                    },
                ]"
                aria-label="Copy link to clipboard"
            >
                <iconify-icon
                    :icon="copySuccess ? 'fa7-solid:check' : 'fa7-solid:link'"
                    class="w-4 h-4"
                />
                <span class="hidden sm:inline">
                    {{ copySuccess ? 'Copied!' : 'Copy' }}
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**
 * TypeScript interface for Post
 */
interface Post {
    slug: string
    title: string
    description?: string
}

/**
 * Props definition
 */
const props = defineProps<{
    post: Post
}>()

const { shareUrls, copyUrl } = useShare(props.post)
const copySuccess = ref(false)

/**
 * Handle copy to clipboard with feedback
 */
const handleCopy = async () => {
    const success = await copyUrl()

    if (success) {
        copySuccess.value = true

        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    }
}
</script>
