<template>
    <div class="min-h-screen bg-white dark:bg-slate-900">
        <!-- Hero Section -->
        <section class="relative bg-emerald-600 dark:bg-emerald-700 text-white py-20 sm:py-28 overflow-hidden">
            <div class="absolute inset-0 opacity-10 pointer-events-none">
                <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
                <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-300 blur-3xl"></div>
            </div>

            <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div class="lg:col-span-8 text-center lg:text-left">
                        <!-- Experience Badge -->
                        <div class="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-emerald-400/20">
                            <span class="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                            <span>{{ isPt ? 'Engenharia de Software & Arquitetura Backend' : 'Software Engineering & Backend Architecture' }}</span>
                        </div>

                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            Tiago França
                        </h1>

                        <p class="text-xl sm:text-2xl text-emerald-100 font-medium mb-4">
                            {{ isPt ? 'Arquiteto de Sistemas, Especialista em APIs & Consultor' : 'Senior Backend Architect, API Specialist & Consultant' }}
                        </p>

                        <p class="text-base sm:text-lg text-emerald-50 max-w-2xl leading-relaxed mb-8">
                            {{ isPt ? 'Projetando arquiteturas distribuídas resilientes, gateways de pagamento de alta performance e microsserviços escaláveis com PHP, Laravel, Node.js e Docker.' : 'Designing resilient distributed architectures, high-performance payment gateways, and scalable microservices with modern PHP, Laravel, Node.js, and Docker.' }}
                        </p>

                        <!-- CTA Actions -->
                        <div class="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                            <NuxtLink
                                to="/portfolio"
                                class="px-6 py-3.5 bg-white text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                            >
                                <Icon name="mdi:briefcase-outline" class="w-5 h-5 text-emerald-600" />
                                <span>{{ isPt ? 'Ver Portfólio & Cases' : 'View Portfolio & Cases' }}</span>
                            </NuxtLink>

                            <NuxtLink
                                to="/posts"
                                class="px-6 py-3.5 bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold rounded-lg border border-emerald-400/30 transition-all inline-flex items-center gap-2"
                            >
                                <Icon name="mdi:book-open-page-variant-outline" class="w-5 h-5" />
                                <span>{{ isPt ? 'Explorar Blog' : 'Read Articles' }}</span>
                            </NuxtLink>

                            <NuxtLink
                                to="/hire-me"
                                class="px-6 py-3.5 bg-transparent hover:bg-emerald-500/20 text-emerald-100 font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
                            >
                                <span>{{ isPt ? 'Fale Comigo' : 'Hire Me' }}</span>
                                <Icon name="mdi:arrow-right" class="w-4 h-4" />
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Hero Visual Card -->
                    <div class="lg:col-span-4 hidden lg:flex justify-center">
                        <div class="w-full max-w-sm p-6 bg-white/10 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                            <div class="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                                <div class="w-14 h-14 rounded-full bg-emerald-500/50 flex items-center justify-center font-bold text-2xl text-white">
                                    TF
                                </div>
                                <div>
                                    <h3 class="font-bold text-lg text-white">Tiago França</h3>
                                    <p class="text-xs text-emerald-200">Curitiba, PR • Remote Worldwide</p>
                                </div>
                            </div>
                            <div class="space-y-3 text-sm text-emerald-100">
                                <div class="flex items-center gap-2">
                                    <Icon name="mdi:check-circle" class="w-4 h-4 text-emerald-300" />
                                    <span>{{ isPt ? '+10 anos de experiência backend' : '10+ years backend engineering' }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon name="mdi:check-circle" class="w-4 h-4 text-emerald-300" />
                                    <span>{{ isPt ? 'Arquitetura de microsserviços & APIs' : 'Microservices & event-driven APIs' }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon name="mdi:check-circle" class="w-4 h-4 text-emerald-300" />
                                    <span>{{ isPt ? 'Otimização de Queries & Bancos de Dados' : 'Database & query performance tuning' }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon name="mdi:check-circle" class="w-4 h-4 text-emerald-300" />
                                    <span>{{ isPt ? 'Mentorias e Treinamento Técnico' : 'Technical mentoring & coaching' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pillars / Specializations Section -->
        <section class="py-16 sm:py-20 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-12">
                    <span class="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {{ isPt ? 'Pilares Técnicos' : 'Technical Pillars' }}
                    </span>
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {{ isPt ? 'Especialidades & Como Posso Ajudar' : 'Core Capabilities & Expertise' }}
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Pillar 1 -->
                    <div class="bg-white dark:bg-slate-800 p-8 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                            <Icon name="mdi:server-network" class="w-6 h-6" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {{ isPt ? 'Arquitetura de APIs & Microsserviços' : 'API & Microservices Architecture' }}
                        </h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {{ isPt ? 'Design e implementação de APIs RESTful e assíncronas de alta performance, desacoplamento de monolitos e mensageria distribuída com RabbitMQ e Redis.' : 'Designing resilient RESTful and event-driven APIs, decoupling legacy monoliths, and building asynchronous event pipelines with RabbitMQ and Redis.' }}
                        </p>
                    </div>

                    <!-- Pillar 2 -->
                    <div class="bg-white dark:bg-slate-800 p-8 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                            <Icon name="mdi:database-cog" class="w-6 h-6" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {{ isPt ? 'Performance & Bancos de Dados' : 'Database & Query Performance' }}
                        </h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {{ isPt ? 'Modelagem relacional robusta, tuning de queries no PostgreSQL/MySQL, estratégias de particionamento e índices avançados para suportar milhões de registros.' : 'Robust relational modeling, query execution plan tuning in PostgreSQL and MySQL, partitioning strategies, and advanced indexing for massive scale.' }}
                        </p>
                    </div>

                    <!-- Pillar 3 -->
                    <div class="bg-white dark:bg-slate-800 p-8 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                            <Icon name="mdi:school-outline" class="w-6 h-6" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {{ isPt ? 'Consultoria & Aulas Particulares' : 'Consulting & Private Mentorship' }}
                        </h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {{ isPt ? 'Revisões arquiteturais, diagnósticos de gargalos de produção e aulas particulares 1-on-1 para capacitar desenvolvedores em Laravel e boas práticas.' : 'Architectural assessments, production bottleneck diagnosis, and one-on-one developer mentorship focusing on clean architecture and Laravel mastery.' }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Projects & Cases Section -->
        <section class="py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <span class="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            {{ isPt ? 'Projetos Selecionados' : 'Selected Works' }}
                        </span>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                            {{ isPt ? 'Cases & Projetos Recentes' : 'Featured Cases & Projects' }}
                        </h2>
                    </div>
                    <NuxtLink
                        to="/portfolio"
                        class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 inline-flex items-center gap-1.5"
                    >
                        <span>{{ isPt ? 'Ver todo o portfólio' : 'View all portfolio' }}</span>
                        <Icon name="mdi:arrow-right" class="w-4 h-4" />
                    </NuxtLink>
                </div>

                <div v-if="isLoadingPortfolio" class="flex justify-center py-12">
                    <LoadingSpinner size="lg" :text="isPt ? 'Carregando projetos...' : 'Loading projects...'" />
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <article
                        v-for="item in featuredPortfolio"
                        :key="item.id"
                        class="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col group"
                    >
                        <div class="h-44 overflow-hidden bg-gray-100 dark:bg-slate-800 relative">
                            <ImageWithFallback
                                :src="item.coverImage"
                                :alt="getPortfolioTitle(item)"
                                container-class="w-full h-full"
                                image-class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div class="absolute top-3 left-3 flex gap-2">
                                <span
                                    :class="[
                                        'px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider backdrop-blur-md',
                                        item.type === 'case' ? 'bg-emerald-600/90 text-white' : 'bg-blue-600/90 text-white',
                                    ]"
                                >
                                    {{ item.type === 'case' ? (isPt ? 'Case de Sucesso' : 'Case Study') : (isPt ? 'Projeto' : 'Project') }}
                                </span>
                            </div>
                        </div>

                        <div class="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {{ getPortfolioTitle(item) }}
                                </h3>

                                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                    {{ getPortfolioDescription(item) }}
                                </p>

                                <div v-if="item.metrics" class="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-4 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-1.5">
                                    <Icon name="mdi:check-decagram" class="w-4 h-4 text-emerald-600" />
                                    <span>{{ item.metrics }}</span>
                                </div>

                                <div class="flex flex-wrap gap-1.5 mb-6">
                                    <span
                                        v-for="tech in item.technologies"
                                        :key="tech"
                                        class="px-2.5 py-0.5 text-xs font-medium rounded bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                                    >
                                        {{ tech }}
                                    </span>
                                </div>
                            </div>

                            <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                                <a
                                    v-if="item.repositoryUrl"
                                    :href="item.repositoryUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    <Icon name="mdi:github" class="w-4 h-4" />
                                    <span>{{ isPt ? 'Código' : 'Repository' }}</span>
                                </a>

                                <NuxtLink
                                    to="/portfolio"
                                    class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline ml-auto"
                                >
                                    <span>{{ isPt ? 'Ver Detalhes' : 'View Details' }}</span>
                                    <Icon name="mdi:arrow-right" class="w-3.5 h-3.5" />
                                </NuxtLink>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- Latest Blog Posts Section -->
        <section class="py-16 sm:py-20 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <span class="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            {{ isPt ? 'Artigos Técnicos' : 'Technical Articles' }}
                        </span>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                            {{ isPt ? 'Últimas Publicações do Blog' : 'Latest Insights from the Blog' }}
                        </h2>
                    </div>
                    <NuxtLink
                        to="/posts"
                        class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 inline-flex items-center gap-1.5"
                    >
                        <span>{{ isPt ? 'Acessar o Blog completo' : 'Browse full blog' }}</span>
                        <Icon name="mdi:arrow-right" class="w-4 h-4" />
                    </NuxtLink>
                </div>

                <div v-if="isLoadingPosts" class="flex justify-center py-12">
                    <LoadingSpinner size="lg" :text="isPt ? 'Carregando artigos...' : 'Loading articles...'" />
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <article
                        v-for="post in recentPosts"
                        :key="post.slug"
                        class="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col group p-6"
                    >
                        <div class="flex items-center justify-between mb-3 text-xs">
                            <span class="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                {{ post.category }}
                            </span>
                            <span class="text-gray-500 dark:text-gray-400">
                                {{ formatDate(post.date) }} • {{ post.readTime }} {{ isPt ? 'min de leitura' : 'min read' }}
                            </span>
                        </div>

                        <NuxtLink
                            :to="`/posts/${post.slug}`"
                            class="block text-xl font-bold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 mb-2 transition-colors"
                        >
                            {{ getPostTitle(post) }}
                        </NuxtLink>

                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                            {{ getPostDescription(post) }}
                        </p>

                        <NuxtLink
                            :to="`/posts/${post.slug}`"
                            class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 inline-flex items-center gap-1 mt-auto"
                        >
                            <span>{{ isPt ? 'Ler artigo' : 'Read article' }}</span>
                            <Icon name="mdi:arrow-right" class="w-4 h-4" />
                        </NuxtLink>
                    </article>
                </div>
            </div>
        </section>

        <!-- Interactive FAQ Section -->
        <section class="py-16 sm:py-24 border-t border-gray-100 dark:border-slate-800">
            <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-14">
                    <span class="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {{ isPt ? 'Perguntas Frequentes' : 'FAQ' }}
                    </span>
                    <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                        {{ isPt ? 'Tire suas Dúvidas' : 'Frequently Asked Questions' }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 text-base mt-3">
                        {{ isPt ? 'Respostas para as dúvidas mais comuns sobre serviços, metodologia e contratação.' : 'Everything you need to know about engagement models, stack, and working together.' }}
                    </p>
                </div>

                <div v-if="isLoadingFaqs" class="flex justify-center py-8">
                    <LoadingSpinner size="md" :text="isPt ? 'Carregando FAQ...' : 'Loading FAQ...'" />
                </div>

                <div v-else class="space-y-4">
                    <div
                        v-for="(faq, index) in faqs"
                        :key="faq.id"
                        class="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all bg-white dark:bg-slate-800"
                    >
                        <button
                            @click="toggleFaq(index)"
                            class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            :aria-expanded="openFaqIndex === index"
                        >
                            <span class="text-base sm:text-lg flex items-center gap-3">
                                <Icon name="mdi:help-circle-outline" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                <span>{{ getFaqQuestion(faq) }}</span>
                            </span>
                            <Icon
                                :name="openFaqIndex === index ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200"
                            />
                        </button>

                        <div
                            v-show="openFaqIndex === index"
                            class="px-6 pb-6 pt-1 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed border-t border-gray-100 dark:border-slate-700/60"
                        >
                            <p>{{ getFaqAnswer(faq) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final CTA Section -->
        <section class="py-16 sm:py-20 bg-emerald-600 dark:bg-emerald-700 text-white text-center">
            <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl sm:text-4xl font-bold mb-4">
                    {{ isPt ? 'Pronto para Construir ou Escalar seu Sistema?' : 'Ready to Build or Scale Your Next Project?' }}
                </h2>
                <p class="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                    {{ isPt ? 'Entre em contato para discutir sua arquitetura, agendar uma consultoria técnica ou solicitar aulas particulares.' : 'Let us discuss your technical requirements, schedule an architectural consultation, or organize developer coaching.' }}
                </p>
                <div class="flex flex-wrap gap-4 justify-center">
                    <NuxtLink
                        to="/hire-me"
                        class="px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 shadow-md transition-all"
                    >
                        {{ isPt ? 'Iniciar uma Conversa' : 'Get in Touch' }}
                    </NuxtLink>
                    <NuxtLink
                        to="/portfolio"
                        class="px-8 py-3.5 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 border border-emerald-400/30 transition-all"
                    >
                        {{ isPt ? 'Explorar Cases' : 'Browse Case Studies' }}
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSEOMeta } from '~/composables/useSEOMeta';

interface LocalizedContent {
    title: string;
    description: string;
}

interface PortfolioItem {
    id: string;
    slug: string;
    type: 'case' | 'project';
    featured: boolean;
    category: string;
    technologies: string[];
    repositoryUrl?: string;
    previewUrl?: string | null;
    coverImage?: string;
    metrics?: string;
    translations: {
        'en-US': LocalizedContent;
        'pt-BR': LocalizedContent;
    };
}

interface PostItem {
    id: number;
    slug: string;
    category: string;
    date: string;
    readTime: number;
    translations: {
        'en-US': LocalizedContent;
        'pt-BR': LocalizedContent;
    };
}

interface FaqItem {
    id: string;
    category: string;
    translations: {
        'en-US': { question: string; answer: string };
        'pt-BR': { question: string; answer: string };
    };
}

const { locale } = useI18n();

const isPt = computed(() => locale.value === 'pt-BR');

useSEOMeta({
    title: () => isPt.value
        ? 'Tiago França - Arquiteto Backend & Engenheiro de Software'
        : 'Tiago França - Senior Backend Architect & Software Engineer',
    description: () => isPt.value
        ? 'Site pessoal e institucional de Tiago França. Arquitetura de software, consultoria em APIs de alta performance, portfólio de cases e artigos técnicos.'
        : 'Official portfolio and technical site of Tiago França. Software architecture, high-performance API consulting, case studies, and engineering blog.',
});

// Portfolio State
const portfolioItems = ref<PortfolioItem[]>([]);
const isLoadingPortfolio = ref<boolean>(true);

const featuredPortfolio = computed(() => {
    return portfolioItems.value.filter((item) => item.featured).slice(0, 4);
});

function getPortfolioTitle(item: PortfolioItem): string {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return item.translations[loc]?.title || item.translations['en-US']?.title || '';
}

function getPortfolioDescription(item: PortfolioItem): string {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return item.translations[loc]?.description || item.translations['en-US']?.description || '';
}

// Posts State
const posts = ref<PostItem[]>([]);
const isLoadingPosts = ref<boolean>(true);

const recentPosts = computed(() => {
    return posts.value.slice(0, 2);
});

function getPostTitle(post: PostItem): string {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return post.translations[loc]?.title || post.translations['en-US']?.title || '';
}

function getPostDescription(post: PostItem): string {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return post.translations[loc]?.description || post.translations['en-US']?.description || '';
}

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString(isPt.value ? 'pt-BR' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

// FAQ State
const faqs = ref<FaqItem[]>([]);
const isLoadingFaqs = ref<boolean>(true);
const openFaqIndex = ref<number | null>(0); // First open by default

function toggleFaq(index: number): void {
    openFaqIndex.value = openFaqIndex.value === index ? null : index;
}

function getFaqQuestion(faq: FaqItem): string {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return faq.translations[loc]?.question || faq.translations['en-US']?.question || '';
}

function getFaqAnswer(faq: FaqItem): string {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return faq.translations[loc]?.answer || faq.translations['en-US']?.answer || '';
}

onMounted(async () => {
    // Load Portfolio
    try {
        const portRes = await fetch('/data/portfolio/index.json');
        if (portRes.ok) {
            const data = await portRes.json();
            portfolioItems.value = data.items || [];
        }
    } catch (e) {
        console.error('Failed to load portfolio:', e);
    } finally {
        isLoadingPortfolio.value = false;
    }

    // Load Recent Posts
    try {
        const postsRes = await fetch('/data/posts/index.json');
        if (postsRes.ok) {
            const data = await postsRes.json();
            posts.value = data.posts || [];
        }
    } catch (e) {
        console.error('Failed to load posts:', e);
    } finally {
        isLoadingPosts.value = false;
    }

    // Load FAQs
    try {
        const faqRes = await fetch('/data/faq/index.json');
        if (faqRes.ok) {
            const data = await faqRes.json();
            faqs.value = data.faqs || [];
        }
    } catch (e) {
        console.error('Failed to load FAQs:', e);
    } finally {
        isLoadingFaqs.value = false;
    }
});
</script>
