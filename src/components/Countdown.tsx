import { useState, useEffect, useContext } from "react";
import styles from "../styles/components/Countdown.module.css";
import { CountdownContext } from "../contexts/CountdownContext";

interface CountdownProps {
  
}

export function Countdown(props: CountdownProps) {
  const {minute, seconds, hasFinished, isActive, resetCountdown, startCountdown} = useContext(CountdownContext);

  const [minuteleft, minuteRight] = String(minute).padStart(2, "0").split("");
  const [secondsleft, secondsRight] = String(seconds).padStart(2, "0").split("");

  

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteleft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsleft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button className={`${styles.countDownButton} ${styles.countDownButtonActive} ${styles.countDownButtonFinished}`} disabled>
          Ciclo encerrado <img src="icons/check.svg" className={`${styles.icon} ${styles.check}`} />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar Ciclo <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
              <path d="M27 14.41L25.59 13L20 18.59L14.41 13L13 14.41L18.59 20L13 25.59L14.41 27L20 21.41L25.59 27L27 25.59L21.41 20L27 14.41Z" fill="#000"/>
            </svg>

            </button>
          ) : (
            <button
              type="button"
              className={styles.countDownButton}
              onClick={startCountdown}
            >
              Iniciar Ciclo <img src="icons/play.svg" className={styles.icon}/>
            </button>
          )}
        </>
      )}
    </div>
  );
}
