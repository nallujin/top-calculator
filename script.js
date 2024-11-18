let num1 = "";
let num2;
let operator;


inputNumbers();
inputOperators()

function operate(operator, number1, number2) {
    switch (operator) {
        case "addition":
            return add(number1, number2);
        case "subtraction":
            return subtract(number1, number2);
        case "multiplication":
            return multiply(number1, number2);
        case "division":
            return divide(number1, number2);
    }
}

function inputNumbers() {
    const numberBtnS = document.querySelectorAll(".number");
    numberBtnS.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (num1.length <= 8) num1 = num1.concat(btn.textContent);
            renderScreen();
        });
    });
}

function inputOperators() {
    const operatorBtnS = document.querySelectorAll(".operator");
    operatorBtnS.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.id === "clear") {
                // Clear all values
                num1 = "";
                num2 = null;
                operator = null;
                renderScreen("0");
            } else if (btn.id === "evaluation") {
                if (num1 && num2 && operator) {
                    // Perform the calculation
                    const result = operate(operator, parseFloat(num2), parseFloat(num1));
                    renderScreen(result);

                    // Update history
                    const history = `${num2} ${operatorSymbol(operator)} ${num1}`;
                    document.querySelector("p.history").textContent = history;

                    // Prepare for a new operation
                    num1 = result.toString();
                    num2 = null;
                    operator = null;
                }
            } else {
                // Handle operator button presses
                if (num1) {
                    if (num2 && operator) {
                        // If an operation is already in progress, calculate the intermediate result
                        const result = operate(operator, parseFloat(num2), parseFloat(num1));
                        num2 = result.toString(); // Store the result as the new `num2`
                    } else {
                        num2 = num1; // Store the first number
                    }
                    operator = btn.id; // Update the operator
                    num1 = ""; // Reset `num1` for the next input

                    // Update the history display
                    renderScreen();
                }
            }
        });
    });
}

function renderScreen(value) {
    const presentValue = document.querySelector("p.number-displayed");
    const pastValue = document.querySelector("p.history");

    // Update the main display
    if (value !== undefined) {
        presentValue.textContent = value; // Show the final result or updated number
    } else {
        presentValue.textContent = num1 || "0"; // Show the current number or default to 0
    }

    // Update the history display (num2 and operator)
    pastValue.textContent = num2 && operator
        ? `${num2} ${operatorSymbol(operator)}`
        : ""; // Show `num2 operator` if available, otherwise clear it
}

function operatorSymbol(operator) {
    switch (operator) {
        case "addition": return "+";
        case "subtraction": return "-";
        case "multiplication": return "×";
        case "division": return "÷";
        default: return "";
    }
}

function add(a, b) {
    return parseFloat((a + b).toFixed(10))
}

function subtract(a, b) {
    return parseFloat((a - b).toFixed(10))
}

function multiply(a, b) {
    return parseFloat((a * b).toFixed(10))
}

function divide(a, b) {
    if (b === 0) return "Error";
    return parseFloat((a / b).toFixed(10))
}
