<template>
    <div class="relative bg-slate-900 dark:bg-slate-950 rounded-lg overflow-hidden mb-4">
        <!-- Header com linguagem e copy button -->
        <div class="flex items-center justify-between bg-slate-800 dark:bg-slate-900 px-4 py-3 border-b border-slate-700">
            <span class="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {{ language || 'code' }}
            </span>
            <button
                @click="copyCode"
                :class="[
                    'px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-2',
                    isCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white',
                ]"
                :title="isCopied ? 'Copied!' : 'Copy code'"
            >
                <Icon
                    :name="isCopied ? 'mdi:check' : 'mdi:content-copy'"
                    class="w-4 h-4"
                />
                {{ isCopied ? 'Copied!' : 'Copy' }}
            </button>
        </div>

        <!-- Código com highlight -->
        <pre class="overflow-x-auto p-4"><code
                v-html="highlightedCode"
                class="text-sm font-mono text-slate-100 leading-relaxed"
        ></code></pre>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import hljs from 'highlight.js';
import { toast } from 'vue3-toastify';

interface Props {
    code: string;
    language?: string;
}

const props = withDefaults(defineProps<Props>(), {
    language: 'text',
});

const isCopied = ref(false);

const highlightedCode = computed(() => {
    if (!props.code) {
        return '';
    }

    try {
        if (props.language && hljs.getLanguage(props.language)) {
            return hljs.highlight(props.code, { language: props.language, ignoreIllegals: true }).value;
        }

        return hljs.highlightAuto(props.code).value;
    } catch (error) {
        console.error('Error highlighting code:', error);

        return escapeHtml(props.code);
    }
});

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };

    return text.replace(/[&<>"']/g, (char) => map[char]);
}

async function copyCode(): Promise<void> {
    try {
        await navigator.clipboard.writeText(props.code);
        isCopied.value = true;
        toast.success('Code copied to clipboard!', { autoClose: 2000 });

        setTimeout(() => {
            isCopied.value = false;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy code:', error);
        toast.error('Failed to copy code', { autoClose: 2000 });
    }
}
</script>

<style scoped>
/* Estilos para syntax highlighting */
:deep(.hljs-attr) {
    @apply text-blue-400;
}

:deep(.hljs-string) {
    @apply text-green-400;
}

:deep(.hljs-number) {
    @apply text-orange-400;
}

:deep(.hljs-literal) {
    @apply text-red-400;
}

:deep(.hljs-keyword) {
    @apply text-purple-400 font-semibold;
}

:deep(.hljs-function) {
    @apply text-cyan-400;
}

:deep(.hljs-title) {
    @apply text-cyan-300;
}

:deep(.hljs-comment) {
    @apply text-slate-500 italic;
}

:deep(.hljs-built_in) {
    @apply text-yellow-400;
}

:deep(.hljs-type) {
    @apply text-orange-300;
}

:deep(.hljs-variable) {
    @apply text-slate-200;
}

:deep(.hljs-params) {
    @apply text-slate-200;
}
</style>
