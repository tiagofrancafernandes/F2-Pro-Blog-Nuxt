<template>
    <footer class="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <!-- Brand -->
                <div>
                    <div class="flex items-center gap-2 font-bold text-lg mb-2">
                        <span class="text-red-600 dark:text-red-400">Tiago</span>
                        <span class="text-gray-700 dark:text-gray-300">França</span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                        Technical blog about development, software architecture, and best practices.
                    </p>
                </div>

                <!-- Links -->
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Links</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-red-600">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <a href="#about" class="text-gray-600 dark:text-gray-400 hover:text-red-600">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#contact" class="text-gray-600 dark:text-gray-400 hover:text-red-600">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Social -->
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Follow</h3>
                    <div class="flex gap-4">
                        <a
                            href="#twitter"
                            class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                            aria-label="Twitter"
                        >
                            <Icon name="mdi:twitter" class="w-5 h-5" />
                        </a>
                        <a
                            href="#github"
                            class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                            aria-label="GitHub"
                        >
                            <Icon name="mdi:github" class="w-5 h-5" />
                        </a>
                        <a
                            href="#linkedin"
                            class="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Icon name="mdi:linkedin" class="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
                <p class="text-center text-sm text-gray-600 dark:text-gray-400">
                    © 2026 Tiago França. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    // No script needed
</script>
