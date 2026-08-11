export default defineAppConfig({
    public: {
        blog: {
            title: process.env.NUXT_PUBLIC_BLOG_TITLE || 'Tiago França',
            author: 'Tiago França',
            description: 'Senior Backend Engineer | PHP, Laravel, APIs',
        },
        colors: {
            primary: '#2563eb',
            secondary: '#7c3aed',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            neutral: '#6b7280',
            dark: {
                primary: '#60a5fa',
                secondary: '#a78bfa',
                bg: '#0f172a',
                surface: '#1e293b',
                text: '#f1f5f9',
            },
        },
    },
});
