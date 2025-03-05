import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorInterface from "./CalculatorInterface";
import { useEffect, useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");
  const [expression, setExpression] = useState([]);

  const [history, setHistory] = useState(["1 + 2 = 3"]);

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);
    return () => document.removeEventListener("keydown", keyPressHandler);
  });

  useEffect(() => console.debug(`term: ${input}`, [input]));
  useEffect(() => {
    console.debug(`expression: ${expression}`);
    if (expression[expression.length - 1] === "=") {
      calculateResult();
    }
  }, [expression]);

  /* Handle keyboard input */
  function keyPressHandler(e) {
    if (e.repeat) {
      return;
    }
    console.log(e.key);
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
        setInput(e.key);
        addToExpression(input, e.key);
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
    console.debug("Input: ", e.target.id);
    switch (e.target.id) {
      case "subtract":
      case "add":
      case "multiply":
      case "divide":
        addToExpression(null, e.target.value);
        setInput(e.target.value);
        break;
      case "clear":
        allClear();
        break;
      case "equals":
        addToExpression(null, "=");
        // calculateResult();
        break;
      case "decimal":
        /* Check if there is already a decimal point */
        if (inputContainsDecimal() && e.target.value === ".") {
          break;
        } else {
          addToExpression(e.target.value);
          setInput((prevState) => prevState + e.target.value);
        }
        /* Prefix a zero before a decimal fraction */
        if (e.target.value === "." && input.length === 0) {
          setInput((prevState) => prevState + "0" + e.target.value);
          break;
        }
        break;
      /* Input is a number */
      default:
        console.log("Case: default");

        /* If input has an operator */
        if (/[+/*-]/.test(input)) {
          console.log("In the test default");

          setInput(e.target.value);
          addToExpression(e.target.value);
          break;
        }

        /* Check if adding zero to nothing? */
        if (input.length === 0 && e.target.value === "0") break;

        /* Set input and expression values */
        addToExpression(e.target.value);
        setInput((prevState) => prevState + e.target.value);
        console.info(`Added to term: ${e.target.value}. Term = ${input}`);
        break;
    }
  }

  /* Boolean condition tests */
  const inputContainsDecimal = () => input.includes(".");
  const lastInputIsAnOperator = () => /^.*[+/*-]+$/.test(expression.join(""));

  /**
   * Add the arguments to the expression. If @operand is falsy, change the last @operator to the
   * current argument.
   * This is essentially simulating an overloaded method.
   * @param operand {String=} Optional, the operand to add to the expression, preceding the operator. A single
   * character matching one of [0,1,2,3,4,5,6,7,8,9,.]
   * @param operator {String=} Optional. One of [+-/*=]
   * */
  function addToExpression(operand, operator) {
    /* Operand is not a number 0-9 or a decimal point */
    if (operand && !operand.match(/[\d.]/)) {
      console.error(`Operand not valid: ${operand}`);
      return;
    }
    /* Operator not valid */
    if (operator && !operator.match(/[/*-=+]/)) {
      console.error(`Operator not valid: ${operator}`);
      return;
    }
    /* if expression already has a negative operator, remove it */
    if (!operand && operator && /^.*[+/*-]-$/.test(expression.join(""))) {
      console.debug("Removing negative operator");
      let updatedExpression = expression.slice(0, -2);
      updatedExpression.push(operator);
      console.log(`UpdatedExpression: ${updatedExpression}`);
      setExpression(updatedExpression);
      return;
    }

    /* If only an operator is supplied as an argument, and if the last part of the expression is an operator */
    if (!operand && operator && lastInputIsAnOperator()) {
      /* Operator argument is a minus, next input will be a negative number */
      if (operator === "-" && /^.*[*-/+]?$/.test(expression.join(""))) {
        console.debug("Adding negative operator");
        setExpression((prevState) => [...prevState, operator]);
        return;
      }

      /*  switch the current operator in the expression to the supplied argument  */
      const updatedExpression = expression.map((element, index) => {
        if (index === expression.length - 1) {
          console.info(
            `Replaced operator "${
              expression[expression.length - 1]
            }" with new operator "${operator}"`
          );
          return operator;
        } else {
          return element;
        }
      });
      setExpression(updatedExpression);
      return;
    }

    /* Only an operand is supplied as an argument, upadate the expression */
    if (operand && !operator) {
      console.log(`Updading the expression with the input ${operand}`);
      setExpression((prevState) => [...prevState, operand]);
      return;
    }

    /* Only an operator is supplied as an argument */
    if (!operand && operator) {
      setExpression((prevState) => [...prevState, operator]);
    }

    setInput("");
  }

  /**
   * Clears the expression and the input.
   * */
  function allClear() {
    console.info("Cleared expression");
    setExpression([]);
    setInput("");
  }

  const operations = {
    "+": (a, b) => a + b,
    "/": (a, b) => a / b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
  };

  function calculateResult() {
    console.info("Calculating result");
    try {
      const expressionString = expression.join("").replace("=", "");
      // Get terms
      const terms = expressionString.split(/(?<![+/*-])[+/*-]/);
      const operators = expressionString.match(/(?<=\d+?)[+*/-](?=-?\d+)/g);
      console.debug("Terms: ", terms);
      console.debug("Operators: ", operators);

      let result = 0;
      let operator = "";
      if (terms.length > 0) {
        result = terms[0];
        for (let i = 1; i < terms.length; i++) {
          // Get the operator
          operator = operators[i - 1];
          const statement = `${result} ${operator} ${terms[i]}`;
          result = operations[operator](+result, +terms[i]);

          console.log(`Calculation: ${statement} = ${result}`);
        }
      }

      // Clean up
      setHistory((prevState) => [
        ...prevState,
        expression.join(" ").concat(` ${result}`),
      ]);
      setExpression([result]);
      setInput(result + "");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <CalculatorDisplay
        history={history}
        expression={expression}
        input={input}
      />
      <CalculatorInterface handleInput={handleInput} />
    </>
  );
}

export default Calculator;
