import React from "react";
import { useLocalObservable, enableStaticRendering } from "mobx-react-lite";
import { runInAction } from "mobx";

import { EndPoints } from "src/axios/api-config";
import { deleteAxios, getAxios, postAxios } from "src/axios/generic-api-calls";

import { HeroModel, HeroStateType } from "./heroTypes";

enableStaticRendering(typeof window === "undefined");

const initialValues: HeroStateType = {
  heroes: [] as HeroModel[],
  hero: {
    _id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  } as HeroModel,
  loading: false,
};

/*
 * what is runInAction()?
 * https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 * */

const HeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    /*non-asynchronous actions*/
    softDeleteHeroAction(hero: HeroModel) {
      store.heroes = store.heroes.filter((h) => h._id !== hero._id);
    },

    /*computed values i.e. derived state*/
    get totalHeroesCount() {
      return store?.heroes?.length;
    },

    /*asynchronous actions*/
    async getHeroesAction() {
      runInAction(() => {
        store.loading = true;
      });

      try {
        const { data } = await getAxios<HeroModel>(EndPoints.heroes);
        runInAction(() => {
          store.heroes = data;
        });
      } catch (e) {
        alert("Something happened. Please try again later.");
      }

      runInAction(() => {
        store.loading = false;
      });
    },

    // asynchronous actions also. Optimistic UI update. No need for showing loader/spinner.
    async deleteHeroAction(id: string) {
      const previousHeroes = store.heroes;
      store.heroes = store.heroes.filter((h) => h._id !== id);
      try {
        await deleteAxios(EndPoints.heroes, id);
      } catch (e) {
        alert("Something happened. Please try again later.");
        store.heroes = previousHeroes;
      }
    },

    // asynchronous actions (pessimistic UI update)
    async postHeroAction(newHero: HeroModel) {
      try {
        const { data } = await postAxios(EndPoints.heroes, newHero);
        runInAction(() => {
          store.heroes.push(data);
        });
      } catch (e) {
        alert("Something happened. Please try again later.");
      }
    },
  }));

  return store;
};

export default HeroContext;
