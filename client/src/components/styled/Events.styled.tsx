import styled from "styled-components";

// ================================================================================================

export const StyledRightColumn = styled.div`
    max-height: 84vh;
    overflow-x: hidden;
    position: relative;
    min-height: 66rem;
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
    column-gap: 2rem;
    row-gap: 1rem;
    background-color: var(--bg);
    position: sticky;
    z-index: 10;
    padding-bottom: 2rem;
    top: 0;
    left: 0;
    right: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
        flex-wrap: wrap;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        flex-direction: column;
        align-items: start;
    }
`;

// ================================================================================================

export const StyledEvOccTitle = styled.div`
    font-size: 2.4rem;
    text-shadow: 0 0 2px var(--accent);
    position: relative;
    display: inline-block;

    span {
        font-size: 1.4rem;
        position: absolute;
        top: 0px;
        right: -3.2rem;
        background-color: var(--accent);
        color: var(--bg);
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
        /* font-size: 20px; */
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 2rem;
    }
`;

// ================================================================================================

export const StyledEvOccSwitch = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.5rem;

    button {
        background-color: var(--bg);
        font-size: 1.4rem;
        padding: 0.5rem 0.7rem;
        cursor: pointer;
        transition: box-shadow 0.3s;

        &:first-child {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }

        &:last-child {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-left: none;
        }

        &:hover {
            background-color: var(--accent);
            opacity: 0.7;
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
    row-gap: 1.5rem;
    // padding-right: 0.7rem;
    padding-right: 1.2rem;
    height: 100%;
`;

// ================================================================================================

export const StyledEvOccItem = styled.div`
    padding: 1rem 1.5rem;
    // background-color: #151515;
    background-color: #222;
    position: relative;
    border-radius: 7px;
    transition: all 0.3s;

    &:hover {
        background-color: #333;

        .btns {
            opacity: 0.5;
            visibility: visible;
        }
    }
`;

// ================================================================================================

export const StyledEvOccItemBtns = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    column-gap: 0.7rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;
`;

// ================================================================================================

export const StyledEvOccItemBtn = styled.button`
    padding: 0;
    border: none;
    transition: none;
    transition: all 0.2s;

    svg {
        width: 1.5rem;
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
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    column-gap: 2rem;
    transition: all 0.2s;

    div {
        flex: 1 1 50%;
    }

    span {
        transition: all 0.2s;
    }

    span:hover {
        opacity: 1 !important;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        align-items: start;
        row-gap: 0.5rem;
        margin-bottom: 0;
    }
`;

// ================================================================================================

export const StyledEvOccItemTitle = styled.div`
    font-size: 1.9rem;
    max-height: 4.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* Limit to 2 lines */

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.4rem;
    }
`;

// ================================================================================================

export const StyledEvOccItemMinorTitle = styled.span`
    opacity: 0.3;
    color: white;
    font-size: 1.6rem;
    font-style: italic;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.4rem;
    }
`;

// ================================================================================================

export const StyledEvOccItemDescription = styled.span`
    line-height: 1.25;
    font-size: 1.4rem;
    max-height: 9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5; /* Limit to 5 lines */
`;
