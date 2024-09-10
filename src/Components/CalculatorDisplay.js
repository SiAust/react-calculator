import "../Styles/CalculatorDisplay.css"

function CalculatorDisplay({history, term, expression}) {

    return (
        <div id="display-container">
            <ul id="history">
                {history.map((element, index) => <li key={index}>{element}</li>)}
            </ul>
            <span id={"display"}>{expression}</span>
            <span id="term">{term || 0}</span>
        </div>
    )
}

export default CalculatorDisplay;