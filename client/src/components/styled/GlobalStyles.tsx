import { createGlobalStyle } from "styled-components";
import "styled-components";

// Type declaration
declare module "styled-components" {
    export interface DefaultTheme {
        accentColor: string;
        contentWidth: string;
        breakpoints: {
            wide: string;
            laptop: string;
            tablet: string;
            smallish: string;
            mobile: string;
        };
    }
}

export const GlobalStyles = createGlobalStyle`
    /* VARIABLES */

    :root {
        --accent: ${({ theme }) => theme.accentColor};
        --white: #fff;
        --bg: #000;
        --dayBoxSize: 80px;
        --dayFontSize: 25px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.smallish}) {
        :root {
            --dayBoxSize: 60px;
            --dayFontSize: 20px;
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        :root {
            --dayBoxSize: 40px;
            --dayFontSize: 14px;
        }
    }

/* ============================================================================================= */

    /* STYLES RESET */

    *,
    *:before,
    *:after {
        padding: 0;
        margin: 0;
        border: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
        /* =10px, easier to calculate */
    }

    html,
    body {
        overflow-x: hidden;
    }

    body {
        background-color: var(--bg);
        color: var(--accent);
        font-size: 1.6rem;
        font-family: "Share-TechMono", "Share Tech Mono", "Monaco", "Courier New", monospace, sans-serif;
    }

    input,
    button,
    select,
    textarea {
        cursor: pointer;
        background-color: transparent;
        color: inherit;
        font-family: inherit;
        border: 1px solid var(--accent);
        outline: none;
        padding: 1rem;
        font-size: inherit;
        transition: box-shadow 0.3s;
    }

    button {
        transition: all 0.3s;
    }

    input:focus,
    textarea:focus {
        box-shadow: 0 0 1rem var(--accent);
    }

    button:hover {
        background-color: var(--accent);
        color: var(--bg);
        box-shadow: 0 0 1rem var(--accent);
    }

    button:active {
        box-shadow: 0 0 1px var(--accent);
    }

    textarea {
        resize: vertical;
    }

    button {
        cursor: pointer;
    }

    input::placeholder {
        color: inherit;
        font-family: inherit;
        opacity: 1;
    }

    & * {
        font-variant-ligatures: none;
    }

/* ============================================================================================= */

    .app__inner {
        display: flex;
        justify-content: space-between;
        column-gap: 5rem;
    }

    .app__col {
        &:first-child {
            max-width: calc(var(--dayBoxSize) * 7 + 2px);
            flex-basis: calc(var(--dayBoxSize) * 7 + 2px);
            flex-shrink: 0;
            flex-grow: 1;
        }
        &:last-child {
            flex-shrink: 1;
            flex-grow: 0;
            flex-basis: 50rem;
            max-width: 50rem;
        }
    }

/* ============================================================================================= */

    /* DARK SCROLLBAR */

    ::-webkit-scrollbar {
        width: 5px;
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        background: #1a1a1a;
        /* Dark background for the track */
    }

    ::-webkit-scrollbar-thumb {
        background: #333;
        /* Darker thumb */
        border-radius: 0px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
        /* Slightly lighter on hover */
    }

    /* For Firefox */
    * {
        scrollbar-width: thin;
        scrollbar-color: #333 #1a1a1a;
    }

`;
