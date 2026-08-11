<template>
    <div>
        <!-- Modal Backdrop -->
        <Transition name="fade">
            <div
                v-if="isOpen"
                class="fixed inset-0 z-40 bg-black bg-opacity-50"
                @click="close"
            />
        </Transition>

        <!-- Modal -->
        <Transition name="scale">
            <div
                v-if="isOpen"
                class="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-neutral-800 shadow-xl"
            >
                <!-- Search Input -->
                <div class="border-b border-neutral-200 dark:border-neutral-700 p-4">
                    <input
                        ref="searchInput"
                        v-model="query"
                        type="text"
                        placeholder="Search posts by title, description, or tags..."
                        class="w-full bg-transparent text-lg outline-none text-neutral-900 dark:text-neutral-50"
                        @keydown.escape="close"
                        @keydown.down="selectNext"
                        @keydown.up="selectPrev"
                        @keydown.enter="navigateSelected"
                    />
                </div>

                <!-- Results -->
                <div class="max-h-96 overflow-y-auto">
                    <div
                        v-if="results.length === 0 && query"
                        class="p-8 text-center text-neutral-500"
                    >
                        No posts found for "{{ query }}"
                    </div>

                    <div
                        v-else
                        class="divide-y divide-neutral-200 dark:divide-neutral-700"
                    >
                        <button
                            v-for="(result, idx) in results"
                            :key="result.id"
                            :class="[
                                'w-full text-left px-4 py-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700',
                                {
                                    'bg-neutral-100 dark:bg-neutral-700': selectedIndex === idx,
                                },
                            ]"
                            @click="navigate(result.slug)"
                            @mouseenter="selectedIndex = idx"
                        >
                            <div class="font-semibold text-neutral-900 dark:text-white">
                                {{ result.title }}
                            </div>
                            <div class="text-sm text-neutral-600 dark:text-neutral-400">
                                {{ result.description }}
                            </div>
                            <div class="mt-2 flex gap-2 flex-wrap">
                                <span
                                    v-for="tag in result.tags"
                                    :key="tag"
                                    class="inline-block px-2 py-1 text-xs rounded bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                                >
                                    {{ tag }}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Footer -->
                <div class="border-t border-neutral-200 dark:border-neutral-700 px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <span v-if="results.length > 0">
                        {{ results.length }} result{{ results.length !== 1 ? 's' : '' }}
                    </span>
                    <span v-else-if="!query">
                        Start typing to search...
                    </span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

interface SearchResult {
    id: number | string
    slug: string
    title: string
    description: string
    category: string
    tags: string[]
}

interface Props {
    posts: SearchResult[]
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
    (e: 'open'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

const searchInput = ref<HTMLInputElement>()
const query = ref('')
const selectedIndex = ref(0)

// Initialize useSearch composable
const { query: searchQuery, results } = useSearch(props.posts)

// Sync local query with composable query
watch(query, (newValue) => {
    searchQuery.value = newValue
    selectedIndex.value = 0
})

// Focus input when modal opens
watch(
    () => props.isOpen,
    (newVal) => {
        if (!newVal) {
            return
        }

        nextTick(() => {
            searchInput.value?.focus()
        })
    },
)

// Close modal and reset state
const close = () => {
    query.value = ''
    emit('close')
}

// Navigate to post by slug
const navigate = (slug: string) => {
    router.push(`/posts/${slug}`)
    close()
}

// Navigate to selected result
const navigateSelected = () => {
    if (!results.value[selectedIndex.value]) {
        return
    }

    navigate(results.value[selectedIndex.value].slug)
}

// Move selection down
const selectNext = () => {
    if (selectedIndex.value < results.value.length - 1) {
        selectedIndex.value++
    }
}

// Move selection up
const selectPrev = () => {
    if (selectedIndex.value > 0) {
        selectedIndex.value--
    }
}

// Handle keyboard shortcut Cmd+K / Ctrl+K
const handleKeydown = (event: KeyboardEvent) => {
    const isCmdOrCtrl = event.ctrlKey || event.metaKey
    const isKKey = event.key === 'k' || event.key === 'K'

    if (!isCmdOrCtrl || !isKKey) {
        return
    }

    event.preventDefault()

    if (props.isOpen) {
        close()
        return
    }

    emit('open')
}

// Register keyboard event listener
onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

// Clean up keyboard event listener
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 150ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
    transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
    transform: scale(0.95);
    opacity: 0;
}
</style>
