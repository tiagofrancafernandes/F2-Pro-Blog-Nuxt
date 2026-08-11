<template>
    <footer class="border-t" style="background-color: #0a0e27; border-top-color: #1e293b">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
                <!-- Logo & Description Column -->
                <div class="md:col-span-1">
                    <div class="mb-6">
                        <h2 class="text-2xl font-bold mb-4" style="color: #e0e7ff">
                            <span style="color: #ef4444">Tiago</span>
                            <span style="color: #e0e7ff">França</span>
                        </h2>
                    </div>

                    <p class="text-sm mb-6" style="color: #a0aec0">
                        {{ appConfig.public.blog.description }}
                    </p>

                    <!-- CTA Card -->
                    <div class="border rounded-lg p-4 mb-6" style="border-color: #ef4444">
                        <div class="flex gap-2 items-start">
                            <iconify-icon
                                icon="fa7-solid:star"
                                class="w-5 h-5 mt-1 flex-shrink-0"
                                style="color: #ef4444"
                            ></iconify-icon>
                            <p class="text-sm font-medium" style="color: #e0e7ff">
                                Siga para mais conteúdo sobre desenvolvimento
                            </p>
                        </div>
                    </div>

                    <!-- Contact Info -->
                    <div class="space-y-3">
                        <a
                            href="mailto:devtiagofranca@gmail.com"
                            class="flex items-center gap-3 text-sm transition-opacity hover:opacity-70"
                            style="color: #a0aec0"
                        >
                            <iconify-icon icon="fa7-solid:envelope" class="w-5 h-5" style="color: #ef4444"></iconify-icon>
                            devtiagofranca@gmail.com
                        </a>
                        <a
                            href="tel:+5585987654321"
                            class="flex items-center gap-3 text-sm transition-opacity hover:opacity-70"
                            style="color: #a0aec0"
                        >
                            <iconify-icon icon="fa7-solid:phone" class="w-5 h-5" style="color: #ef4444"></iconify-icon>
                            +55 (85) 98765-4321
                        </a>
                    </div>
                </div>

                <!-- Company Links -->
                <div>
                    <h3 class="font-semibold mb-4 pb-2 border-b" style="color: #e0e7ff; border-bottom-color: #ef4444">
                        Navegação
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <NuxtLink
                                to="/"
                                class="text-sm transition-opacity hover:opacity-70"
                                style="color: #a0aec0"
                            >
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/about"
                                class="text-sm transition-opacity hover:opacity-70"
                                style="color: #a0aec0"
                            >
                                Sobre
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/posts"
                                class="text-sm transition-opacity hover:opacity-70"
                                style="color: #a0aec0"
                            >
                                Blog
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Categories -->
                <div>
                    <h3 class="font-semibold mb-4 pb-2 border-b" style="color: #e0e7ff; border-bottom-color: #ef4444">
                        Categorias
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <NuxtLink
                                to="/category/backend"
                                class="text-sm transition-opacity hover:opacity-70"
                                style="color: #a0aec0"
                            >
                                Backend
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/category/devops"
                                class="text-sm transition-opacity hover:opacity-70"
                                style="color: #a0aec0"
                            >
                                DevOps
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/category/database"
                                class="text-sm transition-opacity hover:opacity-70"
                                style="color: #a0aec0"
                            >
                                Database
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Technologies -->
                <div>
                    <h3 class="font-semibold mb-4 pb-2 border-b" style="color: #e0e7ff; border-bottom-color: #ef4444">
                        Tecnologias
                    </h3>
                    <ul class="space-y-2">
                        <li>
                            <a href="#" class="text-sm transition-opacity hover:opacity-70" style="color: #a0aec0">
                                PHP & Laravel
                            </a>
                        </li>
                        <li>
                            <a href="#" class="text-sm transition-opacity hover:opacity-70" style="color: #a0aec0">
                                Vue.js & Nuxt
                            </a>
                        </li>
                        <li>
                            <a href="#" class="text-sm transition-opacity hover:opacity-70" style="color: #a0aec0">
                                PostgreSQL
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Growth/Social -->
                <div>
                    <h3 class="font-semibold mb-4 pb-2 border-b" style="color: #e0e7ff; border-bottom-color: #ef4444">
                        Conecte
                    </h3>
                    <div class="space-y-3">
                        <a
                            href="https://github.com/tiagofrancafernandes"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                            style="color: #a0aec0"
                        >
                            <iconify-icon icon="fa7-brands:github" class="w-5 h-5"></iconify-icon>
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/tiagofrancafernandes"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                            style="color: #a0aec0"
                        >
                            <iconify-icon icon="fa7-brands:linkedin" class="w-5 h-5"></iconify-icon>
                            LinkedIn
                        </a>
                        <a
                            href="https://twitter.com/tiagofranca"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                            style="color: #a0aec0"
                        >
                            <iconify-icon icon="fa7-brands:twitter" class="w-5 h-5"></iconify-icon>
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="border-t px-4 sm:px-6 lg:px-8 py-6" style="border-top-color: #1e293b">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm" style="color: #a0aec0">
                    © 2026 Tiago França. Todos os direitos reservados.
                </p>
                <div class="flex gap-6">
                    <a
                        href="#"
                        class="text-sm transition-opacity hover:opacity-70"
                        style="color: #a0aec0"
                    >
                        Política de Privacidade
                    </a>
                    <a
                        href="#"
                        class="text-sm transition-opacity hover:opacity-70"
                        style="color: #a0aec0"
                    >
                        Termos de Serviço
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>
