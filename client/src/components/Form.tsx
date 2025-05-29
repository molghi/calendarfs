import "./styled/Form.css";
import { useContext, useRef, useEffect, useState } from "react";
import MyContext from "../context/MyContext";
import { closeIcon } from "../utils/icons";
import { Event, Occurrence } from "../context/MyContext";

const Form = () => {
    const context = useContext(MyContext); // Bring in my context
    if (!context) throw new Error("Error using Context"); // Null-check before deconstructing -- guard against useContext(MyContext) returning undefined
    const { mode, setMode, dayClicked, setMessage, addOne, thingToEdit, editOne, formActionBtn } = context; // Pull out from context

    const firstInput = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string>(dayClicked);
    const [varyingInput, setVaryingInput] = useState<string>(""); // Either time or category depending on type (event/occurrence)
    const [description, setDescription] = useState<string>("");
    const [formType, setFormType] = useState<number>(0); // 0 for Event, 1 for Occurrence

    useEffect(() => {
        // Focus first input
        if (firstInput.current) firstInput.current.focus();
    }, [formType, date]);

    useEffect(() => {
        // Change 'date'
        setDate(dayClicked);
    }, [dayClicked]);

    useEffect(() => {
        if (thingToEdit !== null) {
            // It is edit mode
            const type: string = thingToEdit.hasOwnProperty("category") ? "occurrence" : "event"; // Define type
            setTitle(thingToEdit.title);
            setDate(thingToEdit.date);
            setDescription(thingToEdit.description);
            setFormType(type === "event" ? 0 : 1);
            // Set varying input value
            if (type === "event") {
                const setting = (thingToEdit as Event).time; // instead of : setVaryingInput(thingToEdit[varyingInputName]);
                setVaryingInput(setting || "");
            } else {
                const setting = (thingToEdit as Occurrence).category;
                setVaryingInput(setting || "");
            }
        }
        if (mode === "add") {
            // It is add mode
            setTitle("");
            setDate(dayClicked);
            setDescription("");
            setVaryingInput("");
        }
    }, [thingToEdit, mode]);

    // Capitalise string
    const capitalise = (value: string): string =>
        value
            .split(" ")
            .map((val: string) => val.trim()[0].toUpperCase() + val.trim().slice(1).toLowerCase())
            .join(" ")
            .trim();

    // Submit form. Action: add one or edit one
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate
        const isValidTitle: string = title.trim();
        if (!isValidTitle) return setMessage("error Title cannot be empty");
        const isValidDate: boolean = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19[7-9][0-9]|20[0-9]{2}|2100)$/.test(date);
        if (!isValidDate) return setMessage(`error Invalid date format. Use DD/MM/YYYY between 1970 and 2100.`);
        const titleClean: string = title.trim();
        const dateClean: string = date.trim();
        const varyingInputClean: string = varyingInput.trim(); // Either time or category
        const descriptionClean: string = description.trim();
        // Add
        const type: string = formType === 0 ? "event" : "occurrence"; // Define type
        // Compose event/occurrence object
        let obj: Event | Occurrence;
        if (type === "event") {
            // EVENT
            if (mode === "add") {
                obj = {
                    added: new Date().toISOString(),
                    date: dateClean,
                    description: descriptionClean,
                    title: titleClean,
                    time: varyingInputClean, // must match `Event`
                    id: Math.random(), // If adding new, we need new id
                };
            } else {
                obj = {
                    added: new Date().toISOString(),
                    date: dateClean,
                    description: descriptionClean,
                    title: titleClean,
                    time: varyingInputClean, // must match `Event`
                    id: thingToEdit ? thingToEdit.id : -1, // If editing existing, we don't need to change id
                };
            }
        } else {
            // OCCURRENCE
            if (mode === "add") {
                obj = {
                    added: new Date().toISOString(),
                    date: dateClean,
                    description: descriptionClean,
                    title: titleClean,
                    category: varyingInputClean, // must match `Occurrence`
                    id: Math.random(), // If adding new, we need new id
                };
            } else {
                obj = {
                    added: new Date().toISOString(),
                    date: dateClean,
                    description: descriptionClean,
                    title: titleClean,
                    category: varyingInputClean, // must match `Occurrence`
                    id: thingToEdit ? thingToEdit.id : -1, // If editing existing, we don't need to change id
                };
            }
        }
        mode === "add" ? addOne(obj, type) : editOne(obj, type); // Add or edit one
        setMode(""); // Remove form
        setMessage(`success ${capitalise(type)} ${mode}ed!`); // Show message
    };

    // Switch form to Add Event / Add Occurrence
    const switchButtons = [
        { name: "Event", title: "Switch to Event form" },
        { name: "Occurrence", title: "Switch to Occurrence form" },
    ];

    return (
        <>
            <div className="app__form-box">
                <form onSubmit={submitForm} className="app__form app__form--add">
                    {/* CLOSE FORM BTN */}
                    <button onClick={() => setMode("")} className="app__form-btn-close" type="button">
                        {closeIcon}
                    </button>

                    {/* FORM HEADER */}
                    <div className="app__form-header">
                        <div className="app__form-title">
                            {capitalise(mode)} {formType === 0 ? "Event" : "Occurrence"}
                        </div>
                        {formType === 0 ? (
                            <label>A scheduled and specific activity</label>
                        ) : (
                            <label>A general thing that happened, an activity or note</label>
                        )}

                        {/* FORM SWITCH BUTTONS SHOWN ONLY WHEN ADDING NEW */}
                        {mode === "add" && (
                            <div className="app__form-switch">
                                {switchButtons.map((btn, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setFormType(i)}
                                        type="button"
                                        className={`app__form-switch-btn app__form-switch-btn--${btn.name.toLowerCase()} ${
                                            i === formType ? "active" : ""
                                        }`}
                                        title={btn.title}
                                    >
                                        {btn.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* INPUT BOXES */}
                    <div className="app__form-input-box">
                        {/* TITLE INPUT */}
                        <input
                            ref={firstInput}
                            type="text"
                            className="app__form-input app__form-input--title"
                            placeholder="Title (required)"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="app__form-input-box">
                        {/* DATE INPUT */}
                        <input
                            type="text"
                            className="app__form-input app__form-input--date"
                            placeholder="Date (required)"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        {/* VARYING INPUT: EITHER TIME OR CATEGORY */}
                        <input
                            type="text"
                            className={`app__form-input app__form-input--${formType === 0 ? "time" : "category"}`}
                            placeholder={formType === 0 ? `Time (optional)` : `Category (optional)`}
                            value={varyingInput}
                            onChange={(e) => setVaryingInput(e.target.value)}
                        />
                    </div>

                    <div className="app__form-input-box">
                        {/* DESCRIPTION INPUT */}
                        <textarea
                            className="app__form-input app__form-input--description"
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    {/* ACTION BTN */}
                    <button ref={formActionBtn} className="app__form-btn" type="submit">
                        {capitalise(mode)}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Form;
