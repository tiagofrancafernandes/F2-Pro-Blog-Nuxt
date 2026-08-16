import { toast } from 'vue3-toastify';
import 'vue3-toastify/css';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            toast,
        },
    };
});
