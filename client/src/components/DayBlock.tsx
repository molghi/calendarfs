import "./styled/dayblock.css";
import { useContext } from "react";
import MyContext, { Event, Occurrence } from "../context/MyContext";
import defineDayBlockWord from "../utils/defineDayBlockWord";
import { differenceInDays, differenceInCalendarDays, getDaysInYear, startOfYear } from "date-fns";

const DayBlock = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("Error using Context"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    const { dayBlockShown, currentYear, currentMonthNumber, events, occurrences } = context; // Pull out from context

    // Get what day of the week it is
    const weekday: string = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" })
        .format(new Date(currentYear, currentMonthNumber - 1, +dayBlockShown.split("/")[0]))
        .split(" ")[0]
        .slice(0, -1);

    // Get events and occurrences this day
    const eventsThisDay: Event[] = events.filter((ev) => ev.date === dayBlockShown);
    const occurrencesThisDay: Occurrence[] = occurrences.filter((occ) => occ.date === dayBlockShown);

    // Calc time difference between actual now and this day
    const now: Date = new Date();
    now.setHours(0, 0, 0, 0); // Set to day beginning
    const theDate: Date = new Date(dayBlockShown.split("/").reverse().join("-")); // Month not zero based
    theDate.setHours(0, 0, 0, 0);
    const daysApart: number = differenceInDays(theDate, now);

    // Calc in percentages
    const daysElapsed: number = differenceInCalendarDays(theDate, startOfYear(theDate)) + 1; // By incrementing daysElapsed by 1, the current day is counted
    const totalDays: number = getDaysInYear(theDate);
    const percentage: string = ((daysElapsed / totalDays) * 100).toFixed(1);

    // Define the word(s) -- when something was or will be
    let whenWasWillBe: string = defineDayBlockWord(daysApart, now, theDate);

    // console.log("1", daysApart, now, theDate);
    // console.log("2", whenWasWillBe);

    return (
        <>
            <div className="day-block">
                <div className="day-block__info">Day Info</div>
                {/* PERCENTAGE */}
                <div className="day-block__percent">
                    {percentage}% of {currentYear}
                </div>

                <div className="day-block__row">
                    {/* DATE AND DAY OF THE WEEK */}
                    <div className="day-block__date">
                        <span>{dayBlockShown}</span>
                        <span>({weekday})</span>
                    </div>

                    {/* WHEN WAS OR WILL BE */}
                    <div className="day-block__temp">{whenWasWillBe}</div>
                </div>

                {/* EVENTS THIS DAY */}
                <div className="day-block__events">
                    {/* TITLE */}
                    <div className="day-block__events-title">
                        Events: <span>{eventsThisDay.length}</span>
                    </div>
                    {/* ELEMENTS */}
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
                                            <span>{ev.description}</span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>

                {/* OCCURRENCES THIS DAY */}
                <div className="day-block__occurrences">
                    {/* TITLE */}
                    <div className="day-block__occurrences-title">
                        Occurrences: <span>{occurrencesThisDay.length}</span>
                    </div>
                    {/* ELEMENTS */}
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
                                            <span>{occ.description}</span>
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
