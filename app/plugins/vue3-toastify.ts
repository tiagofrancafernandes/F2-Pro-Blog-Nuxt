import { toast as createToast } from 'vue3-toastify';

export default defineNuxtPlugin((nuxtApp) => {
    const toast = (message: string, options?: any) => {
        return createToast(message, {
            autoClose: 2000,
            position: 'bottom-right',
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            ...options,
        });
    };

    nuxtApp.provide('toast', toast);
});
