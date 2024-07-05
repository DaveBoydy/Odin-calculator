let operand1 = 0;
let operand2 = 0;
let numOperator = "";
let accumulatorAnswerDisplay = "";

/*
 * Referenced DOM nodes with variables for the use of
 * event listeners.
 */

let keyboard = document.getElementById("keyboard");
let metaScreen = document.getElementById("meta-screen");
let accumulatorScreen = document.getElementById("accumulator-screen");

/*
 * Setup event listeners (observers) after the page 'load' event fires
 * so that all page elements are loaded before any logic is executed.
 */
addEventListener("load", (event) => {
  keyboard.addEventListener("click", (event) => {
    let data = event.target.dataset.calculator;
    parseDataKeys(data);
  });
  console.log("The page is fully loaded.");
});

/*
 * Implemented controller logic to respond to calls
 * from event listeners with appropriate action(s) I.E. processing.
 */

parseDataKeys = (data) => {
  if (!isNaN(data)) {
    parseOperand(+data);
  } else if (data === "point") {
    parseOperand(data);
  } else if (data === "clear" || data === "delete") {
    parseModifier(data);
  } else if (
    isNaN(data) &&
    data !== "point" &&
    data !== undefined &&
    data !== "clear" &&
    data !== "delete"
  ) {
    parseOperator(data);
  } else if (data === undefined) {
    console.log("miss click");
  }
};

/*
 * Helper functions.
 */

parseOperand = (operand) => {
  if (typeof operand === "number") {
    populateAccumulatorDisplay(operand);
  } else if (operand === "point") {
    disableDecimalPoint(true);
    operand = ".";
    populateAccumulatorDisplay(operand);
  }
};

parseOperator = (operator) => {
  disableOperators(true);
  switch (operator) {
    case "plus":
      operator = " + ";
      populateAccumulatorDisplay(operator);
      disableDecimalPoint(false);
      break;
    case "minus":
      operator = " − ";
      populateAccumulatorDisplay(operator);
      disableDecimalPoint(false);
      break;
    case "multiply":
      operator = " × ";
      populateAccumulatorDisplay(operator);
      disableDecimalPoint(false);
      break;
    case "divide":
      operator = " ÷ ";
      populateAccumulatorDisplay(operator);
      disableDecimalPoint(false);
      break;
    case "equals":
      operator = " = ";
      parseEquation();
      disableOperators(false);
      disableDecimalPoint(false);
      break;
  }
};

parseModifier = (modify) => {
  switch (modify) {
    case "clear":
      resetCalc();
      break;
    case "delete":
      deleteLastItem();
      break;
  }
};

populateAccumulatorDisplay = (target) => {
  accumulatorAnswerDisplay += target;
  accumulatorScreen.textContent = `${accumulatorAnswerDisplay}`;
};

resetCalc = () => {
  console.log("calculator reset");
  accumulatorScreen.textContent = "0";
  accumulatorAnswerDisplay = "";
  metaScreen.textContent = "Ans = 0";
  disableDecimalPoint(false);
  disableOperators(false);
};

deleteLastItem = () => {
  if (accumulatorScreen.textContent) {
    console.log(accumulatorScreen.textContent.length);
    accumulatorAnswerDisplay = accumulatorAnswerDisplay.slice(0, -1);
    accumulatorScreen.textContent = accumulatorAnswerDisplay;
  }

  if (!accumulatorScreen.textContent) {
    console.log("I'm empty");
    accumulatorScreen.textContent = "0";
  }

  //TODO:
  //if remove decimal disableDecimalPoint(false);
  //if remove blank space disableOperators(false) and remove 3 chars
};

disableDecimalPoint = (activeState) => {
  document.querySelector('[data-calculator="point"]').disabled = activeState;
};

disableOperators = (activeState) => {
  document.querySelector('[data-calculator="plus"]').disabled = activeState;
  document.querySelector('[data-calculator="minus"]').disabled = activeState;
  document.querySelector('[data-calculator="divide"]').disabled = activeState;
  document.querySelector('[data-calculator="multiply"]').disabled = activeState;
};

parseEquation = () => {
  console.log("parse the equation");
  metaScreen.textContent = `${accumulatorAnswerDisplay} =`;
  accumulatorScreen.textContent = "Ans";
  accumulatorAnswerDisplay = "Ans";
};

add = () => {
  console.log("add");
};

subtract = () => {
  console.log("subtract");
};

multiply = () => {
  console.log("multiply");
};

divide = () => {
  console.log("divide");
};

operate = (operand, num1, num2) => {
  switch (operand) {
    case "+":
      add(num1, num2);
      break;
    case "-":
      subtract(num1, num2);
      break;
    case "multiply":
      multiply(num1, num2);
      break;
    case "divide":
      divide(num1, num2);
      break;
  }
};
