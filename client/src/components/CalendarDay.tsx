import { useContext } from "react";
import MyContext from "../context/MyContext";
import { StyledCalendarDay } from "./styled/CalendarDays.styled";
import { Dispatch, SetStateAction } from "react";

// Type declaration
interface CalendarDayProps {
    type: string;
    day?: any;
    currentMonth?: number;
    currentYear?: number;
    yearShown?: number;
    monthShown?: number;
    dayHighlighted?: string;
    setDayBlockShown?: Dispatch<SetStateAction<string>>;
}

const CalendarDay = ({
    type,
    day,
    currentYear,
    currentMonth,
    yearShown,
    monthShown,
    dayHighlighted,
    setDayBlockShown,
}: CalendarDayProps) => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { showingNow, events, occurrences, routinesHighlighted } = context;

    const dayString: string = `${day}/${monthShown}/${yearShown}`; // Compose day string

    let highlighted: boolean = routinesHighlighted.includes(dayString); // Does this day have a routine that's repeated throughout many days?
    if (dayHighlighted === dayString) highlighted = true;

    const hasEvents: boolean = events.filter((event) => event.date === dayString).length > 0 ? true : false; // Does this day have any events?
    const hasOccurrences: boolean = occurrences.filter((occ) => occ.date === dayString).length > 0 ? true : false; // Does this day have any occurrences?

    const now: Date = new Date();
    let isPassed: boolean = showingNow ? now.getDate() > day : false;
    let isToday: boolean = showingNow ? now.getDate() === day : false; // Only care about today and passed days if the month now showing is actually the current month
    if (routinesHighlighted.length > 0 || dayHighlighted) isToday = false; // Do not highlight today if highlighting routines or some day upon Events block hover

    let result: JSX.Element = <div className="calendar__day"></div>;

    // Handle various cases

    // WEEK DAY NAME
    if (type === "weekday") result = <StyledCalendarDay variant="weekday">{day}</StyledCalendarDay>;

    // EMPTY CALENDAR CELL
    if (type === "empty")
        result = (
            <StyledCalendarDay variant="empty">
                <span></span>
            </StyledCalendarDay>
        );

    // DAY CELL
    if (type === "day" && currentMonth !== undefined && currentYear !== undefined) {
        let variant: any = "";
        if (isPassed) variant = "passed";
        if (isToday) variant = "today";
        if (highlighted) variant = "highlighted";
        result = (
            <StyledCalendarDay
                onMouseEnter={() => setDayBlockShown?.(dayString)}
                onMouseLeave={() => setDayBlockShown?.("")}
                variant={variant}
                data-date={`${currentYear},${currentMonth + 1},${day}`}
            >
                {hasEvents && <span className="events">{events.filter((event) => event.date === dayString).length}</span>}
                {hasOccurrences && (
                    <span className="occurrences">{occurrences.filter((occ) => occ.date === dayString).length}</span>
                )}
                <span>{day}</span>
            </StyledCalendarDay>
        );
    }

    return result;
};

export default CalendarDay;
