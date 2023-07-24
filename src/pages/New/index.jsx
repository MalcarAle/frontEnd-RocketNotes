/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { Header } from "../../components/header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"

import { Container, Form } from "./styles"
import { api } from "../../service/api"

export function New() {
  const [title, setTitle] = useState("") //string vazia para armazenar o titulo
  const [description, setDescription] = useState("") //string vazia para armazenar a descrição

  const [links, setLinks] = useState([]) //guarda todos os links
  const [newLink, setNewLink] = useState("") //armazena o link que vai ser adicionado

  const [tags, setTags] = useState([]) //guarda todos os tags
  const [newTag, setNewTag] = useState("") //armazena o tag que vai ser adicionado

  const navigate = useNavigate()

  function handleAddLink() {
    //acesso o que tinha antes no array, pelo prevState
    setLinks((prevState) => [...prevState, newLink])
    setNewLink("")
  }

  function handleRemoveLink(deleted) {
    //acessando o prevState, conteudo atual, e aplico um filter para retornar a lista nova sem o link que estou deletando
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Insira um titulo na nota!")
    }

    if (newLink) {
      return alert(
        "Voce deixou uma Link no campo para adicionar, mas nao clicou em adicionar!"
      )
    }

    if (newTag) {
      return alert(
        "Voce deixou uma Tag no campo para adicionar, mas nao clicou em adicionar!"
      )
    }
    //enviando para o backend os values dos estados
    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    })

    alert("Nota criada com sucesso!")
    navigate("/") //utilizando o useNavigate para voltar a tela de home
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">Voltar</Link>
          </header>

          <Input
            placeholder="Titulo"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links uteis">
            {/*
             SEMPRE QUANDO HÁ UM COMPONENTE RENDERIZADO POR LISTA, PRECISA COLOCAR UMA KEY
             AQUI UTILIZAMOS ESSE METODO PARA LISTAR OS ITENS DA NOTA, COMO LINK E TAGS
             FAÇO UM MAP NO ARRAY RENDERIZANDO SEUS VALORES
            */}
            {
            links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))
            }

            <NoteItem
              isNew
              placeholder="Novo Link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}

              <NoteItem
                isNew
                placeholder="Nova Tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  )
}
