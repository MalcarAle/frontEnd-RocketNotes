/* eslint-disable react/prop-types */
import { FiPlus, FiX } from "react-icons/fi"

import { Container } from "./styles"

export function NoteItem({ isNew, value, onClick, ...rest }) {
  return (
    <Container isNew={isNew}>
      <input value="text" value={value} readOnly={!isNew} {...rest} />

      <button
        onClick={onClick}
        type="button"
        className={isNew ? "button-add" : "button-delete"}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>
    </Container>
  )
}
