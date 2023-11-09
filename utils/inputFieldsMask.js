export const applyCPFMask = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os primeiros 3 dígitos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os próximos 3 dígitos
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um traço após os últimos 3 dígitos
    return value;
};

export const applyRGMask = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{2})(\d)/, '$1.$2'); // Coloca um ponto após os primeiros 2 dígitos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os próximos 3 dígitos
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um traço após os últimos 3 dígitos
    return value;
};

export const applyPhoneMask = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{2})(\d)/, '($1) $2'); // Coloca o formato (99) 99999-9999
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um traço após os primeiros 5 dígitos
    return value;
};
