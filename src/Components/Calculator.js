import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorInterface from "./CalculatorInterface";
import {useState} from "react";

function Calculator() {

    const [expressions, setExpressions] = useState(["1 + 2 = 3"]);
    const [operations, setOperations] = useState([]);
    const [result, setResult] = useState();

    function handleNumberInput(e) {
        console.info(e);
        if (operations.find(element => element === ".") && e.target.value === ".") {
            console.info("Invalid operation: Expression already contains a decimal place");
            return;
        }
        addToExpression(e.target.value);
        // setOperations(prevState => [...prevState, e.target.value])
    }

    function handleFunctionInput(e) {
        switch (e.target.id) {

            case "add":
            case "subtract":
            case "multiply":
            case "divide":
                addToExpression(e.target.value);
                break;
            case "clear":
                setOperations([0]);
                break;
            case "equals":
                setExpressions(prevState => [...prevState,
                    operations
                        .join("")
                        .replaceAll(/(\d+)([-\/*+])(?=\d+)/gm, "$1 $2 ")
                        .concat(" = ", result)]);
                setOperations([0]);
                break;
            default:
                console.log("Unknown operation")
                break;
        }
    }

    function addToExpression(obj) {
        setOperations(prevState => [...prevState, obj])
    }

    return (
        <>
            <CalculatorDisplay history={expressions} current={operations}/>
            <CalculatorInterface handleFunctionInput={handleFunctionInput} handleNumberInput={handleNumberInput}/>
        </>
    )
}

export default Calculator;