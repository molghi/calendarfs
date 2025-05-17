import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import Routines from "./components/Routines";
import BottomActions from "./components/BottomActions";
import { GlobalStyles } from "./components/styled/GlobalStyles"; // initial styling
import { StyledContainer } from "./components/styled/Container.styled";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { useContext } from "react";
import MyContext from "./context/MyContext";
import DayBlock from "./components/DayBlock";

// Styled Components Theme
const theme = {
    accentColor: "rgb(56, 101, 140)",
    contentWidth: "1170px",
    breakpoints: {
        wide: "1182px",
        laptop: "992px",
        tablet: "768px",
        smallish: "620px",
        mobile: "480px",
    },
};

function App() {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { dayBlockShown, changeMonth } = context;

    useEffect(() => {
        // Update document title every 60 secs
        const updateTitle = () => {
            const now = new Date();
            const day = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear().toString().slice(-2);
            document.title = `🛠 Calendar — ${day}/${month}/${year}`;
        };
        updateTitle();
        const timer = setInterval(updateTitle, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Hotkeys
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") changeMonth("prev");
            if (event.key === "ArrowRight") changeMonth("next");
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
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
                                {!dayBlockShown && <Events />}
                                {dayBlockShown && <DayBlock />}
                            </div>
                        </div>
                    </StyledContainer>
                </div>
                <BottomActions />
            </ThemeProvider>
        </>
    );
}

export default App;
