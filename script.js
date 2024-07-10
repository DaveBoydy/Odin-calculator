let accumulatorAnswerDisplay = "";

/*
 * Referenced DOM nodes with variables for the use of
 * event listeners.
 */

const keyboard = document.getElementById("keyboard");
const metaScreen = document.getElementById("meta-screen");
const accumulatorScreen = document.getElementById("accumulator-screen");

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
    const str = accumulatorScreen.textContent;
    console.log(`I'm the content of ${str}`);

    if (str.charAt(str.length - 1) === ".") {
      console.log("I'm a decimal point");
      editAccumulator(1);
      disableDecimalPoint(false);
    } else if (str.charAt(str.length - 1) === " ") {
      console.log("I'm an operator");
      editAccumulator(3);
      disableOperators(false);
    } else {
      editAccumulator(1);
      console.log("I'm an operand");
    }
  }

  if (!accumulatorScreen.textContent) {
    accumulatorScreen.textContent = "0";
  }
};

editAccumulator = (charCount) => {
  accumulatorAnswerDisplay = accumulatorAnswerDisplay.slice(0, -charCount);
  accumulatorScreen.textContent = accumulatorAnswerDisplay;
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
  const equation = accumulatorAnswerDisplay.split(" ");

  const leftOperand = equation[0];
  const middleOperator = equation[1];

  if (equation[2] === "0") {
    alert("you can't use zero! try again with a sensible value.");
    resetCalc();
    return;
  }

  const rightOperand = equation[2];

  metaScreen.textContent = `${accumulatorAnswerDisplay} =`;

  operate(middleOperator, +leftOperand, +rightOperand);
};

operate = (operand, num1, num2) => {
  switch (operand) {
    case "+":
      add(num1, num2);
      break;
    case "−":
      subtract(num1, num2);
      break;
    case "×":
      multiply(num1, num2);
      break;
    case "÷":
      divide(num1, num2);
      break;
  }
};

add = (num1, num2) => {
  let total = num1 + num2;
  total = roundNumber(total);
  accumulatorScreen.textContent = total.toString();
  accumulatorAnswerDisplay = total.toString();
};

subtract = (num1, num2) => {
  let total = num1 - num2;
  total = roundNumber(total);
  accumulatorScreen.textContent = total.toString();
  accumulatorAnswerDisplay = total.toString();
};

multiply = (num1, num2) => {
  let total = num1 * num2;
  total = roundNumber(total);
  console.log(total);
  accumulatorScreen.textContent = total.toString();
  accumulatorAnswerDisplay = total.toString();
};

divide = (num1, num2) => {
  let total = num1 / num2;
  total = roundNumber(total);
  accumulatorScreen.textContent = total.toString();
  accumulatorAnswerDisplay = total.toString();
};

roundNumber = (number) => {
  return Math.round(number * 1000) / 1000;
};
