import MarkdownIt from 'markdown-it';
import DOMPurify from 'isomorphic-dompurify';

export interface CodeBlockData {
    language: string;
    code: string;
    index: number;
}

export function useMarkdown() {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        breaks: true,
        highlight: (code: string, language: string) => {
            return code;
        },
    });

    function renderMarkdown(markdown: string): string {
        if (!markdown) {
            return '<p>No content</p>';
        }

        try {
            const htmlBruto = md.render(markdown);
            let headingCounter = 0;

            const htmlWithIds = htmlBruto
                .replace(/<h([1-6])([^>]*)>/g, (match, level, attrs) => {
                    const id = `heading-${headingCounter++}`;

                    if (attrs.includes('id=')) {
                        return match;
                    }

                    return `<h${level} id="${id}"${attrs}>`;
                });

            const htmlSeguro = DOMPurify.sanitize(htmlWithIds, {
                ALLOWED_TAGS: [
                    'p',
                    'br',
                    'strong',
                    'em',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'ul',
                    'ol',
                    'li',
                    'span',
                    'div',
                    'a',
                    'img',
                    'code',
                    'pre',
                    'blockquote',
                    'hr',
                ],
                ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class', 'id', 'data-language'],
                FORCE_BODY: true,
                ALLOW_DATA_ATTR: true,
            });

            return htmlSeguro;
        } catch (error) {
            console.error('Error rendering markdown:', error);

            return `<p>${DOMPurify.sanitize(markdown)}</p>`;
        }
    }

    function extractCodeBlocks(markdown: string): CodeBlockData[] {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const codeBlocks: CodeBlockData[] = [];
        let match;
        let index = 0;

        while ((match = codeBlockRegex.exec(markdown)) !== null) {
            codeBlocks.push({
                language: match[1] || 'text',
                code: match[2].trim(),
                index,
            });

            index++;
        }

        return codeBlocks;
    }

    function extractHeadings(markdown: string): Array<{ id: string; text: string; level: number }> {
        const headings: Array<{ id: string; text: string; level: number }> = [];
        const lines = markdown.split('\n');
        let headingCounter = 0;

        lines.forEach((line) => {
            const h1Match = line.match(/^# (.+)$/);
            const h2Match = line.match(/^## (.+)$/);
            const h3Match = line.match(/^### (.+)$/);

            if (h1Match) {
                const id = `heading-${headingCounter++}`;
                headings.push({
                    id,
                    text: h1Match[1].trim(),
                    level: 1,
                });

                return;
            }

            if (h2Match) {
                const id = `heading-${headingCounter++}`;
                headings.push({
                    id,
                    text: h2Match[1].trim(),
                    level: 2,
                });

                return;
            }

            if (h3Match) {
                const id = `heading-${headingCounter++}`;
                headings.push({
                    id,
                    text: h3Match[1].trim(),
                    level: 3,
                });
            }
        });

        return headings.filter((h) => h.level >= 2);
    }


    return {
        renderMarkdown,
        extractHeadings,
        extractCodeBlocks,
    };
}
