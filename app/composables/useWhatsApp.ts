export function useWhatsApp() {
    const runtimeConfig = useRuntimeConfig()
    const appConfig = useAppConfig()

    function deobfuscateString(encoded: string): string {
        if (!encoded) {
            return ''
        }

        try {
            const key = 42
            const binary = typeof atob !== 'undefined'
                ? atob(encoded)
                : Buffer.from(encoded, 'base64').toString('binary')

            return Array.from(binary)
                .map((c) => String.fromCharCode(c.charCodeAt(0) ^ key))
                .reverse()
                .join('')
        } catch {
            return ''
        }
    }

    function sanitizePhoneNumber(value: string | number | null | undefined): string {
        if (!value) {
            return ''
        }

        const stringValue = typeof value === 'string' ? value : String(value)

        return stringValue.replace(/\D+/g, '').trim()
    }

    function getWhatsAppNumber(customNumber?: string | number | null): string {
        if (customNumber) {
            return sanitizePhoneNumber(customNumber)
        }

        const phoneToken = (runtimeConfig.public?.contact as any)?.phoneToken

        if (phoneToken) {
            const decoded = deobfuscateString(phoneToken)
            if (decoded) {
                return sanitizePhoneNumber(decoded)
            }
        }

        const runtimeNumber =
            (runtimeConfig.public?.contact as any)?.whatsapp?.number ||
            (runtimeConfig.public as any)?.whatsappNumber

        if (runtimeNumber) {
            return sanitizePhoneNumber(runtimeNumber)
        }

        const appConfigNumber = (appConfig.contact as any)?.whatsapp?.number

        if (appConfigNumber) {
            return sanitizePhoneNumber(appConfigNumber)
        }

        return ''
    }

    function hasWhatsAppConfigured(): boolean {
        return getWhatsAppNumber().length > 0
    }

    function getWhatsAppUrl(text: string | null = null, customNumber?: string | number | null): string {
        const number = getWhatsAppNumber(customNumber)
        const baseUrl = `https://wa.me/${number}`

        if (!text || !text.trim()) {
            return baseUrl
        }

        const encodedMessage = encodeURIComponent(text.trim())

        return `${baseUrl}?text=${encodedMessage}`
    }

    function openWhatsApp(text: string | null = null, customNumber?: string | number | null): void {
        const url = getWhatsAppUrl(text, customNumber)

        if (import.meta.client) {
            window.open(url, '_blank')
        }
    }

    return {
        sanitizePhoneNumber,
        getWhatsAppNumber,
        hasWhatsAppConfigured,
        getWhatsAppUrl,
        openWhatsApp,
    }
}
