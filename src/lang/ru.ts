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
    rules: "4friends",
    logout: "Выйти",
    login: "Войти",
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
    noMatches: "Нет матчей в ближайшие 48 часов",
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
  rules: {
    title: "Правила",
    lang: "Для смены языка в мобильной версии воспользуйтесь кнопкой  меню.",
    lang2: "To change the language in the mobile version, use the menu button.",
    forFriendsText:
      "4friends - это площадка для соревнований с друзьями! Делайте прогнозы на матчи EURO 2024, зарабатывайте баллы, следите за статистикой и побеждайте!",
    forFriendsText2:
      "В нашем приложении вы можете спорить на что угодно — на ящик газировки или шоколадный торт, на новейший выпуск журнала «Science» или на подписку на комиксы, на кожуру от апельсина или почетную грамоту.",
    forFriendsText3:
      "В нашем приложении вы сами решаете, что будет вашим призовым фондом и как он распределится между победителями.",
    forFriendsText4:
      "Мы позаботимся о том, чтобы игра прошла весело а все результаты были подсчитаны верно и своевременно.",
    howToPlayTitle: "Как играть",
    bet: "Сделайте ставку!",
    betText:
      "Когда до матча остается 48 часов, он появляется на главной странице. Теперь Вы можете сделать и сохранить свой прогноз.",
    betText2: "Цвет карточки подскажет, в каком состоянии ваша ставка:",
    betText3:
      "Обратный отсчет до начала матча указывает через какое время начнется следующий матч.",
    here: "тут",
    points: "Зарабатывайте баллы",
    pointsText:
      "По результату каждого матча игроку начисляются баллы. Систему подсчета очков с примерами Вы найдете ",
    pointsText2:
      "После начала матча Вы сможете увидеть, какие ставки сделали другие игроки.",
    pointsText3: "У матчей тоже есть цветовая индикация:",
    stat: "Следите за статистикой",
    statText:
      'На странице "Статистика", помимо основной таблицы с очками, Вы найдете статистику по угаданным победам, точным счетам и среднему количеству очков за матч.',
    statText2:
      'На странице "Общий рейтинг" Вы увидите общий рейтинг всех игроков во всех комнатах. Если Вы состоите в нескольких, то берется Ваш лучший показатель.',
    calc: "Подсчет баллов",
    calcGroup: "Групповой этап",
    calcPlay: "Плей-офф",
    calcText2:
      "Расчет баллов осуществляется таким же образом, как и на групповом этапе (т.е. по системе «3-2-1») в соответствии со сделанным прогнозом и финальным счетом на табло.*",
    calcText3:
      'Чекбокс "поб" приносит дополнительные 2 балла в случае, если игрок сделал верный прогноз на то, какая команда пройдет в следующий раунд.',
    calcText4:
      "*Не имеет значения, закончился матч в основное или дополнительное время, важен итоговый счет на табло.",
    finish: "Удачной игры! ",
    start: "Начать",
    contacts:
      "Для того, чтобы запустить комнату для себя и своих друзей, свяжитесь с нами в телеграме ",
    telegram: "@friendseuro2024",
  },
  colorsMatchList: {
    Серый: " - матч еще не начался",
    Жёлтый: " - матч идет прямо сейчас",
    Зелёный: " - матча окончен",
  },
  colorsList: {
    Серый: " - ставка не сделана",
    Жёлтый: " - ставка редактируется",
    Зелёный: " - ставка сохранена",
  },
  points: {
    "3 балла": " - угадан точный счет и победитель",
    "2 балла": " - угадан победитель и разница мячей, но не угадан точный счет",
    "1 балл": " - угадан верный исход матча, но не угадана разница мячей",
  },
};

export default messages;
