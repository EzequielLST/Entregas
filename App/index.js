
const exchangeRates = {
    ARG: { 
        EUR: 0.0010,
        USD: 0.0011,
        YUAN: 0.0082,
        REAL: 0.0058,
    },
    USD: {
        EUR: 954.25,
        ARG: 882.70,
        YUAN: 7.81,
        REAL: 5.56,  
    },
    EUR: { 
        USD: 1.18,
        REAL: 0.18,
        ARG: 0.0011,
        YUAN: 0.13,
    },
    YUAN: { 
        USD:0.14, 
        EUR: 0.13,
        REAL: 0.71,
        ARG: 122.14,
    },
    REAL: { //mal 
        USD: 0.19,
        ARG: 171.63,
        EUR: 0.18,
        YUAN: 1.41,
    },
}; 

function convertCurrency() {
    const amount = parseFloat(prompt("Ingrese la cantidad a convertir:"));
    
    if (isNaN(amount)) {
        console.log("Por favor, ingrese un número válido.");
        return;
    }

    const fromCurrency = prompt("Ingrese la moneda de origen (USD, EUR, ARG, YUAN, REAL):").toUpperCase();
    const toCurrency = prompt("Ingrese la moneda de destino (USD, EUR, ARG, YUAN, REAL):").toUpperCase();

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