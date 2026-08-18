<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-neutral-900">
        <Navbar />
        <QuickLinks />
        <main class="flex-1">
            <NuxtPage />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

useSEOMeta({
    title: 'Tiago França - Senior Backend Engineer',
    description: 'Expert backend developer specializing in PHP, Laravel, APIs, and system architecture.',
});
</script>
