import { useEffect } from 'react';

/**
 * Hook that sets up IntersectionObserver for scroll-triggered animations.
 * Elements with class 'scroll-animate', 'scroll-animate-left',
 * 'scroll-animate-right', or 'scroll-animate-scale' will get
 * 'visible' class added when they enter viewport.
 */
export const useScrollAnimation = () => {
    useEffect(() => {
        const animatedElements = document.querySelectorAll(
            '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
        );

        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Once visible, no need to observe anymore
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    });
};
