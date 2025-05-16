import styled from "styled-components";

// ================================================================================================

// calendar__days
export const StyledCalendarDays = styled.div`
    display: flex;
    flex-wrap: wrap;
    border: 1px solid var(--accent);
`;

// ================================================================================================

interface StyledCalendarDayProps {
    variant?: "weekday" | "empty" | "passed" | "today" | "";
}

// calendar__day
export const StyledCalendarDay = styled.div.withConfig({
    // Exclude `variant` from being passed to the DOM
    shouldForwardProp: (prop) => prop !== "variant",
})<StyledCalendarDayProps>`
    border: 1px solid var(--accent);
    color: var(--accent);

    /* width: var(--dayBoxSize); */

    min-width: var(--dayBoxSize);
    max-width: var(--dayBoxSize);
    height: var(--dayBoxSize);
    max-height: var(--dayBoxSize);
    font-size: var(--dayFontSize);
    padding: 5px;
    box-shadow: 0 0 1px var(--accent);
    transition: box-shadow 0.3s;
    cursor: pointer;
    position: relative;

    @media (max-width: 480px) {
        padding: 3px;
    }

    /* &:hover {
        span.calendar__day--eventful {
            color: var(--accent);
            &:after {
                border-top: 25px solid var(--bg);
            }
        }
    }

    &:hover {
        span.calendar__day--occurence {
            color: var(--white);
            background-color: var(--bg);
            box-shadow: 0 0 10px var(--bg);
        }
    } */

    /* ==================================================================== */
    /* ON HOVER */

    &:hover {
        background-color: var(--accent);
        box-shadow: 0 0 10px var(--accent);

        span {
            color: var(--bg);
            opacity: 1;
        }
    }

    /* ==================================================================== */
    /* WHEN ACTIVE */

    &:active {
        opacity: 0.8;
    }

    span {
        pointer-events: none;

        @media (max-width: 480px) {
            font-size: 12px;
        }
    }

    /* ==================================================================== */
    /* CONDITIONAL STYLES */

    ${(props) => {
        if (props.variant === "weekday")
            return `
            pointer-events: none;
            font-size: 16px;
            text-align: center;
            max-height: 30px;

            @media (max-width: 480px) {
                    font-size: 12px;
                    max-height: 25px;
                } 
        `;
        if (props.variant === "empty")
            return `
                pointer-events: none;
                position: relative;
                width: 80px;
                height: 80px;
                background-color: #111;
                overflow: hidden;

                &::before,
                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(
                        -45deg,
                        rgba(0, 0, 0, 0.99) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(0, 0, 0, 0.99) 50%,
                        rgba(0, 0, 0, 0.99) 75%,
                        transparent 75%,
                        transparent
                    );
                    background-size: 20px 20px;  /* the size of the stripes */
                } 
                
                &::before {
                        z-index: 1;
                        opacity: 0.5;
                    } 

                &::after {
                        z-index: 2;
                        mix-blend-mode: multiply;  /* blend with the background */
                        opacity: 0.5;
                    } 
        `;
        if (props.variant === "passed")
            return `
            background-color: #111;

            span {
                    opacity: 0.4;
                }
        `;
        if (props.variant === "today")
            return `
            background-color: var(--accent);
            box-shadow: 0 0 20px var(--accent);

            span {
                    color: var(--bg);
                    opacity: 1;
                } 
        `;
        if (props.variant === "") return ``;
    }}
`;

// ================================================================================================
