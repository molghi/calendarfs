import styled from "styled-components";

// ================================================================================================

export const StyledRoutineInner = styled.div`
    margin-top: 40px;
    padding-bottom: 20px;
`;

// ================================================================================================

export const StyledRoutineTitle = styled.div`
    font-size: 24px;
    text-shadow: 0 0 2px var(--accent);
    margin-bottom: 10px;

    @media (max-width: 480px) {
        font-size: 23px;
        margin-bottom: 5px;
    }
`;

// ================================================================================================

export const StyledRoutineList = styled.ol`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 10px;
    padding-left: 25px;

    @media (max-width: 768px) {
        /* padding-left: 30px; */
    }

    @media (max-width: 480px) {
        padding-left: 20px;
        font-size: 12px;
        max-width: 100%;
    }
`;

// ================================================================================================

export const StyledRoutineListItem = styled.li`
    span:first-child {
        cursor: default;
        padding: 0 3px;

        &:hover {
            background-color: var(--accent);
            color: var(--bg);
            box-shadow: 0 0 10px var(--accent);
        }
    }
`;
