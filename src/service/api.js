import axios from "axios"

//configuração da base da URL, onde ele vai consumir o backend
export const api = axios.create({
  baseURL: "http://localhost:3333",
})
