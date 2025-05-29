import { useContext } from "react";
import MyContext from "../context/MyContext";
import { StyledCalendarHeaderBox, StyledCalendarHeader, StyledCalendarHeaderBtn } from "./styled/CalendarHeader.styled";
import { prevIcon, nextIcon } from "../utils/icons";

const CalendarHeader = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("Error using Context"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    const { currentYear, currentMonthNumber, currentMonthWord, currentSeason, changeMonth } = context; // Pull out from context

    return (
        <StyledCalendarHeaderBox>
            {/* PREV MONTH BTN */}
            <StyledCalendarHeaderBtn onClick={() => changeMonth("prev")} variant="prev">
                {prevIcon}
            </StyledCalendarHeaderBtn>

            {/* HEADER TEXT */}
            <StyledCalendarHeader>
                <span>{currentYear}</span>, <span>{currentSeason}</span> — <span>Month {currentMonthNumber}</span>,{" "}
                <span>{currentMonthWord}</span>
            </StyledCalendarHeader>

            {/* NEXT MONTH BTN */}
            <StyledCalendarHeaderBtn onClick={() => changeMonth(`next`)} variant="next">
                {nextIcon}
            </StyledCalendarHeaderBtn>
        </StyledCalendarHeaderBox>
    );
};

export default CalendarHeader;
