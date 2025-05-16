import styled from "styled-components";

// ================================================================================================

// .calendar__header
export const StyledCalendarHeader = styled.div`
    font-size: 29.5px;
    text-shadow: 0 0 2px var(--accent);
    padding-left: 18px;

    /* MEDIA QUERIES */

    @media (max-width: 620px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 15.5px;
        padding-left: 5px;
    }
`;

// ================================================================================================

// .calendar__header-box
export const StyledCalendarHeaderBox = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    color: var(--accent);

    /* MEDIA QUERIES */

    @media (max-width: 620px) {
        margin-bottom: 12px;
    }
`;

// ================================================================================================

// To achieve conditional styling based on a prop
interface StyledBtnProps {
    variant: "prev" | "next";
}

// .calendar__header-btn
export const StyledCalendarHeaderBtn = styled.button<StyledBtnProps>`
    padding: 0;
    border: none;
    opacity: 0.5;
    transition: none;
    position: absolute;
    top: 5px;

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
        width: 24px;

        @media (max-width: 992px) {
            width: 35px;
        }
    }

    svg path {
        fill: var(--accent);
    }

    /* ================================================ */
    /* PREV OR NEXT BTN STYLES */

    ${(props) =>
        props.variant === "prev"
            ? `left: -35px;

        @media (max-width: 1182px) {
            left: -24px;
        }
        
        @media (max-width: 992px) {
            left: -45px;
        }

        @media (max-width: 680px) {
            right: 60px;
            left: initial;
            top: -45px;
        }`
            : `right: -35px;

        @media (max-width: 1182px) {
            right: -24px;
        }

        @media (max-width: 992px) {
            right: -45px;
        }
        
        @media (max-width: 680px) {
            right: 0;
            top: -45px;
        }`}
`;

// ================================================================================================
