//Optional: Div einbauen in dem bisheriger Rechenverlauf angezeigt wird

//Optional: Code extra Functions of the calculator description in TOP

let currentNumber = "";
let chosenOperator = "";
let storedNumber = "";

const calcDisplay = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-button='number'");
const operatorButtons = document.querySelectorAll("[data-button='operator'");
const equalButton = document.querySelector("#buttonEquals");
const clearButton = document.getElementById("buttonClear");

numberButtons.forEach(button => {
    button.addEventListener("click", numberClicked => {
        storeValue(numberClicked);
        populateDisplay (currentNumber);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", handleOperatorButton);
});

equalButton.addEventListener("click", () => {
    if (validateInput()) {
        populateDisplay(operate(chosenOperator, storedNumber, currentNumber));  
    }
});

clearButton.addEventListener("click", clearAllData);

function operate (operator, number1, number2) {

    number1 = parseFloat(number1);
    number2 = parseFloat(number2);

    if (operator === ":" && number2 === 0) {
        throwErrorMessage("Division by 0 is not possible. Enter a different divisor!");
        currentNumber = "";
    }else {
        return (operator === "+") ? add(number1, number2) :
        (operator === "-") ? subtract(number1, number2) :
        (operator === "x") ? multiply(number1, number2) :
        (operator === ":") ? divide(number1, number2) :
        console.log("Something went wrong");
    }
    

    
}

function add (number1, number2) {
	return number1 + number2;
}

function subtract (number1, number2) {
	return number1 - number2; 
}

function multiply (number1, number2) {
    return number1 * number2; 
}

function divide (number1, number2) {
    return number1 / number2; 
}

function storeValue (numberClicked) {
    currentNumber += numberClicked.target.textContent;
}

function handleOperatorButton (operatorClicked) {
    //If user presses Operator button before entering anything
    if (!currentNumber && !storedNumber) {
        throwErrorMessage("That this works you need to type a number then an operator and then another number");

    //If user did everything as he is supposed to
    } else if (currentNumber && storedNumber) {

        populateDisplay(operate(chosenOperator, storedNumber, currentNumber));
        updateStoredNumber();
        currentNumber = "";
        updateChosenOperator(operatorClicked);

    //If user entered the very first number and clicked an operator button
    } else if (currentNumber && !storedNumber) {

        updateStoredNumber();
        updateChosenOperator(operatorClicked);
        currentNumber = "";

    //If user pressed operator button before entering a new number
    } else if (!currentNumber && storedNumber) {

        populateDisplay(operate(chosenOperator, storedNumber, storedNumber));
        updateStoredNumber();
        currentNumber = "";
        updateChosenOperator(operatorClicked);
    }
}

function populateDisplay (number) {
    calcDisplay.textContent = number;
}

function updateStoredNumber () {
    storedNumber = parseFloat(calcDisplay.textContent);
}

function updateChosenOperator (operatorClicked) {
    chosenOperator = operatorClicked.target.textContent;
}

function validateInput () {
    if (chosenOperator && storedNumber && currentNumber) {
        return true;
    } else {
        throwErrorMessage("That this works you need to type a number then an operator and then another number");
        return false;
    }
}

function throwErrorMessage (message) {
    alert (message);
}

function clearAllData () {
    currentNumber = "";
    chosenOperator = "";
    storedNumber = "";
    calcDisplay.textContent = "";
}
