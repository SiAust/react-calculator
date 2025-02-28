import "../Styles/CalculatorDisplay.css"

function CalculatorDisplay({history, input, expression}) {

    return (
        <div id="display-container">
            <ul id="history">
                {history.map((element, index) => <li key={index}>{element}</li>)}
                <div id={"history-anchor"}></div>
            </ul>
            <span id="expression">{expression}</span>
            <span id="display">{input || 0}</span>
        </div>
    )
}

export default CalculatorDisplay;