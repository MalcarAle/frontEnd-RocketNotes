/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Container } from "./styles"

export function ButtonText({ title, isActive = false, ...rest }) {
  return (
    <Container type="button" isActive={isActive} {...rest}>
      {title}
    </Container>
  )
}
