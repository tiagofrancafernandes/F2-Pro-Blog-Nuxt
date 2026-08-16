import { readFileSync } from 'fs';
import { resolve } from 'path';

interface Link {
    slug: string;
    url: string;
    active: boolean;
    description: string;
}

interface LinksData {
    links: Link[];
}

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid link slug',
        });
    }

    try {
        const linksFilePath = resolve('./server/data/links/index.json');
        const fileContent = readFileSync(linksFilePath, 'utf-8');
        const data: LinksData = JSON.parse(fileContent);

        const link = data.links.find((l) => l.slug === slug);

        if (!link) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Link not found',
            });
        }

        if (!link.active) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Link inactive',
            });
        }

        return sendRedirect(event, link.url, 301);
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error;
        }

        console.error('Error reading links file:', error);

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error',
        });
    }
});
