<template>
    <footer class="bg-slate-950 text-white">
        <!-- Main Footer Content -->
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                <!-- Brand Section -->
                <div class="md:col-span-1">
                    <div class="mb-6">
                        <div class="flex items-center gap-2 font-bold text-2xl mb-4">
                            <span class="text-emerald-500">Tiago</span>
                            <span class="text-white">França</span>
                        </div>
                        <p class="text-gray-300 text-sm leading-relaxed">
                            Expert backend engineer. Building scalable systems, modern APIs, and digital solutions that
                            drive real results.
                        </p>
                    </div>

                    <!-- Contact Info (Anti-Crawler Protected) -->
                    <div class="space-y-3">
                        <div class="flex items-center gap-2 text-sm text-gray-300">
                            <button
                                type="button"
                                @click="handleEmailClick"
                                class="flex items-center gap-3 hover:text-emerald-500 transition-colors text-left group cursor-pointer"
                                :title="isEmailRevealed ? 'Enviar e-mail' : 'Clique para exibir e-mail'"
                            >
                                <Icon name="mdi:email" class="w-5 h-5 flex-shrink-0 text-emerald-500" />
                                <span :class="{ 'font-mono text-gray-400': !isEmailRevealed }">
                                    {{ formattedEmail }}
                                </span>
                            </button>
                            <button
                                type="button"
                                @click="toggleEmailReveal"
                                class="p-1 text-gray-500 hover:text-emerald-400 transition-colors cursor-pointer"
                                :title="isEmailRevealed ? 'Ocultar e-mail' : 'Exibir e-mail'"
                                aria-label="Toggle email visibility"
                            >
                                <Icon
                                    :name="isEmailRevealed ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                                    class="w-4 h-4"
                                />
                            </button>
                        </div>

                        <div class="flex items-center gap-2 text-sm text-gray-300">
                            <button
                                type="button"
                                @click="handlePhoneClick"
                                class="flex items-center gap-3 hover:text-emerald-500 transition-colors text-left group cursor-pointer"
                                :title="isPhoneRevealed ? 'Abrir no WhatsApp' : 'Clique para exibir telefone/WhatsApp'"
                            >
                                <Icon name="mdi:whatsapp" class="w-5 h-5 flex-shrink-0 text-emerald-500" />
                                <span :class="{ 'font-mono text-gray-400': !isPhoneRevealed }">
                                    {{ formattedPhone }}
                                </span>
                            </button>
                            <button
                                type="button"
                                @click="togglePhoneReveal"
                                class="p-1 text-gray-500 hover:text-emerald-400 transition-colors cursor-pointer"
                                :title="isPhoneRevealed ? 'Ocultar telefone' : 'Exibir telefone'"
                                aria-label="Toggle phone visibility"
                            >
                                <Icon
                                    :name="isPhoneRevealed ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                                    class="w-4 h-4"
                                />
                            </button>
                        </div>
                    </div>

                    <!-- Social Links -->
                    <div class="flex gap-3 mt-6">
                        <NuxtLink
                            to="https://twitter.com"
                            target="_blank"
                            class="p-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                            <Icon name="mdi:twitter" class="w-5 h-5" />
                        </NuxtLink>
                        <NuxtLink
                            to="https://github.com/tiagofrancafernandes"
                            target="_blank"
                            class="p-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                            <Icon name="mdi:github" class="w-5 h-5" />
                        </NuxtLink>
                        <NuxtLink
                            to="https://wwwhttps://linkedin.com/in/tiago-php"
                            target="_blank"
                            class="p-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                            <Icon name="mdi:linkedin" class="w-5 h-5" />
                        </NuxtLink>
                    </div>
                </div>

                <!-- Services Section -->
                <div>
                    <h3 class="text-white font-semibold mb-6 pb-3 border-b-2 border-emerald-500">Services</h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink to="#backend" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                Backend Development
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#api" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                API Design
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#database" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                Database Optimization
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#architecture" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                System Architecture
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#consulting" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                Technical Consulting
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Technologies Section -->
                <div>
                    <h3 class="text-white font-semibold mb-6 pb-3 border-b-2 border-emerald-500">Technologies</h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink to="#php" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                PHP & Laravel
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#node" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                Node.js
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#database" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                PostgreSQL
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#docker" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                Docker
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="#vue" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                Vue & Nuxt
                            </NuxtLink>
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
                            <NuxtLink to="/about" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                {{ $t('nav.about') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/posts" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                {{ $t('nav.posts') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/hire-me" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                {{ $t('nav.hireMe') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/posts" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                {{ $t('nav.tutorials') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/portfolio" class="text-gray-300 hover:text-emerald-500 transition-colors text-sm">
                                {{ $t('nav.portfolio') }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- CTA Section -->
                <div class="flex flex-col justify-between">
                    <div class="bg-slate-900 rounded-lg p-6 border border-slate-800">
                        <Icon name="mdi:star" class="w-6 h-6 text-emerald-500 mb-3" />
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
                <p>&copy; {{ (new Date())?.getFullYear() }} Tiago França. {{ $t('footer.copyright') }}</p>
                <div class="flex flex-wrap gap-6 items-center">
                    <NuxtLink to="/sitemap" class="hover:text-emerald-500 transition-colors">
                        {{ $t('sitemap.title') }}
                    </NuxtLink>
                    <NuxtLink to="/p/privacy-policy" class="hover:text-emerald-500 transition-colors">
                        {{ $t('footer.privacyPolicy') }}
                    </NuxtLink>
                    <NuxtLink to="/p/terms-of-service" class="hover:text-emerald-500 transition-colors">
                        {{ $t('footer.termsOfService') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useObfuscatedContact } from '~/composables/useObfuscatedContact';

const colorMode = useColorMode();
const { locale } = useI18n();

const {
    isPhoneRevealed,
    isEmailRevealed,
    formattedPhone,
    formattedEmail,
    togglePhoneReveal,
    toggleEmailReveal,
    handlePhoneClick,
    handleEmailClick,
} = useObfuscatedContact();

type localeValues = "en-US" | "en" | "pt-BR" | "pt";

function getThemeButtonClass(mode: string): string {
    const baseClass = 'p-2 rounded transition-colors text-gray-400';

    if (colorMode.preference === mode) {
        return `${baseClass} bg-emerald-600 text-white`;
    }

    return `${baseClass} hover:text-gray-300`;
}

function changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    locale.value = (target.value || 'en') as localeValues;
    localStorage.setItem('i18n_locale', target.value);
}
</script>
