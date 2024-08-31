import "../Styles/CalculatorInterface.css"

import FunctionButton from "./FunctionButton";
import NumberButton from "./NumberButton"

function CalculatorInterface() {
    return (
        <div className="interface-container">
            <NumberButton digit={1}/>
            <NumberButton digit={2}/>
            <NumberButton digit={3}/>
            <NumberButton digit={4}/>
            <NumberButton digit={5}/>
            <NumberButton digit={6}/>
            <NumberButton digit={7}/>
            <NumberButton digit={8}/>
            <NumberButton digit={9}/>
            <NumberButton digit={0}/>
            <FunctionButton symbol={"+"}/>
            <FunctionButton symbol={"-"}/>
            <FunctionButton symbol={"*"}/>
            <FunctionButton symbol={"/"}/>
            <FunctionButton symbol={"."}/>
            <FunctionButton symbol={"="}/>
            <FunctionButton symbol={"AC"}/>
        </div>
    )
}

export default CalculatorInterface;