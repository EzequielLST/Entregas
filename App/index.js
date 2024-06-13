const exchangeRates = {
    ARG: { 
        EUR: 0.0010,
        USD: 0.0011,
        YUAN: 0.0082,
        REAL: 0.0058,
    },
    USD: {
        EUR: 0.95,
        ARG: 882.70,
        YUAN: 7.81,
        REAL: 5.56,  
    },
    EUR: { 
        USD: 1.18,
        REAL: 5.56,
        ARG: 882.70,
        YUAN: 7.69,
    },
    YUAN: { 
        USD: 0.14, 
        EUR: 0.13,
        REAL: 0.71,
        ARG: 122.14,
    },
    REAL: {
        USD: 0.19,
        ARG: 171.63,
        EUR: 0.18,
        YUAN: 1.41,
    },
}; 

document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();
    convertCurrency();
    displayHistory();
});

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (isNaN(amount)) {
        alert("Por favor, ingrese un número válido.");
        return;
    }

    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
        alert("Las tasas de cambio no están definidas para las monedas ingresadas.");
        return;
    }
    
    const convertedAmount = calculateConversion(amount, fromCurrency, toCurrency);
    
    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    
    saveToHistory(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
}

function calculateConversion(amount, fromCurrency, toCurrency) {
    const rate = exchangeRates[fromCurrency][toCurrency];
    return amount * rate;
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