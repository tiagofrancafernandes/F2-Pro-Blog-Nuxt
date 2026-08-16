import { toast } from 'vue3-toastify';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            toast,
        },
    };
});
