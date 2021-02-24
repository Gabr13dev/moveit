import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
  avatarImage: string;
  nameProfile: string;
  level: string;
}

export function Profile(props: ProfileProps) {
    return(
        <div className={styles.profileContainer}>
            <img src={props.avatarImage} alt={props.nameProfile} />
            <div>
                <strong>{props.nameProfile}</strong>
                <p>
                    <img src="icons/level.svg" alt="levelIcon" />
                    Level {props.level}
                    </p>
            </div>
        </div>
    );
}