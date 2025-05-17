import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import { StyledContainer } from "./styled/Container.styled";
import { StyledCalendarInner, StyledCalendarNowBtnBox } from "./styled/Calendar.styled"; // limiting container for calendar
import { useContext } from "react";
import MyContext from "../context/MyContext";

const Calendar = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { showingNow, backToNow } = context;

    return (
        <div className="calendar">
            <StyledContainer>
                <StyledCalendarInner>
                    {/* HEADER */}
                    <CalendarHeader />

                    {/* ALL THE DAYS OF THE MONTH */}
                    <CalendarDays />

                    {/* BTN */}
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
