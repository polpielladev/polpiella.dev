import LinkWrapper from "./LinkWrapper";
import { Twitter, Linkedin, Github, Rss } from "@icons-pack/react-simple-icons";

const LINKS = [
    {
        component: <Twitter />,
        href: "https://twitter.com/polcodes",
    },
    {
        component: <Github />,
        href: "https://github.com/pol-piella",
    },
    {
        component: <Linkedin />,
        href: "https://www.linkedin.com/in/pol-piella-81b846115/",
    },
    {
        component: <Rss />,
        href: "/rss.xml",
    },
];

export default function SocialStrip() {
    return (
        <>
            {LINKS.map((link) => {
                return (
                    <LinkWrapper key={link.href} href={link.href}>
                        {link.component}
                    </LinkWrapper>
                );
            })}
        </>
    );
}
