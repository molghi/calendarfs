import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import { StyledContainer } from "./styled/Container.styled";
import { StyledCalendarInner, StyledCalendarNowBtnBox } from "./styled/Calendar.styled"; // limiting container for calendar
import { useContext } from "react";
import MyContext from "../context/MyContext";

const Calendar = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("Error using Context"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    const { showingNow, backToNow } = context; // Pull out from context

    return (
        <div className="calendar">
            <StyledContainer>
                <StyledCalendarInner>
                    {/* CALENDAR HEADER */}
                    <CalendarHeader />

                    {/* BOX WITH ALL THE DAYS OF THE MONTH */}
                    <CalendarDays />

                    {/* BTN BACK TO NOW */}
                    {!showingNow && (
                        <StyledCalendarNowBtnBox>
                            <button onClick={() => backToNow()}>Back to Now</button>
                        </StyledCalendarNowBtnBox>
                    )}
                </StyledCalendarInner>
            </StyledContainer>
        </div>
    );
};

export default Calendar;
