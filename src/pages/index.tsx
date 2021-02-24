import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  var min: string = "4000";
  var max: string = "5000";
  var current: number = 4700;
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Moveit</title>
      </Head>
      <ExperienceBar current={current} min={min} max={max} />

      <section>
        <div>
          <Profile avatarImage="https://github.com/Gabr13dev.png" nameProfile="Gabriel Almeida" level="8" />
          <CompleteChallenges complete="37" />
          <Countdown start={25} />
        </div>
        <div>

        </div>
      </section>
    </div>
  );
}
