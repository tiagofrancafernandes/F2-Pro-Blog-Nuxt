<template>
    <div class="min-h-screen bg-white dark:bg-slate-900">
        <!-- Hero Section -->
        <section class="bg-red-600 dark:bg-red-700 text-white py-12 sm:py-16">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                    {{ $t('hireMe.title') }}
                </h1>
                <p class="text-red-100 text-lg max-w-2xl">
                    {{ $t('hireMe.subtitle') }}
                </p>
            </div>
        </section>

        <!-- Main Content -->
        <section class="py-12 sm:py-16">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <!-- Tab Selection -->
                <div class="mb-12 flex gap-4 border-b border-gray-200 dark:border-slate-700">
                    <button
                        @click="selectedTab = 'guided'"
                        :class="[
                            'px-6 py-3 font-medium transition-colors border-b-2',
                            selectedTab === 'guided'
                                ? 'border-red-600 text-red-600 dark:text-red-400'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        ]"
                    >
                        <Icon name="mdi:sitemap" class="w-4 h-4 inline mr-2" />
                        {{ $t('hireMe.guidedMode') }}
                    </button>
                    <button
                        @click="selectedTab = 'freetext'"
                        :class="[
                            'px-6 py-3 font-medium transition-colors border-b-2',
                            selectedTab === 'freetext'
                                ? 'border-red-600 text-red-600 dark:text-red-400'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        ]"
                    >
                        <Icon name="mdi:pencil" class="w-4 h-4 inline mr-2" />
                        {{ $t('hireMe.freeMode') }}
                    </button>
                </div>

                <!-- Guided Mode -->
                <div v-if="selectedTab === 'guided'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Selection Tree -->
                    <div class="lg:col-span-2">
                        <div class="space-y-4">
                            <!-- Service Type Selection -->
                            <div v-if="!selectedService" class="space-y-3">
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {{ $t('hireMe.whatDo') }}
                                </h2>
                                <button
                                    v-for="service in serviceOptions"
                                    :key="service.id"
                                    @click="selectService(service)"
                                    class="w-full p-6 text-left rounded-lg border-2 border-gray-200 dark:border-slate-700 hover:border-red-600 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
                                >
                                    <div class="flex items-start gap-4">
                                        <Icon :name="service.icon" class="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                        <div class="flex-1">
                                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                                {{ service.label }}
                                            </h3>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                                {{ service.description }}
                                            </p>
                                        </div>
                                        <Icon name="mdi:chevron-right" class="w-6 h-6 text-gray-400 group-hover:text-red-600 flex-shrink-0 mt-1" />
                                    </div>
                                </button>
                            </div>

                            <!-- Service Details Selection -->
                            <div v-else-if="!selectedDetails" class="space-y-3">
                                <button
                                    @click="selectedService = null"
                                    class="mb-6 flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                                >
                                    <Icon name="mdi:chevron-left" class="w-5 h-5" />
                                    {{ $t('hireMe.back') }}
                                </button>

                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {{ selectedService.label }}
                                </h2>

                                <button
                                    v-for="detail in selectedService.details"
                                    :key="detail.id"
                                    @click="selectDetails(detail)"
                                    class="w-full p-4 text-left rounded-lg border-2 border-gray-200 dark:border-slate-700 hover:border-red-600 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
                                >
                                    <div class="flex items-center justify-between">
                                        <span class="font-medium text-gray-900 dark:text-white">
                                            {{ detail.label }}
                                        </span>
                                        <Icon name="mdi:chevron-right" class="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                                    </div>
                                </button>
                            </div>

                            <!-- Additional Options -->
                            <div v-else class="space-y-3">
                                <button
                                    @click="selectedDetails = null"
                                    class="mb-6 flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                                >
                                    <Icon name="mdi:chevron-left" class="w-5 h-5" />
                                    {{ $t('hireMe.back') }}
                                </button>

                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {{ selectedDetails.label }}
                                </h2>

                                <!-- For Classes: Technology Selection -->
                                <div v-if="selectedService.id === 'classes'" class="space-y-4">
                                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                                        {{ $t('hireMe.selectTechs') }}
                                    </p>

                                    <div class="space-y-3">
                                        <label
                                            v-for="tech in getTechOptions()"
                                            :key="tech.id"
                                            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                :value="tech.id"
                                                v-model="selectedTechs"
                                                class="w-4 h-4 text-red-600 rounded"
                                            />
                                            <div class="flex-1">
                                                <div class="font-medium text-gray-900 dark:text-white">
                                                    {{ tech.label }}
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <!-- Knowledge Level -->
                                    <div v-if="selectedTechs.length > 0" class="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
                                        <h3 class="font-bold text-gray-900 dark:text-white mb-4">
                                            {{ $t('hireMe.knowledgeLevel') }}
                                        </h3>
                                        <div class="space-y-3">
                                            <label
                                                v-for="level in ['beginner', 'intermediate', 'advanced']"
                                                :key="level"
                                                class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                                            >
                                                <input
                                                    type="radio"
                                                    :value="level"
                                                    v-model="knowledgeLevel"
                                                    class="w-4 h-4 text-red-600"
                                                />
                                                <span class="font-medium text-gray-900 dark:text-white">
                                                    {{ $t(`hireMe.level.${level}`) }}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- For Development: Project Type Selection -->
                                <div v-else-if="selectedService.id === 'development'" class="space-y-4">
                                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                                        {{ $t('hireMe.selectProjectType') }}
                                    </p>

                                    <div class="space-y-3">
                                        <label
                                            v-for="type in getProjectTypes()"
                                            :key="type.id"
                                            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                :value="type.id"
                                                v-model="selectedProjectTypes"
                                                class="w-4 h-4 text-red-600 rounded"
                                            />
                                            <div class="flex-1">
                                                <div class="font-medium text-gray-900 dark:text-white">
                                                    {{ type.label }}
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!-- For Consulting: Similar to classes -->
                                <div v-else-if="selectedService.id === 'consulting'" class="space-y-4">
                                    <p class="text-gray-600 dark:text-gray-400 mb-4">
                                        {{ $t('hireMe.selectConsultingArea') }}
                                    </p>

                                    <div class="space-y-3">
                                        <label
                                            v-for="area in getConsultingAreas()"
                                            :key="area.id"
                                            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                :value="area.id"
                                                v-model="selectedAreas"
                                                class="w-4 h-4 text-red-600 rounded"
                                            />
                                            <div class="flex-1">
                                                <div class="font-medium text-gray-900 dark:text-white">
                                                    {{ area.label }}
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Summary Sidebar -->
                    <div class="lg:col-span-1">
                        <div class="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 sticky top-24">
                            <h3 class="font-bold text-gray-900 dark:text-white mb-4">
                                {{ $t('hireMe.summary') }}
                            </h3>

                            <div class="space-y-3">
                                <div v-if="selectedService" class="p-3 bg-white dark:bg-slate-700 rounded-lg border-l-4 border-red-600">
                                    <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">{{ $t('hireMe.serviceList') }}</p>
                                    <p class="font-semibold text-gray-900 dark:text-white">{{ selectedService.label }}</p>
                                </div>

                                <div v-if="selectedDetails" class="p-3 bg-white dark:bg-slate-700 rounded-lg border-l-4 border-red-600">
                                    <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">{{ $t('hireMe.type') }}</p>
                                    <p class="font-semibold text-gray-900 dark:text-white">{{ selectedDetails.label }}</p>
                                </div>

                                <div v-if="selectedTechs.length > 0" class="p-3 bg-white dark:bg-slate-700 rounded-lg">
                                    <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">{{ $t('hireMe.technologies') }}</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="tech in selectedTechs"
                                            :key="tech"
                                            class="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full"
                                        >
                                            {{ getTechLabel(tech) }}
                                        </span>
                                    </div>
                                </div>

                                <div v-if="selectedProjectTypes.length > 0" class="p-3 bg-white dark:bg-slate-700 rounded-lg">
                                    <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">{{ $t('hireMe.projectTypes') }}</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="type in selectedProjectTypes"
                                            :key="type"
                                            class="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full"
                                        >
                                            {{ getProjectTypeLabel(type) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Send Button -->
                            <div v-if="selectedService" class="mt-6">
                                <button
                                    v-if="hasWhatsAppConfigured()"
                                    @click="showPreview = true"
                                    class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                                >
                                    {{ $t('hireMe.sendRequest') }}
                                </button>
                                <div
                                    v-else
                                    class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-800 dark:text-yellow-200"
                                >
                                    {{ $t('hireMe.whatsappNotConfigured') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Free Text Mode -->
                <div v-else class="max-w-2xl">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {{ $t('hireMe.describeNeeds') }}
                    </h2>

                    <form @submit.prevent="submitFreeText" class="space-y-6">
                        <!-- Service Type (Quick Select) -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                {{ $t('hireMe.serviceType') }} ({{ $t('hireMe.optional') }})
                            </label>
                            <select
                                v-model="freeTextService"
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                <option value="">{{ $t('hireMe.selectService') }}</option>
                                <option value="development">{{ serviceOptions[0].label }}</option>
                                <option value="classes">{{ serviceOptions[1].label }}</option>
                                <option value="consulting">{{ serviceOptions[2].label }}</option>
                            </select>
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                {{ $t('hireMe.description') }} *
                            </label>
                            <textarea
                                v-model="freeTextDescription"
                                :placeholder="$t('hireMe.descriptionPlaceholder')"
                                required
                                rows="8"
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                            ></textarea>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {{ $t('hireMe.describeInDetail') }}
                            </p>
                        </div>

                        <!-- Budget (Optional) -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                {{ $t('hireMe.budget') }} ({{ $t('hireMe.optional') }})
                            </label>
                            <input
                                v-model="freeTextBudget"
                                type="text"
                                :placeholder="$t('hireMe.budgetPlaceholder')"
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <!-- Timeline (Optional) -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                {{ $t('hireMe.timeline') }} ({{ $t('hireMe.optional') }})
                            </label>
                            <input
                                v-model="freeTextTimeline"
                                type="text"
                                :placeholder="$t('hireMe.timelinePlaceholder')"
                                class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <div>
                            <button
                                v-if="hasWhatsAppConfigured()"
                                type="submit"
                                class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                {{ $t('hireMe.sendMessage') }}
                            </button>
                            <div
                                v-else
                                class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-800 dark:text-yellow-200"
                            >
                                {{ $t('hireMe.whatsappNotConfigured') }}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- Preview Modal -->
        <div v-if="showPreview" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-slate-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <!-- Modal Header -->
                <div class="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 p-6">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                            {{ $t('hireMe.reviewRequest') }}
                        </h2>
                        <button
                            @click="showPreview = false"
                            class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <Icon name="mdi:close" class="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <!-- Modal Content -->
                <div class="p-6 space-y-6">
                    <!-- Selection Summary Cards -->
                    <div class="space-y-3">
                        <div v-if="selectedService" class="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ $t('hireMe.serviceList') }}</p>
                            <p class="font-bold text-lg text-gray-900 dark:text-white">{{ selectedService.label }}</p>
                        </div>

                        <div v-if="selectedDetails" class="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ $t('hireMe.type') }}</p>
                            <p class="font-bold text-lg text-gray-900 dark:text-white">{{ selectedDetails.label }}</p>
                        </div>

                        <div v-if="selectedTechs.length > 0" class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ $t('hireMe.technologies') }}</p>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="tech in selectedTechs"
                                    :key="tech"
                                    class="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full"
                                >
                                    {{ getTechLabel(tech) }}
                                </span>
                            </div>
                        </div>

                        <div v-if="selectedProjectTypes.length > 0" class="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ $t('hireMe.projectTypes') }}</p>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="type in selectedProjectTypes"
                                    :key="type"
                                    class="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full"
                                >
                                    {{ getProjectTypeLabel(type) }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Message -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            {{ $t('hireMe.additionalMessage') }} ({{ $t('hireMe.optional') }})
                        </label>
                        <textarea
                            v-model="additionalMessage"
                            :placeholder="$t('hireMe.additionalMessagePlaceholder')"
                            rows="4"
                            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                        ></textarea>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3">
                        <button
                            @click="showPreview = false"
                            class="flex-1 px-4 py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            {{ $t('hireMe.back') }}
                        </button>
                        <button
                            v-if="hasWhatsAppConfigured()"
                            @click="sendViaWhatsApp"
                            class="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <Icon name="mdi:whatsapp" class="w-5 h-5" />
                            {{ $t('hireMe.sendViaWhatsApp') }}
                        </button>
                        <div
                            v-else
                            class="flex-1 px-4 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 font-semibold rounded-lg text-center text-sm"
                        >
                            {{ $t('hireMe.whatsappNotConfigured') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Learning Programs Section -->
        <section class="py-16 sm:py-24 bg-gray-50 dark:bg-slate-800">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ $t('hireMe.learningPrograms') }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-2xl">
                    {{ $t('hireMe.learningProgramsDesc') }}
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NuxtLink to="/lp/aulas-de-programacao" class="group bg-white dark:bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-32 flex items-center justify-center">
                            <Icon name="mdi:school" class="w-12 h-12 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600">
                                {{ $t('hireMe.generalClasses') }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                {{ $t('hireMe.generalClassesDesc') }}
                            </p>
                        </div>
                    </NuxtLink>

                    <NuxtLink to="/lp/aula-particular-php" class="group bg-white dark:bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-32 flex items-center justify-center">
                            <span class="text-white font-bold text-2xl">PHP</span>
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-600">
                                {{ $t('hireMe.phpClasses') }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                {{ $t('hireMe.phpClassesDesc') }}
                            </p>
                        </div>
                    </NuxtLink>

                    <NuxtLink to="/lp/aula-particular-laravel" class="group bg-white dark:bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="bg-gradient-to-r from-red-500 to-red-600 h-32 flex items-center justify-center">
                            <span class="text-white font-bold text-2xl">Laravel</span>
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-red-600">
                                {{ $t('hireMe.laravelClasses') }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                {{ $t('hireMe.laravelClassesDesc') }}
                            </p>
                        </div>
                    </NuxtLink>

                    <NuxtLink to="/lp/aula-particular-linux" class="group bg-white dark:bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="bg-gradient-to-r from-amber-500 to-amber-600 h-32 flex items-center justify-center">
                            <Icon name="mdi:linux" class="w-12 h-12 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-amber-600">
                                {{ $t('hireMe.linuxClasses') }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                {{ $t('hireMe.linuxClassesDesc') }}
                            </p>
                        </div>
                    </NuxtLink>

                    <NuxtLink to="/lp/aula-particular-sql" class="group bg-white dark:bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 h-32 flex items-center justify-center">
                            <Icon name="mdi:database" class="w-12 h-12 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600">
                                {{ $t('hireMe.sqlClasses') }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                {{ $t('hireMe.sqlClassesDesc') }}
                            </p>
                        </div>
                    </NuxtLink>

                    <NuxtLink to="/lp/treinamento-empresarial" class="group bg-white dark:bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="bg-gradient-to-r from-green-500 to-green-600 h-32 flex items-center justify-center">
                            <Icon name="mdi:briefcase" class="w-12 h-12 text-white" />
                        </div>
                        <div class="p-6">
                            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-green-600">
                                {{ $t('hireMe.corporateTraining') }}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                {{ $t('hireMe.corporateTrainingDesc') }}
                            </p>
                        </div>
                    </NuxtLink>
                </div>

                <div class="mt-12 text-center">
                    <NuxtLink to="/sitemap" class="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                        {{ $t('hireMe.viewAllPrograms') }}
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const { t } = useI18n()

    const selectedTab = ref<'guided' | 'freetext'>('guided')
    const selectedService = ref<any>(null)
    const selectedDetails = ref<any>(null)
    const selectedTechs = ref<string[]>([])
    const selectedProjectTypes = ref<string[]>([])
    const selectedAreas = ref<string[]>([])
    const knowledgeLevel = ref('intermediate')
    const showPreview = ref(false)
    const additionalMessage = ref('')

    const freeTextService = ref('')
    const freeTextDescription = ref('')
    const freeTextBudget = ref('')
    const freeTextTimeline = ref('')

    const serviceOptions = [
        {
            id: 'development',
            label: t('hireMe.serviceList.development'),
            description: t('hireMe.serviceList.developmentDesc'),
            icon: 'mdi:code-braces',
            details: [
                { id: 'fix', label: t('hireMe.detail.fixMaintenance') },
                { id: 'create', label: t('hireMe.detail.createSoftware') },
            ],
        },
        {
            id: 'classes',
            label: t('hireMe.serviceList.classes'),
            description: t('hireMe.serviceList.classesDesc'),
            icon: 'mdi:school',
            details: [
                { id: 'tech', label: t('hireMe.detail.technologies') },
            ],
        },
        {
            id: 'consulting',
            label: t('hireMe.serviceList.consulting'),
            description: t('hireMe.serviceList.consultingDesc'),
            icon: 'mdi:briefcase',
            details: [
                { id: 'training', label: t('hireMe.detail.training') },
            ],
        },
    ]

    function selectService(service: any): void {
        selectedService.value = service
        selectedDetails.value = null
        selectedTechs.value = []
        selectedProjectTypes.value = []
        selectedAreas.value = []
    }

    function selectDetails(detail: any): void {
        selectedDetails.value = detail
    }

    function getTechOptions() {
        return [
            { id: 'vue', label: 'Vue.js' },
            { id: 'nuxt', label: 'Nuxt' },
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'laravel', label: 'Laravel' },
            { id: 'php', label: 'PHP' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
            { id: 'tailwind', label: 'Tailwind CSS' },
        ]
    }

    function getProjectTypes() {
        return [
            { id: 'mvp', label: t('hireMe.projectType.mvp') },
            { id: 'dedicated', label: t('hireMe.projectType.dedicated') },
            { id: 'upgrade', label: t('hireMe.projectType.upgrade') },
            { id: 'migration', label: t('hireMe.projectType.migration') },
        ]
    }

    function getConsultingAreas() {
        return [
            { id: 'architecture', label: t('hireMe.consulting.architecture') },
            { id: 'performance', label: t('hireMe.consulting.performance') },
            { id: 'scaling', label: t('hireMe.consulting.scaling') },
            { id: 'security', label: t('hireMe.consulting.security') },
        ]
    }

    function getTechLabel(techId: string): string {
        const tech = getTechOptions().find(t => t.id === techId)
        return tech?.label || techId
    }

    function getProjectTypeLabel(typeId: string): string {
        const type = getProjectTypes().find(t => t.id === typeId)
        return type?.label || typeId
    }

    function buildMessage(): string {
        const lines: string[] = []

        lines.push('*' + t('hireMe.newRequest') + '*')
        lines.push('')

        if (selectedService.value) {
            lines.push('*' + t('hireMe.serviceList') + ':* ' + selectedService.value.label)
        }

        if (selectedDetails.value) {
            lines.push('*' + t('hireMe.type') + ':* ' + selectedDetails.value.label)
        }

        if (selectedTechs.value.length > 0) {
            lines.push('*' + t('hireMe.technologies') + ':* ' + selectedTechs.value.map(getTechLabel).join(', '))
        }

        if (knowledgeLevel.value) {
            lines.push('*' + t('hireMe.knowledgeLevel') + ':* ' + t(`hireMe.level.${knowledgeLevel.value}`))
        }

        if (selectedProjectTypes.value.length > 0) {
            lines.push('*' + t('hireMe.projectTypes') + ':* ' + selectedProjectTypes.value.map(getProjectTypeLabel).join(', '))
        }

        if (additionalMessage.value.trim()) {
            lines.push('')
            lines.push('*' + t('hireMe.additionalMessage') + ':*')
            lines.push(additionalMessage.value)
        }

        return lines.join('\n')
    }

    function onlyNumbers(value: any): string {
        value = ['number', 'string'].includes(typeof value) ? String(value ?? '') : null;

        if (!value) {
            return ''
        }

        return value.replaceAll(/\D+/g, '');
    }

    function getWhatsAppNumber(): string {
        const config = useAppConfig()
        const waNumber = config.contact?.whatsapp?.number || ''

        return waNumber
    }

    function hasWhatsAppConfigured(): boolean {
        return getWhatsAppNumber().length > 0
    }

    function getWhatsAppUrl(text: null|string = null, number: number|string|null = null): string {
        const waNumber = onlyNumbers(number) || onlyNumbers(getWhatsAppNumber());

        text = typeof text === 'string' && text.trim()?.length ? text?.trim() : null;

        const whatsappUrl = `https://wa.me/${waNumber}`

        if (!text) {
            return whatsappUrl
        }

        const encodedMessage = encodeURIComponent(text)

        return `${whatsappUrl}?text=${encodedMessage}`;
    }

    function sendViaWhatsApp(): void {
        const message = buildMessage()
        const whatsappUrl = getWhatsAppUrl(message)

        window.open(whatsappUrl, '_blank')
    }

    function submitFreeText(): void {
        const message = [
            '*' + t('hireMe.newRequest') + '*',
            '',
            selectedService.value ? ('*' + t('hireMe.serviceList') + ':* ' + freeTextService.value) : '',
            '',
            '*' + t('hireMe.description') + ':*',
            freeTextDescription.value,
        ]

        if (freeTextBudget.value.trim()) {
            message.push('')
            message.push('*' + t('hireMe.budget') + ':* ' + freeTextBudget.value)
        }

        if (freeTextTimeline.value.trim()) {
            message.push('*' + t('hireMe.timeline') + ':* ' + freeTextTimeline.value)
        }

        const finalMessage = message.filter(line => line.trim()).join('\n')
        const whatsappUrl = getWhatsAppUrl(finalMessage)

        window.open(whatsappUrl, '_blank')
    }

    // Check for query param to pre-select classes
    if (route.query.type === 'aulas' || route.query.type === 'classes') {
        selectedTab.value = 'guided'
        selectedService.value = serviceOptions[1]
    }
</script>

<i18n lang="json">
{
    "en-US": {
        "hireMe": {
            "title": "Hire Me",
            "subtitle": "Let's work together. Choose how you'd like to collaborate with me.",
            "whatDo": "What do you need?",
            "back": "← Back",
            "guidedMode": "Guided Selection",
            "freeMode": "Free Text",
            "summary": "Summary",
            "service": "Service",
            "type": "Type",
            "technologies": "Technologies",
            "projectTypes": "Project Types",
            "selectTechs": "Select the technologies you want to learn or work with:",
            "selectProjectType": "What kind of project are you interested in?",
            "selectConsultingArea": "What areas do you need consulting on?",
            "knowledgeLevel": "Your current knowledge level:",
            "level": {
                "beginner": "Beginner - Just starting",
                "intermediate": "Intermediate - Some experience",
                "advanced": "Advanced - Very familiar"
            },
            "sendRequest": "Review & Send",
            "describeNeeds": "Tell me what you need",
            "serviceType": "Service Type",
            "optional": "optional",
            "selectService": "Select a service (optional)",
            "description": "Description",
            "budget": "Budget",
            "timeline": "Timeline",
            "descriptionPlaceholder": "Describe what you need in detail. Be as specific as possible about your project, goals, technologies, and any constraints...",
            "budgetPlaceholder": "e.g., $5,000 - $10,000, hourly rate, etc.",
            "timelinePlaceholder": "e.g., 2 weeks, ASAP, flexible, etc.",
            "describeInDetail": "The more detail you provide, the better I can help you.",
            "sendMessage": "Open WhatsApp",
            "requestReceived": "Thank you! I've received your request. I'll review it and get back to you soon.",
            "reviewRequest": "Review Your Request",
            "additionalMessage": "Additional Message",
            "additionalMessagePlaceholder": "Add any extra context or requirements...",
            "sendViaWhatsApp": "Send via WhatsApp",
            "newRequest": "New Work Request",
            "whatsappNotConfigured": "WhatsApp contact is not configured. Please contact the owner directly.",
            "learningPrograms": "Learning & Training Programs",
            "learningProgramsDesc": "Explore our comprehensive training programs and classes designed to help you master modern development technologies.",
            "generalClasses": "Programming Classes",
            "generalClassesDesc": "Learn programming fundamentals and advanced concepts",
            "phpClasses": "PHP Classes",
            "phpClassesDesc": "Master PHP programming language and frameworks",
            "laravelClasses": "Laravel Classes",
            "laravelClassesDesc": "Learn Laravel web application framework",
            "linuxClasses": "Linux Administration",
            "linuxClassesDesc": "Master Linux system administration and DevOps",
            "sqlClasses": "Database & SQL",
            "sqlClassesDesc": "Learn SQL and database design",
            "corporateTraining": "Corporate Training",
            "corporateTrainingDesc": "Team training programs for companies and organizations",
            "viewAllPrograms": "View All Programs",
            "service": {
                "development": "Development/Product Creation",
                "developmentDesc": "Build new software or fix existing ones",
                "classes": "Private Classes",
                "classesDesc": "Learn technologies and tools from me",
                "consulting": "Consulting/Training",
                "consultingDesc": "Get expert advice on your projects"
            },
            "detail": {
                "fixMaintenance": "Fix/Maintenance of existing software",
                "createSoftware": "Create new software",
                "technologies": "Select technologies"
            },
            "projectType": {
                "mvp": "MVP Creation",
                "dedicated": "Dedicated Hours",
                "upgrade": "Software Upgrade",
                "migration": "Technology Migration"
            },
            "consulting": {
                "architecture": "Software Architecture",
                "performance": "Performance Optimization",
                "scaling": "Scaling & Infrastructure",
                "security": "Security & Best Practices"
            }
        }
    },
    "pt-BR": {
        "hireMe": {
            "title": "Contrate-me",
            "subtitle": "Vamos trabalhar juntos. Escolha como você gostaria de colaborar comigo.",
            "whatDo": "O que você precisa?",
            "back": "← Voltar",
            "guidedMode": "Seleção Guiada",
            "freeMode": "Texto Livre",
            "summary": "Resumo",
            "service": "Serviço",
            "type": "Tipo",
            "technologies": "Tecnologias",
            "projectTypes": "Tipos de Projeto",
            "selectTechs": "Selecione as tecnologias que você quer aprender ou trabalhar:",
            "selectProjectType": "Que tipo de projeto você está interessado?",
            "selectConsultingArea": "Em quais áreas você precisa de consultoria?",
            "knowledgeLevel": "Seu nível de conhecimento atual:",
            "level": {
                "beginner": "Iniciante - Começando",
                "intermediate": "Intermediário - Alguma experiência",
                "advanced": "Avançado - Muito familiarizado"
            },
            "sendRequest": "Revisar & Enviar",
            "describeNeeds": "Diga-me o que você precisa",
            "serviceType": "Tipo de Serviço",
            "optional": "opcional",
            "selectService": "Selecione um serviço (opcional)",
            "description": "Descrição",
            "budget": "Orçamento",
            "timeline": "Prazo",
            "descriptionPlaceholder": "Descreva o que você precisa em detalhes. Seja o mais específico possível sobre seu projeto, objetivos, tecnologias e restrições...",
            "budgetPlaceholder": "ex: $5.000 - $10.000, taxa horária, etc.",
            "timelinePlaceholder": "ex: 2 semanas, ASAP, flexível, etc.",
            "describeInDetail": "Quanto mais detalhes você fornecer, melhor posso ajudá-lo.",
            "sendMessage": "Abrir WhatsApp",
            "requestReceived": "Obrigado! Recebi sua solicitação. Vou revisar e entrar em contato em breve.",
            "reviewRequest": "Revise Sua Solicitação",
            "additionalMessage": "Mensagem Adicional",
            "additionalMessagePlaceholder": "Adicione qualquer contexto ou requisito extra...",
            "sendViaWhatsApp": "Enviar via WhatsApp",
            "newRequest": "Nova Solicitação de Trabalho",
            "whatsappNotConfigured": "O WhatsApp não está configurado. Por favor, entre em contato direto com o proprietário.",
            "learningPrograms": "Programas de Aprendizado e Treinamento",
            "learningProgramsDesc": "Explore nossos programas de treinamento abrangentes e aulas projetadas para ajudá-lo a dominar tecnologias modernas de desenvolvimento.",
            "generalClasses": "Aulas de Programação",
            "generalClassesDesc": "Aprenda fundamentos e conceitos avançados de programação",
            "phpClasses": "Aulas de PHP",
            "phpClassesDesc": "Domine a linguagem PHP e frameworks",
            "laravelClasses": "Aulas de Laravel",
            "laravelClassesDesc": "Aprenda o framework Laravel para aplicações web",
            "linuxClasses": "Administração Linux",
            "linuxClassesDesc": "Domine administração de sistemas Linux e DevOps",
            "sqlClasses": "Banco de Dados & SQL",
            "sqlClassesDesc": "Aprenda SQL e design de banco de dados",
            "corporateTraining": "Treinamento Empresarial",
            "corporateTrainingDesc": "Programas de treinamento de equipe para empresas e organizações",
            "viewAllPrograms": "Ver Todos os Programas",
            "serviceList": {
                "development": "Desenvolvimento/Criação de Produtos",
                "developmentDesc": "Criar novo software ou corrigir existentes",
                "classes": "Aulas Particulares",
                "classesDesc": "Aprenda tecnologias e ferramentas comigo",
                "consulting": "Consultoria/Treinamento",
                "consultingDesc": "Obtenha conselho de especialista em seus projetos"
            },
            "detail": {
                "fixMaintenance": "Correção/Manutenção de software existente",
                "createSoftware": "Criar novo software",
                "technologies": "Selecionar tecnologias"
            },
            "projectType": {
                "mvp": "Criação de MVP",
                "dedicated": "Horas Dedicadas",
                "upgrade": "Atualização de Software",
                "migration": "Migração de Tecnologia"
            },
            "consulting": {
                "architecture": "Arquitetura de Software",
                "performance": "Otimização de Performance",
                "scaling": "Scaling & Infraestrutura",
                "security": "Segurança & Melhores Práticas"
            }
        }
    }
}
</i18n>
