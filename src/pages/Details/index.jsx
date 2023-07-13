import { Container, Links, Content } from "./styles"
//COMPONENTS
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { ButtonText } from "../../components/ButtonText"

export function Details() {
  return (
    <Container>
      <Header />
      <main>
        <Content>
          <ButtonText title="Excluir Nota" />

          <h1>Introdução ao React</h1>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

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
        </Content>
      </main>
    </Container>
  )
}
