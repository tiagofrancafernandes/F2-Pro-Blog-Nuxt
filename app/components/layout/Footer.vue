<template>
    <footer class="bg-slate-950 text-white">
        <!-- Main Footer Content -->
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                <!-- Brand Section -->
                <div class="md:col-span-1">
                    <div class="mb-6">
                        <div class="flex items-center gap-2 font-bold text-2xl mb-4">
                            <span class="text-red-500">Tiago</span>
                            <span class="text-white">França</span>
                        </div>
                        <p class="text-gray-300 text-sm leading-relaxed">
                            Expert backend engineer. Building scalable systems, modern APIs, and digital solutions that
                            drive real results.
                        </p>
                    </div>

                    <!-- Contact Info -->
                    <div class="space-y-3">
                        <a
                            href="mailto:devtiagofranca@gmail.com"
                            class="flex items-center gap-3 text-gray-300 hover:text-red-500 transition-colors text-sm"
                        >
                            <Icon name="mdi:email" class="w-5 h-5" />
                            devtiagofranca@gmail.com
                        </a>
                        <a
                            href="tel:+5511999999999"
                            class="flex items-center gap-3 text-gray-300 hover:text-red-500 transition-colors text-sm"
                        >
                            <Icon name="mdi:phone" class="w-5 h-5" />
                            +55 (11) 99999-9999
                        </a>
                    </div>

                    <!-- Social Links -->
                    <div class="flex gap-3 mt-6">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            class="p-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                            <Icon name="mdi:twitter" class="w-5 h-5" />
                        </a>
                        <a
                            href="https://github.com/tiagofrancafernandes"
                            target="_blank"
                            class="p-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                            <Icon name="mdi:github" class="w-5 h-5" />
                        </a>
                        <a
                            href="https://wwwhttps://linkedin.com/in/tiago-php"
                            target="_blank"
                            class="p-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                            <Icon name="mdi:linkedin" class="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <!-- Services Section -->
                <div>
                    <h3 class="text-white font-semibold mb-6 pb-3 border-b-2 border-emerald-500">Services</h3>
                    <ul class="space-y-3">
                        <li>
                            <a href="#backend" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Backend Development
                            </a>
                        </li>
                        <li>
                            <a href="#api" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                API Design
                            </a>
                        </li>
                        <li>
                            <a href="#database" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Database Optimization
                            </a>
                        </li>
                        <li>
                            <a href="#architecture" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                System Architecture
                            </a>
                        </li>
                        <li>
                            <a href="#consulting" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Technical Consulting
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Technologies Section -->
                <div>
                    <h3 class="text-white font-semibold mb-6 pb-3 border-b-2 border-emerald-500">Technologies</h3>
                    <ul class="space-y-3">
                        <li>
                            <a href="#php" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                PHP & Laravel
                            </a>
                        </li>
                        <li>
                            <a href="#node" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Node.js
                            </a>
                        </li>
                        <li>
                            <a href="#database" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                PostgreSQL
                            </a>
                        </li>
                        <li>
                            <a href="#docker" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Docker
                            </a>
                        </li>
                        <li>
                            <a href="#vue" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Vue & Nuxt
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Growth Section -->
                <div>
                    <h3 class="text-white font-semibold mb-6 pb-3 border-b-2 border-emerald-500">
                        {{ $t('footer.resources') }}
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink to="/about" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                {{ $t('nav.about') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <a href="/" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                {{ $t('nav.posts') }}
                            </a>
                        </li>
                        <li>
                            <NuxtLink to="/hire-me" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                {{ $t('nav.hireMe') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <a href="#tutorials" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Tutorials
                            </a>
                        </li>
                        <li>
                            <a href="#guides" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Guides
                            </a>
                        </li>
                        <li>
                            <a href="#portfolio" class="text-gray-300 hover:text-red-500 transition-colors text-sm">
                                Portfolio
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- CTA Section -->
                <div class="flex flex-col justify-between">
                    <div class="bg-slate-900 rounded-lg p-6 border border-slate-800">
                        <Icon name="mdi:star" class="w-6 h-6 text-red-500 mb-3" />
                        <h4 class="text-white font-semibold mb-2">Need a Developer?</h4>
                        <p class="text-gray-300 text-sm mb-4">Let's build something amazing together.</p>
                        <NuxtLink
                            to="/hire-me"
                            class="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                            Hire Me
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Settings Bar -->
            <div class="border-t border-slate-800 pt-6 mb-6">
                <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <!-- Language Selector -->
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-400 font-medium">Language:</span>
                        <select
                            :value="locale"
                            @change="changeLanguage($event)"
                            class="px-3 py-1 text-sm rounded-lg bg-slate-800 text-white border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                            aria-label="Select language"
                        >
                            <option value="en-US">English</option>
                            <option value="pt-BR">Português</option>
                        </select>
                    </div>

                    <!-- Theme Toggle -->
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-400 font-medium">Theme:</span>
                        <div class="flex gap-1 bg-slate-800 rounded-lg p-1">
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

            <!-- Bottom Bar -->
            <div
                class="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400"
            >
                <p>© 2026 Tiago França. All rights reserved.</p>
                <div class="flex gap-6">
                    <a href="#privacy" class="hover:text-red-500 transition-colors">Privacy Policy</a>
                    <a href="#terms" class="hover:text-red-500 transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const { locale } = useI18n();

function getThemeButtonClass(mode: string): string {
    const baseClass = 'p-2 rounded transition-colors text-gray-400';

    if (colorMode.preference === mode) {
        return `${baseClass} bg-emerald-600 text-white`;
    }

    return `${baseClass} hover:text-gray-300`;
}

function changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    locale.value = target.value;
    localStorage.setItem('i18n_locale', target.value);
}
</script>
