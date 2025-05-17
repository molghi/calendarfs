import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import testData from "../../calendar-test-data.json";

// Define context value type
interface MyContextType {
    currentYear: number;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    currentMonthNumber: number;
    setCurrentMonthNumber: Dispatch<SetStateAction<number>>;
    currentMonthWord: string;
    currentSeason: string;
    changeMonth(flag: string): void;
    showingNow: boolean;
    backToNow(): void;
    events: Event[];
    setEvents: Dispatch<SetStateAction<Event[]>>;
    occurrences: Occurrence[];
    setOccurrences: Dispatch<SetStateAction<Occurrence[]>>;
    routinesHighlighted: string[];
    setRoutinesHighlighted: Dispatch<SetStateAction<string[]>>;
    dayHighlighted: string;
    setDayHighlighted: Dispatch<SetStateAction<string>>;
    eventsActiveBlock: number;
    setEventsActiveBlock: Dispatch<SetStateAction<number>>;
    dayBlockShown: string;
    setDayBlockShown: Dispatch<SetStateAction<string>>;
}

// Provide default value to createContext
const MyContext = createContext<MyContextType | undefined>(undefined);

// Define props type for context provider
interface ContextProviderProps {
    children: ReactNode;
}

// Define props type for event object
interface Event {
    date: string;
    description: string;
    title: string;
    added: string;
    time: string;
}

// Define props type for occurrence object
interface Occurrence {
    date: string;
    description: string;
    title: string;
    added: string;
    category: string;
}

// Context
export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [events, setEvents] = useState<Event[]>(testData.events); // All events
    const [occurrences, setOccurrences] = useState<Occurrence[]>(testData.occurrences); // All occurrences
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [currentMonthNumber, setCurrentMonthNumber] = useState<number>(new Date().getMonth() + 1); // Not zero-based
    const [routinesHighlighted, setRoutinesHighlighted] = useState<string[]>([]);
    const [dayHighlighted, setDayHighlighted] = useState<string>("");
    const [eventsActiveBlock, setEventsActiveBlock] = useState<number>(0); // 0 means Events, 1 means Occurrences
    const [dayBlockShown, setDayBlockShown] = useState<string>(""); // day to show in DayBlock.tsx

    const currentMonthWord: string = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" })
        .format(new Date(currentYear, currentMonthNumber - 1, 1))
        .split(" ")[2]; // Get how this month is called

    // Define season
    let currentSeason: string;
    if (currentMonthNumber >= 3 && currentMonthNumber <= 5) currentSeason = "Spring";
    else if (currentMonthNumber >= 6 && currentMonthNumber <= 8) currentSeason = "Summer";
    else if (currentMonthNumber >= 9 && currentMonthNumber <= 11) currentSeason = "Autumn";
    else currentSeason = "Winter";

    // Change month on clicking calendar btns
    function changeMonth(flag: string): void {
        // Increment month
        if (flag === "next") {
            setCurrentMonthNumber((prev) => {
                if (prev === 12) {
                    setCurrentYear((prev) => prev + 1);
                    return 1;
                } else return prev + 1;
            });
        }
        // Decrement month
        if (flag === "prev") {
            setCurrentMonthNumber((prev) => {
                if (prev === 1) {
                    setCurrentYear((prev) => prev - 1);
                    return 12;
                } else return prev - 1;
            });
        }
    }

    const nowYear: number = new Date().getFullYear(); // What is
    const nowMonth: number = new Date().getMonth() + 1; // What is
    const showingNow: boolean = currentYear === nowYear && currentMonthNumber === nowMonth; // Showing what now is?

    // Throw back to now-month, now-year
    function backToNow(): void {
        setCurrentYear(nowYear);
        setCurrentMonthNumber(nowMonth);
    }

    return (
        <MyContext.Provider
            value={{
                currentYear,
                setCurrentYear,
                currentMonthNumber,
                setCurrentMonthNumber,
                currentMonthWord,
                currentSeason,
                changeMonth,
                showingNow,
                backToNow,
                events,
                setEvents,
                occurrences,
                setOccurrences,
                routinesHighlighted,
                setRoutinesHighlighted,
                eventsActiveBlock,
                setEventsActiveBlock,
                dayHighlighted,
                setDayHighlighted,
                dayBlockShown,
                setDayBlockShown,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
