document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('demoButton');
    const result = document.getElementById('result');
    let clickCount = 0;

    button.addEventListener('click', () => {
        clickCount++;
        result.textContent = `You clicked the button ${clickCount} time${clickCount === 1 ? '' : 's'}!`;
    });
});
