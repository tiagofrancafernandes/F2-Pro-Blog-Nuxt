export interface ShareUrls {
    twitter: string;
    linkedin: string;
    facebook: string;
    whatsapp: string;
    email: string;
}

export function useSocialShare() {
    function generateShareUrls(params: {
        url: string;
        title: string;
        description?: string;
        hashtags?: string[];
    }): ShareUrls {
        const { url, title, description = '', hashtags = [] } = params;
        const hashtagString = hashtags.join(',');

        return {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}${hashtagString ? `&hashtags=${hashtagString}` : ''}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
            email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`,
        };
    }

    return {
        generateShareUrls,
    };
}
