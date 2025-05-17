import { StyledContainer } from "./styled/Container.styled";
import Routine from "./Routine";
import { StyledRoutineInner, StyledRoutineTitle, StyledRoutineList, StyledRoutineMessage } from "./styled/Routines.styled";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const Routines = () => {
    // Bring in my context
    const context = useContext(MyContext);

    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");

    // Pull out from context
    const { occurrences, currentMonthNumber, currentYear, setRoutinesHighlighted } = context;

    // Get all occurrences that happened this month
    const occurrencesThisMonth = occurrences.filter((occ) => +occ.date.split("/")[1] === currentMonthNumber);

    // Get just their types (categories) as a set, minus those that have no category specified
    const occurrencesTypes = [...new Set(occurrencesThisMonth.map((occ) => occ.category.toLowerCase().trim()))].filter(
        (cat) => cat !== ""
    );

    // Count how many times each type repeated
    // Define props type for occurrence object
    interface Occurrence {
        date: string;
        description: string;
        title: string;
        added: string;
        category: string;
    }
    const occurrencesTimesOccurred: { [key: string]: Occurrence[] } = {};
    occurrencesTypes.forEach((occType) => {
        const occsArray = occurrencesThisMonth.filter((occ) => occ.category.toLowerCase().trim() === occType);
        if (occsArray.length < 2) return; // if wasn't repeated at least twice, set nothing
        else occurrencesTimesOccurred[occType] = occsArray;
    });

    return (
        <div className="routines">
            <StyledContainer>
                <StyledRoutineInner>
                    <StyledRoutineTitle>Routines This Month:</StyledRoutineTitle>

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
