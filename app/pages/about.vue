<template>
    <div class="min-h-screen bg-white dark:bg-slate-900">
        <!-- Hero Section -->
        <section class="bg-red-600 dark:bg-red-700 text-white py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col lg:flex-row items-center gap-12">
                    <!-- Avatar -->
                    <div class="flex-shrink-0">
                        <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-red-500 dark:bg-red-800 flex items-center justify-center">
                            <Icon name="mdi:account-circle" class="w-24 h-24 sm:w-32 sm:h-32 text-red-200" />
                        </div>
                    </div>

                    <!-- Intro -->
                    <div class="flex-1 text-center lg:text-left">
                        <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                            {{ t('hero.name') }}
                        </h1>
                        <p class="text-xl text-red-100 mb-6">
                            {{ t('hero.title') }}
                        </p>
                        <p class="text-red-50 max-w-2xl text-lg leading-relaxed mb-8">
                            {{ t('hero.subtitle') }}
                        </p>
                        <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <a
                                href="#contact"
                                class="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
                            >
                                {{ t('cta.contact') }}
                            </a>
                            <a
                                href="https://tiagofranca.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="px-6 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors"
                            >
                                {{ t('cta.website') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="bg-white dark:bg-slate-900 py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <!-- Main About -->
                    <div class="lg:col-span-2">
                        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                            {{ t('about.title') }}
                        </h2>

                        <div class="prose dark:prose-invert max-w-none space-y-6">
                            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {{ t('about.intro') }}
                            </p>

                            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {{ t('about.experience') }}
                            </p>

                            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {{ t('about.career') }}
                            </p>

                            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {{ t('about.interests') }}
                            </p>

                            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {{ t('about.mentoring') }}
                            </p>

                            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {{ t('about.philosophy') }}
                            </p>
                        </div>
                    </div>

                    <!-- Skills Sidebar -->
                    <div class="lg:col-span-1">
                        <div class="bg-gray-50 dark:bg-slate-800 rounded-lg p-8 sticky top-28">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                {{ t('skills.title') }}
                            </h3>

                            <div class="space-y-6">
                                <!-- Backend -->
                                <div>
                                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase">
                                        {{ t('skills.backend') }}
                                    </h4>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="skill in ['PHP', 'Laravel', 'PostgreSQL', 'REST APIs']"
                                            :key="skill"
                                            class="text-xs px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full font-medium"
                                        >
                                            {{ skill }}
                                        </span>
                                    </div>
                                </div>

                                <!-- DevOps -->
                                <div>
                                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase">
                                        {{ t('skills.devops') }}
                                    </h4>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="skill in ['Docker', 'Linux', 'AWS', 'PostgreSQL']"
                                            :key="skill"
                                            class="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
                                        >
                                            {{ skill }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Frontend -->
                                <div>
                                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase">
                                        {{ t('skills.frontend') }}
                                    </h4>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="skill in ['Vue.js', 'Nuxt', 'Tailwind CSS', 'TypeScript']"
                                            :key="skill"
                                            class="text-xs px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium"
                                        >
                                            {{ skill }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Specializations -->
                                <div>
                                    <h4 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase">
                                        {{ t('skills.specializations') }}
                                    </h4>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="skill in ['Software Architecture', 'Performance', 'Database Optimization', 'API Design']"
                                            :key="skill"
                                            class="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium"
                                        >
                                            {{ skill }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Projects -->
        <section class="bg-gray-50 dark:bg-slate-800 py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                    {{ t('projects.title') }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Hour Ledger -->
                    <a
                        href="https://hourledger.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div class="h-40 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon name="mdi:clock-outline" class="w-16 h-16 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Hour Ledger</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('projects.hourledger') }}</p>
                        </div>
                    </a>

                    <!-- GitHub Projects Stats -->
                    <a
                        href="https://github-projects-stats.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div class="h-40 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon name="mdi:github" class="w-16 h-16 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">GitHub Projects Stats</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('projects.github-stats') }}</p>
                        </div>
                    </a>

                    <!-- Laravel Vue Admin -->
                    <a
                        href="https://laravel-vue-admin-with-inertia.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div class="h-40 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon name="mdi:laravel" class="w-16 h-16 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Laravel Vue Admin</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('projects.laravel-vue') }}</p>
                        </div>
                    </a>

                    <!-- SuperPOS -->
                    <a
                        href="https://super-pos-vue.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div class="h-40 bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon name="mdi:shopping" class="w-16 h-16 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">SuperPOS Vue</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('projects.superpos') }}</p>
                        </div>
                    </a>

                    <!-- Tailwind v4 Cheat Sheet -->
                    <a
                        href="https://tailwindcss-v4-cheat-sheet.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div class="h-40 bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon name="mdi:palette" class="w-16 h-16 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Tailwind v4 Cheat Sheet</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('projects.tailwind') }}</p>
                        </div>
                    </a>

                    <!-- Customer Reviews AI -->
                    <a
                        href="https://customer-reviews-ai-summary-nextjs-eosin-seven.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div class="h-40 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon name="mdi:brain" class="w-16 h-16 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Reviews AI Summary</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ t('projects.reviews-ai') }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Social Links & Contact -->
        <section id="contact" class="bg-white dark:bg-slate-900 py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Social Links -->
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            {{ t('social.title') }}
                        </h2>

                        <div class="space-y-4">
                            <a
                                href="https://github.com/tiagofrancafernandes"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
                            >
                                <Icon name="mdi:github" class="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400" />
                                <div>
                                    <p class="font-semibold text-gray-900 dark:text-white">GitHub</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">400+ {{ t('social.repos') }}</p>
                                </div>
                            </a>

                            <a
                                href="https://linkedin.com/in/tiago-php"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
                            >
                                <Icon name="mdi:linkedin" class="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400" />
                                <div>
                                    <p class="font-semibold text-gray-900 dark:text-white">LinkedIn</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('social.linkedin') }}</p>
                                </div>
                            </a>

                            <a
                                href="https://dev.to/tiagofrancafernandes"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
                            >
                                <Icon name="mdi:dev-to" class="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400" />
                                <div>
                                    <p class="font-semibold text-gray-900 dark:text-white">DEV Community</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('social.dev') }}</p>
                                </div>
                            </a>

                            <a
                                href="https://stackoverflow.com/users/1764112/tiago-franca"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
                            >
                                <Icon name="mdi:stack-overflow" class="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400" />
                                <div>
                                    <p class="font-semibold text-gray-900 dark:text-white">Stack Overflow</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('social.stackoverflow') }}</p>
                                </div>
                            </a>

                            <a
                                href="https://gist.github.com/tiagofrancafernandes"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
                            >
                                <Icon name="mdi:code-braces" class="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400" />
                                <div>
                                    <p class="font-semibold text-gray-900 dark:text-white">GitHub Gists</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('social.gists') }}</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            {{ t('contact.title') }}
                        </h2>

                        <div class="space-y-6">
                            <div class="p-6 rounded-lg bg-gray-50 dark:bg-slate-800">
                                <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Icon name="mdi:email" class="w-5 h-5 text-red-600" />
                                    {{ t('contact.email') }}
                                </h3>
                                <a
                                    href="mailto:devtiagofranca@gmail.com"
                                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                                >
                                    devtiagofranca@gmail.com
                                </a>
                            </div>

                            <div class="p-6 rounded-lg bg-gray-50 dark:bg-slate-800">
                                <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Icon name="mdi:language" class="w-5 h-5 text-red-600" />
                                    {{ t('contact.website') }}
                                </h3>
                                <a
                                    href="https://tiagofranca.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                                >
                                    tiagofranca.com
                                </a>
                            </div>

                            <div class="p-6 rounded-lg bg-gray-50 dark:bg-slate-800">
                                <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Icon name="mdi:teach" class="w-5 h-5 text-red-600" />
                                    {{ t('contact.mentoring') }}
                                </h3>
                                <a
                                    href="https://www.superprof.com.br/aulas-programacao-php-laravel-basico-avancado-sem-restricao-idade.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                                >
                                    {{ t('contact.superprof') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n({
        useScope: 'local',
    })
</script>

<i18n lang="json">
{
    "en-US": {
        "hero": {
            "name": "Tiago França",
            "title": "Senior Backend Engineer",
            "subtitle": "10+ years of experience building scalable systems, leading technical teams, and architecting high-performance solutions."
        },
        "cta": {
            "contact": "Get in Touch",
            "website": "Visit Portfolio"
        },
        "about": {
            "title": "About Me",
            "intro": "I am a Senior Backend Engineer from Brazil with 10+ years of experience in software development, specializing in scalable, maintainable, and API-first systems.",
            "experience": "My strongest background is in PHP, Laravel, PostgreSQL, REST APIs, Docker, Linux, and AWS, with extensive experience in software architecture, database optimization, third-party integrations, and legacy system modernization.",
            "career": "Throughout my career, I have worked on SaaS platforms, enterprise systems, web applications, and business integrations. My work goes beyond implementation: I contribute to architectural decisions, performance improvements, code quality, technical consistency, and the long-term evolution of software products.",
            "interests": "I am particularly interested in backend engineering, API architecture, software architecture, performance, and cloud infrastructure. I also work with Vue.js, Nuxt, and Tailwind CSS when building frontend experiences connected to backend systems.",
            "mentoring": "Alongside my professional work as a software engineer, I also work as a programming mentor and instructor, helping developers improve their skills in PHP, Laravel, Linux, Docker, and software engineering fundamentals.",
            "philosophy": "I enjoy turning complex systems into simpler, reliable, high-performance, and maintainable solutions."
        },
        "skills": {
            "title": "Core Skills",
            "backend": "Backend",
            "devops": "DevOps & Infrastructure",
            "frontend": "Frontend",
            "specializations": "Specializations"
        },
        "projects": {
            "title": "Featured Projects",
            "hourledger": "Hours and time management application for tracking work time.",
            "github-stats": "GitHub statistics dashboard to visualize project metrics.",
            "laravel-vue": "Full-stack admin panel with Laravel, Vue, and Inertia.",
            "superpos": "Point of sale system built with Vue 3.",
            "tailwind": "Practical reference guide for Tailwind CSS v4.",
            "reviews-ai": "AI-powered customer review summarization tool."
        },
        "social": {
            "title": "Connect With Me",
            "repos": "repositories and projects",
            "linkedin": "Professional profile and recommendations",
            "dev": "Technical articles and community",
            "stackoverflow": "Questions and answers about web development",
            "gists": "Code snippets and technical examples"
        },
        "contact": {
            "title": "Contact",
            "email": "Email",
            "website": "Website",
            "mentoring": "Mentoring & Teaching",
            "superprof": "Superprof mentoring platform"
        }
    },
    "pt-BR": {
        "hero": {
            "name": "Tiago França",
            "title": "Senior Backend Engineer",
            "subtitle": "10+ anos de experiência construindo sistemas escaláveis, liderando equipes técnicas e arquitetando soluções de alta performance."
        },
        "cta": {
            "contact": "Entrar em Contato",
            "website": "Visitar Portfólio"
        },
        "about": {
            "title": "Sobre Mim",
            "intro": "Sou Senior Backend Engineer brasileiro, com mais de 10 anos de experiência em desenvolvimento de software, especializado na construção de sistemas escaláveis, sustentáveis e orientados a APIs.",
            "experience": "Minha principal experiência está em PHP, Laravel, PostgreSQL, APIs REST, Docker, Linux e AWS, atuando também com arquitetura de software, otimização de bancos de dados, integrações com serviços externos e modernização de sistemas legados.",
            "career": "Ao longo da carreira, trabalhei com plataformas SaaS, sistemas corporativos, aplicações web e integrações de negócio, participando não apenas da implementação, mas também de decisões arquiteturais, melhorias de performance, organização de código e evolução técnica de produtos.",
            "interests": "Tenho especial interesse em backend engineering, API architecture, software architecture, performance e cloud infrastructure. Também trabalho com Vue.js, Nuxt e Tailwind CSS para construir interfaces integradas a sistemas backend.",
            "mentoring": "Além da atuação profissional como engenheiro de software, também atuo como mentor e professor de programação, ajudando desenvolvedores a evoluir em PHP, Laravel, Linux, Docker e fundamentos de engenharia de software.",
            "philosophy": "Gosto de transformar sistemas complexos em soluções mais simples, confiáveis, performáticas e fáceis de manter."
        },
        "skills": {
            "title": "Habilidades Principais",
            "backend": "Backend",
            "devops": "DevOps & Infraestrutura",
            "frontend": "Frontend",
            "specializations": "Especializações"
        },
        "projects": {
            "title": "Projetos em Destaque",
            "hourledger": "Aplicação de gerenciamento de horas e controle de tempo.",
            "github-stats": "Dashboard de estatísticas do GitHub com métricas de projetos.",
            "laravel-vue": "Painel administrativo full-stack com Laravel, Vue e Inertia.",
            "superpos": "Sistema de ponto de venda construído com Vue 3.",
            "tailwind": "Guia de referência prática para Tailwind CSS v4.",
            "reviews-ai": "Ferramenta de sumarização de avaliações de clientes com IA."
        },
        "social": {
            "title": "Conecte-se Comigo",
            "repos": "repositórios e projetos",
            "linkedin": "Perfil profissional e recomendações",
            "dev": "Artigos técnicos e comunidade",
            "stackoverflow": "Perguntas e respostas sobre desenvolvimento web",
            "gists": "Snippets de código e exemplos técnicos"
        },
        "contact": {
            "title": "Contato",
            "email": "E-mail",
            "website": "Website",
            "mentoring": "Mentoria e Ensino",
            "superprof": "Plataforma de mentoria Superprof"
        }
    }
}
</i18n>
