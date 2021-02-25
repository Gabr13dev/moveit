import { ChallengeContext } from '../contexts/ChallengesContext';
import { useContext } from 'react';
import styles from '../styles/components/ExperienceBar.module.css';


export function ExperienceBar() {
  const {currentExperience, experinceToNextLevel} = useContext(ChallengeContext)

  const percentToNextLevel = Math.round(currentExperience * 100) / experinceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: percentToNextLevel + "%" }} />

        <span className={styles.currentExperience} style={{ left: percentToNextLevel + "%" }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experinceToNextLevel} xp</span>
    </header>
  );
}
