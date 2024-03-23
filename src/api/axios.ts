import axios from "axios"

const instance = axios.create({
  baseURL: 'https://2ch.hk/',
  timeout: 1000,
});

export default instance