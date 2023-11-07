export const usersInputFields = [
    {
        label: "E-mail",
        type: "email",
        name: "userEmail",
    },
    {
        label: "Senha",
        type: "password",
        name: "userPassword",
    },
    {
        label: "Confirmar Senha",
        type: "password",
        name: "confirmPassword",
    },
];

export const inputsPersonalDataValues = [
    {
        label: "Nome Completo",
        placeholder: "Nome Exemplo da Silva",
        type: "text",
        name: "residentFullName",
    },
    {
        label: "RG",
        placeholder: "00.000.000-0",
        type: "text",
        name: "residentRgNumber",
    },
    {
        label: "CPF",
        placeholder: "000.000.000-00",
        type: "text",
        name: "residentCpfNumber",
    },
    {
        label: "Data de Nascimento",
        placeholder: "dd/mm/aaaa",
        type: "date",
        name: "dateOfBirthOfResident",
    },
    {
        label: "E-mail",
        placeholder: "exemplo@email.com",
        type: "email",
        name: "residentEmail",
    },
    {
        label: "Telefone de Contato",
        placeholder: "(00) 00000-0000",
        type: "text",
        name: "residentContactPhone",
    },
    {
        label: "Ocupação",
        placeholder: "Advogado, Médico...",
        type: "text",
        name: "residentOcupation",
    },
    {
        label: "Parentesco",
        placeholder: "Pai, Mãe, Filho...",
        type: "text",
        name: "kinshipResident",
    },
];

export const inputsAddressValues = [
    {
        label: "CEP",
        placeholder: "00000-000",
        type: "text",
        name: "residentZipCode",
    },
    {
        label: "Rua",
        placeholder: "Rua Aprovada",
        type: "text",
        name: "residentStreet",
    },
    {
        label: "Complemento",
        placeholder: "Ex: 11, 11A, ...",
        type: "number",
        name: "streetComplement",
    },
    {
        label: "Bairro",
        placeholder: "Vila Macarena",
        type: "text",
        name: "residentNeighborhood",
    },
    {
        label: "Cidade",
        placeholder: "São Paulo",
        type: "text",
        name: "residentCity",
    },
    {
        label: "Estado",
        placeholder: "SP",
        type: "text",
        name: "residentState",
    },
];

export const filterOptionsResidents = [
    { label: "Proprietário", value: "proprietário" },
    { label: "Mensal", value: "mensal" },
    { label: "Temporada", value: "temporada" },
    { label: "Ocupante", value: "ocupante" },
];
