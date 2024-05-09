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
};

export default messages;
