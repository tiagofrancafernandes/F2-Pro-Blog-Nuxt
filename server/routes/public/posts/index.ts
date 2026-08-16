import fs from 'node:fs';
import path from 'node:path';

export default defineEventHandler(async (event) => {
    try {
        const filePath = path.join(process.cwd(), 'server', 'data', 'posts', `index.json`);

        if (!fs.existsSync(filePath)) {
            throw createError({
                statusCode: 404,
                statusMessage: `Index not found`,
            });
        }

        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        let posts = data?.posts || [];
        posts = Array.isArray(posts) ? posts.filter((i: any) => i?.status === 'published') : [];

        setHeader(event, 'Content-Type', 'application/json');

        return posts;
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error;
        }

        console.error(`Error serving post list:`, error);

        throw createError({
            statusCode: 500,
            statusMessage: `Failed to list post`,
        });
    }
});
