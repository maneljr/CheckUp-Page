import axios from "axios";

const api = axios.create({
  baseURL: "https://cloud.doc9.com.br/api/",
});

export { api };
