export function removeNonNumericCharacters(value) {
    return value.replace(/\D/g, '');
}

export default function sanitizedAndParInt(value) {
    // Se o valor não for uma string, ou for uma string vazia, retorne 0.
    if (typeof value !== "string" || value.trim() === "") {
      return 0;
    }
  
    // Remova caracteres não numéricos
    const numericValue = removeNonNumericCharacters(value);
  
    // Tente converter a string em um número usando parseInt.
    const parsedValue = parseInt(numericValue, 10);
  
    // Verifique se o valor resultante é um número válido.
    if (!isNaN(parsedValue)) {
      return parsedValue;
    } else {
      return 0; // Se a conversão falhar, retorne 0.
    }
  }
