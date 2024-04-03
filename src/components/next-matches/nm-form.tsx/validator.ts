import { NextMatch } from "../../../store/next-matches/next-matches.slice";

export type ValidateErrors = {
  [key: string]: string;
};

export const validator = (values: NextMatch[]) => {
  const errors: ValidateErrors = {};

  values.forEach(({ extra, team1, team2, winner }, index) => {
    if (extra && team1.score === team2.score && team1.score !== "") {
      if (winner !== 1 && winner !== 2) {
        errors[`[${index}].winner`] = "Winner should be picked";
      }
    }

    if (
      team1.score !== team2.score &&
      (team1.score === "" || team2.score === "")
    ) {
      errors[`[${index}].score`] = "Set score or remove all values";
    }
  });

  return errors;
};
