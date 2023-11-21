/**
 * Remove caracteres não numéricos de uma string.
 *
 * @param {string} value - Valor a ser limpo.
 * @returns {string} - Valor contendo apenas caracteres numéricos.
 */
export function removeNonNumericCharacters(value) {
  return value.replace(/\D/g, '');
}

/**
 * Limpa uma string, removendo caracteres não numéricos e tenta converter para um número inteiro.
 *
 * @param {string} value - Valor a ser limpo e convertido.
 * @returns {number|string} - Valor numérico inteiro ou a própria string se a conversão falhar.
 */
export default function sanitizedAndParseInt(value) {
  // Se o valor não for uma string, ou for uma string vazia, retorne o próprio valor.
  if (typeof value !== "string" || value.trim() === "") {
    return value;
  }

  // Remova caracteres não numéricos
  const numericValue = removeNonNumericCharacters(value);

  // Tente converter a string em um número usando parseInt.
  const parsedValue = parseInt(numericValue, 10);

  // Verifique se o valor resultante é um número válido.
  if (!isNaN(parsedValue)) {
    return parsedValue;
  } else {
    return value; // Se a conversão falhar, retorne o próprio valor.
  }
}
