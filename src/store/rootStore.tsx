import React, { createContext } from "react";
import useHeroContext from "src/features/heroes/heroContext";
import useAntiHeroContext from "src/features/antiHeroes/antiHeroContext";
import useVillainContext from "src/features/villains/villainContext";
import { HeroStoreSchema } from "src/features/heroes/heroTypes";
import { AntiHeroStoreSchema } from "src/features/antiHeroes/antiHeroTypes";
import { VillainStoreSchema } from "src/features/villains/villainTypes";

type RootStoreSchema = {
  heroStore: HeroStoreSchema;
  antiHeroStore: AntiHeroStoreSchema;
  villainStore: VillainStoreSchema;
};

export const RootStoreContext = createContext<RootStoreSchema>(null);

const RootStore = ({ children }) => {
  const heroContext = useHeroContext();
  const antiHeroContext = useAntiHeroContext();
  const villainContext = useVillainContext();

  return (
    <RootStoreContext.Provider
      value={{
        heroStore: heroContext,
        antiHeroStore: antiHeroContext,
        villainStore: villainContext,
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStore;
