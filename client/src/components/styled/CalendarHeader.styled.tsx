import styled from "styled-components";

// ================================================================================================

// .calendar__header
export const StyledCalendarHeader = styled.div`
    font-size: 2.95rem;
    text-shadow: 0 0 2px var(--accent);
    padding-left: 1.8rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.smallish}) {
        font-size: 2.2rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.55rem;
        padding-left: 0.5rem;
    }
`;

// ================================================================================================

// .calendar__header-box
export const StyledCalendarHeaderBox = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    color: var(--accent);

    @media (max-width: ${({ theme }) => theme.breakpoints.smallish}) {
        margin-bottom: 1.2rem;
    }
`;

// ================================================================================================

// To achieve conditional styling based on a prop
interface StyledBtnProps {
    variant: "prev" | "next";
}

// .calendar__header-btn
export const StyledCalendarHeaderBtn = styled.button.withConfig({
    // Exclude `variant` from being passed to the DOM
    shouldForwardProp: (prop) => prop !== "variant",
})<StyledBtnProps>`
    padding: 0;
    border: none;
    opacity: 0.5;
    transition: none;
    position: absolute;
    top: 0.5rem;

    &:hover {
        opacity: 1;
        background-color: var(--bg);
        color: var(--accent);
        box-shadow: none;
        text-decoration: underline;
    }

    &:active {
        opacity: 0.5;
    }

    /* ================================================ */
    /* ICON */

    svg {
        width: 2.4rem;

        @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
            width: 3.5rem;
        }
    }

    svg path {
        fill: var(--accent);
    }

    /* ================================================ */
    /* PREV OR NEXT BTN STYLES */

    ${(props) =>
        props.variant === "prev"
            ? `left: -3.5rem;

        @media (max-width: ${() => props.theme.breakpoints.wide}) {
            left: -2.4rem;
        }
        
        @media (max-width: ${() => props.theme.breakpoints.laptop}) {
            left: -4.5rem;
        }

        @media (max-width: 680px) {
            right: 6.0rem;
            left: initial;
            top: -4.5rem;
        }`
            : `right: -3.5rem;

        @media (max-width: ${() => props.theme.breakpoints.wide}) {
            right: -2.4rem;
        }

        @media (max-width: ${() => props.theme.breakpoints.laptop}) {
            right: -4.5rem;
        }
        
        @media (max-width: 680px) {
            right: 0;
            top: -4.5rem;
        }`}
`;

// ================================================================================================
