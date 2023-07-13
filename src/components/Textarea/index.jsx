/* eslint-disable react/prop-types */
import { Container } from "./styles"

export function Textarea({value, ...rest}) {
  return(
    <Container {...rest}>
      {value}
    </Container>
  )
}
