import { toast } from 'vue3-toastify';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('toast', (message: string, options?: any) => {
        toast(message, {
            autoClose: 2000,
            ...options,
        });
    });
});
