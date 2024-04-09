import { useMemo, useEffect, useState } from 'react';

export default function useOnScreen(id) {
    const [isIntersecting, setIntersecting] = useState(false);
    const observed = document.getElementById(id)

    const observer = useMemo(() => new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        {
            // options, like rootMargin or threshold, could be placed here
        }
    ), []);

    useEffect(() => {
        if (observed) {
            observer.observe(observed);
        }
        return () => {
            observer.disconnect();
        };
    }, [observed, observer]);

    return isIntersecting;
}