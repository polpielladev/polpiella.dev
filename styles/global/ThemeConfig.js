import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html,
    body {
        height: 100vh;
        background: ${({ theme }) => theme.body};
        transition: all 0.50s linear;
        color: ${({ theme }) => theme.text};
    }

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.text};
    }

    a:hover {
        text-decoration: underline;
    }

    h1 {
        word-wrap: break-word;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        font-weight: bold;
    }

    * {
        margin: 0;
        padding: 0;
    }

    .container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .app {
        display: flex;
        flex-direction: column;
        @media screen and (max-width: 1000px) {
            width: 90%;
        }
        max-width: 900px;

        .app-header {
            margin-top: 40px;

            .home-button {
                background: #575656;
                padding: 5px;
                border-radius: 10px;
                width: 30px;
                height: 30px;
            }
        }
    }

    blockquote {
        padding: 15px;
        border-radius: 10px;
        border-color: ${({ theme }) => theme.quoteBorder};
        border-width: 2px;
        border-style: solid;
        font-size: 14px;
        background-color: ${({ theme }) => theme.quoteBackground};
        color: rgba($color: white, $alpha: 0.9);
    }

    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

    @font-face {
        font-family: "Cascadia Code";
        src: url("/fonts/cascadia/CascadiaCode.ttf");
        font-style: normal;
        font-weight: 400;
        font-display: swap;
    }

    body {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        color: #000000;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        line-height: 1.3;
    }

    h1 {
        font-size: 3.052rem;
    }

    h2 {
        font-size: 2.441rem;
    }

    h3 {
        font-size: 1.953rem;
    }

    h4 {
        font-size: 1.563rem;
    }

    h5 {
        font-size: 1.25rem;
    }

    small,
    .text_small {
        font-size: 0.8rem;
    }
`;
