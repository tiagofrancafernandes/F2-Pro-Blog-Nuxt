import { readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'

interface LinkTranslation {
    title: string
    description: string
    url?: string
}

interface Link {
    slug: string
    url: string
    active: boolean
    description?: string
    translations?: {
        'en-US'?: LinkTranslation
        'pt-BR'?: LinkTranslation
        [locale: string]: LinkTranslation | undefined
    }
}

interface LinksData {
    links: Link[]
}

function resolveLinksFilePath(): string {
    const candidates = [
        join(process.cwd(), 'server', 'data', 'links', 'index.json'),
        resolve('./server/data/links/index.json'),
        join(process.cwd(), 'public', 'data', 'links', 'index.json'),
        resolve('./public/data/links/index.json'),
    ]

    for (const candidate of candidates) {
        if (existsSync(candidate)) {
            return candidate
        }
    }

    return candidates[0]
}

export default defineEventHandler(async (event) => {
    try {
        const filePath = resolveLinksFilePath()

        if (!existsSync(filePath)) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Links index not found',
            })
        }

        const content = readFileSync(filePath, 'utf-8')
        const data: LinksData = JSON.parse(content)
        const links = Array.isArray(data?.links)
            ? data.links.filter((item) => item?.active === true)
            : []

        setHeader(event, 'Content-Type', 'application/json')

        return links
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error
        }

        console.error('Error serving links list:', error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to list links',
        })
    }
})
