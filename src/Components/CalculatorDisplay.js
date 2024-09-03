import "../Styles/CalculatorDisplay.css"

function CalculatorDisplay({history, current}) {
    // TODO history?

    return (
        <div id="display-container">
            <ul id="history">
                {history.map(element => <li>{element}</li>)}
            </ul>
            <span id="display">{current}</span>
        </div>
    )
}

export default CalculatorDisplay;