import { RiShutDownLine } from "react-icons/ri"
import { Container, Profile, Logout } from "./styles"

export function Header() {
  return (
    <Container>
      <Profile to="/Profile">
        <img src="https://github.com/malcarale.png" alt="Profile Picture" />

        <div>
          <span>Bem-vindo,</span>
          <strong>Alexandre Malcar</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}
