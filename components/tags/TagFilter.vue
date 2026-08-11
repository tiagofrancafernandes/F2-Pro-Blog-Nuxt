<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
      Tags
    </h3>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="[
          'px-3 py-2 rounded-full text-sm font-medium transition-colors',
          {
            'bg-red-600 text-white dark:bg-red-500': activeTag === tag,
            'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600': activeTag !== tag,
          },
        ]"
        @click="selectTag(tag)"
      >
        {{ tag }}
        <span class="ml-1 text-xs opacity-75">
          ({{ tagCounts.get(tag) || 0 }})
        </span>
      </button>
    </div>

    <button
      v-if="activeTag"
      :class="[
        'w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        'bg-neutral-200 text-neutral-700 hover:bg-neutral-300',
        'dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600',
      ]"
      @click="clearTag"
    >
      Clear Filter
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTags } from '~/composables/useTags'

interface Props {
  posts: Array<{ tags: string[] }>
}

const props = defineProps<Props>()
const router = useRouter()
const route = useRoute()

const { allTags, tagCounts } = useTags(props.posts)
const activeTag = ref<string | null>((route.query.tag as string) || null)

watch(
  () => route.query.tag,
  (newTag) => {
    activeTag.value = (newTag as string) || null
  },
)

const selectTag = (tag: string) => {
  activeTag.value = tag
  router.push({ query: { tag } })
}

const clearTag = () => {
  activeTag.value = null
  router.push({ query: {} })
}
</script>
