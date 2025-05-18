import { Dispatch, SetStateAction } from "react";
import {
    StyledEvOccItem,
    StyledEvOccItemBtns,
    StyledEvOccItemBtn,
    StyledEvOccItemRow,
    StyledEvOccItemTitle,
    StyledEvOccItemMinorTitle,
    StyledEvOccItemDescription,
} from "./styled/Events.styled";
import { Event as EventInterface, Occurrence } from "../context/MyContext";

// Props Type Declaration
interface EventProps {
    item: {
        date: string;
        description: string;
        title: string;
        added: string;
        time?: string;
        category?: string;
        id?: number;
    };
    setDayHighlighted: Dispatch<SetStateAction<string>>;
    deleteOne(itemIdentifier: string, itemType: string): void;
    setMode: Dispatch<SetStateAction<string>>;
    setThingToEdit: Dispatch<SetStateAction<EventInterface | Occurrence | null>>;
}

const Event = ({ item, setDayHighlighted, deleteOne, setMode, setThingToEdit }: EventProps) => {
    // Identify if it's event or occurrence
    const type: string = item.hasOwnProperty("category") ? "occurrence" : "event";

    const editEvent = () => {
        setMode("edit");
        setThingToEdit(item);
    };

    return (
        <StyledEvOccItem
            onMouseEnter={() => setDayHighlighted(item.date)}
            onMouseLeave={() => setDayHighlighted("")}
            data-date={item.date.split("/").reverse().join(",")}
        >
            {/* BUTTONS */}
            <StyledEvOccItemBtns className="btns">
                {/* EDIT BTN */}
                <StyledEvOccItemBtn onClick={editEvent} title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"></path>
                    </svg>
                </StyledEvOccItemBtn>
                {/* DELETE BTN */}
                <StyledEvOccItemBtn onClick={() => deleteOne(item.added, type)} title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                </StyledEvOccItemBtn>
            </StyledEvOccItemBtns>

            {/* INFO */}
            <StyledEvOccItemRow>
                {/* TITLE */}
                <StyledEvOccItemTitle title={item.title}>{item.title}</StyledEvOccItemTitle>
            </StyledEvOccItemRow>
            <StyledEvOccItemRow>
                {/* DATE */}
                <div>
                    <StyledEvOccItemMinorTitle>Date: </StyledEvOccItemMinorTitle>
                    <span style={{ fontSize: "14px" }}>{item.date}</span>
                </div>
            </StyledEvOccItemRow>
            {item.description && (
                <StyledEvOccItemRow>
                    {/* NOTE */}
                    <div>
                        <StyledEvOccItemDescription title={item.description}>
                            <StyledEvOccItemMinorTitle>Note: </StyledEvOccItemMinorTitle>
                            {item.description}
                        </StyledEvOccItemDescription>
                    </div>
                </StyledEvOccItemRow>
            )}
        </StyledEvOccItem>
    );
};

export default Event;
