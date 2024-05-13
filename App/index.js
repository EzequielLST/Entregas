/*
const exchangeRates = {
    ARG: { //esta mal
        EUR: 951.84,
        USD: 0.0011,
        YUAN: 122.10,
        REAL: 171.92,
    },
    USD: {
        EUR: 0.93,
        ARG: 882.70,
        YUAN: 7.23,
        REAL: 5.15,  
    },
    EUR: { //mal
        USD: 1.18,
        REAL: 0.18,
        ARG: 0.0011,
        YUAN: 0.13,
    },
    YUAN: { //mal
        USD:7.23, 
        EUR: 7.79,
        REAL: 1.41,
        ARG: 0.0082,
    },
    REAL: { //mal 
        USD: 5.16,
        ARG: 0.0058,
        EUR: 5.55,
        YUAN: 0.71
    }
}; */

function convertCurrency() {
    const amount = parseFloat(prompt("Ingrese la cantidad a convertir:"));
    
    if (isNaN(amount)) {
        console.log("Por favor, ingrese un número válido.");
        return;
    }

    const fromCurrency = prompt("Ingrese la moneda de origen (USD, EUR, ARG, YUAN, REAL):").toUpperCase();
    const toCurrency = prompt("Ingrese la moneda de destino (USD o EUR o YUAN o REAL):").toUpperCase();

    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
        console.log("Las tasas de cambio no están definidas para las monedas ingresadas.");
        return;
    }
    
    const convertedAmount = calculateConversion(amount, fromCurrency, toCurrency);
    
    console.log(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
}


function calculateConversion(amount, fromCurrency, toCurrency) {
    const rate = exchangeRates[fromCurrency][toCurrency];
    return amount * rate;
}


convertCurrency();