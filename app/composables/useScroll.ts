import { ref, onMounted, onUnmounted } from 'vue';

export function useScroll(threshold: number = 20) {
    const scrollY = ref<number>(0);
    const isScrolled = ref<boolean>(false);

    let ticking = false;

    function updateScroll(): void {
        if (!import.meta.client) {
            return;
        }

        scrollY.value = window.scrollY || window.pageYOffset || 0;
        isScrolled.value = scrollY.value > threshold;
        ticking = false;
    }

    function onScroll(): void {
        if (ticking) {
            return;
        }

        window.requestAnimationFrame(updateScroll);
        ticking = true;
    }

    onMounted(() => {
        updateScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll);
    });

    return {
        scrollY,
        isScrolled,
    };
}
