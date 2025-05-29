import { StyledContainer } from "./styled/Container.styled";
import Routine from "./Routine";
import { StyledRoutineInner, StyledRoutineTitle, StyledRoutineList, StyledRoutineMessage } from "./styled/Routines.styled";
import { useContext } from "react";
// import { Occurrence } from "../context/MyContext";
import MyContext from "../context/MyContext";

const Routines = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("Error using Context"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    const { occurrences, currentMonthNumber, currentYear, setRoutinesHighlighted } = context; // Pull out from context

    // Get all occurrences that happened this month
    const occurrencesThisMonth: any[] = occurrences.filter((occ) => +occ.date.split("/")[1] === currentMonthNumber);

    // Get just their types (categories) as a set, minus those that have no category specified
    const occurrencesTypes: Array<string | undefined> = [
        ...new Set(occurrencesThisMonth.map((occ) => occ?.category?.toLowerCase().trim())),
    ].filter((cat) => cat !== "");

    // Define props type for occurrence object
    interface Occurrence {
        date: string;
        description: string;
        title: string;
        added: string;
        category: string;
    }

    // Count how many times each occ type was repeated
    const occurrencesTimesOccurred: { [key: string]: Occurrence[] } = {};
    occurrencesTypes.forEach((occType: string | undefined) => {
        const occsArray = occurrencesThisMonth.filter((occ) => occ?.category?.toLowerCase().trim() === occType);
        if (occsArray.length < 2) return; // if wasn't repeated at least twice, set nothing
        if (!occType) return; // Null check
        else occurrencesTimesOccurred[occType] = occsArray;
    });

    return (
        <div className="routines">
            <StyledContainer>
                <StyledRoutineInner>
                    {/* BLOCK TITLE */}
                    <StyledRoutineTitle>Routines This Month:</StyledRoutineTitle>

                    {/* ROUTINE ELEMENTS OR 'NO ROUTINES' MESSAGE */}
                    {Object.keys(occurrencesTimesOccurred).length > 0 ? (
                        <StyledRoutineList>
                            {Object.values(occurrencesTimesOccurred)
                                .sort((a, b) => b.length - a.length)
                                .map((routine, index) => (
                                    <Routine
                                        key={index}
                                        routineArr={routine}
                                        currentMonthNumber={currentMonthNumber}
                                        currentYear={currentYear}
                                        setRoutinesHighlighted={setRoutinesHighlighted}
                                    />
                                ))}
                        </StyledRoutineList>
                    ) : (
                        <StyledRoutineMessage>
                            Repeated activities (occurrences with set categories) will appear here
                        </StyledRoutineMessage>
                    )}
                </StyledRoutineInner>
            </StyledContainer>
        </div>
    );
};

export default Routines;
