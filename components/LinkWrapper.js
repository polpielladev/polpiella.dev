import Link from "next/link";

export default function LinkWrapper({ children, href }) {
    return href.startsWith("/") || href === "" ? (
        <Link href={href}>
            <a>{children}</a>
        </Link>
    ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}
