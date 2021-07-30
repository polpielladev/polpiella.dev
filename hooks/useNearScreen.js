import { useState, useRef, useEffect } from "react";

export const useNearScreen = ({ rootMargin = "100px" } = {}) => {
    const [isNear, setIsNear] = useState(false);
    const el = useRef(null);

    useEffect(
        function () {
            if (typeof el.current === "undefined") return;

            let observer;
            Promise.resolve(
                typeof window.IntersectionObserver !== "undefined"
                    ? window.IntersectionObserver
                    : import("intersection-observer")
            ).then(() => {
                const onIntersect = (entries) => {
                    setIsNear(entries[0].isIntersecting);
                };

                observer = new window.IntersectionObserver(onIntersect, {
                    rootMargin,
                });
                observer.observe(el.current);
            });

            return () => observer && observer.disconnect();
        },
        [el, rootMargin]
    );

    return [isNear, el];
};
