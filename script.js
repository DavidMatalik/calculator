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

function operate (operator, number1, number2) {
    return (operator === "+") ? add(number1, number2) :
    (operator === "-") ? subtract(number1, number2) :
    (operator === "*") ? multiply(number1, number2) :
    (operator === "/") ? divide(number1, number2) :
    console.log("Something went wrong");
}

//Was noch nicht funktioniert: Fehlermeldung wenn ich auf Operator klicke --> Muss da ne andere Funktion als für equal Button einbauen oder irgendwie anders lösen

let currentNumber = "";
let chosenOperator = "";
let storedNumber = "";

const calcDisplay = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-button='number'");
const operatorButtons = document.querySelectorAll("[data-button='operator'");
const equalButton = document.querySelector("#buttonEquals");

numberButtons.forEach(button => {
    button.addEventListener("click", numberClicked => {
        storeValue(numberClicked);
        populateDisplay (currentNumber);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", operatorClicked => {
        
        //Falls currentNumber und storedNumber leer sind, dann werfe eine Fehlermeldung

        if (!currentNumber && !storedNumber) {
            throwErrorMessage();

        //Falls currentNumber mit etwas befüllt und storedNumber mit etwas befüllt:
        } else if (currentNumber && storedNumber) {
            //Dann berechne Ergebnis von storedNumber mit currentNumber mit richtigen Operator
            //Dann zeige Ergebnis im Taschenrechner
            //Dann update storedNumber auf Ergebnis
            //Dann update chosenOperator auf aktuell gedrückten Operator

            populateDisplay(calculate());
            updateStoredNumber();
            currentNumber = "";
            updateChosenOperator(operatorClicked);

        //Falls currentNumber mit etwas befüllt aber storedNumber noch nicht: 
        } else if (currentNumber && !storedNumber) {
            //dann update storedNumber mit currentNumber
            //dann update chosenOperator auf aktuell gedrückten Operator

            updateStoredNumber();
            updateChosenOperator(operatorClicked);
            currentNumber = "";

        //Falls storedNumber mit etwas befüllt aber keine neue Zahl eingegeben wurde
        } else if (!currentNumber && storedNumber) {
            //Dann verrechne storedNumber mit sich selbst, dazu: 
            //setzte currentNumber auf storedNumber usw.
            currentNumber = storedNumber;
            populateDisplay(calculate());
            updateStoredNumber();
            currentNumber = "";
            updateChosenOperator(operatorClicked);
        }
        
    });
});

equalButton.addEventListener("click", () => {
    if (validateInput()) {
        populateDisplay(calculate());  
    }
});

function storeValue (numberClicked) {
    currentNumber += numberClicked.target.textContent;
}

function populateDisplay (number) {
    calcDisplay.textContent = number;
}

function calculate () {
    let result = (chosenOperator === "+") ? storedNumber + parseFloat(currentNumber): 
                 (chosenOperator === "-") ? storedNumber - parseFloat(currentNumber):
                 (chosenOperator === ":") ? storedNumber / parseFloat(currentNumber): 
                 (chosenOperator === "x") ? storedNumber * parseFloat(currentNumber):0;

    return (result % 1 === 0) ? result : (Math.round(result * 100) / 100) ;
    
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
        throwErrorMessage();
        return false;
    }
}

function throwErrorMessage () {
    alert ("That this works you need to type a number then an operator and then another number");
}

