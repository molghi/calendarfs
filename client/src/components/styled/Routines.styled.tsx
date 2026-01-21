import styled from "styled-components";

// ================================================================================================

export const StyledRoutineInner = styled.div`
    margin-top: 4rem;
    padding-bottom: 2rem;
`;

// ================================================================================================

export const StyledRoutineTitle = styled.div`
    font-size: 2.4rem;
    text-shadow: 0 0 2px var(--accent);
    margin-bottom: 1rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 2.3rem;
        margin-bottom: 0.5rem;
    }
`;

// ================================================================================================

export const StyledRoutineList = styled.ol`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding: 1rem;
    padding-left: 2.5rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        /* padding-left: 30px; */
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding-left: 2rem;
        font-size: 1.2rem;
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
            box-shadow: 0 0 1rem var(--accent);
            border-radius: 5px;
        }
    }

    i:first-child {
        opacity: 0.65;
        transition: all 0.3s;
        &:hover {
            opacity: 1;
        }
    }

    i:last-child {
        font-style: normal;
        margin-left: 10px;
        color: white;
        opacity: 0.3;
        transition: all 0.3s;
        &:hover {
            opacity: 1;
        }
    }
`;

// ================================================================================================

export const StyledRoutineMessage = styled.div`
    margin-top: 2rem;
    // font-size: 1.4rem;
    font-size: 1.45rem;
    font-style: italic;
    opacity: 0.5;
    transition: all 0.2s;

    &:hover {
        opacity: 1;
    }
`;
