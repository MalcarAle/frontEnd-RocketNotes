import { FiPlus, FiSearch } from "react-icons/fi"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"

//COMPONENTS
import { Header } from "../../components/Header"
import { Note } from "../../components/Note"
import { Input } from "../../components/Input"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"
import { api } from "../../service/api"

export function Home() {
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()

  function handleTagSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName) //devolve verdadeiro quando ja esta selecionado e falso quando voce seleciona

    //verifico se a tag esta selecionada, se sim, eu retiro a seleção, se não eu coloco a seleção nela
    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected((prevState) => [...prevState, tagName])
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  //renderiza sempre que tem um elemento novo na tela
  //quando tiver uma função que seja usada apenas para o useEffect, pode-se criar dentro do mesmo
  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }

    fetchTags()
  }, [])

  //quando mudar o conteudo de tagSelected ou de search, ele vai executar de novo useEffect
  //na função estou passando para o fetchNotes, dentro da api.get o caminho da pagina notes e como parametro da query (?)  titulo e tags
  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      )
      setNotes(response.data)
    }

    fetchNotes()
  }, [tagsSelected, search])

  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            $isActive={tagsSelected.length === 0}
          />
        </li>
        {/*
          AQUI É COMO LISTO TODAS AS TAGS NA PARTE DO MENU
          UTILIZANDO UM MAP PARA PERCORRER O ARRAY
        */}
        {
          //&& é utilizado para verificar se existe tags, se tiver, faz o map
          tags &&
            tags.map((tag) => (
              <li key={String(tag.id)}>
                <ButtonText
                  title={tag.name}
                  onClick={() => handleTagSelected(tag.name)}
                  $isActive={tagsSelected.includes(tag.name)}
                />
              </li>
            ))
        }
      </Menu>

      <Search>
        <Input
          //a função anonima faz com que o onChange receba o valor de setSearch, que esta sendo digitado na hora.
          placeholder="Pesquisar pelo titulo"
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to="/New">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  )
}
