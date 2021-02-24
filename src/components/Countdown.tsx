import { useState,useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

interface CountdownProps {
  start: number;
}

export function Countdown(props: CountdownProps) {
  const [time, setTime] = useState(props.start * 60);
  const [active, setActive] = useState(false);

  const minute = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteleft,minuteRight] = String(minute).padStart(2, '0').split('');
  const [secondsleft,secondsRight] = String(seconds).padStart(2, '0').split('');
  function startCountdown(){
    setActive(true)
  }

  useEffect(() => {
    if(active && time > 0){
      setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    }
  }, [active, time])

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
      <button type="button" className={styles.countDownButton} onClick={startCountdown}>
        Iniciar Ciclo
      </button>
    </div>
  );
}
