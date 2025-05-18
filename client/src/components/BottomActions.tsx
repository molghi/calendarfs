// import "./styled/BottomActions.css";
import { StyledActions, StyledActionsBtn, StyledActionsMenu, StyledActionsAction } from "./styled/BottomActions.styled";
import checkNewColor from "../utils/checkNewColor";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const BottomActions = () => {
    // Bring in my context
    const context = useContext(MyContext);
    // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    if (!context) throw new Error("MyContext must be used within a ContextProvider");
    // Pull out from context
    const { localStorageAccentColorKey } = context;

    const actions = [
        { name: "Change color", title: "Change the accent color of the interface" },
        { name: "Export", title: "Export as JSON" },
        { name: "Import", title: "Import as JSON" },
    ];

    const handleAction = (action: string) => {
        if (action === "Change color") {
            const newColor = prompt(`Enter new interface color`);
            if (!newColor || !newColor.trim()) return;
            const checkedColor = checkNewColor(newColor);
            // setAccentColor(checkedColor);
            localStorage.setItem(localStorageAccentColorKey, checkedColor); // Register to LS
            document.documentElement.style.setProperty("--accent", checkedColor); // Change styles
        }
        if (action === "Export") {
            console.log(`Export`);
        }
        if (action === "Import") {
            console.log(`Import`);
        }
    };

    return (
        <StyledActions className="bottom-actions">
            {/* BTN */}
            <StyledActionsBtn className="actions-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                </svg>
            </StyledActionsBtn>

            {/* ACTIONS MENU */}
            <StyledActionsMenu className="actions-menu">
                {actions.map((action, i) => (
                    <StyledActionsAction key={i} title={action.title} onClick={() => handleAction(action.name)}>
                        {action.name}
                    </StyledActionsAction>
                ))}
                <input type="file" style={{ display: "none" }} />
            </StyledActionsMenu>
        </StyledActions>
    );
};

export default BottomActions;
