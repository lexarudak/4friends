import { VIDEO_VARIANT } from "../../const/const";
import { useLang } from "../../lang/useLang";
import { RulesBlock } from "./blocks/rules-block";
import { VideoBlock } from "./blocks/video-block";
import styles from "./rules-page.module.scss";

const getColoredList = (items: object) => (
  <ul>
    {Object.entries(items).map(([key, val], ind) => (
      <li className={styles.li}>
        <span className={styles[`color-${ind}`]}>{key}</span>
        <span>{val}</span>
      </li>
    ))}
  </ul>
);

export const RulesPage = (): JSX.Element => {
  const {
    messages: { rules, colorsList, colorsMatchList },
  } = useLang();

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>{rules.title}</h2>
      <RulesBlock title={"4friends"}>
        <p>{rules.forFriendsText}</p>
      </RulesBlock>
      <RulesBlock title={rules.bet}>
        <p>{rules.betText}</p>
        <VideoBlock src="/public/videos/bet.MP4">
          <p>{rules.betText2}</p>
          {getColoredList(colorsList)}
        </VideoBlock>
      </RulesBlock>
      <RulesBlock title={rules.points}>
        <p>
          {rules.pointsText}
          <a href="#">{rules.here}</a>
        </p>
        <p>{rules.pointsText2}</p>
        <VideoBlock
          src="/public/videos/points.MP4"
          variant={VIDEO_VARIANT.right}
        >
          <p>{rules.pointsText3}</p>
          {getColoredList(colorsMatchList)}
        </VideoBlock>
      </RulesBlock>
      <RulesBlock title={rules.stat}>
        <p>{rules.statText}</p>
        <VideoBlock src="/public/videos/stat.MP4">
          <p>{rules.statText2}</p>
        </VideoBlock>
      </RulesBlock>
    </section>
  );
};
