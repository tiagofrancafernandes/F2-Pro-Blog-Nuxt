<template>
    <div class="relative bg-slate-900 dark:bg-slate-950 rounded-lg overflow-hidden mb-4">
        <!-- Header com linguagem e copy button -->
        <div class="flex items-center justify-between bg-slate-800 dark:bg-slate-900 px-4 py-3 border-b border-slate-700">
            <span class="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {{ language || 'code' }}
            </span>
            <button
                type="button"
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

const { $toast } = useNuxtApp();

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
        $toast('Code copied to clipboard!', { autoClose: 1000, type: 'success' });

        setTimeout(() => {
            isCopied.value = false;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy code:', error);
        $toast('Failed to copy code', { autoClose: 1000, type: 'error' });
    }
}
</script>

<style>
/* Estilos para syntax highlighting */
:global(.hljs-attr) {
    color: #60a5fa;
}

:global(.hljs-string) {
    color: #4ade80;
}

:global(.hljs-number) {
    color: #fb923c;
}

:global(.hljs-literal) {
    color: #f87171;
}

:global(.hljs-keyword) {
    color: #c084fc;
    font-weight: 600;
}

:global(.hljs-function) {
    color: #06b6d4;
}

:global(.hljs-title) {
    color: #67e8f9;
}

:global(.hljs-comment) {
    color: #64748b;
    font-style: italic;
}

:global(.hljs-built_in) {
    color: #facc15;
}

:global(.hljs-type) {
    color: #fed7aa;
}

:global(.hljs-variable) {
    color: #e2e8f0;
}

:global(.hljs-params) {
    color: #e2e8f0;
}
</style>
