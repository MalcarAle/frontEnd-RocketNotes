import { Container, Links } from "./styles"

import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"

export function Details() {
  return (
    <Container>
      <Header />
      <Section title="Links úteis">
        <Links>
          <li>
            <a href="#">https://www.rocketseat.com.br/</a>
          </li>
          <li>
            <a href="#">https://www.github.com.br/</a>
          </li>
          <li>
            <a href="#">https://www.linkedin.com.br/</a>
          </li>
        </Links>
      </Section>

      <Section title="Marcadores">
        <Tag title="Express" />
        <Tag title="NodeJS" />
        <Tag title="ReactJS" />
      </Section>

      <Button title="Voltar" />
    </Container>
  )
}
