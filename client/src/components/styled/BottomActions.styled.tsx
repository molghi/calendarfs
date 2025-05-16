import styled from "styled-components";

// ================================================================================================

export const StyledActions = styled.div`
    position: fixed;
    bottom: 8px;
    left: 8px;
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
    width: 30px;
    height: 30px;
    background-color: var(--accent);
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.3;

    svg {
        width: 20px;

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
    padding-bottom: 8px;
`;

// ================================================================================================

export const StyledActionsAction = styled.div`
    white-space: nowrap;
    background-color: var(--bg);
    cursor: pointer;
    font-size: 15px;
    padding: 2px 5px;

    &:hover {
        background-color: var(--accent);
        color: var(--bg);
    }

    @media (max-width: 992px) {
        padding: 10px 15px;
    }
`;
