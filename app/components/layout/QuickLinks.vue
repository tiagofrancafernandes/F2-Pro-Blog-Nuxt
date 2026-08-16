<template>
    <div class="border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-16 z-40">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
                class="flex items-center gap-4 sm:gap-8 overflow-x-auto"
                :class="[
                    {
                        // TODO: identificar se tem scroll ou se a página está com rolagem fora do topo (0)
                        'py-2 md:py-3': true, // se feito scroll menor que X
                        'py-1 md:py-1': false, // se feito scroll de X ou mais
                    },
                ]"
            >
                <!-- Resources Label -->
                <div class="flex items-center gap-2 flex-shrink-0 text-gray-600 dark:text-gray-400 text-sm font-medium">
                    <Icon name="mdi:bookmark-multiple" class="w-4 h-4" />
                    <span class="uppercase text-xs tracking-wider">{{ $t('nav.resources') }}</span>
                </div>

                <!-- Quick Links -->
                <div class="flex items-center gap-2 sm:gap-6 flex-shrink-0">
                    <a
                        v-for="link in quickLinks"
                        :key="link.translationKey"
                        :href="link.href"
                        :target="link.external ? '_blank' : undefined"
                        :rel="link.external ? 'noopener noreferrer' : undefined"
                        class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors whitespace-nowrap py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <span>{{ $t(`nav.${link.translationKey}`) }}</span>
                        <Icon v-if="link.external" name="mdi:open-in-new" class="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface QuickLink {
    translationKey: string;
    href: string;
    external?: boolean;
}

const quickLinks: QuickLink[] = [
    { translationKey: 'tutorials', href: '/', external: false },
    { translationKey: 'blog', href: '/', external: false },
    { translationKey: 'portfolio', href: '#portfolio', external: false },
    { translationKey: 'hireMe', href: '#contact', external: false },
];
</script>
