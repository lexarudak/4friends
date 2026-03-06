import { NextMatch } from "../../../store/next-matches/next-matches.slice";

export type ValidateErrors = {
  [key: string]: string;
};

export const validator = (values: NextMatch[]) => {
  const errors: ValidateErrors = {};

  values.forEach(({ EXTRA, TEAM1, TEAM2, WINNER }, index) => {
    if (EXTRA && TEAM1.SCORE === TEAM2.SCORE && TEAM1.SCORE !== "") {
      if (WINNER !== 1 && WINNER !== 2) {
        errors[`[${index}].WINNER`] = "Winner should be picked";
      }
    }

    if (
      TEAM1.SCORE !== TEAM2.SCORE &&
      (TEAM1.SCORE === "" || TEAM2.SCORE === "")
    ) {
      errors[`[${index}].SCORE`] = "Set score or remove all values";
    }
  });

  return errors;
};
