export type Stat = {
  value: number;
  display: string;
  label: string;
  source: string;
};

export const STATS = {
  schoolAgeShare: {
    value: 40,
    display: "40%+",
    label: "of Liberia's population is of school-going age",
    source: "EMIS 2021-22, Republic of Liberia Ministry of Education",
  },

  gdpPerCapitaDaily: {
    value: 2.04,
    display: "$2.04",
    label: "the average daily income for a person in Liberia",
    source: "World Bank, GDP per capita 2022 ($744.62/year)",
  },

  primaryNER: {
    value: 46.3,
    display: "46.3%",
    label: "of primary-aged children enrolled in primary school",
    source: "EMIS 2021-22, Net Enrollment Rate",
  },

  juniorNER: {
    value: 20.7,
    display: "20.7%",
    label: "of junior-secondary-aged children enrolled in junior secondary",
    source: "EMIS 2021-22, Net Enrollment Rate",
  },

  seniorNER: {
    value: 17.1,
    display: "17.1%",
    label: "of senior-secondary-aged children enrolled in senior secondary",
    source: "EMIS 2021-22, Net Enrollment Rate",
  },

  primaryCompletionRate: {
    value: 10,
    display: "10%",
    label: "of Liberian children complete primary school",
    source: "EMIS 2021-22 Annual School Census (10% boys, 11% girls)",
  },

  uncertifiedTeachers: {
    value: 50.1,
    display: "1 in 2",
    label: "Liberian teachers has no teaching certificate",
    source: "EMIS 2021-22 (35,799 of 71,396 teachers)",
  },

  seniorMathTextbookRatio: {
    value: 32,
    display: "32",
    label: "students share a single math textbook in senior secondary",
    source: "EMIS 2021-22, Student-Textbook Ratio",
  },

  canoeSchools: {
    value: 109,
    display: "109",
    label: "schools in Liberia can only be reached by canoe",
    source: "EMIS 2021-22, Access to School",
  },

  overAgePrimary: {
    value: 218995,
    display: "218,995",
    label: "primary school children in Liberia are too old for their grade",
    source: "EMIS 2021-22, Annual School Census (38.1% of primary students)",
  },
} satisfies Record<string, Stat>;
