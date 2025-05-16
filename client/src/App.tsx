import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Events from "./components/Events";
import Routines from "./components/Routines";
import BottomActions from "./components/BottomActions";
import { GlobalStyles } from "./components/styled/GlobalStyles"; // initial styling

function App() {
    return (
        <>
            <GlobalStyles />
            <Header />
            <Calendar />
            <Events />
            <Routines />
            <BottomActions />
        </>
    );
}

export default App;
