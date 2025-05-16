// import "./styled/BottomActions.css";

const BottomActions = () => {
    const actions = [
        { name: "Change color", title: "Change the accent color of the interface" },
        { name: "Export", title: "Export as JSON" },
        { name: "Import", title: "Import as JSON" },
    ];

    return (
        <>
            <div className="actions" style={{ display: "none" }}>
                {/* BTN */}
                <div className="actions__btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                    </svg>
                </div>
                {/* ACTIONS MENU */}
                <div className="actions__menu">
                    {actions.map((action, i) => (
                        <div key={i} className="actions__action" title={action.title}>
                            {action.name}
                        </div>
                    ))}
                    <input className="importer" type="file" />
                </div>
            </div>
        </>
    );
};

export default BottomActions;
