import { useEffect, useState } from "react";

export default function useCurrentHref() {
    const [href, setHref] = useState("");

    useEffect(() => {
        setHref(window.location.href);
    }, []);

    return {
        href,
    };
}
