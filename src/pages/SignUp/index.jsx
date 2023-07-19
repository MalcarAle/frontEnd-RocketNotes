/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { useState } from "react"
import { FiMail, FiLock, FiUser } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

//acessando nossa API para ccnsumir as inforemações
import { api } from "../../service/api"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import { Container, Form, Background } from "./styles.js"

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  function handleSingUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!")
    }

    //acessando a rota /users e enviando os dados do usuario para cadastro
    //ao enviar os dados, verificamos se tudo deu certo, utilizando o .then e o .catch
    //o then retorna o alert de que deu certo e o catch pega o erro e em uma arrow function verificamos qual o erro.
    api
      .post("/users", { name, email, password })
      .then(() => {
        alert("Usuario cadastro com sucesso 🎉")
        navigate("/")
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message)
        } else {
          alert("Não foi possivel cadastrar!")
        }
      })
  }

  return (
    <Container>
      <Background />

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSingUp} />
        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  )
}
