<template>
  <div v-if="isEnabled" class="mt-12 space-y-4">
    <h3 class="text-2xl font-bold text-neutral-900 dark:text-white">
      Comments
    </h3>

    <div id="disqus_thread" class="disqus-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  shortname: string
  identifier: string
  title: string
  url: string
}

const props = defineProps<Props>()
const { isEnabled } = useDisqus()

onMounted(() => {
  if (!window.DISQUS) {
    const script = document.createElement('script')
    script.src = `https://${props.shortname}.disqus.com/embed.js`
    script.async = true
    script.setAttribute('data-timestamp', new Date().getTime().toString())
    document.body.appendChild(script)
  } else {
    window.DISQUS.reset({
      reload: true,
      config() {
        this.page.identifier = props.identifier
        this.page.url = props.url
        this.page.title = props.title
      },
    })
  }
})
</script>

<style scoped>
.disqus-container {
  /* Disqus injects its own styles */
}
</style>
