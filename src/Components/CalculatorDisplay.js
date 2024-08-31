import "../Styles/CalculatorDisplay.css"

function CalculatorDisplay({displayVal = 0}) {
    // TODO history?

    return (
        <div id="display-container">
            <span id="display">{displayVal}</span>
        </div>
    )
}

export default CalculatorDisplay;