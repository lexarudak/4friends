import { useEffect } from "react";
import { VIDEO_VARIANT } from "../../const/const";
import { useLang } from "../../lang/useLang";
import { RulesBlock } from "./blocks/rules-block";
import { VideoBlock } from "./blocks/video-block";
import styles from "./rules-page.module.scss";
import { useDispatch } from "react-redux";
import { setIsPageLoading } from "../../store/app/app.slice";
import { Link } from "react-router-dom";
import { ROUTE_LIST } from "../../router/route-list";
import classNames from "classnames";

const getColoredList = (items: object, color?: boolean) => (
  <ul>
    {Object.entries(items).map(([key, val], ind) => (
      <li className={styles.li}>
        <span className={color ? styles[`color-${ind}`] : styles.bold}>
          {key}
        </span>
        <span>{val}</span>
      </li>
    ))}
  </ul>
);

export const RulesPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    messages: { rules, colorsList, colorsMatchList, points },
  } = useLang();

  useEffect(() => {
    dispatch(setIsPageLoading(false));
  }, []);

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>{rules.title}</h2>
      <RulesBlock title={"4friends"}>
        <p>{rules.forFriendsText}</p>
      </RulesBlock>
      <RulesBlock title={rules.bet}>
        <p>{rules.betText}</p>
        <VideoBlock src="/videos/bet.MP4">
          <p>{rules.betText2}</p>
          {getColoredList(colorsList, true)}
        </VideoBlock>
      </RulesBlock>
      <RulesBlock title={rules.points}>
        <p>
          {rules.pointsText}
          <a href="#calc" className={styles.link}>
            {rules.here}
          </a>
        </p>
        <p>{rules.pointsText2}</p>
        <VideoBlock src="/videos/points.MP4" variant={VIDEO_VARIANT.right}>
          <p>{rules.pointsText3}</p>
          {getColoredList(colorsMatchList, true)}
        </VideoBlock>
      </RulesBlock>
      <RulesBlock title={rules.stat}>
        <p>{rules.statText}</p>
        <VideoBlock src="/videos/stat.MP4">
          <p>{rules.statText2}</p>
        </VideoBlock>
      </RulesBlock>
      <RulesBlock title={rules.calc} id="calc">
        <div className={styles.imgContainer}>
          <div className={styles.img}>{getColoredList(points)}</div>
          <img src="/pic/win.png" className={styles.img} />
        </div>
      </RulesBlock>
      <RulesBlock title={rules.calcPlay}>
        <p>{rules.calcText2}</p>
        <div className={styles.imgContainer}>
          <img src="/pic/extraNotWin.png" className={styles.img} />
          <p className={classNames(styles.bold, styles.img)}>
            {rules.calcText3}
          </p>
        </div>
        <p>
          <span>{rules.finish}</span>
          <Link to={ROUTE_LIST.home} className={styles.link}>
            {rules.start}
          </Link>
        </p>
      </RulesBlock>
    </section>
  );
};
