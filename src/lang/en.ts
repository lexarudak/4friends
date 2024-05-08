type Message = {
  [key: string]: string;
};

const messages: {
  [key: string]: Message;
} = {
  global: {
    lang: "En",
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
};

export default messages;
