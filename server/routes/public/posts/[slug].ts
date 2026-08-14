import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const slug = event.context.params?.slug;

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Slug is required',
        });
    }

    try {
        const filePath = path.join(process.cwd(), 'server', 'data', 'posts', 'data', `${slug}.json`);

        if (!fs.existsSync(filePath)) {
            throw createError({
                statusCode: 404,
                statusMessage: `Post "${slug}" not found`,
            });
        }

        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);

        setHeader(event, 'Content-Type', 'application/json');

        return data;
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error;
        }

        console.error(`Error serving post "${slug}":`, error);

        throw createError({
            statusCode: 500,
            statusMessage: `Failed to load post "${slug}"`,
        });
    }
});
