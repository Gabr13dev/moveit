import styles from '../styles/components/CompleteChallenges.module.css';

interface CompleteChallengesProps {
  complete: string;
}

export function CompleteChallenges(props: CompleteChallengesProps) {
    return(
        <div className={styles.completeChallengesContainer}>
           <span>Desafios Completos</span>
           <span>{props.complete}</span>
        </div>
    );
}