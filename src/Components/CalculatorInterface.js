import "../Styles/CalculatorInterface.css"

import FunctionButton from "./FunctionButton";
import NumberButton from "./NumberButton"

function CalculatorInterface({handleInput}) {
    return (
        <div className="interface-container">

            <FunctionButton handleInput={handleInput} label={"+"} id={"add"}/>
            <FunctionButton handleInput={handleInput} label={"-"} id={"subtract"}/>
            <FunctionButton handleInput={handleInput} label={"*"} id={"multiply"}/>
            <FunctionButton handleInput={handleInput} label={"/"} id={"divide"}/>
            <FunctionButton handleInput={handleInput} label={"="} id={"equals"}/>
            <FunctionButton handleInput={handleInput} label={"AC"} id={"clear"}/>
            <NumberButton handleInput={handleInput} symbol={"."} id={"decimal"}/>
            <NumberButton handleInput={handleInput} symbol={0} id={"zero"}/>
            <NumberButton handleInput={handleInput} symbol={1} id={"one"}/>
            <NumberButton handleInput={handleInput} symbol={2} id={"two"}/>
            <NumberButton handleInput={handleInput} symbol={3} id={"three"}/>
            <NumberButton handleInput={handleInput} symbol={4} id={"four"}/>
            <NumberButton handleInput={handleInput} symbol={5} id={"five"}/>
            <NumberButton handleInput={handleInput} symbol={6} id={"six"}/>
            <NumberButton handleInput={handleInput} symbol={7} id={"seven"}/>
            <NumberButton handleInput={handleInput} symbol={8} id={"eight"}/>
            <NumberButton handleInput={handleInput} symbol={9} id={"nine"}/>
        </div>
    )
}

export default CalculatorInterface;