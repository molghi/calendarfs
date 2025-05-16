import CalendarDay from "./CalendarDay";
import { StyledCalendarDays } from "./styled/CalendarDays.styled";

const CalendarDays = () => {
    const weekdayNames: Array<string> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const currentYear: number = new Date().getFullYear();
    const currentMonth: number = new Date().getMonth(); // index starts at 0
    const monthFirstDay: number = new Date(currentYear, currentMonth, 1).getDay(); // index starts at 0
    const daysInCurrentMonth: number = new Date(currentYear, currentMonth + 1, 1 - 1).getDate(); // amount of days in the current month
    const dummyEmptyCells: Array<string> = new Array(monthFirstDay).fill("empty");
    const dummyDays: Array<number> = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
    const dummyMonth: Array<any> = [...dummyEmptyCells, ...dummyDays];

    return (
        <>
            <StyledCalendarDays>
                {/* WEEKDAY NAMES */}
                {weekdayNames.map((day, i) => (
                    <CalendarDay key={i} type="weekday" day={day} />
                ))}

                {/* MONTH CELLS: EMPTY CELLS AND DAYS */}
                {dummyMonth.map((day, index) => {
                    if (day === "empty") {
                        // Return empty cells
                        return <CalendarDay key={index} type="empty" />;
                    } else {
                        // Return days
                        return (
                            <CalendarDay key={index} type="day" day={day} currentYear={currentYear} currentMonth={currentMonth} />
                        );
                    }
                })}
            </StyledCalendarDays>
        </>
    );
};

export default CalendarDays;
