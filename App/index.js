document.getElementById('convertForm').addEventListener('submit', function(event) {
    event.preventDefault();
    convertCurrency();
    displayHistory();
});

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (isNaN(amount)) {
        alert("Por favor, ingrese un número válido.");
        return;
    }

    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    try {
        const response = await fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=6a3f5530954d7a2b885c3f74cbe7c3428fc19198&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&format=json`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const convertedAmount = parseFloat(data.rates[toCurrency].rate_for_amount);

        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        
        saveToHistory(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
    } catch (error) {
        console.error("Error en la conversión de moneda:", error);
        alert("Error en la conversión de moneda");
    }
}

function saveToHistory(conversion) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    
    if (history.length >= 10) {
        history.shift();  // Elimina el primer elemento si hay 10 o más conversiones
    }
    
    history.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
}

function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];

    history.forEach(conversion => {
        const li = document.createElement('li');
        li.textContent = conversion;
        historyList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', displayHistory);

