


function appendNumber(number) {
    const display = document.getElementById('display');
    display.value += number;
    checkOperators();
}

function appendOperator(operator, symbol) {
    const display = document.getElementById('display');
    const value = display.value;
    const lastChar = value[value.length - 1];

    if (value === '' || isNaN(lastChar) && lastChar !== ')') {
        return;
    }
    display.value += symbol;  // Show symbol (like ×) on screen
    checkOperators();
}

function clearDisplay() {
    document.getElementById('display').value = '';
    checkOperators();
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    checkOperators();
}

function evaluateResult() {
    const display = document.getElementById('display');
    let expression = display.value;
     if (expression === '') {
        alert('Please enter a valid expression!');
        return;  
    }
    
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
     expression = handlePercentage(expression);
    try {
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
    checkOperators();
}

   function handlePercentage(expr) {
     if (/\d+%\d+/.test(expr)) {
        throw new Error("Invalid percentage usage");
     }
    return expr.replace(/(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)%/, (match, num1, _, operator, num2) => {
        const percentage = (parseFloat(num1) * parseFloat(num2)) / 100;
        return `${num1}${operator}${percentage}`;
    });
}



function checkOperators() {
    const display = document.getElementById('display');
    const value = display.value.trim();
    const lastChar = value[value.length - 1];

    const disable = (value === '' || isNaN(lastChar));

    ['divide', 'multiply', 'add','percentage'].forEach(id => {
        document.getElementById(id).disabled = disable;
    });
}

window.onload = function () {
    checkOperators();
};


document.addEventListener('keydown', (event) => {
    const key = event.key;
    const display = document.getElementById('display');

    if (!isNaN(key) || key === '.') {
        appendNumber(key);
        event.preventDefault();
    } else if (key === '+') {
        appendOperator('+', '+');
        event.preventDefault();
    } else if (key === '-') {
        const lastChar = display.value.trim().slice(-1);
        if (display.value === '' || lastChar === '(') {
            appendNumber('-'); 
        } else {
            appendOperator('-', '-');
        }
        event.preventDefault();
    } else if (key === '*' || key === 'x' || key === 'X') {
        appendOperator('*', '×');
        event.preventDefault();
    } else if (key === '/') {
        appendOperator('/', '÷');
        event.preventDefault();
    } else if (key === '%') {
        appendOperator('%', '%');
        event.preventDefault();
    } else if (key === 'Enter' || key === '=') {
        evaluateResult();
        event.preventDefault();
    } else if (key === 'Backspace') {
        deleteLast();
        event.preventDefault();
    } else if (key === 'Escape') {
        clearDisplay();
        event.preventDefault();
    } else if (key === '(') {
        appendNumber('(');
        event.preventDefault();
    } else if (key === ')') {
        appendNumber(')');
        event.preventDefault();
    }
});
