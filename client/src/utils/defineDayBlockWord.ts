import { differenceInDays, intervalToDuration, differenceInWeeks } from "date-fns";

const defineDayBlockWord = (daysApart: number, now: Date, theDate: Date): string => {
    let whenWasWillBe: string = "";

    if (daysApart === 0) whenWasWillBe = "Today";
    if (daysApart < 0) whenWasWillBe = `${Math.abs(daysApart)} days ago`;
    if (daysApart > 0) whenWasWillBe = `in ${daysApart} days`;
    if (daysApart === -1) whenWasWillBe = `Yesterday`;
    if (daysApart === 1) whenWasWillBe = `Tomorrow`;

    const duration = intervalToDuration({ start: now, end: theDate }); // Overall object of various time units (date-fns returned)
    const weeks: number = differenceInWeeks(theDate, now); // Difference in weeks
    const totalDayDuration: number = differenceInDays(theDate, now); // Difference in days (raw)
    const remainingDays: number = totalDayDuration - weeks * 7; // Difference in days (clean)

    // Handle various cases:

    // WEEKS
    // If in more than one week (and months,years are null)
    if (duration.days && duration.days > 7 && !duration.months && !duration.years) {
        whenWasWillBe += ` (in ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
        if (remainingDays !== 0) whenWasWillBe += `, ${remainingDays} ${remainingDays === 1 ? "day" : "days"})`;
        else whenWasWillBe += ")";
    }
    // If was more than one week ago (and months,years are null)
    if (duration.days && duration.days < -7 && !duration.months && !duration.years) {
        whenWasWillBe += ` (${Math.abs(weeks)} ${weeks === -1 ? "week" : "weeks"}`;
        if (remainingDays !== 0) whenWasWillBe += `, ${Math.abs(remainingDays)} ${remainingDays === -1 ? "day" : "days"})`;
        else whenWasWillBe += `)`;
    }

    // MONTHS
    // If in more than one week (and months are defined and years aren't)

    // if (duration.days && duration.days > 7 && duration.months && !duration.years) {
    if (duration.months && !duration.years) {
        // whenWasWillBe += ` (${duration.months} ${duration.months === 1 ? "month" : "months"}, ${duration.days} ${
        //     duration.days === 1 ? "day" : "days"
        // })`;
        const dayWord = Math.abs(duration.days || 0) === 1 ? "day" : "days";
        whenWasWillBe += ` (${Math.abs(duration.months || 0)} ${Math.abs(duration.months || 0) === 1 ? "month" : "months"}${
            duration.days ? ", " + Math.abs(duration.days || 0) + " " + dayWord : ""
        })`;
    }

    // If was more than one week ago (and months are defined and years aren't)
    // if (duration.days && duration.days < -7 && duration.months && !duration.years) {
    //     console.log(2);
    //     whenWasWillBe += ` (${Math.abs(duration.months)} ${duration.months === -1 ? "month" : "months"}, ${Math.abs(
    //         duration.days
    //     )} ${duration.days === -1 ? "day" : "days"})`;
    // }

    // YEARS
    // If in more than one week (and years are defined)
    if (duration.years && duration.years > 0) {
        const inMonths = duration.months ? `, ${duration.months} ${duration.months === 1 ? "month" : "months"}` : "";
        const inDays = duration.days ? `, ${duration.days} ${duration.days === 1 ? "day" : "days"}` : "";
        whenWasWillBe += ` (${duration.years} ${duration.years === 1 ? "year" : "years"}${inMonths}${inDays})`;
    }
    // If was more than one week ago (and years are defined)
    if (duration.years && duration.years < 0) {
        const inMonths = duration.months ? `, ${Math.abs(duration.months)} ${duration.months === -1 ? "month" : "months"}` : "";
        const inDays = duration.days ? `, ${Math.abs(duration.days)} ${duration.days === -1 ? "day" : "days"}` : "";
        whenWasWillBe += ` (${Math.abs(duration.years)} ${duration.years === -1 ? "year" : "years"}${inMonths}${inDays})`;
    }

    return whenWasWillBe;
};

export default defineDayBlockWord;
