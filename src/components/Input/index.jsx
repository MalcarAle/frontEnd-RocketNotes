/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Container } from "./styles"

export function Input({icon: Icon, ...rest}) {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}
