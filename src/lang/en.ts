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
    rules: "Rules",
    logout: "Log out",
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
    noMatches: "No matches in the next 24 h",
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
    forFriendsText:
      "4friends is a platform for competing with friends! Make predictions for the EURO 2024 matches, score points, follow the statistics and win! You can bet on a box of Pepsi or an orange peel. We will make sure the game is fun and all the results are counted correctly. Good luck!",
    howToPlayTitle: "How to play",
    bet: "Make your bet!",
    betText:
      "When there are 48 hours left until the match, it appears on the main page. Now you can place a bet.",
    betText2: "The color of the card will indicate the status of your bet:",
    points: "Get points",
    pointsText:
      "As a result of each match, the player receives points. You will find the scoring system with examples ",
    pointsText2:
      "After the start of the match, you will be able to see the bets made by other players",
    pointsText3: "Matches also have color indication:",
    stat: "Follow the statistic",
    statText:
      'On the "Statistics" page, in addition to the main table with points, you will find statistics on guessed victories, exact scores, and the average number of points per match',
    statText2:
      'On the "Global top" page, you will see the overall rating of all players in all rooms. If you are in several, your best indicator is taken',
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
};

export default messages;
