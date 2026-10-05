<template>
    <div
        class="border-b border-gray-100 dark:border-slate-500/40 bg-white dark:bg-slate-900 sticky z-40 transition-all duration-200"
        :class="[
            {
                'top-16': !isScrolled,
                'top-12': isScrolled,
            },
        ]"
    >
        <div
            :class="[
                'mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200',
                {
                    'max-w-6xl': !isScrolled,
                    'max-w-7xl': isScrolled,
                }
            ]"
        >
            <div
                class="flex items-center gap-4 sm:gap-8 overflow-x-auto transition-all duration-200"
                :class="[
                    {
                        'py-2 md:py-3': !isScrolled,
                        'py-1 md:py-1': isScrolled,
                    },
                ]"
            >
                <!-- Resources Label -->
                <div class="hidden md:flex items-center gap-2 flex-shrink-0 text-gray-600 dark:text-gray-400 text-sm font-medium">
                    <Icon name="mdi:bookmark-multiple" class="w-4 h-4" />
                    <span class="uppercase text-xs tracking-wider">{{ $t('nav.resources') }}</span>
                </div>

                <!-- Quick Links -->
                <div class="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-2 flex-shrink-0">
                    <NuxtLink
                        v-for="link in quickLinks"
                        :key="link.translationKey"
                        :to="link.href"
                        :target="link.external ? '_blank' : undefined"
                        :external="link.external ? true : undefined"
                        :rel="link.external ? 'noopener noreferrer' : undefined"
                        :class="[
                            'flex min-w-[fit]',
                            {
                                'justify-between': link?.external,
                                'justify-center': !link?.external,
                            },
                            'border border-gray-100/10 items-center gap-2',
                            'text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 hover:border-emerald-400 dark:hover:text-emerald-400',
                            'transition-colors whitespace-nowrap py-1 px-2',
                            'rounded-sm hover:bg-gray-100 dark:hover:bg-slate-800',
                        ]"
                    >
                        <span>{{ $t(`${link.translationKey}`) }}</span>
                        <Icon v-if="link.external" name="mdi:open-in-new" class="w-3 h-3" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    isScrolled?: boolean;
    scrollY?: number;
}

const props = withDefaults(defineProps<Props>(), {
    isScrolled: false,
    scrollY: 0,
});

interface QuickLink {
    translationKey: string;
    href: string;
    external?: boolean;
    show?: boolean | (() => boolean);
}

const quickLinks: QuickLink[] = [
    { show: true, translationKey: 'nav.tutorials', href: '/', external: false },
    { show: true, translationKey: 'nav.portfolio', href: '#portfolio', external: false },
    { show: true, translationKey: 'nav.hireMe', href: '/hire-me', external: false },
    { show: true, translationKey: 'nav.cv', href: '/l/cv', external: true },
    { show: true, translationKey: 'general.linkedin', href: '/l/linkedin', external: true },
    { show: true, translationKey: 'general.github', href: '/l/github', external: true },
].filter((i: QuickLink) => {
    try {
        let _show = i?.show ?? true;

        if (typeof _show === 'function') {
            _show = Boolean(_show());
        }

        return Boolean(Number(_show));
    } catch (error) {
        return false;
    }
});

</script>
