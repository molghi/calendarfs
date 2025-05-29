import { Event, Occurrence } from "../context/MyContext";

interface CalendarDataObject {
    events: Event[];
    occurrences: Occurrence[];
}

interface importJsonTypes {
    event: React.ChangeEvent<HTMLInputElement>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    importerEl: React.RefObject<HTMLInputElement>;
    events: Event[];
    occurrences: Occurrence[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    setOccurrences: React.Dispatch<React.SetStateAction<Occurrence[]>>;
    localStorageEventsKey: string;
    localStorageOccurrencesKey: string;
}

function importJson({
    event,
    setMessage,
    importerEl,
    events,
    occurrences,
    setEvents,
    setOccurrences,
    localStorageEventsKey,
    localStorageOccurrencesKey,
}: importJsonTypes): void {
    let file = null;

    if (event.target.files && event.target.files.length > 0) file = event.target.files[0]; // Get the file

    if (!file) return; // Ensure there's a file selected

    const reader = new FileReader(); // Create FileReader instance

    reader.onload = (e) => {
        try {
            if (!e || !e.target) return; // Null check
            if (typeof e.target.result !== "string") return; // Type check
            const jsonData: CalendarDataObject = JSON.parse(e.target.result); // Parse the JSON content
            const isValidInput: boolean = checkValidInput(jsonData);

            if (!isValidInput) {
                return setMessage(
                    `error Invalid JSON! Check the formatting: you can import JSON formatted the same as what you can export.`
                );
            }

            // Update state
            addFromImported(
                jsonData,
                events,
                occurrences,
                setEvents,
                setOccurrences,
                localStorageEventsKey,
                localStorageOccurrencesKey
            );

            setMessage("success Import successful!");
        } catch (err) {
            console.error("Invalid input file", err);
            setMessage(
                `error Invalid input file! You can import only JSON and it must be formatted the same as what you can export.`
            );
            return null;
        } finally {
            if (importerEl.current) importerEl.current.value = ""; // Reset the file input value to be able to import again without problems
        }
    };

    reader.readAsText(file); // Read the file as text
}

// ================================================================================================

// Dependency of 'importJson' -- Validate the input/imported thing -- Make sure it's formatted the way I allow it
function checkValidInput(data: CalendarDataObject): boolean {
    let passed: boolean = true;

    if (typeof data !== `object`) return (passed = false);

    if (!data.hasOwnProperty("events")) return (passed = false);
    if (!data.hasOwnProperty("occurrences")) return (passed = false);

    if (!Array.isArray(data.events)) return (passed = false);
    if (!Array.isArray(data.occurrences)) return (passed = false);

    if (data.events.length > 0) {
        data.events.forEach((eventObj) => {
            if (!eventObj.hasOwnProperty("added")) return (passed = false);
            if (!eventObj.hasOwnProperty("date")) return (passed = false);
            if (!eventObj.hasOwnProperty("description")) return (passed = false);
            if (!eventObj.hasOwnProperty("time")) return (passed = false);
            if (!eventObj.hasOwnProperty("title")) return (passed = false);

            [eventObj.added, eventObj.date, eventObj.description, eventObj.time, eventObj.title].forEach((prop) =>
                typeof prop !== "string" ? (passed = false) : (passed = true)
            );
        });
    }

    if (data.occurrences.length > 0) {
        data.occurrences.forEach((occObj) => {
            if (!occObj.hasOwnProperty("added")) return (passed = false);
            if (!occObj.hasOwnProperty("category")) return (passed = false);
            if (!occObj.hasOwnProperty("date")) return (passed = false);
            if (!occObj.hasOwnProperty("description")) return (passed = false);
            if (!occObj.hasOwnProperty("title")) return (passed = false);

            [occObj.added, occObj.date, occObj.description, occObj.category, occObj.title].forEach((prop) =>
                typeof prop !== "string" ? (passed = false) : (passed = true)
            );
        });
    }

    return passed;
}

// ================================================================================================

// Dependency of 'importJson' --- Import was successful, now add to the state
function addFromImported(
    data: CalendarDataObject,
    stateEvents: Event[],
    stateOccurrences: Occurrence[],
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
    setOccurrences: React.Dispatch<React.SetStateAction<Occurrence[]>>,
    localStorageEventsKey: string,
    localStorageOccurrencesKey: string
): void {
    const { events: importedEvents, occurrences: importedOccs } = data; // Destructure

    const stateEventsAddedDates = stateEvents.map((obj) => obj.added); // Get the array of only date ISO strings of all events
    const stateOccsAddedDates = stateOccurrences.map((obj) => obj.added);

    // UPDATE EVENTS
    if (importedEvents.length > 0) {
        const stateEventsCopy = JSON.parse(JSON.stringify(stateEvents));
        importedEvents.forEach((importedEventObj) => {
            if (stateEventsAddedDates.includes(importedEventObj.added)) {
                // means state already has this event, so I update it --> update what can be changed
                const indexInState: number = stateEventsCopy.findIndex(
                    (eventObj: Event) => eventObj.added === importedEventObj.added
                );
                stateEventsCopy[indexInState].date = importedEventObj.date;
                stateEventsCopy[indexInState].description = importedEventObj.description;
                stateEventsCopy[indexInState].time = importedEventObj.time;
                stateEventsCopy[indexInState].title = importedEventObj.title;
            } else {
                // means state doesn't have this event, so I just push it
                stateEventsCopy.push(importedEventObj);
            }
        });
        // Change state events
        setEvents((prev) => {
            if (prev.length === 0) {
                localStorage.setItem(localStorageEventsKey, JSON.stringify([...stateEventsCopy]));
                return [...stateEventsCopy];
            }
            const stateEventIds: number[] = stateEventsCopy.map((x: Event) => x.id);
            const newEvents = prev.map((evObj) => {
                if (evObj.id && stateEventIds.includes(evObj.id)) {
                    const stateEv = stateEventsCopy.find((x: Event) => x.id === evObj.id);
                    return {
                        ...evObj,
                        date: stateEv.date,
                        description: stateEv.description,
                        time: stateEv.time,
                        title: stateEv.title,
                    };
                } else return evObj;
            });
            localStorage.setItem(localStorageEventsKey, JSON.stringify(newEvents)); // Register to local storage
            return newEvents;
        });
    }

    // UPDATE OCCURRENCES
    if (importedOccs.length > 0) {
        const stateOccurrencesCopy = JSON.parse(JSON.stringify(stateOccurrences));
        importedOccs.forEach((importedOccObj) => {
            if (stateOccsAddedDates.includes(importedOccObj.added)) {
                // means state already has this occurrence, so I update it --> update what can be changed
                const indexInState: number = stateOccurrencesCopy.findIndex(
                    (occObj: Occurrence) => occObj.added === importedOccObj.added
                );
                stateOccurrencesCopy[indexInState].date = importedOccObj.date;
                stateOccurrencesCopy[indexInState].description = importedOccObj.description;
                stateOccurrencesCopy[indexInState].category = importedOccObj.category;
                stateOccurrencesCopy[indexInState].title = importedOccObj.title;
            } else {
                // means state doesn't have this occurrence, so I just push it
                stateOccurrencesCopy.push(importedOccObj);
            }
        });
        // Change state occurrences
        setOccurrences((prev) => {
            if (prev.length === 0) {
                localStorage.setItem(localStorageOccurrencesKey, JSON.stringify([...stateOccurrencesCopy]));
                return [...stateOccurrencesCopy];
            }
            const stateOccsIds: number[] = stateOccurrencesCopy.map((x: Occurrence) => x.id);
            const newOccurrences = prev.map((occObj) => {
                if (occObj.id && stateOccsIds.includes(occObj.id)) {
                    const stateOcc = stateOccurrencesCopy.find((x: Occurrence) => x.id === occObj.id);
                    return {
                        ...occObj,
                        date: stateOcc.date,
                        description: stateOcc.description,
                        category: stateOcc.category,
                        title: stateOcc.title,
                    };
                } else return occObj;
            });
            localStorage.setItem(localStorageOccurrencesKey, JSON.stringify(newOccurrences));
            return newOccurrences;
        });
    }
}

// ================================================================================================

export default importJson;
