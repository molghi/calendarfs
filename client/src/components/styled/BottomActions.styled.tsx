import styled from "styled-components";

// ================================================================================================

export const StyledActions = styled.div`
    position: fixed;
    bottom: 0.8rem;
    left: 0.8rem;
    color: var(--accent);

    &:hover {
        opacity: 1;

        .actions-btn {
            opacity: 1;
        }

        .actions-menu {
            opacity: 1;
            visibility: visible;
        }
    }
`;

// ================================================================================================

export const StyledActionsBtn = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background-color: var(--accent);
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.3;

    svg {
        width: 2rem;

        path {
            fill: var(--bg);
        }
    }
`;

// ================================================================================================

export const StyledActionsMenu = styled.div`
    position: absolute;
    bottom: 100%;
    left: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;
    padding-bottom: 0.8rem;
`;

// ================================================================================================

export const StyledActionsAction = styled.div`
    white-space: nowrap;
    background-color: var(--bg);
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.2rem 0.5rem;

    &:hover {
        background-color: var(--accent);
        color: var(--bg);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
        padding: 1rem 1.5rem;
    }
`;
