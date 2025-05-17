import { useContext } from "react";
import MyContext from "../context/MyContext";
import { StyledCalendarHeaderBox, StyledCalendarHeader, StyledCalendarHeaderBtn } from "./styled/CalendarHeader.styled";

// =====================================================================================
const CalendarHeader = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { currentYear, currentMonthNumber, currentMonthWord, currentSeason, changeMonth } = context;

    return (
        <StyledCalendarHeaderBox>
            {/* PREV MONTH BTN */}
            <StyledCalendarHeaderBtn onClick={() => changeMonth("prev")} variant="prev">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"></path>
                </svg>
            </StyledCalendarHeaderBtn>

            {/* HEADER TEXT */}
            <StyledCalendarHeader>
                <span>{currentYear}</span>, <span>{currentSeason}</span> — <span>Month {currentMonthNumber}</span>,{" "}
                <span>{currentMonthWord}</span>
            </StyledCalendarHeader>

            {/* NEXT MONTH BTN */}
            <StyledCalendarHeaderBtn onClick={() => changeMonth(`next`)} variant="next">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"></path>
                </svg>
            </StyledCalendarHeaderBtn>
        </StyledCalendarHeaderBox>
    );
};

export default CalendarHeader;
