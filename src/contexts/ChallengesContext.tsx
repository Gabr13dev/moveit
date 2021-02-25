import { useState, createContext, ReactNode, useEffect } from "react";

import challenges from '../../challenges.json';

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
}

interface ChallengeProviderProps {
  children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesComplete] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experinceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp() {
    setLevel(level + 1);

    if(Notification.permission === 'granted'){
        new Notification('Voando Alto!', {
            body: `Voce atingiu o level ${level + 1}!`
        })
    }
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
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}
