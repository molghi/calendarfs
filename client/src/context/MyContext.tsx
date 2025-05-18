import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import testData from "../../calendar-test-data.json";

// Define props type for event object
export interface Event {
    added: string;
    date: string;
    description: string;
    title: string;
    time?: string; // Varying input
    id?: number;
}

// Define props type for occurrence object
export interface Occurrence {
    added: string;
    date: string;
    description: string;
    title: string;
    category?: string; // Varying input
    id?: number;
}

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
    deleteOne(itemIdentifier: string, itemType: string): void;
    mode: string;
    setMode: Dispatch<SetStateAction<string>>;
    dayClicked: string;
    setDayClicked: Dispatch<SetStateAction<string>>;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    addOne(itemObj: Event | Occurrence, itemType: string): void;
    thingToEdit: Event | Occurrence | null;
    setThingToEdit: Dispatch<SetStateAction<Event | Occurrence | null>>;
    editOne(itemObj: Event | Occurrence, itemType: string): void;
    accentColor: string;
    setAccentColor: Dispatch<SetStateAction<string>>;
    localStorageEventsKey: string;
    localStorageOccurrencesKey: string;
    localStorageAccentColorKey: string;
}

// Provide default value to createContext
const MyContext = createContext<MyContextType | undefined>(undefined);

// Define props type for context provider
interface ContextProviderProps {
    children: ReactNode;
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
    const [dayBlockShown, setDayBlockShown] = useState<string>(""); // Day to show in DayBlock.tsx
    const [mode, setMode] = useState<string>(""); // Can be either add (show add form), edit (show edit form), or empty string (don't show form)
    const [dayClicked, setDayClicked] = useState<string>(""); // Clicked when adding an event/occurrence
    const [message, setMessage] = useState<string>(""); // Format: "type messageTextContentHere" where type is either 'error' or 'success'
    const [thingToEdit, setThingToEdit] = useState<Event | Occurrence | null>(null); // Holds either one event obj or occurrence obj
    const [accentColor, setAccentColor] = useState<string>("rgb(56, 101, 140)");

    const localStorageEventsKey: string = "calendar_events";
    const localStorageOccurrencesKey: string = "calendar_occurrences";
    const localStorageAccentColorKey: string = "calendar_accent_color";

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

    // Delete one event or occurrence
    function deleteOne(itemIdentifier: string, itemType: string): void {
        const answer = window.confirm(`Are you sure you want to delete this ${itemType}?`);
        if (!answer) return;
        if (itemType === "event") setEvents((prev) => prev.filter((evObj) => evObj.added !== itemIdentifier));
        if (itemType === "occurrence") setOccurrences((prev) => prev.filter((occObj) => occObj.added !== itemIdentifier));
    }

    // Add one event or occurrence
    function addOne(itemObj: Event | Occurrence, itemType: string): void {
        if (itemType === "event") setEvents((prev) => [...prev, itemObj]);
        if (itemType === "occurrence") setOccurrences((prev) => [...prev, itemObj]);
    }

    // Edit one event or occurrence
    function editOne(itemObj: Event | Occurrence, itemType: string): void {
        if (itemType === "event")
            setEvents((prev) =>
                prev.map((evObj) => {
                    if (evObj.id === itemObj.id) {
                        return {
                            ...evObj,
                            date: itemObj.date,
                            description: itemObj.description,
                            // time: itemObj.time,
                            time: (itemObj as Event).time,
                            title: itemObj.title,
                        };
                    } else return evObj;
                })
            );
        if (itemType === "occurrence")
            setOccurrences((prev) =>
                prev.map((occObj) => {
                    if (occObj.id === itemObj.id) {
                        return {
                            ...occObj,
                            date: itemObj.date,
                            description: itemObj.description,
                            // category: itemObj.category,
                            category: (itemObj as Occurrence).category,
                            title: itemObj.title,
                        };
                    } else return occObj;
                })
            );
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
                deleteOne,
                mode,
                setMode,
                dayClicked,
                setDayClicked,
                message,
                setMessage,
                addOne,
                thingToEdit,
                setThingToEdit,
                editOne,
                accentColor,
                setAccentColor,
                localStorageEventsKey,
                localStorageOccurrencesKey,
                localStorageAccentColorKey,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
