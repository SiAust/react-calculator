import "../Styles/CalculatorInterface.css"

import FunctionButton from "./FunctionButton";
import NumberButton from "./NumberButton"

function CalculatorInterface({handleFunctionInput, handleNumberInput}) {
    return (
        <div className="interface-container">

            <FunctionButton handleFunctionInput={handleFunctionInput} label={"+"} id={"add"}/>
            <FunctionButton handleFunctionInput={handleFunctionInput} label={"-"} id={"subtract"}/>
            <FunctionButton handleFunctionInput={handleFunctionInput} label={"*"} id={"multiply"}/>
            <FunctionButton handleFunctionInput={handleFunctionInput} label={"/"} id={"divide"}/>
            <FunctionButton handleFunctionInput={handleFunctionInput} label={"="} id={"equals"}/>
            <FunctionButton handleFunctionInput={handleFunctionInput} label={"AC"} id={"clear"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={"."} id={"decimal"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={0} id={"zero"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={1} id={"one"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={2} id={"two"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={3} id={"three"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={4} id={"four"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={5} id={"five"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={6} id={"six"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={7} id={"seven"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={8} id={"eight"}/>
            <NumberButton handleNumberInput={handleNumberInput} symbol={9} id={"nine"}/>
        </div>
    )
}

export default CalculatorInterface;