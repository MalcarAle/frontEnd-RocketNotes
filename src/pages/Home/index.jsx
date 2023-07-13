import { FiPlus, FiSearch } from "react-icons/fi"
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"

//COMPONENTS
import { Header } from "../../components/Header"
import { Note } from "../../components/Note"
import { Input } from "../../components/Input"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"

export function Home() {
  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText title="Todos" isActive />
        </li>
        <li>
          <ButtonText title="React" />
        </li>
        <li>
          <ButtonText title="Node" />
        </li>
      </Menu>

      <Search>
        <Input placeholder="Pesquisar pelo titulo" icon={FiSearch} />
      </Search>

      <Content>
        <Section title="Minhas notas">
          <Note
            data={{
              title: "React",
              tags: [
                { id: "1", name: "react" },
                { id: "2", name: "node" },
              ],
            }}
          />
        </Section>
      </Content>

      <NewNote to="/New">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  )
}
