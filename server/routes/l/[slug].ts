import { readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import defaultLinksData from '@@/server/data/links/index.json'

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

function getLinksData(): LinksData {
    const candidates = [
        join(process.cwd(), 'server', 'data', 'links', 'index.json'),
        resolve('./server/data/links/index.json'),
        join(process.cwd(), 'public', 'data', 'links', 'index.json'),
    ]

    for (const candidate of candidates) {
        if (existsSync(candidate)) {
            try {
                const content = readFileSync(candidate, 'utf-8')
                return JSON.parse(content)
            } catch {
                // Ignore read error and fallback
            }
        }
    }

    return defaultLinksData as LinksData
}

function detectRequestLocale(event: any): 'en-US' | 'pt-BR' {
    const query = getQuery(event)
    const queryLocale = (query.locale || query.lang) as string | undefined

    if (queryLocale) {
        const normalized = queryLocale.toLowerCase()

        if (normalized.startsWith('en')) {
            return 'en-US'
        }

        if (normalized.startsWith('pt')) {
            return 'pt-BR'
        }
    }

    const cookieLocale = getCookie(event, 'i18n_locale')

    if (cookieLocale) {
        if (cookieLocale === 'en-US' || cookieLocale === 'pt-BR') {
            return cookieLocale
        }

        const normalizedCookie = cookieLocale.toLowerCase()

        if (normalizedCookie.startsWith('en')) {
            return 'en-US'
        }

        if (normalizedCookie.startsWith('pt')) {
            return 'pt-BR'
        }
    }

    const acceptHeader = getHeader(event, 'accept-language')

    if (acceptHeader) {
        const normalizedHeader = acceptHeader.toLowerCase()

        if (normalizedHeader.startsWith('en')) {
            return 'en-US'
        }
    }

    return 'pt-BR'
}

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid link slug',
        })
    }

    try {
        const data = getLinksData()
        const link = data.links?.find((l) => l.slug === slug)

        if (!link) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Link not found',
            })
        }

        if (!link.active) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Link inactive',
            })
        }

        const locale = detectRequestLocale(event)
        const translation = link.translations?.[locale]
            || link.translations?.[locale === 'en-US' ? 'en' : 'pt']
            || link.translations?.['pt-BR']
            || link.translations?.['en-US']

        const targetUrl = translation?.url || link.url

        const query = getQuery(event)
        const acceptHeader = getHeader(event, 'accept') || ''

        if (query.format === 'json' || acceptHeader.includes('application/json')) {
            setHeader(event, 'Content-Type', 'application/json')

            return {
                slug: link.slug,
                active: link.active,
                url: targetUrl,
                title: translation?.title || link.slug,
                description: translation?.description || link.description || '',
                locale,
                translations: link.translations,
            }
        }

        return sendRedirect(event, targetUrl, 301)
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error
        }

        console.error('Error processing link redirect:', error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error',
        })
    }
})
