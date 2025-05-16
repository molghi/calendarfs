import { StyledCalendarHeaderBox, StyledCalendarHeader, StyledCalendarHeaderBtn } from "./styled/CalendarHeader.styled";

// =====================================================================================

const CalendarHeader = () => {
    const currentYear: number = new Date().getFullYear();
    const currentMonthNumber: number = new Date().getMonth() + 1;
    const currentMonthWord: string = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(new Date()).split(" ")[2];

    let currentSeason: string;
    if (currentMonthNumber >= 3 && currentMonthNumber <= 5) currentSeason = "Spring";
    else if (currentMonthNumber >= 6 && currentMonthNumber <= 8) currentSeason = "Summer";
    else if (currentMonthNumber >= 9 && currentMonthNumber <= 11) currentSeason = "Autumn";
    else currentSeason = "Winter";

    // ====================================================

    return (
        <StyledCalendarHeaderBox>
            {/* PREV MONTH BTN */}
            <StyledCalendarHeaderBtn variant="prev">
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
            <StyledCalendarHeaderBtn variant="next">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"></path>
                </svg>
            </StyledCalendarHeaderBtn>
        </StyledCalendarHeaderBox>
    );
};

export default CalendarHeader;
