import LinkWrapper from "./LinkWrapper";

const LINKS = [
    {
        name: "Twitter",
        href: "https://twitter.com/polcodes",
    },
    {
        name: "Github",
        href: "https://github.com/pol-piella",
    },
    {
        name: "Email",
        href: "mailto:info@polpiellamusic.com",
    },
    {
        name: "RSS",
        href: "/rss.xml",
    },
];

export default function SocialStrip() {
    return (
        <>
            {LINKS.map((link) => {
                return (
                    <LinkWrapper key={link.href} href={link.href}>
                        {link.name}
                    </LinkWrapper>
                );
            })}
        </>
    );
}
