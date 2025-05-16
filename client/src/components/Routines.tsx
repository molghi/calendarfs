import { StyledContainer } from "./styled/Container.styled";
import Routine from "./Routine";
import { StyledRoutineInner, StyledRoutineTitle, StyledRoutineList } from "./styled/Routines.styled";

const Routines = () => {
    const routines = [
        { name: "Power Workout", frequency: "10 out of 31 days", percentage: "45%" },
        { name: "Running", frequency: "5 out of 31 days", percentage: "20%" },
        { name: "Studying Martian", frequency: "3 out of 31 days", percentage: "5%" },
    ];
    return (
        <div className="routines">
            <StyledContainer>
                <StyledRoutineInner>
                    <StyledRoutineTitle>Routines This Month:</StyledRoutineTitle>

                    <StyledRoutineList>
                        {routines.map((routine, index) => (
                            <Routine key={index} routine={routine} />
                        ))}
                    </StyledRoutineList>
                </StyledRoutineInner>
            </StyledContainer>
        </div>
    );
};

export default Routines;
