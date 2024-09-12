import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorInterface from "./CalculatorInterface";
import {useEffect, useState} from "react";

function Calculator() {

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
            console.info(`Calculating result of ${expression}`);
        }
    }, [expression, calculateResult]);

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

    function addToExpression(...terms) { // for each
        for (let i = 0; i < terms.length; i++) {
            // If the preceding element is an operator and new input is an operator, replace previous operator
            if (!terms[i] && terms.length === 2) {

                const updatedExpression = expression.map((element, index) => {
                    if (index === expression.length - 1) {
                        console.info(`Replaced operator "${expression[expression.length - 1]}" with new operator "${terms[i + 1]}"`);
                        return terms[i + 1];
                    } else {
                        return element;
                    }
                })
                setExpression(updatedExpression);
                return;
            }

            setExpression(prevState => [...prevState, terms[i]]);
            console.info(`Added term "${terms[i]}" to expression. Expression now: ${expression}`);
        }
        setTerm("");
    }

    /**
     * Clears the expression and the term.
     * */
    function allClear() {
        console.info("Reset expression");
        setExpression([]);
        setTerm("");
    }

    /**
     * Clears only the term.
     * */
    function clear() {
        // TODO
    }

    const operators = {
        "add": (a, b) => a + b,
        "divide": (a, b) => a / b,
        "subtract": (a, b) => a - b,
        "multiply": (a, b) => a * b
    }


    function calculateResult() {
        console.log(expression);
        let tempResult = 0;

        tempResult = expression.reduce((accumulator, currentValue, currentIndex) => {

        })
        // for ()
        setResult(tempResult);
        setHistory(prevState => [...prevState,
            expression
                .join(" ")
                // .replaceAll(/(\d+)([-/*+])(?=\d+)/gm, "$1 $2 ")
                .concat(` ${result}`)]);
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