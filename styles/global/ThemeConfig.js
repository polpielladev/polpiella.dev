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
        @media screen and (max-width: 810px) {
            width: 85%;
        }
        max-width: 750px;
    }
    
    .home-button {
        background: #575656;
        padding: 5px;
        align-self: flex-start;
        justify-self: flex-start;
        border-radius: 10px;
        margin-top: 20px;
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
`;
