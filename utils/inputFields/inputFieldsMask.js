/**
 * Aplica a máscara de CPF a um valor.
 *
 * @param {string} value - Valor a ser formatado.
 * @returns {string} - Valor com a máscara de CPF aplicada.
 */
export const applyCPFMask = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os primeiros 3 dígitos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os próximos 3 dígitos
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um traço após os últimos 3 dígitos
    return value;
};

/**
 * Aplica a máscara de RG a um valor.
 *
 * @param {string} value - Valor a ser formatado.
 * @returns {string} - Valor com a máscara de RG aplicada.
 */
export const applyRGMask = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{2})(\d)/, '$1.$2'); // Coloca um ponto após os primeiros 2 dígitos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os próximos 3 dígitos
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um traço após os últimos 3 dígitos
    return value;
};

/**
 * Aplica a máscara de telefone a um valor.
 *
 * @param {string} value - Valor a ser formatado.
 * @returns {string} - Valor com a máscara de telefone aplicada.
 */
export const applyPhoneMask = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{2})(\d)/, '($1) $2'); // Coloca o formato (99) 99999-9999
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um traço após os primeiros 5 dígitos
    return value;
};

/**
 * Aplica a máscara de CEP (do Brasil) a um valor.
 *
 * @param {string} value - Valor a ser formatado.
 * @returns {string} - Valor com a máscara de CEP aplicada.
 */
export const applyCEPMask = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um traço após os primeiros 5 dígitos
    return value;
};


/**
 * Formata uma data e hora no formato desejado.
 *
 * @param {string} dateTimeString - Data e hora no formato 'YYYY-MM-DDTHH:mm:ss.sssZ'.
 * @returns {string} - Data e hora formatada no formato 'DD/MM/YYYY às HH:mm(am/pm)'.
 */
export const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    // Formatação da data
    const formattedDate = `${dateTime.getDate().toString().padStart(2, '0')}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')}/${dateTime.getFullYear()}`;

    // Formatação da hora
    let formattedHour = dateTime.getHours().toString().padStart(2, '0');
    let period = 'am';

    if (formattedHour >= 12) {
        formattedHour = (formattedHour - 12).toString().padStart(2, '0');
        period = 'pm';
    }

    if (formattedHour === '00') {
        formattedHour = '12';
    }

    const formattedTime = `${formattedHour}:${dateTime.getMinutes().toString().padStart(2, '0')}${period}`;

    return `${formattedDate} às ${formattedTime}`;
};


/**
 * Formata uma data no formato desejado.
 *
 * @param {string} dateString - Data no formato 'YYYY-MM-DD'.
 * @returns {string} - Data formatada no formato 'DD/MM/YYYY'.
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
};
