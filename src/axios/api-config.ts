import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const EndPoints = {
  heroes: "heroes",
  antiHeroes: "anti-heroes",
  villains: "villains",
};
