<template>
    <footer class="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-7xl mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <!-- About Section -->
                <div>
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        {{ appConfig.public.blog.title }}
                    </h3>

                    <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {{ appConfig.public.blog.description }}
                    </p>
                </div>

                <!-- Links Section -->
                <div>
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Links</h3>

                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                to="/"
                                class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            >
                                Home
                            </NuxtLink>
                        </li>

                        <li>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            >
                                GitHub
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Social Section -->
                <div>
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Social</h3>

                    <div class="flex gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            title="GitHub"
                        >
                            <iconify-icon icon="fa7-brands:github" class="w-5 h-5"></iconify-icon>
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            title="Twitter"
                        >
                            <iconify-icon icon="fa7-brands:x-twitter" class="w-5 h-5"></iconify-icon>
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            title="LinkedIn"
                        >
                            <iconify-icon icon="fa7-brands:linkedin" class="w-5 h-5"></iconify-icon>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Copyright Section -->
            <div class="border-t border-neutral-200 dark:border-neutral-800 pt-8">
                <p class="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                    © 2024 {{ appConfig.public.blog.title }}. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
</script>
