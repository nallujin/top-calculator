let num1;
let num2;
let operator;

function operate(operator, number1, number2) {
    switch (operator) {
        case "add":
            return add(number1, number2);
        case "subtract":
            return subtract(number1, number2);
        case "multiply":
            return multiply(number1, number2);
        case "divide":
            return divide(number1, number2);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;

}