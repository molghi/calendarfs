// import "./styled/BottomActions.css";
import { StyledActions, StyledActionsBtn, StyledActionsMenu, StyledActionsAction } from "./styled/BottomActions.styled";

const BottomActions = () => {
    const actions = [
        { name: "Change color", title: "Change the accent color of the interface" },
        { name: "Export", title: "Export as JSON" },
        { name: "Import", title: "Import as JSON" },
    ];

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
                    <StyledActionsAction key={i} title={action.title}>
                        {action.name}
                    </StyledActionsAction>
                ))}
                <input type="file" style={{ display: "none" }} />
            </StyledActionsMenu>
        </StyledActions>
    );
};

export default BottomActions;
