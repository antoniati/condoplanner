export const condoUnitFieldsNames = [
      'residents',
      'condoUnitNumber',
      'condoUnitBlock',
      'condoUnitStatus',
      'condoUnitImages',
];


export const condoUnitDataInputFields = [
      {
            label: "Número da Unidade",
            placeholder: "Ex: 01, 10, 1011,...",
            type: "text",
            name: condoUnitFieldsNames[1],
            maxLength: 5
      },
      {
            label: "Bloco",
            placeholder: "Ex: A, B, C,...",
            type: "text",
            name: condoUnitFieldsNames[2],
            maxLength: 1
      },
];

export const filterOptionsCondoUnits = [
      { label: "Morando", value: "morando" },
      { label: "Aluguel Mensal", value: "mensal" },
      { label: "Aluguel por Temporada", value: "temporada" },
      { label: "Emprestada", value: "emprestada" },
      { label: "Reformando", value: "reformando" },
      { label: "Vazia", value: "vazia" },
];


export const condoUnitFormInitialData = {
      condoUnitNumber: "",
      condoUnitBlock: "",
      condoUnitStatus: "",
}