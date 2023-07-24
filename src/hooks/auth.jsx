/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../service/api"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({})

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password })
      const { user, token } = response.data

      //salvando os dados no Local Storage do navegador para que nao perca o login
      //usando o JSON.stringify para transformar o objeto em JS para JSON
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      localStorage.setItem("@rocketnotes:token", token)

      //passando o token no cabeçalho da pagina, por isso nao passamos no provider
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setData({ user, token })
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possivel entrar!")
      }
    }
  }

  function signOut() {
    const token = localStorage.removeItem("@rocketnotes:token")
    const user = localStorage.removeItem("@rocketnotes:user")

    setData({})
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile)

        const response = await api.patch("/users/avatar", fileUploadForm)
        user.avatar = response.data.avatar
      }

      //fazendo um "update" la na user
      await api.put("/users", user)
      //sobrepoe o json do user no local storage
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
      setData({ user, token: data.token })
      alert("Perfil atualizado")
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possivel atualiza seus dados!")
      }
    }
  }
  //buscando no local storage se existe usuario e token validado para não deslogar
  useEffect(() => {
    //pegando os valores do token e user do LOCAL STORAGE
    const token = localStorage.getItem("@rocketnotes:token")
    const user = localStorage.getItem("@rocketnotes:user")

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setData({
        token,
        user: JSON.parse(user),
      })
    }
  }, [])

  return (
    //todas as rotas da aplicação passam por aqui, pois estamos recebendo ela pela props CHILDREN
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateProfile,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
