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
</script>
