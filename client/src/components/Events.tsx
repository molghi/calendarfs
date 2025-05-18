import { useContext } from "react";
import MyContext from "../context/MyContext";
import Event from "./Event";
import {
    StyledRightColumn,
    StyledEvOcc,
    StyledEvOccBox,
    StyledEvOccTitle,
    StyledEvOccSwitch,
    StyledEvOccItems,
} from "./styled/Events.styled";

const Events = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const {
        events,
        occurrences,
        currentYear,
        currentMonthNumber,
        setEventsActiveBlock,
        eventsActiveBlock,
        setDayHighlighted,
        deleteOne,
        setMode,
        setThingToEdit,
    } = context;

    // Btns
    const switcher = [
        { name: "Events", description: "Scheduled and specific activities" },
        { name: "Occurrences", description: "General things that happened, activities or notes" },
    ];

    // Get events and occurrences this month
    const eventsThisMonth = events
        .filter((ev) => +ev.date.split("/")[1] === currentMonthNumber && +ev.date.split("/")[2] === currentYear)
        .sort((a, b) => +a.date.split("/")[0] - +b.date.split("/")[0]);
    const occurrencesThisMonth = occurrences
        .filter((occ) => +occ.date.split("/")[1] === currentMonthNumber && +occ.date.split("/")[2] === currentYear)
        .sort((a, b) => +a.date.split("/")[0] - +b.date.split("/")[0]);

    // Block to show is either events or occurrences
    const blockToShow = eventsActiveBlock === 0 ? eventsThisMonth : occurrencesThisMonth;

    return (
        <StyledRightColumn>
            <StyledEvOcc>
                {/* HEADER */}
                <StyledEvOccBox>
                    {/* TITLE */}
                    <StyledEvOccTitle>
                        {eventsActiveBlock === 0 ? "Events" : "Occurrences"} This Month
                        <span title="4 events this month">{blockToShow.length}</span>
                    </StyledEvOccTitle>
                    {/* BUTTONS */}
                    <StyledEvOccSwitch>
                        {switcher.map((btn, i) => (
                            <button
                                onClick={() => setEventsActiveBlock(i)}
                                key={i}
                                title={btn.description}
                                className={`${i === eventsActiveBlock ? "active" : ""}`}
                            >
                                {btn.name}
                            </button>
                        ))}
                    </StyledEvOccSwitch>
                </StyledEvOccBox>

                {/* ITEMS */}
                <StyledEvOccItems>
                    {blockToShow && blockToShow.length > 0 ? (
                        blockToShow.map((item, i) => (
                            <Event
                                key={i}
                                item={item}
                                setDayHighlighted={setDayHighlighted}
                                deleteOne={deleteOne}
                                setMode={setMode}
                                setThingToEdit={setThingToEdit}
                            />
                        ))
                    ) : (
                        <div>
                            No entries yet...
                            <br />
                            <br />
                            Click on a day to add one
                        </div>
                    )}
                </StyledEvOccItems>
            </StyledEvOcc>
        </StyledRightColumn>
    );
};

export default Events;
