document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentValue = '';
    let previousValue = '';
    let operation = null;
    let resetDisplay = false;

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            if (resetDisplay) {
                currentValue = '';
                resetDisplay = false;
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
            if (currentValue === '' && previousValue === '') return;
            
            if (currentValue === '') {
                operation = button.textContent;
                return;
            }

            if (previousValue !== '') {
                calculate();
            }

            operation = button.textContent;
            previousValue = currentValue;
            currentValue = '';
            resetDisplay = true;
        });
    });

    document.querySelector('.equal').addEventListener('click', () => {
        if (currentValue === '' || previousValue === '') return;
        calculate();
        resetDisplay = true;
    });

    document.querySelector('.clear').addEventListener('click', clear);

    function calculate() {
        const prev = parseFloat(previousValue);
        const curr = parseFloat(currentValue);
        
        if (isNaN(prev) || isNaN(curr)) return;

        let result;
        switch(operation) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '*': result = prev * curr; break;
            case '/': 
                if (curr === 0) {
                    alert('Cannot divide by zero');
                    clear();
                    return;
                }
                result = prev / curr; 
                break;
            default: return;
        }

        // Round to prevent floating point issues
        currentValue = Math.round(result * 1000000) / 1000000;
        previousValue = '';
        operation = null;
        updateDisplay();
    }

    function clear() {
        currentValue = '';
        previousValue = '';
        operation = null;
        updateDisplay();
    }

    function updateDisplay() {
        display.value = currentValue || '0';
    }
});
