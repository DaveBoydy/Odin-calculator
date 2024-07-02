let numOperand1 = 0;
let numOperand2 = 0;
let numOperator = "";

/*
 * Setup event listeners (observers) after the page 'load' event fires
 * so that all page elements are loaded before any logic is executed.
 */
addEventListener("load", (event) => {
  add();
  subtract();
  multiply();
  divide();

  console.log("The page is fully loaded.");
});

/*
 * Implemented controller logic to respond to calls
 * from event listeners with appropriate action(s) I.E. processing.
 */

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
    default:
      console.log(`Sorry, ${operand} not recognized.`);
  }
};
