<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-neutral-900">
        <NuxtLoadingIndicator color="#10b981" :height="3" />
        <Navbar :is-scrolled="isScrolled" :scroll-y="scrollY" />
        <QuickLinks :is-scrolled="isScrolled" :scroll-y="scrollY" />
        <main class="flex-1">
            <NuxtPage />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const { scrollY, isScrolled } = useScroll(20);

useSEOMeta({
    title: 'Tiago França - Senior Backend Engineer',
    description: 'Expert backend developer specializing in PHP, Laravel, APIs, and system architecture.',
});
</script>
