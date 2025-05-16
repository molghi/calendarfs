import styled from "styled-components";

export const StyledContainer = styled.div`
    max-width: 1170px;
    margin: 0 auto;
    width: 100%;
    position: relative;

    /* MEDIA QUERIES */

    @media (max-width: 1182px) {
        max-width: 970px;
    }

    @media (max-width: 992px) {
        max-width: 750px;
    }

    @media (max-width: 768px) {
        max-width: none;
        padding: 0 10px;
    }
`;
