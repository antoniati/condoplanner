export const residentFieldsNames = [
      'residentImage', // [0]
      'residentFullName', // [1]
      'residentRgNumber', // [2]
      'residentCpfNumber', // [3]
      'dateOfBirthOfResident', // [4]
      'residentEmail', // [5]
      'residentContactPhone', // [6]
      'residentOcupation', // [7]
      'kinshipResident', // [8]
      'typeOfResident', // [9]
      'residentZipCode', // [10]
      'residentStreet', // [11]
      'streetComplement', // [12]
      'residentNeighborhood', // [13]
      'residentCity', // [14]
      'residentState', // [15]
];

export const residentPersonalDataInputFields = [
      {
            label: "Nome Completo",
            placeholder: "Nome Exemplo da Silva",
            type: "text",
            name: residentFieldsNames[1],
            maxLength: ""
      },
      {
            label: "RG",
            placeholder: "00.000.000-0",
            type: "text",
            name: residentFieldsNames[2],
            maxLength: 12
      },
      {
            label: "CPF",
            placeholder: "000.000.000-00",
            type: "text",
            name: residentFieldsNames[3],
            maxLength: 14
      },
      {
            label: "Data de Nascimento",
            placeholder: "dd/mm/aaaa",
            type: "date",
            name: residentFieldsNames[4],
            maxLength: ""
      },
      {
            label: "E-mail",
            placeholder: "exemplo@email.com",
            type: "email",
            name: residentFieldsNames[5],
            maxLength: ""
      },
      {
            label: "Telefone de Contato",
            placeholder: "(00) 00000-0000",
            type: "text",
            name: residentFieldsNames[6],
            maxLength: 15
      },
      {
            label: "Ocupação",
            placeholder: "Advogado, Médico...",
            type: "text",
            name: residentFieldsNames[7],
            maxLength: ""
      },
      {
            label: "Parentesco",
            placeholder: "Pai, Mãe, Filho...",
            type: "text",
            name: residentFieldsNames[8],
            maxLength: ""
      },
];

export const residentAdressInputFields = [
      {
            label: "CEP",
            placeholder: "00000-000",
            type: "text",
            name: residentFieldsNames[10],
            maxLength: 9
      },
      {
            label: "Rua",
            placeholder: "Rua Aprovada",
            type: "text",
            name: residentFieldsNames[11],
            maxLength: ""
      },
      {
            label: "Complemento",
            placeholder: "Ex: 11, 11A, ...",
            type: "text",
            name: residentFieldsNames[12],
            maxLength: ""
      },
      {
            label: "Bairro",
            placeholder: "Vila Macarena",
            type: "text",
            name: residentFieldsNames[13],
            maxLength: ""
      },
      {
            label: "Cidade",
            placeholder: "São Paulo",
            type: "text",
            name: residentFieldsNames[14],
            maxLength: ""
      },
      {
            label: "Estado",
            placeholder: "SP",
            type: "text",
            name: residentFieldsNames[15],
            maxLength: ""
      },
];

export const residentAddressFormInitialData = {
      residentZipCode: "",
      residentStreet: "",
      streetComplement: "",
      residentNeighborhood: "",
      residentCity: "",
      residentState: "",
}

export const residentPersonalDataFormInitialData = {
      residentFullName: "",
      residentRgNumber: "",
      residentCpfNumber: "",
      dateOfBirthOfResident: "",
      residentEmail: "",
      residentContactPhone: "",
      residentOcupation: "",
      kinshipResident: "",
      typeOfResident: "",
}