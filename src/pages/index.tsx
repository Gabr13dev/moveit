import Head from "next/head";

import { GetServerSideProps }  from 'next'

import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import Cookies from "js-cookie";

import {
  FaGithub,
  FaCircleNotch,
  FaRegLightbulb,
  FaLightbulb,
} from "react-icons/fa";

import { useContext, useState, useEffect } from "react";

import { ChallengeContext, ChallengeProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";
import connect from "../styles/components/ConnectGitCard.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [hasLogged, setLogged] = useState(false);
  const [erro, setErro] = useState(false);
  const [load, setLoad] = useState(false);

  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [nome, setNome] = useState("");

  const { level, challengesCompleted, currentExperience } = useContext(ChallengeContext);
  var levelUser = String(level);

  function switchTheme() {
    var currentTheme = Cookies.get("theme") ? Cookies.get("theme") : null;
    if (currentTheme == null) {
      Cookies.set("theme", "dark");
    } else {
      if (currentTheme == "dark") {
        Cookies.set("theme", "default");
      } else if (currentTheme == "default") {
        Cookies.set("theme", "dark");
      }
    }
    currentTheme = Cookies.get("theme");
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", currentTheme);
  }

  useEffect(() => {
    let initTheme = Cookies.get("theme");
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", initTheme);
  }, []);

  function connectGit() {
    fetch("https://api.github.com/users/" + user)
      .then((response) => response.json())
      .then((user) => checkInfo(user));
  }

  function checkInfo(data: JSON) {
    console.log(data);
    setLoad(true);
    if (data.message != undefined) {
      showErro();
    } else {
      setAvatar(data.avatar_url);
      setNome(data.name);
      setUser(data.login);
      setLogged(true);
    }
    setLoad(false);
  }

  function showErro() {
    setErro(true);
    setTimeout(() => {
      setErro(false);
    }, 3000);
  }

  return (
    <ChallengeProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Inicio | Moveit</title>
      </Head>
      {hasLogged ? (
        <>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile
                  avatarImage={avatar}
                  nameProfile={nome}
                  level={props.level}
                />
                <CompleteChallenges />

                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </>
      ) : (
        <div className={connect.loginPage}>
          <div className={connect.form}>
            <form className={connect.loginForm}>
              <img src="logo-full.svg" className={connect.logo} />
              {erro ? (
                <div className={connect.erro}>Usuário não encontrado</div>
              ) : (
                <></>
              )}
              <input
                type="text"
                placeholder="Usuário do github"
                onChange={(event) => setUser(event.target.value)}
              />
              <button type="button" onClick={connectGit}>
                {load ? (
                  <>
                    <FaCircleNotch
                      className={`${connect.iconAnimated} ${connect.faSpin}`}
                    />
                  </>
                ) : (
                  <>
                    Conectar com o Github <FaGithub className={connect.icon} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <a className={styles.switchTheme} onClick={switchTheme}>
        {Cookies.get("theme") == "default" ? (
          <FaRegLightbulb className={connect.icon} />
        ) : (
          <FaLightbulb className={connect.icon} />
        )}
      </a>
    </div>
    </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
