/* eslint-disable no-unused-vars */
import { useState } from "react"
import { FiArrowLeft, FiUser, FiLock, FiMail, FiCamera } from "react-icons/fi"
import { Link } from "react-router-dom"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { api } from "../../service/api"
//importando o "contexto"
import { useAuth } from "../../hooks/auth"

import { Container, Form, Avatar } from "./styles"

export function Profile() {
  //importando de useAuth para passar no campo o nome e email de usuário ja cadastrado
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState()
  const [passwordNew, setPasswordNew] = useState()

  //pegando a url do backend e montando ela no frontend
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder

  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)

  //Função para "salvar" as atualizações, este vai para o onClick do "botão salvar"
  async function handleUpdate() {
    //construo um objeto user e passo para o updateProfile
    const user = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    }

    await updateProfile({ user, avatarFile })
  }

  function handleChangeAvatar(event) {
    //pegando um unico arquivo que o usuario subir, por isso posição 0
    const file = event.target.files[0]
    //colocando dentro do setAvatarFile o arquivo que o usuario selecionou
    setAvatarFile(file)

    //este é para exibir o avatar de fato no estado setAvatar
    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuario" />
          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>

        {/* onChange é ação de mudança do estado, quando mudar ele vai disparar um evento e atualizar o estado*/}
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-Mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        />
        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}
