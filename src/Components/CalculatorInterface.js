import "../Styles/CalculatorInterface.css"

import FunctionButton from "./FunctionButton";
import NumberButton from "./NumberButton"

function CalculatorInterface() {
    return (
        <div className="interface-container">

            <FunctionButton symbol={"+"} id={"add"}/>
            <FunctionButton symbol={"-"} id={"subtract"}/>
            <FunctionButton symbol={"*"} id={"multiply"}/>
            <FunctionButton symbol={"/"} id={"divide"}/>
            <FunctionButton symbol={"."} id={"decimal"}/>
            <FunctionButton symbol={"="} id={"equals"}/>
            <FunctionButton symbol={"AC"} id={"clear"}/>
            <NumberButton digit={0} id={"zero"}/>
            <NumberButton digit={1} id={"one"}/>
            <NumberButton digit={2} id={"two"}/>
            <NumberButton digit={3} id={"three"}/>
            <NumberButton digit={4} id={"four"}/>
            <NumberButton digit={5} id={"five"}/>
            <NumberButton digit={6} id={"six"}/>
            <NumberButton digit={7} id={"seven"}/>
            <NumberButton digit={8} id={"eight"}/>
            <NumberButton digit={9} id={"nine"}/>
        </div>
    )
}

export default CalculatorInterface;