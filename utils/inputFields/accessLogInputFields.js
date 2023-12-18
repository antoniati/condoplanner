export const accesLogFieldsNames = [
      'condoUnitNumber',
      'checkIn',
      'checkOut',
];

export const accessLogCondoUnitField = [
      {
            label: "Insira o Número da Unidade",
            placeholder: "Ex:  01, 23, 456, ...",
            type: "text",
            name: accesLogFieldsNames[0],
            maxLength: 5
      },
]
export const accessLogDateField = [
      {
            label: "Check-In (Entrada)",
            placeholder: "",
            type: "date",
            name: accesLogFieldsNames[1],
            maxLength: ""
      },
      {
            label: "Check-Out (Saída)",
            placeholder: "",
            type: "date",
            name: accesLogFieldsNames[2],
            maxLength: ""
      },
]

export const filterOptionsAccessLog = [
      { label: "Ativo", value: "ativo" },
      { label: "Pendente", value: "pendente" },
      { label: "Finalizado", value: "finalizado" },
];