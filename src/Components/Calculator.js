import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorInterface from "./CalculatorInterface";
import {useEffect, useState} from "react";

function Calculator() {

    const [operands, setOperands] = useState([]);
    const [operators, setOperators] = useState([]);

    const [term, setTerm] = useState("");
    const [expression, setExpression] = useState([]);

    const [history, setHistory] = useState(["1 + 2 = 3"]);
    const [result, setResult] = useState(0);

    useEffect(() => {
        document.addEventListener("keydown", keyPressHandler);
        return () => document.removeEventListener("keydown", keyPressHandler)
    });

    useEffect(() => console.debug(`term: ${term}`, [term]));
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
                if (termContainsDecimal() && e.key === ".") break;
                setTerm(prevState => prevState + e.key);
                break;
            case "/":
            case "*":
            case "-":
            case "+":
                addToExpression(term, e.key);
                // setTerm("");
                break;
            case "Enter":
                addToExpression(term, "=");
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

            case "add":
            case "subtract":
            case "multiply":
            case "divide":
                addToExpression(term, e.target.value);
                // reset term
                // setTerm("");
                break;
            case "clear":
                allClear();
                break;
            case "equals":
                addToExpression(term, "=");
                // calculateResult();
                break;
            default:
                if (termContainsDecimal() && e.target.value === ".") break;
                setTerm(prevState => prevState + e.target.value);
                console.info(`Added to term: ${e.target.value}. Term = ${term}`);
                break;
        }
    }

    const termContainsDecimal = () => term.includes(".");

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

        setTerm("");
    }

    /**
     * Clears the expression and the term.
     * */
    function allClear() {
        console.info("Cleared expression");
        setExpression([]);
        setTerm("");
    }

    /**
     * Clears only the term.
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

        setResult(tempResult);
        setHistory(prevState => [...prevState,
            expression
                .join(" ")
                .concat(` ${tempResult}`)]);
        setExpression([]); // allClear?
    }

    return (
        <>
            <CalculatorDisplay history={history} expression={expression} term={term}/>
            <CalculatorInterface handleInput={handleInput}/>
        </>
    )
}

export default Calculator;