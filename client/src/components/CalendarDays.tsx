import CalendarDay from "./CalendarDay";
import { StyledCalendarDays } from "./styled/CalendarDays.styled";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const CalendarDays = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { currentYear, currentMonthNumber, dayHighlighted, setDayBlockShown, setMode, setDayClicked } = context;

    const weekdayNames: Array<string> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const currentMonth: number = currentMonthNumber - 1; // Zero-based
    const monthFirstDay: number = new Date(currentYear, currentMonth, 1).getDay(); // Zero-based
    const daysInCurrentMonth: number = new Date(currentYear, currentMonth + 1, 1 - 1).getDate(); // Amount of days in the current month
    const dummyEmptyCells: Array<string> = new Array(monthFirstDay).fill("empty"); // Populate array with 'empty'
    const dummyDays: Array<number> = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1); // Populate array with sequentially incrementing series
    // const cellsMonthCanHave: Array<number> = [7 * 4, 7 * 5, 7 * 6];

    // Compose showing month array
    let dummyMonth: Array<any> = [...dummyEmptyCells, ...dummyDays];
    let dummyEmptyBackCells: number = 0; // Cells to insert at the end
    if (dummyMonth.length > 28) dummyEmptyBackCells = 35 - dummyMonth.length;
    if (dummyMonth.length > 35) dummyEmptyBackCells = 42 - dummyMonth.length;
    const dummyEmptyCellsAtTheEnd = new Array(dummyEmptyBackCells).fill("empty"); // Create back cells array, populate with 'empty'
    dummyMonth = [...dummyEmptyCells, ...dummyDays, ...dummyEmptyCellsAtTheEnd]; // Finally

    return (
        <>
            <StyledCalendarDays>
                {/* WEEKDAY NAMES / TABLE HEADERS */}
                {weekdayNames.map((day, i) => (
                    <CalendarDay key={i} type="weekday" day={day} />
                ))}

                {/* MONTH CELLS: EMPTY CELLS AND DAYS */}
                {dummyMonth.map((day, index) => {
                    if (day === "empty") {
                        // Return empty (non-day) cells
                        return <CalendarDay key={index} yearShown={currentYear} monthShown={currentMonthNumber} type="empty" />;
                    } else {
                        // Return day cells
                        return (
                            <CalendarDay
                                key={index}
                                yearShown={currentYear}
                                monthShown={currentMonthNumber}
                                type="day"
                                day={day}
                                currentYear={currentYear}
                                currentMonth={currentMonth}
                                dayHighlighted={dayHighlighted}
                                setDayBlockShown={setDayBlockShown}
                                setMode={setMode}
                                setDayClicked={setDayClicked}
                            />
                        );
                    }
                })}
            </StyledCalendarDays>
        </>
    );
};

export default CalendarDays;
