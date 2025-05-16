import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import Routines from "./components/Routines";
import BottomActions from "./components/BottomActions";
import { GlobalStyles } from "./components/styled/GlobalStyles"; // initial styling
import { StyledContainer } from "./components/styled/Container.styled";

function App() {
    return (
        <>
            <GlobalStyles />
            <Header />
            <div className="app">
                <StyledContainer>
                    <div className="app__inner">
                        <div className="app__col">
                            <Calendar />
                            <Routines />
                        </div>
                        <div className="app__col">
                            <Events />
                        </div>
                    </div>
                </StyledContainer>
            </div>
            <BottomActions />
        </>
    );
}

export default App;
