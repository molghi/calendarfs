import styled from "styled-components";

export const StyledContainer = styled.div`
    max-width: ${({ theme }) => theme.contentWidth};
    margin: 0 auto;
    width: 100%;
    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
        max-width: 97rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
        max-width: 75rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        max-width: none;
        padding: 0 1rem;
    }
`;
