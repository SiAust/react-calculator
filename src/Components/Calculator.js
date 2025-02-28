import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorInterface from "./CalculatorInterface";
import {useEffect, useState} from "react";

function Calculator() {

    const [input, setInput] = useState("");
    const [expression, setExpression] = useState([]);

    const [history, setHistory] = useState(["1 + 2 = 3"]);

    useEffect(() => {
        document.addEventListener("keydown", keyPressHandler);
        return () => document.removeEventListener("keydown", keyPressHandler)
    });

    useEffect(() => console.debug(`term: ${input}`, [input]));
    useEffect(() => {
        console.debug(`expression: ${expression}`);
        if (expression[expression.length -1] === "=") {
            calculateResult();
        }
    }, [expression]);

    function keyPressHandler(e) {
        if (e.repeat) {
            return
        }
        console.log(e.key)
        switch (e.key) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
            case ".":
                if (inputContainsDecimal() && e.key === ".") break;
                setInput(prevState => prevState + e.key);
                break;
            case "/":
            case "*":
            case "+":
                addToExpression(input, e.key);
                // setTerm("");
                break;
            case "-":
                // add negative operand to the input
                break;
            case "Enter":
                addToExpression(input, "=");
                // calculateResult();
                break;
            case "Escape": // allClear
                allClear();
                break;
            case "Backspace": // remove last operation
                break;
            default:
                console.log(e.key);
        }
    }


    function handleInput(e) {

        switch (e.target.id) {
            case "subtract":
                // setInput();
                console.debug(`in subtract: ${lastInputIsAnOperator()}`);
                if (lastInputIsAnOperator()) {
                    // setInput(prevState => "-" + prevState);
                    // break;
                    if (input.match(/^-\d*$/)) {
                        // The input is a negative number
                        setInput(prevState => prevState.replace("-", ""));
                        break;
                    } else {
                        setInput(prevState => "-" + prevState);
                        break;
                    }

                }
            case "add":
            case "multiply":
            case "divide":
                addToExpression(input, e.target.value);
                // reset input
                // setTerm("");
                break;
            case "clear":
                allClear();
                break;
            case "equals":
                addToExpression(input, "=");
                // calculateResult();
                break;
            default:
                if (inputContainsDecimal() && e.target.value === ".") break;
                if (e.target.value === "." && input.length === 0) {
                    setInput(prevState => prevState + "0" + e.target.value);
                    break;
                }
                if (input.length === 0 && e.target.value === "0") break;
                setInput(prevState => prevState + e.target.value);
                console.info(`Added to term: ${e.target.value}. Term = ${input}`);
                break;
        }
    }

    const inputContainsDecimal = () => input.includes(".");

    // const lastOperatorIsMinus = () => expression[expression.length - 1] === "-";
    const lastInputIsAnOperator = () => expression[expression.length - 1].match(/[-+*/]/); //todo
    /**
     * Add the arguments to the expression. If @operand is falsy, change the last @operator to the
     * current argument.
     * @param operand {String=} Optional, the operand to add to the expression, preceding the operator. A single
     * character matching one of [0,1,2,3,4,5,6,7,8,9,.]
     * @param operator {String} Required. One of [+-/*=]
     * */
    function addToExpression(operand, operator) {
            if (operand && !operand.match(/[\d.]/)) {
                console.error(`Operand not valid: ${operand}`);
                return;
            }
            if (!operator.match(/[/*-=+]/)) {
                console.error(`Operator not valid: ${operator}`);
                return;
            }
            if (!operand && operator) {

                const updatedExpression = expression.map((element, index) => {
                    if (index === expression.length - 1) {
                        console.info(`Replaced operator "${expression[expression.length - 1]}" with new operator "${operator}"`);
                        return operator;
                    } else {
                        return element;
                    }
                })
                setExpression(updatedExpression);
                return;
            }

            setExpression(prevState => [...prevState, operand, operator]);
            console.info(`Added operand "${operand}" & operator ${operator} to expression. Expression now: ${expression}`);

        setInput("");
    }
    // todo first input of 'minus' is a negative number, second click replacing last operator

    /**
     * Clears the expression and the input.
     * */
    function allClear() {
        console.info("Cleared expression");
        setExpression([]);
        setInput("");
    }

    /**
     * Clears only the input.
     * */
    function clear() {
        // TODO
    }

    const operations = {
        "+": (a, b) => a + b,
        "/": (a, b) => a / b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b
    }


    function calculateResult() {
        console.info("Calculating result");
        let tempResult = expression[0]; // set to initial value
        console.log(`tempResult: ${tempResult}`);
        for (let i = 2; i < expression.length - 1; i += 2) {
            tempResult = operations[expression[i - 1]](+tempResult, +expression[i]);
            console.log(`tempResult: ${tempResult}`);
        }

        setHistory(prevState => [...prevState,
            expression
                .join(" ")
                .concat(` ${tempResult}`)]);
        setExpression([]); // allClear?
        setInput(tempResult + "");
    }

    return (
        <>
            <CalculatorDisplay history={history} expression={expression} input={input}/>
            <CalculatorInterface handleInput={handleInput}/>
        </>
    )
}

export default Calculator;