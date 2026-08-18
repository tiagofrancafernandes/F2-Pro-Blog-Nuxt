import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface SEOMetaOptions {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    author?: string;
    publishedDate?: string;
    modifiedDate?: string;
}

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#42b983"/><text x="50" y="65" font-size="60" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">T</text></svg>`;

export function useSEOMeta(options: SEOMetaOptions = {}) {
    const { locale } = useI18n();
    const config = useRuntimeConfig().public;

    const baseUrl = config.siteUrl || 'https://tiagofranca.com';
    const blogTitle = config.blogTitle || 'Tiago França';
    const blogDescription = config.blogDescription || 'Senior Backend Engineer';
    const blogAuthor = config.blogAuthor || 'Tiago França';

    const title = computed(() => options.title || blogTitle);
    const description = computed(() => options.description || blogDescription);
    const image = computed(() => options.image || `${baseUrl}/og-image.svg`);
    const url = computed(() => options.url || baseUrl);
    const localeTag = computed(() => (locale.value === 'pt-BR' ? 'pt_BR' : 'en_US'));

    useHead({
        // Favicon
        link: [
            {
                rel: 'icon',
                type: 'image/svg+xml',
                href: `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`,
            },
            {
                rel: 'apple-touch-icon',
                href: `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`,
            },
            {
                rel: 'shortcut icon',
                type: 'image/x-icon',
                href: `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`,
            },
        ],
    });

    useSeoMeta({
        // Basic Meta
        title: title as any,
        description: description as any,
        ogTitle: title as any,
        ogDescription: description as any,
        ogType: (options.type || 'website') as any,
        ogImage: image as any,
        ogImageWidth: 1200,
        ogImageHeight: 630,
        ogUrl: url as any,
        ogLocale: localeTag as any,
        ogLocaleAlternate: computed(() =>
            locale.value === 'pt-BR' ? 'en_US' : 'pt_BR'
        ) as any,

        // Twitter Card
        twitterCard: 'summary_large_image',
        twitterTitle: title as any,
        twitterDescription: description as any,
        twitterImage: image as any,
        twitterCreator: '@tiagofranca',

        // Article Specific
        ...(options.type === 'article' && {
            articlePublishedTime: options.publishedDate,
            articleModifiedTime: options.modifiedDate,
            articleAuthor: options.author || blogAuthor,
        }),
    });
}

export function generateOGImage(title: string, subtitle?: string): string {
    const encodedTitle = encodeURIComponent(title);
    const encodedSubtitle = subtitle ? encodeURIComponent(subtitle) : '';

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'%3E%3Crect width='1200' height='630' fill='%23f8f9fa'/%3E%3Crect width='1200' height='630' fill='url(%23grad)' opacity='0.1'/%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2342b983;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%232d8659;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='50' y='50' width='1100' height='530' fill='white' rx='20'/%3E%3Crect x='50' y='50' width='1100' height='20' fill='%2342b983' rx='20' ry='0'/%3E%3Ctext x='600' y='300' font-size='56' font-weight='bold' text-anchor='middle' fill='%23111827' font-family='Arial,sans-serif'%3E${encodedTitle}%3C/text%3E${
        subtitle
            ? `%3Ctext x='600' y='380' font-size='32' text-anchor='middle' fill='%23666666' font-family='Arial,sans-serif'%3E${encodedSubtitle}%3C/text%3E`
            : ''
    }%3Ctext x='600' y='570' font-size='20' text-anchor='middle' fill='%2342b983' font-family='Arial,sans-serif'%3ETiago França%3C/text%3E%3C/svg%3E`;
}
