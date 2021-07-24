import { createGlobalStyle } from "styled-components";

export const CodeThemeStyle = createGlobalStyle`
    code[class*="language-"],
    pre[class*="language-"] {
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        color: ${({ theme }) => theme.code.color};
        background: ${({ theme }) => theme.code.background};
        font-family: Cascadia Code, monospace;
        font-size: 1em;
        line-height: 1.5em;
        border-radius: 5px;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
    }

    code[class*="language-"]::-moz-selection,
    pre[class*="language-"]::-moz-selection,
    code[class*="language-"] ::-moz-selection,
    pre[class*="language-"] ::-moz-selection {
        background: ${({ theme }) => theme.code.selection.background};
    }

    code[class*="language-"]::selection,
    pre[class*="language-"]::selection,
    code[class*="language-"] ::selection,
    pre[class*="language-"] ::selection {
        background: ${({ theme }) => theme.code.selection.background};
    }

    :not(pre) > code[class*="language-"] {
        white-space: normal;
        border-radius: 0.2em;
        padding: 0.1em;
    }

    pre[class*="language-"] {
        overflow: auto;
        position: relative;
        margin: 0.5em 0;
        padding: 1.25em 1em;
    }

    .language-css > code,
    .language-sass > code,
    .language-scss > code {
        color: ${({ theme }) => theme.code.codeColor};
    }

    [class*="language-"] .namespace {
        opacity: 0.7;
    }

    .token.atrule {
        color: ${({ theme }) => theme.code.token.atRule};
    }

    .token.attr-name {
        color: ${({ theme }) => theme.code.token.attributeName};
    }

    .token.attr-value {
        color: ${({ theme }) => theme.code.token.attributeValue};
    }

    .token.attribute {
        color: ${({ theme }) => theme.code.token.attribute};
    }

    .token.boolean {
        color: ${({ theme }) => theme.code.token.boolean};
    }

    .token.builtin {
        color: ${({ theme }) => theme.code.token.builtIn};
    }

    .token.cdata {
        color: ${({ theme }) => theme.code.token.cData};
    }

    .token.char {
        color: ${({ theme }) => theme.code.token.char};
    }

    .token.class {
        color: ${({ theme }) => theme.code.token.class};
    }

    .token.class-name {
        color: ${({ theme }) => theme.code.token.className};
    }

    .token.color {
        color: #f2ff00;
    }

    .token.comment {
        color: ${({ theme }) => theme.code.token.comment};
    }

    .token.constant {
        color: ${({ theme }) => theme.code.token.constant};
    }

    .token.deleted {
        color: ${({ theme }) => theme.code.token.deleted};
    }

    .token.doctype {
        color: ${({ theme }) => theme.code.token.docType};
    }

    .token.entity {
        color: ${({ theme }) => theme.code.token.entity};
    }

    .token.function {
        color: ${({ theme }) => theme.code.token.function};
    }

    .token.hexcode {
        color: ${({ theme }) => theme.code.token.hexCode};
    }

    .token.id {
        color: ${({ theme }) => theme.code.token.id};
        font-weight: bold;
    }

    .token.important {
        color: ${({ theme }) => theme.code.token.important};
        font-weight: bold;
    }

    .token.inserted {
        color: ${({ theme }) => theme.code.token.inserted};
    }

    .token.keyword {
        color: ${({ theme }) => theme.code.token.keyword};
        font-style: italic;
    }

    .token.number {
        color: ${({ theme }) => theme.code.token.number};
    }

    .token.operator {
        color: ${({ theme }) => theme.code.token.operator};
    }

    .token.prolog {
        color: ${({ theme }) => theme.code.token.prolog};
    }

    .token.property {
        color: ${({ theme }) => theme.code.token.property};
    }

    .token.pseudo-class {
        color: ${({ theme }) => theme.code.token.pseudoClass};
    }

    .token.pseudo-element {
        color: ${({ theme }) => theme.code.token.pseudoElement};
    }

    .token.punctuation {
        color: ${({ theme }) => theme.code.token.punctuation};
    }

    .token.regex {
        color: ${({ theme }) => theme.code.token.regex};
    }

    .token.selector {
        color: ${({ theme }) => theme.code.token.selector};
    }

    .token.string {
        color: ${({ theme }) => theme.code.token.string};
    }

    .token.symbol {
        color: ${({ theme }) => theme.code.token.symbol};
    }

    .token.tag {
        color: ${({ theme }) => theme.code.token.tag};
    }

    .token.unit {
        color: ${({ theme }) => theme.code.token.unit};
    }

    .token.url {
        color: ${({ theme }) => theme.code.token.url};
    }

    .token.variable {
        color: ${({ theme }) => theme.code.token.variable};
    }
`;
