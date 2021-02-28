import styles from '../styles/components/Profile.module.css';

import Cookies from 'js-cookie'

interface ProfileProps {
  avatarImage: string;
  nameProfile: string;
  level: string;
}

export function Profile(props: ProfileProps) {

    const currentLevel = props.level == 'undefined' ? Cookies.level : props.level;
    return(
        <div className={styles.profileContainer}>
            <img src={props.avatarImage} alt={props.nameProfile} />
            <div>
                <strong>{props.nameProfile}</strong>
                <p>
                    <img src="icons/level.svg" alt="levelIcon" />
                    Level {currentLevel}
                    </p>
            </div>
        </div>
    );
}