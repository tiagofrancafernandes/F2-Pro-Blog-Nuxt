<template>
    <footer class="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <!-- Brand -->
                <div>
                    <div class="flex items-center gap-2 font-bold text-lg mb-2">
                        <span class="text-red-600 dark:text-red-400">Tiago</span>
                        <span class="text-gray-700 dark:text-gray-300">França</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                        Technical blog about development, software architecture, and best practices.
                    </p>
                </div>

                <!-- Links -->
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Links</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-red-600">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <a href="#about" class="text-gray-600 dark:text-gray-400 hover:text-red-600">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#contact" class="text-gray-600 dark:text-gray-400 hover:text-red-600">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Social -->
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Follow</h3>
                    <div class="flex gap-4">
                        <a
                            href="#twitter"
                            class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                            aria-label="Twitter"
                        >
                            <Icon name="mdi:twitter" class="w-5 h-5" />
                        </a>
                        <a
                            href="#github"
                            class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                            aria-label="GitHub"
                        >
                            <Icon name="mdi:github" class="w-5 h-5" />
                        </a>
                        <a
                            href="#linkedin"
                            class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Icon name="mdi:linkedin" class="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 order-3 sm:order-1">
                        © 2026 Tiago França. All rights reserved.
                    </p>

                    <div class="flex items-center gap-6 order-1 sm:order-2">
                        <!-- Language Selector -->
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-gray-600 dark:text-gray-400 font-medium">{{ $t('nav.posts') }}:</span>
                            <select
                                :value="locale"
                                @change="changeLanguage($event)"
                                class="px-2 py-1 text-sm rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                                aria-label="Select language"
                            >
                                <option value="en-US">English</option>
                                <option value="pt-BR">Português</option>
                            </select>
                        </div>

                        <!-- Color Mode Toggle -->
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-gray-600 dark:text-gray-400 font-medium">Theme:</span>
                            <button
                                @click="colorMode.preference = 'light'"
                                :class="getThemeButtonClass('light')"
                                title="Light mode"
                                aria-label="Switch to light mode"
                            >
                                <Icon name="mdi:white-balance-sunny" class="w-4 h-4" />
                            </button>
                            <button
                                @click="colorMode.preference = 'system'"
                                :class="getThemeButtonClass('system')"
                                title="System mode (automatic)"
                                aria-label="Switch to system theme"
                            >
                                <Icon name="mdi:desktop-classic" class="w-4 h-4" />
                            </button>
                            <button
                                @click="colorMode.preference = 'dark'"
                                :class="getThemeButtonClass('dark')"
                                title="Dark mode"
                                aria-label="Switch to dark mode"
                            >
                                <Icon name="mdi:moon-waning-crescent" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    const colorMode = useColorMode()
    const { locale } = useI18n()

    function getThemeButtonClass(mode: string): string {
        const baseClass = 'p-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400'

        if (colorMode.preference === mode) {
            return `${baseClass} bg-red-600 text-white`
        }

        return `${baseClass} bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700`
    }

    function changeLanguage(event: Event) {
        const target = event.target as HTMLSelectElement
        locale.value = target.value
        localStorage.setItem('i18n_locale', target.value)
    }
</script>
