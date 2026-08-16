<template>
    <div class="space-y-4">
        <h3 class="font-semibold text-gray-900 dark:text-white">
            {{ label }}
        </h3>
        <div class="flex flex-wrap gap-3">
            <!-- Twitter -->
            <a
                :href="shareUrls.twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center gap-2"
                :title="`Compartilhar no Twitter`"
                aria-label="Share on Twitter"
            >
                <Icon name="mdi:twitter" class="w-5 h-5" />
                <span class="text-sm font-medium">Twitter</span>
            </a>

            <!-- LinkedIn -->
            <a
                :href="shareUrls.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors flex items-center gap-2"
                :title="`Compartilhar no LinkedIn`"
                aria-label="Share on LinkedIn"
            >
                <Icon name="mdi:linkedin" class="w-5 h-5" />
                <span class="text-sm font-medium">LinkedIn</span>
            </a>

            <!-- Facebook -->
            <a
                :href="shareUrls.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2"
                :title="`Compartilhar no Facebook`"
                aria-label="Share on Facebook"
            >
                <Icon name="mdi:facebook" class="w-5 h-5" />
                <span class="text-sm font-medium">Facebook</span>
            </a>

            <!-- WhatsApp -->
            <a
                :href="shareUrls.whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center gap-2"
                :title="`Compartilhar no WhatsApp`"
                aria-label="Share on WhatsApp"
            >
                <Icon name="mdi:whatsapp" class="w-5 h-5" />
                <span class="text-sm font-medium">WhatsApp</span>
            </a>

            <!-- Email -->
            <a
                :href="shareUrls.email"
                class="p-3 rounded-lg bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white transition-colors flex items-center gap-2"
                :title="`Compartilhar por Email`"
                aria-label="Share via Email"
            >
                <Icon name="mdi:email" class="w-5 h-5" />
                <span class="text-sm font-medium">Email</span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSocialShare } from '~/composables/useSocialShare';

interface Props {
    url: string;
    title: string;
    description?: string;
    hashtags?: string[];
    label?: string;
}

const props = withDefaults(defineProps<Props>(), {
    description: '',
    hashtags: () => [],
    label: 'Compartilhar',
});

const { generateShareUrls } = useSocialShare();

const shareUrls = computed(() => {
    return generateShareUrls({
        url: props.url,
        title: props.title,
        description: props.description,
        hashtags: props.hashtags,
    });
});
</script>
