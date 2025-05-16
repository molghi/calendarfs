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
    const switcher = [
        { name: "Events", description: "Scheduled and specific activities" },
        { name: "Occurrences", description: "General things that happened, activities or notes" },
    ];

    const data = [
        { name: "Something happened", date: "20/5/2025", note: "What was it?" },
        { name: "spring ends, summer begins", date: "31/5/2025", note: "" },
    ];

    return (
        <StyledRightColumn>
            <StyledEvOcc>
                {/* HEADER */}
                <StyledEvOccBox>
                    {/* TITLE */}
                    <StyledEvOccTitle>
                        Events This Month<span title="4 events this month">{data.length}</span>
                    </StyledEvOccTitle>
                    {/* BUTTONS */}
                    <StyledEvOccSwitch>
                        {switcher.map((btn, i) => (
                            <button key={i} title={btn.description} className={`${btn.name === "Events" ? "active" : ""}`}>
                                {btn.name}
                            </button>
                        ))}
                    </StyledEvOccSwitch>
                </StyledEvOccBox>

                {/* ITEMS */}
                <StyledEvOccItems>
                    {data.map((item, i) => (
                        <Event key={i} item={item} />
                    ))}
                </StyledEvOccItems>
            </StyledEvOcc>
        </StyledRightColumn>
    );
};

export default Events;
