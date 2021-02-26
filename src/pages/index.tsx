import Head from "next/head";

import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import { useContext, useState, useEffect } from "react";

import { ChallengeContext } from "../contexts/ChallengesContext";
import { UserContext } from "../contexts/UserContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";
import connect from "../styles/components/ConnectGitCard.module.css";
import { FaGithub, FaCircleNotch } from "react-icons/fa";

export default function Home() {
  const [hasLogged, setLogged] = useState(false);
  const [erro, setErro] = useState(false);
  const [load, setLoad] = useState(false);

  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [nome, setNome] = useState("");

  const { level } = useContext(ChallengeContext);
  var levelUser = "" + level;

  function connectGit(){
    fetch("https://api.github.com/users/"+user)
    .then(response => response.json())
    .then(user => checkInfo(user));
  }

  function checkInfo(data: JSON){
    console.log(data);
    setLoad(true);
    if(data.message != undefined){
      showErro();
    }else{
      setAvatar(data.avatar_url);
      setNome(data.name);
      setUser(data.login);
      setLogged(true);
    }
    setLoad(false);
  }

  function showErro(){
    setErro(true);
    setTimeout(() => {
      setErro(false);
    }, 3000);
  }

  return (
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
    </div>
  );
}
