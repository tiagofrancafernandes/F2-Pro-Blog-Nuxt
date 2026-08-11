<template>
  <div
    v-if="minutes > 0"
    class="flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-400"
  >
    <iconify-icon icon="fa7-solid:clock" class="w-3 h-3" />
    <span>{{ minutes }} min read</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getReadingTime } from '~/composables/useReadingTime'

interface Props {
  content: string
}

const props = defineProps<Props>()

const minutes = computed(() => {
  return getReadingTime(props.content)
})
</script>
