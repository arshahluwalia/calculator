document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentValue = '';
    let previousValue = '';
    let operation = null;

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            currentValue += button.textContent;
            display.value = currentValue;
        });
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            if (currentValue !== '') {
                if (previousValue !== '') {
                    calculate();
                }
                operation = button.textContent;
                previousValue = currentValue;
                currentValue = '';
            }
        });
    });

    document.querySelector('.equal').addEventListener('click', calculate);

    document.querySelector('.clear').addEventListener('click', () => {
        currentValue = '';
        previousValue = '';
        operation = null;
        display.value = '';
    });

    function calculate() {
        if (previousValue === '' || currentValue === '') return;
        
        const prev = parseFloat(previousValue);
        const curr = parseFloat(currentValue);
        let result;

        switch(operation) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '*': result = prev * curr; break;
            case '/': result = prev / curr; break;
            default: return;
        }

        display.value = result;
        currentValue = result.toString();
        previousValue = '';
        operation = null;
    }
});
