import styled from "styled-components";

// ================================================================================================

export const StyledCalendarInner = styled.div`
    min-width: calc(var(--dayBoxSize) * 7 + 1px + 1.45px);
    max-width: calc(var(--dayBoxSize) * 7 + 1px + 1.45px);

    /* var(--dayBoxSize) * 7 days */

    /* Adding a small buffer amount of px to avoid the calendar break on ctrl-minus */
`;

// ================================================================================================

// .calendar__now-btn-box
export const StyledCalendarNowBtnBox = styled.div`
    text-align: right;
    margin-top: 2rem;
    position: relative;

    button {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        border: none;
        transition: none;
        opacity: 0.5;

        &:hover {
            opacity: 1;
            box-shadow: none;
            background-color: var(--bg);
            color: var(--accent);
            text-decoration: underline;
        }

        &:active {
            opacity: 0.5;
        }
    }
`;

// ================================================================================================

/*

.calendar {
    // max-width: calc(var(--dayBoxSize) * 7 + 2px);
    // max-width: calc(var(--dayBoxSize) * 7 + 2px + 0.7px);

    // 2px there above are for the border width on .days (1px left and 1px right)
    
    // min-width: calc(var(--dayBoxSize) * 7 + 2px);
    // var(--dayBoxSize) * 7 + 1px + 0.7px 
}

*/
