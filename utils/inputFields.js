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

export const filterOptionsResidents = [
    { label: "Proprietário", value: "proprietario" },
    { label: "Mensal", value: "mensal" },
    { label: "Temporada", value: "temporada" },
    { label: "Ocupante", value: "ocupante" },
];
