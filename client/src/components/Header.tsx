import { StyledContainer } from "./styled/Container.styled";
import { StyledHeader } from "./styled/Header.styled";

const Header = () => {
    return (
        <div className="header">
            <StyledContainer>
                <StyledHeader>
                    <h1>Calendar</h1>
                </StyledHeader>
            </StyledContainer>
        </div>
    );
};

export default Header;
