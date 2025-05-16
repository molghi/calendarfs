// Type declaration
interface CalendarDayProps {
    type: string;
    day: any;
}

const CalendarDay = ({ type, day }: CalendarDayProps) => {
    let result = <div className="calendar__day"></div>;
    if (type === "weekday") result = <div className="calendar__day calendar__day--name">{day}</div>;
    return result;
};

export default CalendarDay;
