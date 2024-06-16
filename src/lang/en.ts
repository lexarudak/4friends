type Message = {
  [key: string]: string;
};

const messages: {
  [key: string]: Message;
} = {
  global: {
    lang: "En",
    addRoom: "Add room",
    save: "Save",
    clear: "Clear",
    win: "win",
    cancel: "Cancel",
    ok: "Ok",
    euro: "EURO 2024",
  },
  euro: {
    group: "Group",
    eight: "1/8",
    four: "1/4",
    half: "1/2",
    final: "Final",
  },
  auth: {
    reg: "Register",
    login: "Login",
    username: "Username",
    pass: "Password",
    confPass: "Confirm Password",
    email: "Email",
    room: "Room",
    regBtn: "Register",
    policy: "I have read and agree to the Terms of Service and Privacy Policy",
    apply: "Apply",
  },
  menu: {
    home: "Home",
    matchdays: "MATCHDAYS",
    statistic: "Statistic",
    globalTop: "Global Top",
    rules: "4friends",
    logout: "Log out",
    login: "Login",
    euro2024: "EURO 2024",
  },
  timer: {
    countdown: "Countdown",
    Days: "Days",
    Hours: "Hours",
    Minutes: "Minutes",
    Seconds: "Seconds",
  },
  nm: {
    title: "Next matches",
    makeBets: "Make your bets",
    saved: "Saved successfully!",
    noMatches: "No matches in the next 48 h",
  },
  table: {
    top3: "Top 3",
    moreStat: "More statistic",
  },
  stat: {
    title: "Statistic",
    total: "Total Score",
    exact: "Exact Score Hits",
    wins: "Predicted Wins",
    average: "Average Points per Match",
  },
  top: {
    title: "Global top",
    top3: "Top 3",
    table: "Total Score",
  },
  md: {
    title: "MATCHDAYS",
    selectText: "Select date range to show",
    error: `Pick date in range 01/05/24 - 31/08/24`,
    all: "All countries",
    filter: "Country filter",
    refresh: "Refresh",
    noMatches: "No matches on these dates",
    clear: "Clear",
  },
  rules: {
    title: "Rules",
    lang2: "Для смены языка в мобильной версии воспользуйтесь кнопкой  меню.",
    lang: "To change the language in the mobile version, use the menu button.",
    forFriendsText:
      "4friends is a platform for competitions with friends! Make predictions for the EURO 2024 matches, earn points, follow the statistics and win!",
    forFriendsText2:
      "In our app, you can bet on anything - a box of soda or a chocolate cake, the latest issue of 'Science' magazine or a comic book subscription, an orange peel or an honorary certificate.",
    forFriendsText3:
      "In our app, you decide what your prize pool will be and how it will be distributed among the winners.",
    forFriendsText4:
      "We will ensure that the game is fun and all results are calculated correctly and on time.",
    howToPlayTitle: "How to play",
    bet: "Place a bet!",
    betText:
      "When there are 48 hours left until the match, it appears on the main page. Now you can make and save your prediction.",
    betText2: "The color of the card will indicate the status of your bet:",
    betText3:
      "The countdown to the start of the match indicates when the next match will start.",
    here: "here",
    points: "Earn Points",
    pointsText:
      "As a result of each match, the player receives points. You will find the scoring system with examples ",
    pointsText2:
      "After the start of the match, you will be able to see the bets made by other players.",
    pointsText3: "Matches also have color indication:",
    stat: "Keep track of the statistics",
    statText:
      'On the "Statistics" page, in addition to the main table with points, you will find statistics on guessed victories, exact scores, and the average number of points per match',
    statText2:
      'On the "Overall rating" page, you will see the overall rating of all players in all rooms. If you are in several, your best indicator is taken',
    calc: "Point calculation",
    calcGroup: "Group stage",
    calcPlay: "Play-off",
    calcText2:
      "Points are calculated in the same way as in the group stage (i.e. according to the '3-2-1' system) in accordance with the prediction made and the final score on the scoreboard.*",
    calcText3:
      'The "win" checkbox brings an additional 2 points if the player made a correct prediction on which team will advance to the next round.',
    calcText4:
      "*It doesn't matter whether the match ended in regular or extra time, the final score on the scoreboard matters. ",
    finish: "Good luck with the game! ",
    start: "Start",
    contacts:
      "To launch a room for yourself and your friends, contact us on telegram ",
    telegram: "@friendseuro2024",
  },
  colorsMatchList: {
    Grey: " - match has not started yet",
    Yellow: " - match is going on right now",
    Green: " - match has ended",
  },
  colorsList: {
    Grey: " - bet is not placed",
    Yellow: " - bet is being edited",
    Green: " - bet is saved",
  },
  points: {
    "3 points": " - guessed the exact score and the winner",
    "2 points":
      " - guessed the winner and the difference in goals, but did not guess the exact score",
    "1 point":
      " - guessed the correct outcome of the match, but did not guess the difference in goals",
  },
};

export default messages;
