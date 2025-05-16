import styled from "styled-components";

// ================================================================================================

export const StyledRightColumn = styled.div`
    max-height: 84vh;
    overflow-x: hidden;
    position: relative;
    min-height: 660px;
`;

// ================================================================================================

// .ev-occ
export const StyledEvOcc = styled.div`
    position: relative;
    height: 100%;
`;

// ================================================================================================

// .ev-occ__box
export const StyledEvOccBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
    row-gap: 10px;
    background-color: var(--bg);
    position: sticky;
    z-index: 10;
    padding-bottom: 20px;
    top: 0;
    left: 0;
    right: 0;

    @media (max-width: 1182px) {
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: start;
    }
`;

// ================================================================================================

export const StyledEvOccTitle = styled.div`
    font-size: 24px;
    text-shadow: 0 0 2px var(--accent);
    position: relative;
    display: inline-block;

    span {
        font-size: 14px;
        position: absolute;
        top: 0px;
        right: -32px;
        background-color: var(--accent);
        color: var(--bg);
        height: 25px;
        width: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 1182px) {
        /* font-size: 20px; */
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

// ================================================================================================

export const StyledEvOccSwitch = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px;

    button {
        background-color: var(--bg);
        font-size: 14px;
        padding: 5px 7px;
        cursor: pointer;
        transition: box-shadow 0.3s;

        &:last-child {
            border-left: none;
        }

        &:hover {
            background-color: var(--accent);
        }

        &.active {
            background-color: var(--accent);
            color: var(--bg);
        }
    }
`;

// ================================================================================================

export const StyledEvOccItems = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    padding-right: 7px;
    height: 100%;
`;

// ================================================================================================

export const StyledEvOccItem = styled.div`
    padding: 10px 15px;
    background-color: #151515;
    position: relative;

    &:hover {
        background-color: #222;

        .btns {
            opacity: 0.5;
            visibility: visible;
        }
    }
`;

// ================================================================================================

export const StyledEvOccItemBtns = styled.div`
    position: absolute;
    top: 1px;
    right: 1px;
    display: flex;
    column-gap: 7px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;
`;

// ================================================================================================

export const StyledEvOccItemBtn = styled.button`
    padding: 0;
    border: none;
    transition: none;

    svg {
        width: 15px;
        path {
            fill: var(--accent);
        }
    }

    &:hover {
        opacity: 0.5;
        box-shadow: none;
        background-color: transparent;
        color: var(--accent);
    }

    &:active {
        opacity: 0.3;
    }
`;

// ================================================================================================

export const StyledEvOccItemRow = styled.div`
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    column-gap: 20px;

    div {
        flex: 1 1 50%;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: start;
        row-gap: 5px;
        margin-bottom: 0;
    }
`;

// ================================================================================================

export const StyledEvOccItemTitle = styled.div`
    font-size: 19px;
    max-height: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* Limit to 2 lines */

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

// ================================================================================================

export const StyledEvOccItemMinorTitle = styled.span`
    opacity: 0.5;
    font-size: 16px;

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

// ================================================================================================

export const StyledEvOccItemDescription = styled.span`
    line-height: 1.25;
    font-size: 14px;
    max-height: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5; /* Limit to 5 lines */
`;
