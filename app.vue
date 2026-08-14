<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-neutral-900">
    <Navbar />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import 'iconify-icon'
import { useColorMode } from '#app'

useColorMode()
</script>
