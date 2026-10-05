import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import defaultPostsData from '../../../../public/data/posts/index.json'

function getPostsData(): any {
    const filePath = join(process.cwd(), 'public', 'data', 'posts', 'index.json')

    if (existsSync(filePath)) {
        try {
            const content = readFileSync(filePath, 'utf-8')
            return JSON.parse(content)
        } catch {
            // Ignore and use default
        }
    }

    return defaultPostsData
}

export default defineEventHandler(async (event) => {
    try {
        const data = getPostsData()
        let posts = data?.posts || []
        posts = Array.isArray(posts) ? posts.filter((item: any) => item?.status === 'published') : []

        setHeader(event, 'Content-Type', 'application/json')

        return posts
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error
        }

        console.error('Error serving post list:', error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to list posts',
        })
    }
})
