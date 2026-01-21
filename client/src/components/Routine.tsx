import { StyledRoutineListItem } from "./styled/Routines.styled";
import { Dispatch, SetStateAction } from "react";

// Type declaration
interface RoutineItem {
    date: string;
    description: string;
    title: string;
    added: string;
    category: string;
}
interface RoutineProps {
    routineArr: RoutineItem[];
    currentMonthNumber: number;
    currentYear: number;
    setRoutinesHighlighted: Dispatch<SetStateAction<string[]>>;
}

const Routine = ({ routineArr, currentMonthNumber, currentYear, setRoutinesHighlighted }: RoutineProps) => {
    const daysInCurrentMonth: number = new Date(currentYear, currentMonthNumber, 1 - 1).getDate(); // Amount of days in the current month

    const capitalise = (value: string): string =>
        value
            .split(" ")
            .map((val: string) => val.trim()[0].toUpperCase() + val.trim().slice(1).toLowerCase())
            .join(" ")
            .trim();

    return (
        <StyledRoutineListItem>
            <span
                style={{ fontWeight: 900 }}
                onMouseEnter={() => setRoutinesHighlighted(routineArr.map((x) => x.date))}
                onMouseLeave={() => setRoutinesHighlighted([])}
            >
                {capitalise(routineArr[0].category)}
            </span>{" "}
            —{" "}
            <span>
                <i>{`${routineArr.length} out of ${daysInCurrentMonth} days`}</i>
                <i>
                    ({((routineArr.length / daysInCurrentMonth) * 100).toFixed()}
                    %)
                </i>
            </span>
        </StyledRoutineListItem>
    );
};

export default Routine;
