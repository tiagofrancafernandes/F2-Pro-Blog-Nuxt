<template>
    <div class="min-h-screen bg-white dark:bg-slate-900">
        <!-- Hero Section -->
        <section class="bg-emerald-600 dark:bg-emerald-700 text-white py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl">
                    <div class="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold uppercase tracking-wider">
                        <Icon name="mdi:briefcase-check-outline" class="w-4 h-4" />
                        <span>{{ isPt ? 'Portfólio & Cases' : 'Portfolio & Case Studies' }}</span>
                    </div>
                    <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                        {{ isPt ? 'Projetos Selecionados & Cases de Sucesso' : 'Featured Projects & Success Stories' }}
                    </h1>
                    <p class="text-lg sm:text-xl text-emerald-100">
                        {{ isPt ? 'Uma coleção detalhada de arquiteturas que projetei, produtos que liderei e ferramentas de código aberto que mantenho.' : 'A curated collection of scalable architectures I engineered, commercial systems I delivered, and open-source tools I maintain.' }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Filters Section -->
        <section class="border-b border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 sticky top-16 z-30 backdrop-blur-md">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
                    <!-- Type Filter Tabs -->
                    <div class="flex items-center gap-2">
                        <button
                            v-for="filter in typeFilters"
                            :key="filter.value"
                            @click="selectedType = filter.value"
                            :class="[
                                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                selectedType === filter.value
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700',
                            ]"
                        >
                            {{ filter.label }}
                        </button>
                    </div>

                    <!-- Search / Tech Filter -->
                    <div class="relative w-full sm:w-64">
                        <Icon name="mdi:magnify" class="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            :placeholder="isPt ? 'Filtrar por tecnologia...' : 'Filter by tech...'"
                            class="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Items Grid Section -->
        <section class="py-16">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 min-h-64">
                    <LoadingSpinner size="lg" :text="isPt ? 'Carregando projetos...' : 'Loading projects...'" />
                </div>

                <div v-else-if="filteredItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <article
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="bg-white dark:bg-slate-800/80 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col group"
                    >
                        <!-- Cover Image with Fallback -->
                        <div class="h-48 overflow-hidden bg-gray-100 dark:bg-slate-800 relative">
                            <ImageWithFallback
                                :src="item.coverImage"
                                :alt="getItemTitle(item)"
                                container-class="w-full h-full"
                                image-class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div class="absolute top-3 left-3 flex gap-2">
                                <span
                                    :class="[
                                        'px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider backdrop-blur-md',
                                        item.type === 'case'
                                            ? 'bg-emerald-600/90 text-white'
                                            : 'bg-blue-600/90 text-white',
                                    ]"
                                >
                                    {{ item.type === 'case' ? (isPt ? 'Case de Sucesso' : 'Case Study') : (isPt ? 'Projeto' : 'Project') }}
                                </span>
                                <span
                                    v-if="item.featured"
                                    class="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/90 text-white uppercase tracking-wider backdrop-blur-md flex items-center gap-1"
                                >
                                    <Icon name="mdi:star" class="w-3 h-3" />
                                    <span>Featured</span>
                                </span>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {{ getItemTitle(item) }}
                                </h2>

                                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                                    {{ getItemDescription(item) }}
                                </p>

                                <!-- Meta Info / Impact -->
                                <div class="bg-gray-50 dark:bg-slate-900/60 rounded-lg p-3 mb-4 space-y-1.5 border border-gray-100 dark:border-slate-800 text-xs">
                                    <div v-if="getItemRole(item)" class="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                                        <Icon name="mdi:account-badge-outline" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        <span class="font-semibold">{{ isPt ? 'Papel:' : 'Role:' }}</span>
                                        <span>{{ getItemRole(item) }}</span>
                                    </div>
                                    <div v-if="getItemImpact(item)" class="flex items-start gap-1.5 text-gray-700 dark:text-gray-300">
                                        <Icon name="mdi:lightning-bolt-outline" class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span><strong class="font-semibold">{{ isPt ? 'Impacto:' : 'Impact:' }}</strong> {{ getItemImpact(item) }}</span>
                                    </div>
                                    <div v-if="item.metrics" class="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-medium">
                                        <Icon name="mdi:chart-line" class="w-4 h-4" />
                                        <span>{{ item.metrics }}</span>
                                    </div>
                                </div>

                                <!-- Tech Stack Badges -->
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

                            <!-- Action Buttons -->
                            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-700/80">
                                <a
                                    v-if="item.repositoryUrl"
                                    :href="item.repositoryUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    <Icon name="mdi:github" class="w-4 h-4" />
                                    <span>{{ isPt ? 'Repositório' : 'Repository' }}</span>
                                </a>

                                <a
                                    v-if="item.previewUrl"
                                    :href="item.previewUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline transition-colors ml-auto"
                                >
                                    <span>{{ isPt ? 'Ver Demonstração' : 'Live Preview' }}</span>
                                    <Icon name="mdi:open-in-new" class="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </article>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-20">
                    <Icon name="mdi:filter-variant-remove" class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4 opacity-50" />
                    <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
                        {{ isPt ? 'Nenhum projeto encontrado com os filtros selecionados.' : 'No projects found with current filters.' }}
                    </p>
                    <button
                        @click="resetFilters"
                        class="mt-4 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        {{ isPt ? 'Limpar Filtros' : 'Reset Filters' }}
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSEOMeta } from '~/composables/useSEOMeta';

