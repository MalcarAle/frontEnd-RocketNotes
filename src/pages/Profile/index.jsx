import { FiArrowLeft, FiUser, FiLock, FiMail, FiCamera } from "react-icons/fi"
import { Link } from "react-router-dom"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import { Container, Form, Avatar } from "./styles"

export function Profile() {
  return ( 
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>
        <Avatar>
          <img src="https://github.com/malcarale.png" alt="Foto do usuario" />
          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" />
          </label>
        </Avatar>

        <Input placeholder="Nome" type="text" icon={FiUser} />
        <Input placeholder="E-Mail" type="text" icon={FiMail} />
        <Input placeholder="Senha atual" type="password" icon={FiLock} />
        <Input placeholder="Nova senha" type="password" icon={FiLock} />
        <Button title="Salvar" />
      </Form>
    </Container>
  )
}
