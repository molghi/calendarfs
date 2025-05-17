import "./styled/dayblock.css";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import {
    differenceInDays,
    differenceInCalendarDays,
    getDaysInYear,
    startOfYear,
    intervalToDuration,
    differenceInWeeks,
} from "date-fns";

const DayBlock = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { dayBlockShown, currentYear, currentMonthNumber, events, occurrences } = context;

    // Get what day of the week it is
    const weekday: string = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" })
        .format(new Date(currentYear, currentMonthNumber - 1, +dayBlockShown.split("/")[0]))
        .split(" ")[0]
        .slice(0, -1);

    // Get events and occurrences this day
    const eventsThisDay: any[] = events.filter((ev) => ev.date === dayBlockShown);
    const occurrencesThisDay: any[] = occurrences.filter((occ) => occ.date === dayBlockShown);

    // Calc time difference between actual now and this day
    const now: Date = new Date();
    now.setHours(0, 0, 0, 0);
    const theDate: Date = new Date(dayBlockShown.split("/").reverse().join("-")); // month not zero based
    theDate.setHours(0, 0, 0, 0);
    const daysApart: number = differenceInDays(theDate, now);

    // Calc in percentages
    const daysElapsed: number = differenceInCalendarDays(theDate, startOfYear(theDate)) + 1; // By incrementing daysElapsed by 1, the current day is counted
    const totalDays: number = getDaysInYear(theDate);
    const percentage: string = ((daysElapsed / totalDays) * 100).toFixed(1);

    // Define the word(s)
    let whenWasWillBe: string = "";
    if (daysApart === 0) whenWasWillBe = "Today";
    if (daysApart < 0) whenWasWillBe = `${Math.abs(daysApart)} days ago`;
    if (daysApart > 0) whenWasWillBe = `in ${daysApart} days`;
    if (daysApart === -1) whenWasWillBe = `Yesterday`;
    if (daysApart === 1) whenWasWillBe = `Tomorrow`;
    const duration = intervalToDuration({ start: now, end: theDate });
    const weeks = differenceInWeeks(theDate, now);
    const totalDayDuration = differenceInDays(theDate, now);
    const remainingDays = totalDayDuration - weeks * 7;
    if (duration.days && duration.days > 7) {
        whenWasWillBe += ` (in ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
        if (remainingDays !== 0) whenWasWillBe += `, ${remainingDays} ${remainingDays === 1 ? "day" : "days"})`;
        else whenWasWillBe += ")";
    }
    if (duration.days && duration.days < -7) {
        whenWasWillBe += ` (${Math.abs(weeks)} ${weeks === -1 ? "week" : "weeks"}`;
        if (remainingDays !== 0) whenWasWillBe += `, ${Math.abs(remainingDays)} ${remainingDays === -1 ? "day" : "days"})`;
        else whenWasWillBe += `)`;
    }

    return (
        <>
            <div className="day-block">
                <div className="day-block__info">Day Info</div>
                <div className="day-block__percent">
                    {percentage}% of {currentYear}
                </div>
                <div className="day-block__row">
                    <div className="day-block__date">
                        <span>{dayBlockShown}</span>
                        <span>({weekday})</span>
                    </div>
                    <div className="day-block__temp">{whenWasWillBe}</div>
                    {/* <div className="day-block__temp">how many days ago, in weeks/months/years</div> */}
                </div>
                <div className="day-block__events">
                    <div className="day-block__events-title">
                        Events: <span>{eventsThisDay.length}</span>
                    </div>
                    {eventsThisDay.length === 0 && <div className="day-block__msg">No entries</div>}
                    {eventsThisDay &&
                        eventsThisDay.length > 0 &&
                        eventsThisDay.map((ev, i) => (
                            <div key={i} className="day-block__event">
                                <div className="day-block__event-title">{ev.title}</div>
                                {ev.time && (
                                    <div className="day-block__event-time">
                                        <span>Time:</span>
                                        <span>{ev.time}</span>
                                    </div>
                                )}
                                {ev.description && (
                                    <div className="day-block__event-description">
                                        <span>
                                            <span>Note:</span>
                                            {ev.description}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
                <div className="day-block__occurrences">
                    <div className="day-block__occurrences-title">
                        Occurrences: <span>{occurrencesThisDay.length}</span>
                    </div>
                    {occurrencesThisDay.length === 0 && <div className="day-block__msg">No entries</div>}
                    {occurrencesThisDay &&
                        occurrencesThisDay.length > 0 &&
                        occurrencesThisDay.map((occ, i) => (
                            <div key={i} className="day-block__occurrence">
                                <div className="day-block__occurrence-title">{occ.title}</div>
                                {occ.category && (
                                    <div className="day-block__occurrence-category">
                                        <span>Category:</span>
                                        <span>{occ.category}</span>
                                    </div>
                                )}
                                {occ.description && (
                                    <div className="day-block__occurrence-description">
                                        <span>
                                            <span>Note:</span>
                                            {occ.description}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default DayBlock;
