import styled from "styled-components";
import { Twitter } from "@icons-pack/react-simple-icons";

const FloatingButton = styled.div`
    position: fixed;
    bottom: 30px;
    display: flex;
    transform: translateX(-90px);
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: opacity 0.2s ease-out 100ms;

    @media screen and (max-width: 1060px) {
        transform: unset;
    }
`;

const TwitterButtonLink = styled.a`
    background: white;
    padding: 15px;
    border-radius: 40px;
    width: unset;
    display: flex;
    align-items: center;
    transition: background-color 0.2s ease-out 100ms;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    & > *:not(:first-child) {
        margin-left: 5px;
    }

    p {
        color: black;
        font-weight: bold;
        display: none;
    }

    :hover {
        p {
            display: block;
        }
    }
`;

export default function TwitterButton({ link, isVisible }) {
    return (
        <FloatingButton isVisible={isVisible}>
            <TwitterButtonLink href={link} style={{ display: "flex" }}>
                <Twitter color="#1DA1F2" size={20} />
                <p>Share this article on Twitter!</p>
            </TwitterButtonLink>
        </FloatingButton>
    );
}
