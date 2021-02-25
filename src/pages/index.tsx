import Head from "next/head";

import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import { useContext } from "react";

import { ChallengeContext } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";

export default function Home() {
  const { level } = useContext(ChallengeContext);
  var levelUser = "" + level;
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Moveit</title>
      </Head>
      <ExperienceBar />
      <CountdownProvider>
        <section>
          <div>
            <Profile
              avatarImage="https://github.com/Gabr13dev.png"
              nameProfile="Gabriel Almeida"
              level={levelUser}
            />
            <CompleteChallenges />

            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  );
}
