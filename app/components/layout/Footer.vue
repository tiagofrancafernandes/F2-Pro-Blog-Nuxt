<template>
    <footer class="bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 mt-16">
        <div class="max-w-5xl mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <!-- About Section -->
                <div>
                    <h3 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">About</h3>

                    <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {{ appConfig.public.blog.description }}
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Quick Links</h3>

                    <ul class="space-y-2">
                        <li>
                            <NuxtLink to="/" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                About
                            </NuxtLink>
                        </li>
                        <li>
                            <a href="#" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                RSS Feed
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contact Section -->
                <div>
                    <h3 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Connect</h3>

                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        Follow me on social media for updates.
                    </p>

                    <div class="flex gap-3">
                        <a href="#" class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            <span class="sr-only">Twitter</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>

                        <a href="#" class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            <span class="sr-only">GitHub</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.921.35-1.545.636-1.9-2.22-.253-4.555-1.113-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.266.098-2.638 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817a9.6 9.6 0 012.502.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.372.203 2.385.1 2.638.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.191 20 14.441 20 10.017 20 4.484 15.522 0 10 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </a>

                        <a href="#" class="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            <span class="sr-only">LinkedIn</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fill-rule="evenodd"
                                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.292-1.194-2.292-1.195 0-1.38.932-1.38 1.892v4.378H8.226V9.359h2.594v1.017h.037c.36-.68 1.243-1.394 2.56-1.394 2.717 0 3.217 1.785 3.217 4.108v4.248zM5.337 7.433c-.8 0-1.447-.645-1.447-1.447 0-.802.645-1.447 1.447-1.447.8 0 1.447.645 1.447 1.447 0 .802-.646 1.447-1.447 1.447zm1.408 8.905H3.929V9.359h2.816v6.979zM17.094 0H.906C.405 0 0 .405 0 .906v18.188C0 19.595.405 20 .906 20h16.188c.5 0 .906-.405.906-.906V.906C18 .405 17.595 0 17.094 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-neutral-200 dark:border-neutral-700 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                        &copy; 2026 {{ appConfig.public.blog.title }}. All rights reserved.
                    </p>

                    <div class="flex gap-6">
                        <a href="#" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
</script>
