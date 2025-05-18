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
import Form from "./components/Form";
import { StyledRoutineMessage } from "./components/styled/Routines.styled";

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
    const { dayBlockShown, changeMonth, mode, message, setMessage, localStorageAccentColorKey } = context;

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
        // Hotkeys: left/right arrows change months
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") changeMonth("prev");
            if (event.key === "ArrowRight") changeMonth("next");
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    useEffect(() => {
        // Hide message after some time
        if (message) {
            const messageType = message.split(" ")[0];
            const timer = setTimeout(
                () => {
                    setMessage("");
                },
                messageType === "error" ? 10000 : 5000
            );
            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        // Check accent color
        const fromLS = localStorage.getItem(localStorageAccentColorKey);
        if (fromLS) {
            document.documentElement.style.setProperty("--accent", fromLS);
        }
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
                                {!dayBlockShown && !mode && <Events />}
                                {dayBlockShown && !mode && <DayBlock />}
                                {mode && <Form />}
                                {message && (
                                    <div
                                        style={{
                                            position: "fixed",
                                            bottom: "20px",
                                            right: "20px",
                                            backgroundColor: "black",
                                            marginTop: "20px",
                                            padding: "20px",
                                            fontSize: "2rem",
                                            border: "1px solid",
                                            color: message.split(" ")[0] === "error" ? "red" : "lime",
                                            borderColor: message.split(" ")[0] === "error" ? "red" : "lime",
                                        }}
                                    >
                                        {message.slice(message.indexOf(" "))}
                                    </div>
                                )}
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
