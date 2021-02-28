import { useState, createContext, ReactNode, useEffect } from "react";

import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from "../components/levelUpModal";

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experinceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesComplete] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experinceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [challengesCompleted, level, currentExperience])

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);

    if(Notification.permission === 'granted'){
      new Notification('Subiu de nível!', {
            body: `Voce atingiu o level ${level + 1}!`
        })
    }
  }

  function closeModal(){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
      const challenge = challenges[randomChallengeIndex];
      
      setActiveChallenge(challenge);

      new Audio("/notification.mp3").play();

      if(Notification.permission === 'granted'){
          new Notification('Novo Desafio', {
              body: `Valendo ${challenge.amount} xp!`
          })
      }
  }

  function resetChallenge(){
      setActiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge){
        return;
    }

    const { amount } = activeChallenge;
    let finalExperince = currentExperience + amount;
    if(finalExperince >= experinceToNextLevel){
        finalExperince = finalExperince - experinceToNextLevel;
        levelUp();
    }

    setCurrentExperience(finalExperince);
    setActiveChallenge(null);
    setChallengesComplete(challengesCompleted + 1)
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        experinceToNextLevel,
        closeModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengeContext.Provider>
  );
}
