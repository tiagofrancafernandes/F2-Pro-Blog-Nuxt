<template>
    <div v-if="!isLoading" class="min-h-screen bg-white dark:bg-slate-900">
        <!-- Hero Section -->
        <section class="bg-red-600 dark:bg-red-700 text-white py-16 sm:py-24">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                    {{ pageData.translations[locale]?.title }}
                </h1>
                <p class="text-red-100 text-lg max-w-2xl mb-8">
                    {{ pageData.translations[locale]?.subtitle }}
                </p>

                <!-- Social Proof Links -->
                <div class="flex flex-wrap gap-4 mt-8">
                    <a
                        href="https://www.superprof.com.br/aulas-programacao-php-laravel-basico-avancado-sem-restricao-idade.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                    >
                        <Icon name="mdi:star" class="w-5 h-5" />
                        Superprof
                    </a>
                    <a
                        href="https://wwwhttps://linkedin.com/in/tiago-php"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                    >
                        <Icon name="mdi:linkedin" class="w-5 h-5" />
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/tiagofrancafernandes"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                    >
                        <Icon name="mdi:github" class="w-5 h-5" />
                        GitHub
                    </a>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <section class="py-16 sm:py-24">
            <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <!-- Course Description -->
                <div class="prose dark:prose-invert max-w-none mb-16">
                    <div v-html="renderedContent" class="text-gray-700 dark:text-gray-300 leading-relaxed"></div>
                </div>

                <!-- FAQ Section -->
                <div class="mb-16">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        {{ $t('lp.faqTitle') }}
                    </h2>

                    <div class="space-y-4">
                        <div
                            v-for="(faq, index) in pageData.faqs"
                            :key="index"
                            class="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden"
                        >
                            <button
                                @click="toggleFaq(index)"
                                class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span class="font-semibold text-gray-900 dark:text-white text-left">
                                    {{ locale === 'pt-BR' ? faq.questionPt : faq.question }}
                                </span>
                                <Icon
                                    :name="expandedFaq === index ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                                    class="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0"
                                />
                            </button>
                            <div
                                v-if="expandedFaq === index"
                                class="px-6 py-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700"
                            >
                                <p class="text-gray-700 dark:text-gray-300">
                                    {{ faq.answer }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Question Section -->
                <div class="mb-16 bg-gray-50 dark:bg-slate-800 rounded-lg p-8">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        {{ $t('lp.haveQuestion') }}
                    </h2>

                    <form @submit.prevent="submitQuestion" class="space-y-6">
                        <!-- Name -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                {{ $t('lp.name') }} *
                            </label>
                            <input
                                v-model="form.name"
                                type="text"
                                required
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                {{ $t('lp.email') }} *
                            </label>
                            <input
                                v-model="form.email"
                                type="email"
                                required
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <!-- Question -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                {{ $t('lp.question') }} *
                            </label>
                            <textarea
                                v-model="form.question"
                                required
                                rows="4"
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            {{ $t('lp.submitQuestion') }}
                        </button>
                    </form>
                </div>

                <!-- Technology Selection -->
                <div class="bg-gray-50 dark:bg-slate-800 rounded-lg p-8">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        {{ $t('lp.yourTechnologies') }}
                    </h2>

                    <p class="text-gray-600 dark:text-gray-400 mb-8">
                        {{ $t('lp.selectTechsDescription') }}
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <!-- Technologies you know -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {{ $t('lp.techKnow') }}
                            </h3>
                            <div class="space-y-3">
                                <label
                                    v-for="tech in allTechs"
                                    :key="`know-${tech}`"
                                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-700 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        :value="tech"
                                        v-model="form.techKnow"
                                        class="w-4 h-4 text-red-600 rounded"
                                    />
                                    <span class="text-gray-700 dark:text-gray-300">{{ tech }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- Technologies you want to learn -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {{ $t('lp.techWantToLearn') }}
                            </h3>
                            <div class="space-y-3">
                                <label
                                    v-for="tech in allTechs"
                                    :key="`learn-${tech}`"
                                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-700 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        :value="tech"
                                        v-model="form.techWantToLearn"
                                        class="w-4 h-4 text-red-600 rounded"
                                    />
                                    <span class="text-gray-700 dark:text-gray-300">{{ tech }}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Submit via WhatsApp -->
                    <button
                        v-if="hasWhatsAppConfigured()"
                        @click="submitTechPreferences"
                        type="button"
                        class="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <Icon name="mdi:whatsapp" class="w-5 h-5" />
                        {{ $t('lp.sendViaWhatsApp') }}
                    </button>
                    <div
                        v-else
                        class="w-full px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg text-center"
                    >
                        {{ $t('lp.whatsappNotConfigured') }}
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center">
        <p class="text-gray-600 dark:text-gray-400">{{ $t('lp.loading') }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { locale } = useI18n();

const pageData = ref<any>(null);
const isLoading = ref(true);
const expandedFaq = ref<number | null>(null);
const renderedContent = ref('');
const allTechs = ref<string[]>([]);

const form = ref({
    name: '',
    email: '',
    question: '',
    techKnow: [] as string[],
    techWantToLearn: [] as string[],
});

function toggleFaq(index: number): void {
    expandedFaq.value = expandedFaq.value === index ? null : index;
}

function getWhatsAppNumber(): string {
    const config = useAppConfig();
    return config.contact?.whatsapp?.number || '';
}

function hasWhatsAppConfigured(): boolean {
    return getWhatsAppNumber().length > 0;
}

function renderMarkdown(markdown: string): string {
    if (!markdown) return '<p>No content</p>';

    let html = markdown
        .replace(/^### (.*?)$/gm, '<h3 class="text-2xl font-bold mt-8 mb-4">$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2 class="text-3xl font-bold mt-12 mb-6">$1</h2>')
        .replace(/^# (.*?)$/gm, '<h1 class="text-4xl font-bold mt-12 mb-6">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">$1</code>')
        .replace(/^- (.*?)$/gm, '<li class="ml-6">$1</li>')
        .replace(/✅ (.*?)$/gm, '<li class="ml-6">✅ $1</li>')
        .replace(/\n\n/g, '</p><p>');

    return `<p>${html}</p>`;
}

function submitQuestion(): void {
    const message = [
        `*New Question from LP: ${pageData.value.slug}*`,
        '',
        `*Name:* ${form.value.name}`,
        `*Email:* ${form.value.email}`,
        '',
        `*Question:*`,
        form.value.question,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function submitTechPreferences(): void {
    const message = [
        `*Technology Skills - ${pageData.value.slug}*`,
        '',
        `*Technologies I Know:*`,
        form.value.techKnow.length > 0 ? form.value.techKnow.join(', ') : 'None selected',
        '',
        `*Technologies I Want to Learn:*`,
        form.value.techWantToLearn.length > 0 ? form.value.techWantToLearn.join(', ') : 'None selected',
    ].join('\n');

    const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

onMounted(async () => {
    try {
        const page = route.params.page as string;
        const response = await fetch(`/data/lp/${page}.json`);

        if (!response.ok) {
            throw new Error('Page not found');
        }

        pageData.value = await response.json();
        renderedContent.value = renderMarkdown(pageData.value.translations[locale.value]?.content || '');

        // Collect all technologies
        if (pageData.value.technologies) {
            allTechs.value = pageData.value.technologies;
        }
    } catch (error) {
        console.error('Failed to load landing page:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<i18n lang="json">
{
    "en-US": {
        "lp": {
            "faqTitle": "Frequently Asked Questions",
            "haveQuestion": "Have a Question?",
            "name": "Your Name",
            "email": "Your Email",
            "question": "Your Question",
            "submitQuestion": "Send Question",
            "yourTechnologies": "Your Technologies",
            "selectTechsDescription": "Select the technologies you already know and the ones you want to learn. This helps me tailor the classes to your needs.",
            "techKnow": "Technologies I Know",
            "techWantToLearn": "Technologies I Want to Learn",
            "sendViaWhatsApp": "Send via WhatsApp",
            "whatsappNotConfigured": "WhatsApp contact is not configured",
            "loading": "Loading..."
        }
    },
    "pt-BR": {
        "lp": {
            "faqTitle": "Perguntas Frequentes",
            "haveQuestion": "Tem uma Pergunta?",
            "name": "Seu Nome",
            "email": "Seu Email",
            "question": "Sua Pergunta",
            "submitQuestion": "Enviar Pergunta",
            "yourTechnologies": "Suas Tecnologias",
            "selectTechsDescription": "Selecione as tecnologias que você já conhece e as que quer aprender. Isso me ajuda a adaptar as aulas às suas necessidades.",
            "techKnow": "Tecnologias que Conheço",
            "techWantToLearn": "Tecnologias que Quero Aprender",
            "sendViaWhatsApp": "Enviar via WhatsApp",
            "whatsappNotConfigured": "WhatsApp não está configurado",
            "loading": "Carregando..."
        }
    }
}
</i18n>
