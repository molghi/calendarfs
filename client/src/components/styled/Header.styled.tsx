import styled from "styled-components";

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin-bottom: 40px;

    h1 {
        opacity: 0.5;
        color: var(--accent);
        transition: all 0.3s;
        font-size: 24px;
        line-height: 1;

        &:hover {
            opacity: 1;
        }
    }
`;
