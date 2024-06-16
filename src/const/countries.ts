import { CountryKey } from "../store/next-matches/next-matches.slice";

export type CountryValue = {
  code2: string;
  code3: string;
  name: string;
};

export type CountriesType = Record<CountryKey, CountryValue>;

export const enCountries: CountriesType = {
  GER: { code2: "de", code3: "GER", name: "Germany" },
  SCO: { code2: "gb-sct", code3: "SCO", name: "Scotland" },
  HUN: { code2: "hu", code3: "HUN", name: "Hungary" },
  SUI: { code2: "ch", code3: "SUI", name: "Switzerland" },
  ESP: { code2: "es", code3: "ESP", name: "Spain" },
  CRO: { code2: "hr", code3: "CRO", name: "Croatia" },
  ITA: { code2: "it", code3: "ITA", name: "Italy" },
  ALB: { code2: "al", code3: "ALB", name: "Albania" },
  SVN: { code2: "si", code3: "SVN", name: "Slovenia" },
  DEN: { code2: "dk", code3: "DEN", name: "Denmark" },
  SRB: { code2: "rs", code3: "SRB", name: "Serbia" },
  ENG: { code2: "gb-eng", code3: "ENG", name: "England" },
  POL: { code2: "pl", code3: "POL", name: "Poland" },
  NED: { code2: "nl", code3: "NED", name: "Netherlands" },
  AUT: { code2: "at", code3: "AUT", name: "Austria" },
  FRA: { code2: "fr", code3: "FRA", name: "France" },
  BEL: { code2: "be", code3: "BEL", name: "Belgium" },
  SVK: { code2: "sk", code3: "SVK", name: "Slovakia" },
  ROU: { code2: "ro", code3: "ROU", name: "Romania" },
  UKR: { code2: "ua", code3: "UKR", name: "Ukraine" },
  TUR: { code2: "tr", code3: "TUR", name: "Turkey" },
  GEO: { code2: "ge", code3: "GEO", name: "Georgia" },
  POR: { code2: "pt", code3: "POR", name: "Portugal" },
  CZE: { code2: "cz", code3: "CZE", name: "Czech Republic" },
  EUR: { code2: "eu", code3: "EUR", name: "EURO 2024" },
};

export const ruCountries: CountriesType = {
  GER: { code2: "de", code3: "ГЕР", name: "Германия" },
  SCO: { code2: "gb-sct", code3: "ШОТ", name: "Шотландия" },
  HUN: { code2: "hu", code3: "ВЕН", name: "Венгрия" },
  SUI: { code2: "ch", code3: "ШВЕ", name: "Швейцария" },
  ESP: { code2: "es", code3: "ИСП", name: "Испания" },
  CRO: { code2: "hr", code3: "ХОР", name: "Хорватия" },
  ITA: { code2: "it", code3: "ИТА", name: "Италия" },
  ALB: { code2: "al", code3: "АЛБ", name: "Албания" },
  SVN: { code2: "si", code3: "СЛО", name: "Словения" },
  DEN: { code2: "dk", code3: "ДАН", name: "Дания" },
  SRB: { code2: "rs", code3: "СЕР", name: "Сербия" },
  ENG: { code2: "gb-eng", code3: "АНГ", name: "Англия" },
  POL: { code2: "pl", code3: "ПОЛ", name: "Польша" },
  NED: { code2: "nl", code3: "НИД", name: "Нидерланды" },
  AUT: { code2: "at", code3: "АВС", name: "Австрия" },
  FRA: { code2: "fr", code3: "ФРА", name: "Франция" },
  BEL: { code2: "be", code3: "БЕЛ", name: "Бельгия" },
  SVK: { code2: "sk", code3: "СЛО", name: "Словакия" },
  ROU: { code2: "ro", code3: "РУМ", name: "Румыния" },
  UKR: { code2: "ua", code3: "УКР", name: "Украина" },
  TUR: { code2: "tr", code3: "ТУР", name: "Турция" },
  GEO: { code2: "ge", code3: "ГРУ", name: "Грузия" },
  POR: { code2: "pt", code3: "ПОР", name: "Португалия" },
  CZE: { code2: "cz", code3: "ЧЕХ", name: "Чехия" },
  EUR: { code2: "eu", code3: "EUR", name: "ЕВРО 2024" },
};
