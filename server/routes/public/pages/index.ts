import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import defaultPagesData from '../../../../public/data/pages/index.json'

function getPagesData(): any {
    const filePath = join(process.cwd(), 'public', 'data', 'pages', 'index.json')

    if (existsSync(filePath)) {
        try {
            const content = readFileSync(filePath, 'utf-8')
            return JSON.parse(content)
        } catch {
            // Fallback to bundled data
        }
    }

    return defaultPagesData
}

export default defineEventHandler(async (event) => {
    try {
        const data = getPagesData()
        const pages = Array.isArray(data?.pages)
            ? data.pages.filter((item: any) => item?.status === 'published')
            : []

        setHeader(event, 'Content-Type', 'application/json')

        return pages
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error
        }

        console.error('Error serving pages index:', error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to list pages',
        })
    }
})
