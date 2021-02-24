import styles from '../styles/components/ExperienceBar.module.css';

interface ExperienceBarProps {
  current: number;
  max: string;
  min: string;
}

export function ExperienceBar(props: ExperienceBarProps) {
  var minXp: number = +props.min;
  var maxXp: number = +props.max;
  let currentXp = 100 * (props.current - minXp) / (maxXp - minXp);
  currentXp = currentXp > 100 ? 100 : currentXp;
  currentXp = currentXp < 0 ? 0 : currentXp;
  let txtCurrent = currentXp == 100 ? 'Completo' : props.current + " xp";
  return (
    <header className={styles.experienceBar}>
      <span>{props.min}xp</span>
      <div>
        <div style={{ width: currentXp + "%" }} />

        <span className={styles.currentExperience} style={{ left: currentXp + "%" }}>
          {txtCurrent}
        </span>
      </div>
      <span>{props.max} xp</span>
    </header>
  );
}