interface LocalizedData {
    title: string;
    description: string;
    role?: string;
    client?: string;
    impact?: string;
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
    date: string;
    metrics?: string;
    translations: {
        'en-US': LocalizedData;
        'pt-BR': LocalizedData;
    };
}

const { locale, t } = useI18n();

const items = ref<PortfolioItem[]>([]);
const isLoading = ref<boolean>(true);
const selectedType = ref<'all' | 'case' | 'project'>('all');
const searchQuery = ref<string>('');

const isPt = computed(() => locale.value === 'pt-BR');

const typeFilters = computed(() => [
    { label: isPt.value ? 'Todos' : 'All', value: 'all' as const },
    { label: isPt.value ? 'Cases de Sucesso' : 'Case Studies', value: 'case' as const },
    { label: isPt.value ? 'Projetos' : 'Projects', value: 'project' as const },
]);

useSEOMeta({
    title: () => `${isPt.value ? 'Portfólio & Cases' : 'Portfolio & Case Studies'} - Tiago França`,
    description: () => isPt.value
        ? 'Cases de arquitetura de software, gateways de pagamento, microsserviços e projetos de código aberto desenvolvidos por Tiago França.'
        : 'Software architecture case studies, payment gateways, microservices, and open source projects built by Tiago França.',
});

function getItemTitle(item: PortfolioItem): string {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return item.translations[loc]?.title || item.translations['en-US']?.title || '';
}

function getItemDescription(item: PortfolioItem): string {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return item.translations[loc]?.description || item.translations['en-US']?.description || '';
}

function getItemRole(item: PortfolioItem): string | undefined {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return item.translations[loc]?.role || item.translations['en-US']?.role;
}

function getItemImpact(item: PortfolioItem): string | undefined {
    const loc = isPt.value ? 'pt-BR' : 'en-US';
    return item.translations[loc]?.impact || item.translations['en-US']?.impact;
}

const filteredItems = computed(() => {
    return items.value.filter((item) => {
        if (selectedType.value !== 'all' && item.type !== selectedType.value) {
            return false;
        }

        if (searchQuery.value.trim() !== '') {
            const query = searchQuery.value.toLowerCase().trim();
            const titleMatch = getItemTitle(item).toLowerCase().includes(query);
            const descMatch = getItemDescription(item).toLowerCase().includes(query);
            const techMatch = item.technologies.some((tech) => tech.toLowerCase().includes(query));

            if (!titleMatch && !descMatch && !techMatch) {
                return false;
            }
        }

        return true;
    });
});

function resetFilters(): void {
    selectedType.value = 'all';
    searchQuery.value = '';
}

onMounted(async () => {
    try {
        const response = await fetch('/data/portfolio/index.json');

        if (!response.ok) {
            items.value = [];
            return;
        }

        const data = await response.json();
        items.value = data.items || [];
    } catch (error) {
        console.error('Failed to load portfolio items:', error);
        items.value = [];
    } finally {
        isLoading.value = false;
    }
});
</script>
