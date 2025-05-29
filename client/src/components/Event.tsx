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
import { editIcon, deleteIcon } from "../utils/icons";
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
        // Upon clicking Edit btn
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
                    {editIcon}
                </StyledEvOccItemBtn>

                {/* DELETE BTN */}
                <StyledEvOccItemBtn onClick={() => deleteOne(item.added, type)} title="Delete">
                    {deleteIcon}
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
