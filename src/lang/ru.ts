type Message = {
  [key: string]: string;
};

const messages: {
  [key: string]: Message;
} = {
  global: {
    lang: "Ру",
    addRoom: "Добавить комнату",
    save: "Сохранить",
    clear: "Очистить",
    win: "поб",
    cancel: "Отменить",
    ok: "Принять",
  },
  auth: {
    reg: "Регистрация",
    login: "Войти",
    username: "Имя пользователя",
    pass: "Пароль",
    confPass: "Повторите пароль",
    email: "Электронная почта",
    room: "Комната",
    regBtn: "Зарегистрироваться",
    policy:
      "Я прочитал и согласен с Условиями обслуживания и Политикой конфиденциальности",
    apply: "Согласен",
  },
  menu: {
    home: "Главная",
    matchdays: "Все матчи",
    statistic: "Статистика",
    globalTop: "Общий рейтинг",
    rules: "Правила",
    logout: "Выйти",
  },
  timer: {
    countdown: "До начала матча",
    Days: "Дней",
    Hours: "Часов",
    Minutes: "Минут",
    Seconds: "Секунд",
  },
  nm: {
    title: "Следующие матчи",
    makeBets: "Сделайте ставки",
    saved: "Сохранено успешно!",
    noMatches: "Нет матчей в ближайшие 24 часа",
  },
  table: {
    top3: "Топ 3",
    moreStat: "Больше статистики",
  },
  stat: {
    title: "Статистика",
    total: "Таблица",
    exact: "Угадано точных счетов",
    wins: "Угадано побед",
    average: "В среднем очков за матч",
  },
  top: {
    title: "Общий рейтинг",
    top3: "Топ 3",
    table: "Таблица",
  },
  md: {
    title: "Все матчи",
    selectText: "Выберете даты",
    error: `Pick date in range 01/05/24 - 31/08/24`,
    all: "Все страны",
    filter: "Фильтр стран",
    refresh: "Обновить",
    noMatches: "Нет матчей в эти даты",
    clear: "Очистить",
  },
};

export default messages;
