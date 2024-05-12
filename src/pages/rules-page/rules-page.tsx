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
import { useIsLogin } from "../../hooks";

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
  const isLogin = useIsLogin();
  const {
    messages: { rules, colorsList, colorsMatchList, points },
  } = useLang();

  useEffect(() => {
    dispatch(setIsPageLoading(false));
  }, []);

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>
        {"4friends"}
        <span className={styles.subtitle}>{" | "}</span>
        {
          <Link
            to={isLogin ? ROUTE_LIST.home : ROUTE_LIST.login}
            className={styles.link}
          >
            {rules.start}
          </Link>
        }
      </h2>
      <RulesBlock>
        <p>{rules.forFriendsText}</p>
        <p className={styles.bold}>{rules.forFriendsText3}</p>
        <p>{rules.forFriendsText4}</p>
      </RulesBlock>
      <RulesBlock title={rules.bet}>
        <p>{rules.betText}</p>
        <VideoBlock src="/videos/bet.MP4">
          <p>{rules.betText2}</p>
          {getColoredList(colorsList, true)}
        </VideoBlock>
        <p>{rules.betText3}</p>
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
      <h2 id="calc">{rules.calc}</h2>
      <RulesBlock title={rules.calcGroup}>
        <div className={styles.imgContainer}>
          <div className={styles.img}>{getColoredList(points)}</div>
          <img src="/pic/win.png" className={styles.img} />
        </div>
      </RulesBlock>
      <RulesBlock title={rules.calcPlay}>
        <div className={styles.imgContainer}>
          <p className={classNames(styles.bold, styles.img)}>
            {rules.calcText2}
          </p>
          <img src="/pic/extraNotWin.png" className={styles.img} />
        </div>
        <p className={classNames(styles.italic)}>{rules.calcText4}</p>
        <div className={styles.imgContainer}>
          <img src="/pic/checkboxes.png" className={styles.img} />
          <p className={classNames(styles.bold, styles.img)}>
            {rules.calcText3}
          </p>
        </div>

        <p>
          <span>{rules.finish}</span>
          <Link
            to={isLogin ? ROUTE_LIST.home : ROUTE_LIST.login}
            className={styles.link}
          >
            {rules.start}
          </Link>
        </p>
      </RulesBlock>
      <p>
        <span>{rules.contacts}</span>
        <span className={styles.bold}>{rules.telegram}</span>
      </p>
    </section>
  );
};
