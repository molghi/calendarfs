// import "./styled/BottomActions.css";
import { StyledActions, StyledActionsBtn, StyledActionsMenu, StyledActionsAction } from "./styled/BottomActions.styled";
import checkNewColor from "../utils/checkNewColor";
import { useContext, useRef } from "react";
import MyContext from "../context/MyContext";
import exportAsJson from "../utils/exportAsJson";
import importJson from "../utils/importJson";
import { actionsIcon } from "../utils/icons";

const BottomActions = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("Error using Context"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    const {
        localStorageAccentColorKey,
        localStorageEventsKey,
        localStorageOccurrencesKey,
        setMessage,
        events,
        occurrences,
        setEvents,
        setOccurrences,
        weekStart,
        setWeekStart,
        localStorageWeekStartKey,
    } = context; // Pull out from context

    const importerEl = useRef<HTMLInputElement>(null);

    interface Action {
        name: string;
        title: string;
    }

    // Define available actions
    const actions: Array<Action> = [
        { name: "Change color", title: "Change the accent color of the interface" },
        { name: "Export", title: "Export as JSON" },
        { name: "Import", title: "Import as JSON" },
        {
            name: `Start on ${weekStart === "Sun" ? "Mon" : "Sun"}`,
            title: `Change week start to ${weekStart === "Sun" ? "Mon" : "Sun"}day`,
        },
    ];

    // Handle action on click
    const handleAction = (action: string) => {
        if (action === "Change color") {
            const newColor: string | null = prompt(`Enter new interface color`); // Prompt
            if (!newColor || !newColor.trim()) return; // Check
            const checkedColor: string = checkNewColor(newColor); // Return safe color
            localStorage.setItem(localStorageAccentColorKey, checkedColor); // Register to LS
            document.documentElement.style.setProperty("--accent", checkedColor); // Change styles visibly
        }
        if (action === "Export") {
            // Get both from LS
            const eventsFromLS = JSON.parse(localStorage.getItem(localStorageEventsKey) ?? "[]");
            const occurrencesFromLS = JSON.parse(localStorage.getItem(localStorageOccurrencesKey) ?? "[]");
            const finalObj = { events: eventsFromLS, occurrences: occurrencesFromLS }; // Compose final object
            exportAsJson(finalObj); // Export
        }
        if (action === "Import") {
            importerEl.current && importerEl.current.click();
        }
        if (action.startsWith("Start on")) {
            setWeekStart((prev) => {
                const newChoice = prev === "Mon" ? "Sun" : "Mon";
                localStorage.setItem(localStorageWeekStartKey, JSON.stringify(newChoice)); // Register to LS
                return newChoice;
            });
        }
    };

    return (
        <StyledActions className="bottom-actions">
            {/* BTN, ACTIONS ICON */}
            <StyledActionsBtn className="actions-btn">{actionsIcon}</StyledActionsBtn>

            {/* ACTIONS MENU */}
            <StyledActionsMenu className="actions-menu">
                {actions.map((action, i) => (
                    <StyledActionsAction key={i} title={action.title} onClick={() => handleAction(action.name)}>
                        {action.name}
                    </StyledActionsAction>
                ))}
                <input
                    onChange={(e) =>
                        importJson({
                            event: e,
                            setMessage,
                            importerEl,
                            events,
                            occurrences,
                            setEvents,
                            setOccurrences,
                            localStorageEventsKey,
                            localStorageOccurrencesKey,
                        })
                    }
                    ref={importerEl}
                    type="file"
                    style={{ display: "none" }}
                />
            </StyledActionsMenu>
        </StyledActions>
    );
};

export default BottomActions;
