<template>
    <div class="min-h-screen bg-white dark:bg-neutral-900">
        <NuxtRouteAnnouncer />

        <!-- Navbar -->
        <Navbar />

        <!-- Main Layout Container -->
        <div class="flex pt-16">
            <!-- Sidebar -->
            <Sidebar />

            <!-- Main Content Area -->
            <main class="flex-1 ml-64 max-w-5xl mx-auto px-4 py-12 w-full">
                <NuxtPage />
            </main>
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<style>
html {
    scroll-behavior: smooth;
}
</style>
