import { ref, computed } from 'vue'

export function useObfuscatedContact() {
    const runtimeConfig = useRuntimeConfig()

    const isPhoneRevealed = ref(false)
    const isEmailRevealed = ref(false)

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

    function sanitizeDigits(val: string | number | null | undefined): string {
        if (!val) {
            return ''
        }

        return String(val).replace(/\D+/g, '').trim()
    }

    function formatPhoneNumber(digits: string): string {
        if (!digits) {
            return ''
        }

        // Brazil format: 55 + 2-digit DDD + 9-digit mobile (13 digits total)
        // e.g. 5541984402684 -> +55 41 98440-2684
        if (digits.startsWith('55') && digits.length === 13) {
            const ddi = digits.slice(0, 2)
            const ddd = digits.slice(2, 4)
            const part1 = digits.slice(4, 9)
            const part2 = digits.slice(9, 13)

            return `+${ddi} ${ddd} ${part1}-${part2}`
        }

        // Brazil format: 55 + 2-digit DDD + 8-digit landline (12 digits total)
        if (digits.startsWith('55') && digits.length === 12) {
            const ddi = digits.slice(0, 2)
            const ddd = digits.slice(2, 4)
            const part1 = digits.slice(4, 8)
            const part2 = digits.slice(8, 12)

            return `+${ddi} ${ddd} ${part1}-${part2}`
        }

        // 11 digits (DDD + 9 digits)
        if (digits.length === 11) {
            const ddd = digits.slice(0, 2)
            const part1 = digits.slice(2, 7)
            const part2 = digits.slice(7, 11)

            return `(${ddd}) ${part1}-${part2}`
        }

        return `+${digits}`
    }

    const cleanPhone = computed(() => {
        if (!isPhoneRevealed.value) {
            return ''
        }

        const phoneToken = (runtimeConfig.public?.contact as any)?.phoneToken

        if (phoneToken) {
            const decoded = deobfuscateString(phoneToken)

            if (decoded) {
                return sanitizeDigits(decoded)
            }
        }

        const fallback =
            (runtimeConfig.public?.contact as any)?.whatsapp?.number ||
            (runtimeConfig.public as any)?.whatsappNumber ||
            ''

        return sanitizeDigits(fallback)
    })

    const formattedPhone = computed(() => {
        if (!isPhoneRevealed.value) {
            return '+55 (**) *****-****'
        }

        return formatPhoneNumber(cleanPhone.value)
    })

    const cleanEmail = computed(() => {
        if (!isEmailRevealed.value) {
            return ''
        }

        const emailToken = (runtimeConfig.public?.contact as any)?.emailToken

        if (emailToken) {
            const decoded = deobfuscateString(emailToken)

            if (decoded) {
                return decoded.trim()
            }
        }

        const fallback =
            (runtimeConfig.public?.contact as any)?.email ||
            (runtimeConfig.public as any)?.contactEmail ||
            'devtiagofranca@gmail.com'

        return fallback.trim()
    })

    const formattedEmail = computed(() => {
        if (!isEmailRevealed.value) {
            return 'd***@***.***'
        }

        return cleanEmail.value
    })

    const whatsappUrl = computed(() => {
        if (!isPhoneRevealed.value || !cleanPhone.value) {
            return '#'
        }

        return `https://wa.me/${cleanPhone.value}`
    })

    const mailtoUrl = computed(() => {
        if (!isEmailRevealed.value || !cleanEmail.value) {
            return '#'
        }

        return `mailto:${cleanEmail.value}`
    })

    function revealPhone(): void {
        isPhoneRevealed.value = true
    }

    function togglePhoneReveal(): void {
        isPhoneRevealed.value = !isPhoneRevealed.value
    }

    function revealEmail(): void {
        isEmailRevealed.value = true
    }

    function toggleEmailReveal(): void {
        isEmailRevealed.value = !isEmailRevealed.value
    }

    function handlePhoneClick(e?: MouseEvent): void {
        if (!isPhoneRevealed.value) {
            if (e) {
                e.preventDefault()
            }

            revealPhone()
            return
        }

        if (cleanPhone.value && import.meta.client) {
            window.open(`https://wa.me/${cleanPhone.value}`, '_blank')
        }
    }

    function handleEmailClick(e?: MouseEvent): void {
        if (!isEmailRevealed.value) {
            if (e) {
                e.preventDefault()
            }

            revealEmail()
            return
        }

        if (cleanEmail.value && import.meta.client) {
            window.location.href = `mailto:${cleanEmail.value}`
        }
    }

    return {
        isPhoneRevealed,
        isEmailRevealed,
        cleanPhone,
        formattedPhone,
        cleanEmail,
        formattedEmail,
        whatsappUrl,
        mailtoUrl,
        revealPhone,
        togglePhoneReveal,
        revealEmail,
        toggleEmailReveal,
        handlePhoneClick,
        handleEmailClick,
    }
}
