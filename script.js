document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentValue = '';
    let previousValue = '';
    let operation = null;
    let resetDisplay = false;
    let lastResult = false;

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            if (resetDisplay || lastResult) {
                currentValue = '';
                resetDisplay = false;
            }
            if (lastResult && !operation) {
                previousValue = '';
                lastResult = false;
            }
            // Prevent multiple zeros at start
            if (button.textContent === '0' && currentValue === '0') return;
            // Prevent multiple decimal points
            if (button.textContent === '.' && currentValue.includes('.')) return;
            currentValue += button.textContent;
            updateDisplay();
        });
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            lastResult = false;
            if (currentValue === '' && previousValue === '') return;
            
            if (currentValue === '') {
                operation = getOperatorSymbol(button.textContent);
                updateDisplay();
                return;
            }

            if (previousValue !== '') {
                calculate();
            }

            operation = getOperatorSymbol(button.textContent);
            previousValue = currentValue;
            currentValue = '';
            resetDisplay = true;
            updateDisplay();
        });
    });

    document.querySelector('.backspace').addEventListener('click', () => {
        if (currentValue.length > 0) {
            currentValue = currentValue.slice(0, -1);
            updateDisplay();
        }
    });

    document.querySelector('.equal').addEventListener('click', () => {
        if (currentValue === '' || previousValue === '') return;
        calculate();
        resetDisplay = true;
    });

    document.querySelector('.clear').addEventListener('click', clear);

    // Add keyboard support
    document.addEventListener('keydown', (event) => {
        event.preventDefault();
        
        // Numbers (including numpad) and decimal
        if (/^[0-9.]$/.test(event.key) || (event.key >= 'Numpad0' && event.key <= 'Numpad9') || event.key === 'NumpadDecimal') {
            const key = event.key.startsWith('Numpad') ? event.key.slice(-1) : event.key;
            const buttonToClick = Array.from(document.querySelectorAll('.number')).find(btn => btn.textContent === key);
            if (buttonToClick) buttonToClick.click();
        }
        
        // Operators
        switch (event.key) {
            case '+':
            case 'Add':
                Array.from(document.querySelectorAll('.operator')).find(btn => btn.textContent === '+')?.click();
                break;
            case '-':
            case 'Subtract':
                Array.from(document.querySelectorAll('.operator')).find(btn => btn.textContent === '−')?.click();
                break;
            case '*':
            case 'Multiply':
                Array.from(document.querySelectorAll('.operator')).find(btn => btn.textContent === '×')?.click();
                break;
            case '/':
            case 'Divide':
                Array.from(document.querySelectorAll('.operator')).find(btn => btn.textContent === '÷')?.click();
                break;
            case 'Enter':
            case '=':
                document.querySelector('.equal').click();
                break;
            case 'Escape':
                document.querySelector('.clear').click();
                break;
            case 'Backspace':
                document.querySelector('.backspace').click();
                break;
        }
    });

    function calculate() {
        const prev = parseFloat(previousValue);
        const curr = parseFloat(currentValue);
        
        if (isNaN(prev) || isNaN(curr)) return;

        let result;
        switch(operation) {
            case '+': result = prev + curr; break;
            case '−': result = prev - curr; break;
            case '×': result = prev * curr; break;
            case '÷': 
                if (curr === 0) {
                    alert('Cannot divide by zero');
                    clear();
                    return;
                }
                result = prev / curr; 
                break;
            default: return;
        }

        currentValue = Math.round(result * 1000000) / 1000000;
        previousValue = currentValue;
        operation = null;
        lastResult = true;
        updateDisplay();
    }

    function getOperatorSymbol(op) {
        switch(op) {
            case '÷': return '÷';
            case '×': return '×';
            case '−': return '−';
            case '+': return '+';
            default: return op;
        }
    }

    function clear() {
        currentValue = '';
        previousValue = '';
        operation = null;
        updateDisplay();
    }

    function updateDisplay() {
        if (operation && previousValue) {
            display.value = `${previousValue} ${operation} ${currentValue || ''}`;
        } else {
            display.value = currentValue || '0';
        }
    }
});
