import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import { StyledContainer } from "./styled/Container.styled";
import { StyledCalendarInner, StyledCalendarNowBtnBox } from "./styled/Calendar.styled"; // limiting container for calendar
import "./styled/calendar-prev.css";

const Calendar = () => {
    return (
        <div className="calendar">
            <StyledContainer>
                <StyledCalendarInner>
                    {/* HEADER */}
                    <CalendarHeader />

                    {/* ALL THE DAYS OF THE MONTH */}
                    <CalendarDays />

                    {/* BTN */}
                    <StyledCalendarNowBtnBox>
                        <button>Back to Now</button>
                    </StyledCalendarNowBtnBox>
                </StyledCalendarInner>
            </StyledContainer>
        </div>
    );
};

export default Calendar;
