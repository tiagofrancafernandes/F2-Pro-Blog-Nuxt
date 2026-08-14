<template>
    <div class="border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-16 z-40">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="flex items-center gap-4 sm:gap-8 overflow-x-auto py-3">
                <!-- Resources Label -->
                <div class="flex items-center gap-2 flex-shrink-0 text-gray-600 dark:text-gray-400 text-sm font-medium">
                    <Icon name="mdi:bookmark-multiple" class="w-4 h-4" />
                    <span class="uppercase text-xs tracking-wider">Resources</span>
                </div>

                <!-- Quick Links -->
                <div class="flex items-center gap-2 sm:gap-6 flex-shrink-0">
                    <a
                        v-for="link in quickLinks"
                        :key="link.label"
                        :href="link.href"
                        :target="link.external ? '_blank' : undefined"
                        :rel="link.external ? 'noopener noreferrer' : undefined"
                        class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors whitespace-nowrap py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <span>{{ link.label }}</span>
                        <Icon
                            v-if="link.external"
                            name="mdi:open-in-new"
                            class="w-3 h-3"
                        />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    interface QuickLink {
        label: string
        href: string
        external?: boolean
    }

    const quickLinks: QuickLink[] = [
        { label: 'Tutorials', href: '/', external: false },
        { label: 'Blog', href: '/', external: false },
        { label: 'GitHub', href: 'https://github.com/tiagofrancafernandes', external: true },
        { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
        { label: 'Portfolio', href: '#portfolio', external: false },
        { label: 'Hire Me', href: '#contact', external: false },
    ]
</script>
