<template>
    <div class="prose dark:prose-invert max-w-none">
        <div v-if="renderMode === 'html'" v-html="htmlContent" class="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"></div>

        <template v-else-if="renderMode === 'blocks'">
            <template v-for="(block, index) in contentBlocks" :key="index">
                <CodeBlock v-if="block.type === 'code'" :code="block.code" :language="block.language" />
                <div v-else v-html="block.html" class="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"></div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMarkdown } from '~/composables/useMarkdown';

interface ContentBlock {
    type: 'code' | 'html';
    code?: string;
    language?: string;
    html?: string;
}

interface Props {
    content: string;
}

const props = defineProps<Props>();

const { renderMarkdown, extractCodeBlocks } = useMarkdown();

const htmlContent = computed(() => renderMarkdown(props.content));

const codeBlocks = computed(() => extractCodeBlocks(props.content));

const renderMode = computed(() => (codeBlocks.value.length > 0 ? 'blocks' : 'html'));

const contentBlocks = computed(() => {
    if (renderMode.value === 'html') {
        return [];
    }

    const blocks: ContentBlock[] = [];
    let lastEndIndex = 0;
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(props.content)) !== null) {
        const startIndex = match.index;

        if (startIndex > lastEndIndex) {
            const beforeCode = props.content.substring(lastEndIndex, startIndex);
            const htmlBlock = renderMarkdown(beforeCode);

            if (htmlBlock.trim() && htmlBlock !== '<p>No content</p>') {
                blocks.push({
                    type: 'html',
                    html: htmlBlock,
                });
            }
        }

        blocks.push({
            type: 'code',
            language: match[1] || 'text',
            code: match[2].trim(),
        });

        lastEndIndex = match.index + match[0].length;
    }

    if (lastEndIndex < props.content.length) {
        const afterCode = props.content.substring(lastEndIndex);
        const htmlBlock = renderMarkdown(afterCode);

        if (htmlBlock.trim() && htmlBlock !== '<p>No content</p>') {
            blocks.push({
                type: 'html',
                html: htmlBlock,
            });
        }
    }

    return blocks;
});
</script>
