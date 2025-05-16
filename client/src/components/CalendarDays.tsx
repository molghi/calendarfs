import "./styled/CalendarDays.css";
import CalendarDay from "./CalendarDay";

const CalendarDays = () => {
    const weekdayNames: Array<string> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const now: Date = new Date();
    const currentYear: number = new Date().getFullYear();
    const currentMonth: number = new Date().getMonth(); // index starts at 0
    const monthFirstDay: number = new Date(currentYear, currentMonth, 1).getDay(); // index starts at 0
    const daysInCurrentMonth: number = new Date(currentYear, currentMonth + 1, 1 - 1).getDate(); // amount of days in the current month
    const dummyMonth: Array<number> = new Array(daysInCurrentMonth + monthFirstDay).fill(0); // create dummy array, its length = days in this month + amount of cells to add

    return (
        <>
            <div className="calendar__days">
                {/* WEEKDAY NAMES */}
                {weekdayNames.map((day, i) => (
                    <CalendarDay key={i} type="weekday" day={day} />
                ))}

                {/* MONTH CELLS: EMPTY CELLS AND DAYS */}
                {dummyMonth.map((dummyDay, index) => {
                    if (index < monthFirstDay) {
                        // Return empty cells
                        return (
                            <div key={index} className="calendar__day calendar__day--empty">
                                <span></span>
                            </div>
                        );
                    } else {
                        // Return days
                        const date = index + 1 - monthFirstDay;
                        const isPassed = now.getDate() > date;
                        const isToday = now.getDate() === date;
                        return (
                            <div
                                key={index}
                                className={`calendar__day ${isPassed ? "calendar__day--passed" : ""} ${
                                    isToday ? "calendar__day--today" : ""
                                }`}
                                data-date={`${currentYear},${currentMonth + 1},${date}`}
                            >
                                <span>{date}</span>
                            </div>
                        );
                    }
                })}

                {/* <div className="calendar__day calendar__day--passed" data-date="2025,5,1">
                    <span className="calendar__day--occurence">5</span>
                    <span>1</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,2">
                    <span className="calendar__day--occurence">3</span>
                    <span>2</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,3">
                    <span className="calendar__day--occurence">5</span>
                    <span>3</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,4">
                    <span className="calendar__day--occurence">3</span>
                    <span>4</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,5">
                    <span className="calendar__day--occurence">6</span>
                    <span>5</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,6">
                    <span className="calendar__day--occurence">4</span>
                    <span>6</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,7">
                    <span className="calendar__day--occurence">6</span>
                    <span>7</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,8">
                    <span className="calendar__day--eventful">1</span>
                    <span className="calendar__day--occurence">5</span>
                    <span>8</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,9">
                    <span className="calendar__day--occurence">3</span>
                    <span>9</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,10">
                    <span className="calendar__day--occurence">5</span>
                    <span>10</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,11">
                    <span className="calendar__day--occurence">4</span>
                    <span>11</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,12">
                    <span className="calendar__day--occurence">5</span>
                    <span>12</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,13">
                    <span className="calendar__day--occurence">5</span>
                    <span>13</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,14">
                    <span className="calendar__day--occurence">5</span>
                    <span>14</span>
                </div>
                <div className="calendar__day calendar__day--passed" data-date="2025,5,15">
                    <span className="calendar__day--occurence">3</span>
                    <span>15</span>
                </div>
                <div className="calendar__day calendar__day--today" data-date="2025,5,16">
                    <span>16</span>
                </div>
                <div className="calendar__day" data-date="2025,5,17">
                    <span>17</span>
                </div>
                <div className="calendar__day" data-date="2025,5,18">
                    <span className="calendar__day--eventful">1</span>
                    <span>18</span>
                </div>
                <div className="calendar__day" data-date="2025,5,19">
                    <span>19</span>
                </div>
                <div className="calendar__day" data-date="2025,5,20">
                    <span>20</span>
                </div>
                <div className="calendar__day" data-date="2025,5,21">
                    <span>21</span>
                </div>
                <div className="calendar__day" data-date="2025,5,22">
                    <span>22</span>
                </div>
                <div className="calendar__day" data-date="2025,5,23">
                    <span>23</span>
                </div>
                <div className="calendar__day" data-date="2025,5,24">
                    <span>24</span>
                </div>
                <div className="calendar__day" data-date="2025,5,25">
                    <span>25</span>
                </div>
                <div className="calendar__day" data-date="2025,5,26">
                    <span>26</span>
                </div>
                <div className="calendar__day" data-date="2025,5,27">
                    <span>27</span>
                </div>
                <div className="calendar__day" data-date="2025,5,28">
                    <span className="calendar__day--eventful">1</span>
                    <span>28</span>
                </div>
                <div className="calendar__day" data-date="2025,5,29">
                    <span>29</span>
                </div>
                <div className="calendar__day" data-date="2025,5,30">
                    <span>30</span>
                </div>
                <div className="calendar__day" data-date="2025,5,31">
                    <span className="calendar__day--eventful">1</span>
                    <span>31</span>
                </div> */}
            </div>
        </>
    );
};

export default CalendarDays;
