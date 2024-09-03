import "../Styles/CalculatorDisplay.css"

function CalculatorDisplay({history, current}) {

    return (
        <div id="display-container">
            <ul id="history">
                {history.map((element, index) => <li key={index}>{element}</li>)}
            </ul>
            <span id="display">{current}</span>
        </div>
    )
}

export default CalculatorDisplay;