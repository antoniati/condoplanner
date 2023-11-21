/**
 * Campos de entrada para formulário de cadastro de usuários.
 */
export const usersInputFields = [
    {
        label: "E-mail",
        type: "email",
        name: "userEmail",
        maxLength: ""
    },
    {
        label: "Senha",
        type: "password",
        name: "userPassword",
        maxLength: ""
    },
    {
        label: "Confirmar Senha",
        type: "password",
        name: "confirmPassword",
        maxLength: ""
    },
];

/**
 * Campos de entrada para dados pessoais em formulários.
 */
export const inputsPersonalDataValues = [
    {
        label: "Nome Completo",
        placeholder: "Nome Exemplo da Silva",
        type: "text",
        name: "residentFullName",
        maxLength: ""
    },
    {
        label: "RG",
        placeholder: "00.000.000-0",
        type: "text",
        name: "residentRgNumber",
        maxLength: 12
    },
    {
        label: "CPF",
        placeholder: "000.000.000-00",
        type: "text",
        name: "residentCpfNumber",
        maxLength: 14
    },
    {
        label: "Data de Nascimento",
        placeholder: "dd/mm/aaaa",
        type: "date",
        name: "dateOfBirthOfResident",
        maxLength: ""
    },
    {
        label: "E-mail",
        placeholder: "exemplo@email.com",
        type: "email",
        name: "residentEmail",
        maxLength: ""
    },
    {
        label: "Telefone de Contato",
        placeholder: "(00) 00000-0000",
        type: "text",
        name: "residentContactPhone",
        maxLength: 15
    },
    {
        label: "Ocupação",
        placeholder: "Advogado, Médico...",
        type: "text",
        name: "residentOcupation",
        maxLength: ""
    },
    {
        label: "Parentesco",
        placeholder: "Pai, Mãe, Filho...",
        type: "text",
        name: "kinshipResident",
        maxLength: ""
    },
];

/**
 * Campos de entrada para dados de endereço em formulários.
 */
export const inputsAddressValues = [
    {
        label: "CEP",
        placeholder: "00000-000",
        type: "text",
        name: "residentZipCode",
        maxLength: 9
    },
    {
        label: "Rua",
        placeholder: "Rua Aprovada",
        type: "text",
        name: "residentStreet",
        maxLength: ""
    },
    {
        label: "Complemento",
        placeholder: "Ex: 11, 11A, ...",
        type: "text",
        name: "streetComplement",
        maxLength: ""
    },
    {
        label: "Bairro",
        placeholder: "Vila Macarena",
        type: "text",
        name: "residentNeighborhood",
        maxLength: ""
    },
    {
        label: "Cidade",
        placeholder: "São Paulo",
        type: "text",
        name: "residentCity",
        maxLength: ""
    },
    {
        label: "Estado",
        placeholder: "SP",
        type: "text",
        name: "residentState",
        maxLength: ""
    },
];

/**
 * Opções de filtro para tipos de residentes.
 */
export const filterOptionsResidents = [
    { label: "Proprietário", value: "proprietario" },
    { label: "Alugante Mensal", value: "mensal" },
    { label: "Alugante por Temporada", value: "temporada" },
    { label: "Ocupante", value: "ocupante" },
];

/**
 * Campos de entrada para dados de unidade condominial em formulários.
 */
export const condoUnitInputFields = [
    {
        label: "CPF do Títular",
        placeholder: "000.000.000-00",
        type: "text",
        name: "residentCpfNumber",
        maxLength: 14
    },
    {
        label: "Número da Unidade",
        placeholder: "Ex: 01, 10, 1011,...",
        type: "text",
        name: "condoUnitNumber",
        maxLength: 5
    },
    {
        label: "Bloco",
        placeholder: "Ex: A, B, C,...",
        type: "text",
        name: "condoUnitBlock",
        maxLength: 1
    },
];

/**
 * Opções de filtro para status de unidades condominiais.
 */
export const filterOptionsCondoUnits = [
    { label: "Morando", value: "morando" },
    { label: "Aluguel Mensal", value: "mensal" },
    { label: "Aluguel por Temporada", value: "temporada" },
    { label: "Emprestada", value: "emprestada" },
    { label: "Reformando", value: "reformando" },
    { label: "Vazia", value: "vazia" },
];
