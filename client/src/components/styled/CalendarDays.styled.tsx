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
    variant?: "weekday" | "empty" | "passed" | "today" | "highlighted" | "";
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
    padding: 0.5rem;
    box-shadow: 0 0 1px var(--accent);
    transition: box-shadow 0.3s;
    cursor: pointer;
    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0.3rem;
    }

    /* ==================================================================== */
    /* EVENT BADGE */

    span.events {
        position: absolute;
        top: 0;
        right: 0;
        color: var(--bg);
        font-size: 1.6rem;
        z-index: 5;

        &:after {
            content: "";
            position: absolute;
            z-index: -1;
            top: 0;
            right: 0;
            border-left: 2.5rem solid transparent;
            border-right: 0px solid transparent;
            border-top: 2.5rem solid var(--accent);
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
            font-size: 1.2rem;
        }

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 1.1rem;
            &:after {
                border-left: 2.4rem solid transparent;
                border-right: 0px solid transparent;
                border-top: 2.4rem solid var(--accent);
            }
        }
    }

    &:hover {
        span.events {
            color: var(--accent);
            &:after {
                border-top: 2.5rem solid var(--bg);
            }
        }
    }

    /* ==================================================================== */
    /* OCCURRENCE BADGE */

    span.occurrences {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        color: var(--bg);
        z-index: 5;
        font-size: 1.6rem;
        width: 2.2rem;
        height: 2.2rem;
        background-color: var(--white);
        box-shadow: 0 0 1rem var(--white);
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
            bottom: 0.5rem;
            right: 0.5rem;
            font-size: 1.3rem;
        }
        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 0;
            width: 1rem;
            height: 1rem;
            bottom: 0.5rem;
            right: 0.5rem;
        }
    }

    /* ==================================================================== */

    &:hover {
        span.events {
            color: var(--accent);
            &:after {
                border-top: 25px solid var(--bg);
            }
        }
    }

    &:hover {
        span.occurrences {
            color: var(--white);
            background-color: var(--bg);
            box-shadow: 0 0 10px var(--bg);
        }
    }

    /* ==================================================================== */
    /* ON HOVER */

    &:hover {
        background-color: var(--accent);
        box-shadow: 0 0 1rem var(--accent);

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

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: 1.2rem;
        }
    }

    /* ==================================================================== */
    /* CONDITIONAL STYLES */

    ${(props) => {
        if (props.variant === "weekday")
            return `
            pointer-events: none;
            font-size: 1.6rem;
            text-align: center;
            max-height: 3rem;

            @media (max-width: ${() => props.theme.breakpoints.mobile}) {
                    font-size: 1.2rem;
                    max-height: 2.5rem;
                } 
        `;
        if (props.variant === "empty")
            return `
                pointer-events: none;
                position: relative;
                width: 8rem;
                height: 8rem;
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
                    background-size: 2rem 2rem;  /* the size of the stripes */
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
            box-shadow: 0 0 2rem var(--accent);

            span {
                    color: var(--bg);
                    opacity: 1;
                } 

            span.events {
                color: var(--accent);
                &:after {
                    border-top-color: var(--bg);
                }
            }
        `;

        if (props.variant === "highlighted")
            return `
            background-color: var(--accent);
            box-shadow: 0 0 2rem var(--accent);

            span {
                    color: var(--bg);
                    opacity: 1;
                } 

            span.events {
                color: var(--accent);
                &:after {
                    border-top-color: var(--bg);
                }
            }
                `;

        if (props.variant === "") return ``;
    }}
`;

// ================================================================================================
