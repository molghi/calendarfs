import { StyledRoutineListItem } from "./styled/Routines.styled";

// Type declaration
interface RoutineProps {
    routine: {
        name: string;
        frequency: string;
        percentage: string;
    };
}

const Routine = ({ routine }: RoutineProps) => {
    return (
        <StyledRoutineListItem>
            <span>{routine.name}</span> —{" "}
            <span>
                {routine.frequency} ({routine.percentage})
            </span>
        </StyledRoutineListItem>
    );
};

export default Routine;
