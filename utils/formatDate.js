export default function formatDate(dataString) {
  // Cria um objeto Date a partir da string de data
  const data = new Date(dataString);

  // Verifica se a data é válida
  if (isNaN(data)) {
      return "-";
  }

  // Configuração do fuso horário para o Brasil
  const timeZone = 'America/Sao_Paulo';

  // Use a função toLocaleString para formatar a data com o fuso horário desejado
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
