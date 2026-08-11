<template>
    <div class="flex flex-col min-h-screen bg-white dark:bg-neutral-900">
        <NuxtRouteAnnouncer />

        <!-- Navbar -->
        <Navbar />

        <!-- Main Layout Container -->
        <div class="flex flex-1 pt-16">
            <!-- Sidebar -->
            <Sidebar />

            <!-- Main Content Area -->
            <main class="flex-1 ml-64 max-w-5xl mx-auto px-4 py-12 w-full min-h-[600px]">
                <NuxtPage />
            </main>
        </div>

        <!-- Footer (sticky at bottom) -->
        <Footer />
    </div>
</template>

<style>
html {
    scroll-behavior: smooth;
}
</style>
