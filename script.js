//Optional: Div einbauen in dem bisheriger Rechenverlauf angezeigt wird

//Optional: Code extra Functions of the calculator description in TOP

    const calculator = (function() {

        let _displayNumber = '';
        let _chosenOperator = '';
        let _storedNumber = '';

        //cache Dom
        const _elements = document.querySelector('#calcContainer');
        const _display = _elements.querySelector('#display');
        const _numberButtons = _elements.querySelectorAll(`[data-button='number'`);
        const _operatorButtons = _elements.querySelectorAll(`[data-button='operator'`);
        const _equalButton = _elements.querySelector('#buttonEquals');
        const _clearButton = _elements.querySelector('#buttonClear');

        //bind Events
        _numberButtons.forEach(button => {
            button.addEventListener('click', _storeValue)
        });
        _operatorButtons.forEach(button => {
            button.addEventListener('click', _handleOperatorButton);
        })
        _clearButton.addEventListener('click', _clearAllData);
        _equalButton.addEventListener('click', _validateInput);

        //calc Logic
        function add (num1, num2) {return num1 + num2}
        function subtract (num1, num2) {return num1 - num2}
        function multiply (num1, num2) {return num1 * num2}
        function divide (num1, num2) {
            if (checkDivisorZero(num2)) {
                return;
            } 
            return num1 / num2;
        }

        function checkDivisorZero(numberToCheck) {
            if (numberToCheck === 0) {
                handleDivisorZero();
                return true;
            }
            return false;
        }

        function handleDivisorZero() {
            _throwErrorMessage('Division by 0 is not possible. Enter a different divisor!');
            _displayNumber = '';
        }

        function _operate (operator, number1, number2) {
            number1 = parseFloat(number1);
            number2 = parseFloat(number2);
        
                return (operator === '+') ? add(number1, number2) :
                (operator === '-') ? subtract(number1, number2) :
                (operator === 'x') ? multiply(number1, number2) :
                (operator === ':') ? divide(number1, number2) :
                console.log('Something went wrong');   
        }

        function _validateInput () {     
            if (_chosenOperator && _storedNumber && _displayNumber) {
                _updateDisplay(_operate(_chosenOperator, _storedNumber, _displayNumber));
            } else {
                _throwErrorMessage('That this works you need to type a number then an operator and then another number');
            }
        }

        function _storeValue (numberClicked) {
            _displayNumber += numberClicked.target.textContent;
            _updateDisplay(_displayNumber);
        }

        function _updateDisplay (number) {
            _display.textContent = number;
        }

        function _updateStoredNumber () {
            _storedNumber = parseFloat(_display.textContent);
        }
        
        function _updateChosenOperator (operatorClicked) {
            _chosenOperator = operatorClicked.target.textContent;
        }

        function _handleOperatorButton  (operatorClicked) {
            //If user presses Operator button before entering anything
            if (!_displayNumber && !_storedNumber) {
                _throwErrorMessage('That this works you need to type a number then an operator and then another number');
        
            //If user did everything as he is supposed to
            } else if (_displayNumber && _storedNumber) {
        
                _updateDisplay(_operate(_chosenOperator, _storedNumber, _displayNumber));
                _updateStoredNumber();
                _displayNumber = '';
                _updateChosenOperator(operatorClicked);
        
            //If user entered the very first number and clicked an operator button
            } else if (_displayNumber && !_storedNumber) {
        
                _updateStoredNumber();
                _updateChosenOperator(operatorClicked);
                _displayNumber = '';
        
            //If user pressed operator button before entering a new number
            } else if (!_displayNumber && _storedNumber) {
        
                _updateDisplay(_operate(_chosenOperator, _storedNumber, _storedNumber));
                _updateStoredNumber();
                _displayNumber = '';
                _updateChosenOperator(operatorClicked);
            }
        }

        function _clearAllData  () {
            _displayNumber = '';
            _chosenOperator = '';
            _storedNumber = '';
            _updateDisplay('');
        }

        function _throwErrorMessage  (message) {
            alert (message);
        }

        return{add, subtract, multiply, divide};
})();




/*let currentNumber = '';
let _chosenOperator = '';
let _storedNumber = '';

const calcDisplay = document.getElementById('display');
const _numberButtons = document.querySelectorAll('[data-button='number'');
const _operatorButtons = document.querySelectorAll('[data-button='operator'');
const _equalButton = document.querySelector('#buttonEquals');
const _clearButton = document.getElementById('buttonClear');

_numberButtons.forEach(button => {
    button.addEventListener('click', numberClicked => {
        _storeValue(numberClicked);
        populateDisplay (currentNumber);
    });
});

_operatorButtons.forEach(button => {
    button.addEventListener('click', _handleOperatorButton);
});

_equalButton.addEventListener('click', () => {
    if (_validateInput()) {
        populateDisplay(_operate(_chosenOperator, _storedNumber, currentNumber));  
    }
});

_clearButton.addEventListener('click', _clearAllData);

function _operate (operator, number1, number2) {

    number1 = parseFloat(number1);
    number2 = parseFloat(number2);

    if (operator === ':' && number2 === 0) {
        _throwErrorMessage('Division by 0 is not possible. Enter a different divisor!');
        currentNumber = '';
    }else {
        return (operator === '+') ? add(number1, number2) :
        (operator === '-') ? subtract(number1, number2) :
        (operator === 'x') ? multiply(number1, number2) :
        (operator === ':') ? divide(number1, number2) :
        console.log('Something went wrong');
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

function _storeValue (numberClicked) {
    currentNumber += numberClicked.target.textContent;
}

function _handleOperatorButton (operatorClicked) {
    //If user presses Operator button before entering anything
    if (!currentNumber && !_storedNumber) {
        _throwErrorMessage('That this works you need to type a number then an operator and then another number');

    //If user did everything as he is supposed to
    } else if (currentNumber && _storedNumber) {

        populateDisplay(_operate(_chosenOperator, _storedNumber, currentNumber));
        _updateStoredNumber();
        currentNumber = '';
        _updateChosenOperator(operatorClicked);

    //If user entered the very first number and clicked an operator button
    } else if (currentNumber && !_storedNumber) {

        _updateStoredNumber();
        _updateChosenOperator(operatorClicked);
        currentNumber = '';

    //If user pressed operator button before entering a new number
    } else if (!currentNumber && _storedNumber) {

        populateDisplay(_operate(_chosenOperator, _storedNumber, _storedNumber));
        _updateStoredNumber();
        currentNumber = '';
        _updateChosenOperator(operatorClicked);
    }
}

function populateDisplay (number) {
    calcDisplay.textContent = number;
}

function _updateStoredNumber () {
    _storedNumber = parseFloat(calcDisplay.textContent);
}

function _updateChosenOperator (operatorClicked) {
    _chosenOperator = operatorClicked.target.textContent;
}

function _validateInput () {
    if (_chosenOperator && _storedNumber && currentNumber) {
        return true;
    } else {
        _throwErrorMessage('That this works you need to type a number then an operator and then another number');
        return false;
    }
}

function _throwErrorMessage (message) {
    alert (message);
}

function _clearAllData () {
    currentNumber = '';
    _chosenOperator = '';
    _storedNumber = '';
    calcDisplay.textContent = '';
}*/