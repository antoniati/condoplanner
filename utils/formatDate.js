export default function formatDate(dataString) {
    // Cria um objeto Date a partir da string de data
    const data = new Date(dataString);
  
    // Verifica se a data é válida
    if (isNaN(data)) {
      return "-";
    }
  
    // Extraia o dia, mês e ano da data
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses são indexados de 0 a 11, então somamos 1.
    const ano = data.getFullYear();
  
    // Formata a data no formato (dd-mm-yyyy)
    const formattedDate = `${dia.toString().padStart(2, "0")}-${mes.toString().padStart(2, "0")}-${ano}`;
  
    return formattedDate;
  }