import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import defaultPagesIndex from '../../../../public/data/pages/index.json'
import privacyPolicyData from '../../../../public/data/pages/data/privacy-policy.json'
import termsOfServiceData from '../../../../public/data/pages/data/terms-of-service.json'

const bundledPages: Record<string, any> = {
    'privacy-policy': privacyPolicyData,
    'privacy': privacyPolicyData,
    'politica-de-privacidade': privacyPolicyData,
    'terms-of-service': termsOfServiceData,
    'terms': termsOfServiceData,
    'termos-de-servico': termsOfServiceData,
    'termos-de-uso': termsOfServiceData,
}

export default defineEventHandler(async (event) => {
    const slug = event.context.params?.slug

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Slug is required',
        })
    }

    try {
        const filePath = join(process.cwd(), 'public', 'data', 'pages', 'data', `${slug}.json`)

        if (existsSync(filePath)) {
            try {
                const content = readFileSync(filePath, 'utf-8')
                setHeader(event, 'Content-Type', 'application/json')
                return JSON.parse(content)
            } catch {
                // Fallback to bundled lookup
            }
        }

        const bundled = bundledPages[slug]

        if (bundled) {
            setHeader(event, 'Content-Type', 'application/json')
            return bundled
        }

        const matchedInIndex = defaultPagesIndex.pages?.find(
            (p: any) => p.slug === slug || p.aliases?.includes(slug),
        )

        if (matchedInIndex?.slug && bundledPages[matchedInIndex.slug]) {
            setHeader(event, 'Content-Type', 'application/json')
            return bundledPages[matchedInIndex.slug]
        }

        throw createError({
            statusCode: 404,
            statusMessage: `Page "${slug}" not found`,
        })
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error
        }

        console.error(`Error serving page "${slug}":`, error)

        throw createError({
            statusCode: 500,
            statusMessage: `Failed to load page "${slug}"`,
        })
    }
})
