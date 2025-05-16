import { StyledCalendarDay } from "./styled/CalendarDays.styled";

// Type declaration
interface CalendarDayProps {
    type: string;
    day?: any;
    currentMonth?: number;
    currentYear?: number;
}

const CalendarDay = ({ type, day, currentYear, currentMonth }: CalendarDayProps) => {
    const now: Date = new Date();
    const isPassed = now.getDate() > day;
    const isToday = now.getDate() === day;
    let result = <div className="calendar__day"></div>;

    if (type === "weekday") result = <StyledCalendarDay variant="weekday">{day}</StyledCalendarDay>;

    if (type === "empty")
        result = (
            <StyledCalendarDay variant="empty">
                <span></span>
            </StyledCalendarDay>
        );

    if (type === "day" && currentMonth !== undefined && currentYear !== undefined) {
        let variant: any = "";
        if (isPassed) variant = "passed";
        if (isToday) variant = "today";
        result = (
            <StyledCalendarDay variant={variant} data-date={`${currentYear},${currentMonth + 1},${day}`}>
                <span>{day}</span>
            </StyledCalendarDay>
        );
    }

    return result;
};

export default CalendarDay;

/* 
<div className="calendar__day calendar__day--passed" data-date="2025,5,8">
    <span className="calendar__day--eventful">1</span>
    <span className="calendar__day--occurence">5</span>
    <span>8</span>
</div>
 */
