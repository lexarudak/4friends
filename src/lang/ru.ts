type Message = {
  [key: string]: string;
};

const messages: {
  [key: string]: Message;
} = {
  global: {
    lang: "Ру",
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
    globalTop: "Рейтинг",
    rules: "Правила",
    logout: "Выйти",
  },
};

export default messages;
