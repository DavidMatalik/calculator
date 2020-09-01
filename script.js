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