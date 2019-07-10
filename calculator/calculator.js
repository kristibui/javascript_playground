// SIMPLE CALCULATOR PROGRAM

// global variables
let input_one;
let input_two;
let operand;
let decimal = 1;  // Decimal
let decimal_flag = false; // Decimal flag

// Addition
function add(x, y) {
  return x + y;
}

// Subtraction
function subtract(x, y) {
  return x - y;
}

// Multiplication
function multiply(x, y) {
  return x * y;
}

// Division
function divide(x, y) {
  if (y == 0) {
    return 'error'
  } else {
  return x / y;
  }
}

// Takes operator and 2 numbers,
// then calls one of the above functions (add/subtract/multiply/divide)
function operate(operator, x, y) {

  if (operator == "+") {
    return add(x, y);

  } else if (operator == "-") {
    return subtract(x, y);

  } else if (operator == "x") {
    return multiply(x, y);

  } else if (operator == "÷") {
    return divide(x, y);
  }
}

// Initializes event listeners to each button
function toggle_onclick() {

  // Get list of buttons to configure
  let button_list = document.querySelectorAll('button');

  button_list.forEach((button) => {

    // Listener
    button.addEventListener('click', (event) => {

      // Display text in the input
      populate_input(button);
    });
  });

}

// Populates the display when user clicks the number buttons
function populate_input(button) {

  // 1. Get value of button
  let button_val = button.innerText;

  // 2. Display this value in the input, if it is a number or operand
  let input = document.querySelector('#input_text');


  // CALCULATING VALUE -----
  // 1. If value is 'C', clear calculator & the variables
  if (button_val == 'C') {
    input_one = undefined;
    input_two = undefined;
    operator = undefined;
    decimal = 1;
    decimal_flag = false;
    input.innerText = '';

  // 2. Premature '=': don't do anything
  } else if ((input_one == undefined || input_two == undefined)
              && (button_val == "=")) {

  // 3. Decimal (only one)
  } else if (button_val == ".") {

    if (input.innerText.includes(".")) {
      return;

    } else {
      if (isNaN(input.innerText)) {
        input.innerText = ".";
      } else {
        input.innerText = input.innerText + ".";
      }
      decimal_flag = true;
    }

  // 4. If input_one is undefined, set input_one variable
  } else if ((input_one == undefined) && (!isNaN(button_val))) {
    input_one = (button_val * decimal);
    input.innerText = input_one;

  // 5. If input_one is defined but nothing else, add more numbers
  } else if ((input_one !== undefined) && (input_two == undefined) &&
              (operand == undefined) && (!isNaN(button_val))) {
    input_one = input_one + (button_val * decimal);
    input.innerText = input.innerText + button_val;

  // 6. If input_one is defined and user clicks on a non-value, set operand
  //    equal to the value
  } else if ((input_one !== undefined) && (input_two == undefined) &&
              (isNaN(button_val))) {
    operand = button_val;
    input.innerText = operand;

    // Reset decimals
    decimal_flag = false;
    decimal = 1;

  // 7. If input_one is defined, operand is defined and user clicks on a value,
  //    set value of input_two
  } else if ((input_one !== undefined) && (operand !== undefined) &&
            (input_two == undefined) && (!isNaN(button_val))) {
    input_two = button_val * decimal;
    input.innerText = input_two;

  // 8. If input_one is defined but nothing else, add more numbers
  } else if ((input_one !== undefined) && (input_two !== undefined) &&
              (operand !== undefined) && (!isNaN(button_val))) {
    input_two = input_two + (button_val * decimal);
    input.innerText = input.innerText + button_val;
  }

  // If all of them are defined, calculate
  if ((input_one !== undefined) && (input_two !== undefined) &&
      (operand !== undefined) && button_val == "=") {
        let result = operate(operand, parseFloat(input_one),
                      parseFloat(input_two));

        // Trim super long integers
        if ((String(result).replace(/[^0-9]/g,"").length >= 9) &&
            (Math.abs(result) >= 1)) {
          result = result.toExponential();

        } else if ((String(result).replace(/[^0-9]/g,"").length >= 9) &&
            (Math.abs(result) <= 1)) {
          result = parseFloat(result.toFixed(6));
        }

        input.innerText = result;

        // Edgecase: division by 0
        if (String(result).includes("error")) {
          input_one = undefined;
          input_two = undefined;
          operand = undefined;

        // Reset: set result = input_one, reset other variables
        } else {
          input_one = result;
          input_two = undefined;
          operand = undefined;
        }
      }

      // Decimal Reset
      if (decimal_flag) {
      decimal = decimal * (1/10);
    }
}

// Execute program
toggle_onclick();
