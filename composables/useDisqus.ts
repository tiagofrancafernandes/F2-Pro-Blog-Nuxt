import { computed } from 'vue'

export function useDisqus() {
  const config = useAppConfig()
  const shortname = config.disqus.shortname

  return {
    shortname,
    isEnabled: computed(() => !!shortname),
  }
}
