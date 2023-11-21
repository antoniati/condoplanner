/**
 * Formata uma string de data para o formato localizado do Brasil.
 *
 * @param {string} dataString - String de data a ser formatada.
 * @returns {string | null} - String formatada no formato localizado do Brasil ou null se a string de data for inválida.
 */
export default function formatDate(dataString) {
  // Cria um objeto Date a partir da string de data
  const data = new Date(dataString);

  // Verifica se a data é inválida
  if (isNaN(data)) {
    return null;
  }

  // Define o fuso horário para São Paulo
  const timeZone = 'America/Sao_Paulo';

  // Ajusta a data para o fuso horário de São Paulo
  data.setTime(data.getTime() + data.getTimezoneOffset() * 60 * 1000);

  // Formata a data para o formato localizado do Brasil
  const formattedDate = data.toLocaleString('pt-BR', {
    timeZone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return formattedDate;
}
