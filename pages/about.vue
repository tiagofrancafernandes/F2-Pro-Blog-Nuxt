<template>
    <div>
        <!-- Header Section -->
        <section class="px-4 py-16 sm:px-6 lg:px-8 border-b" :style="{ borderColor: borderColor, backgroundColor: headerBgColor }">
            <div class="mx-auto max-w-3xl space-y-4">
                <h1 class="text-5xl font-bold" :style="{ color: textPrimary }">
                    Sobre Mim
                </h1>
                <p class="text-xl" :style="{ color: textSecondary }">
                    Conheça a história e experiência por trás deste blog
                </p>
            </div>
        </section>

        <!-- Main Content -->
        <section class="px-4 py-12 sm:px-6 lg:px-8" :style="{ backgroundColor: bgPrimary }">
            <div class="mx-auto max-w-3xl space-y-12">
                <!-- Bio Section -->
                <div class="space-y-6">
                    <div class="space-y-4" :style="{ color: textPrimary }">
                        <p class="text-lg leading-relaxed" :style="{ color: textSecondary }">
                            {{ appConfig.public.blog.description }}
                        </p>

                        <p class="text-lg leading-relaxed" :style="{ color: textSecondary }">
                            Com mais de 10 anos de experiência em desenvolvimento backend, tenho paixão por criar arquiteturas escaláveis, APIs robustas, e soluções que resolvem problemas reais. Especialista em PHP, Laravel, PostgreSQL e DevOps com foco em qualidade, performance e manutenibilidade.
                        </p>

                        <p class="text-lg leading-relaxed" :style="{ color: textSecondary }">
                            Neste blog, compartilho artigos sobre desenvolvimento de software, melhores práticas, padrões de arquitetura, e aprendizados adquiridos ao longo da jornada. Meu objetivo é contribuir com a comunidade de desenvolvimento brasileiro.
                        </p>
                    </div>
                </div>

                <!-- Skills Section -->
                <div class="space-y-4">
                    <h2 class="text-3xl font-bold" :style="{ color: textPrimary }">
                        Especialidades
                    </h2>
                    <div class="grid gap-4 md:grid-cols-2">
                        <div
                            v-for="skill in skills"
                            :key="skill"
                            class="rounded-lg p-4 border"
                            :style="{
                                backgroundColor: cardBgColor,
                                borderColor: borderColor,
                                color: textPrimary,
                            }"
                        >
                            <p class="font-semibold">
                                {{ skill }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Experience Section -->
                <div class="space-y-4">
                    <h2 class="text-3xl font-bold" :style="{ color: textPrimary }">
                        Experiência
                    </h2>
                    <div class="space-y-4">
                        <div
                            v-for="(exp, index) in experience"
                            :key="index"
                            class="rounded-lg p-6 border"
                            :style="{
                                backgroundColor: cardBgColor,
                                borderColor: borderColor,
                            }"
                        >
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="text-xl font-semibold" :style="{ color: textPrimary }">
                                    {{ exp.role }}
                                </h3>
                                <span
                                    class="text-sm font-medium px-3 py-1 rounded-full"
                                    :style="{
                                        backgroundColor: primaryLightBg,
                                        color: primaryColor,
                                    }"
                                >
                                    {{ exp.period }}
                                </span>
                            </div>
                            <p class="mb-2" :style="{ color: textSecondary }">
                                {{ exp.company }}
                            </p>
                            <p :style="{ color: textSecondary }">
                                {{ exp.description }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contact Section -->
                <div
                    class="rounded-lg p-8 border-l-4"
                    :style="{
                        backgroundColor: cardBgColor,
                        borderLeftColor: primaryColor,
                        borderColor: borderColor,
                    }"
                >
                    <h2 class="text-3xl font-bold mb-4" :style="{ color: textPrimary }">
                        Conecte-se Comigo
                    </h2>
                    <p class="mb-6" :style="{ color: textSecondary }">
                        Você pode me encontrar em diversos canais. Fico feliz em conectar, colaborar e discutir sobre desenvolvimento.
                    </p>
                    <div class="flex gap-4 flex-wrap">
                        <a
                            href="https://github.com/tiagofrancafernandes"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all"
                            :style="{
                                backgroundColor: primaryColor,
                                color: '#ffffff',
                            }"
                        >
                            <iconify-icon icon="fa7-brands:github" class="w-5 h-5"></iconify-icon>
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/tiagofrancafernandes"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all"
                            :style="{
                                backgroundColor: primaryColor,
                                color: '#ffffff',
                            }"
                        >
                            <iconify-icon icon="fa7-brands:linkedin" class="w-5 h-5"></iconify-icon>
                            LinkedIn
                        </a>
                        <a
                            href="https://twitter.com/tiagofranca"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all"
                            :style="{
                                backgroundColor: primaryColor,
                                color: '#ffffff',
                            }"
                        >
                            <iconify-icon icon="fa7-brands:twitter" class="w-5 h-5"></iconify-icon>
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#app'

const appConfig = useAppConfig()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.preference === 'dark')

// Design system colors
const primaryColor = computed(() => isDark.value ? '#f87171' : '#ef4444')
const primaryLightBg = computed(() => isDark.value ? '#7f1d1d' : '#fee2e2')
const bgPrimary = computed(() => isDark.value ? '#0f0f0f' : '#ffffff')
const headerBgColor = computed(() => isDark.value ? '#1a1a1a' : '#f9fafb')
const cardBgColor = computed(() => isDark.value ? '#2d2d2d' : '#f3f4f6')
const borderColor = computed(() => isDark.value ? '#404040' : '#e5e7eb')
const textPrimary = computed(() => isDark.value ? '#f5f5f5' : '#111827')
const textSecondary = computed(() => isDark.value ? '#bfbfbf' : '#6b7280')

const skills = [
    'PHP & Laravel',
    'APIs RESTful',
    'PostgreSQL & Databases',
    'Docker & DevOps',
    'Vue.js & Nuxt',
    'System Design',
    'Clean Code',
    'Microservices',
]

const experience = [
    {
        role: 'Senior Backend Engineer',
        company: 'Empresa Atual',
        period: '2022 - Presente',
        description: 'Líder técnico na arquitetura de microserviços, otimização de performance e mentoria de desenvolvedores. Responsável por APIs críticas servindo milhões de requisições por dia.',
    },
    {
        role: 'Full Stack Developer',
        company: 'Startup Tech',
        period: '2018 - 2022',
        description: 'Desenvolvimento fullstack com Laravel e Vue.js. Implementação de features, refatoração de código legado e otimização de banco de dados.',
    },
    {
        role: 'Junior Developer',
        company: 'Agência Web',
        period: '2016 - 2018',
        description: 'Desenvolvimento web com PHP puro e CMS. Aprendizado fundamental de boas práticas e padrões de desenvolvimento.',
    },
]

useHead({
    title: `Sobre - ${appConfig.public.blog.author}`,
    meta: [
        {
            name: 'description',
            content: `Conheça ${appConfig.public.blog.author}, desenvolvedor backend especializado em PHP, Laravel e arquitetura de software.`,
        },
        {
            property: 'og:title',
            content: `Sobre - ${appConfig.public.blog.author}`,
        },
    ],
})
</script>
