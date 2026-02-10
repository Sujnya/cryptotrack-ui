import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const cryptoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});
