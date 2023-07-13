import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.WHITE};

    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea{
    font-family: 'Roboto Slab', sans-serif;
    font-size: 16px;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  button, a{
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover, a:hover{
    filter: brightness(0.9);
  }

/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.COLORS.ORANGE} ${({ theme }) =>
  theme.COLORS.BACKGROUND_800};
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  border-radius: 20px;
}

*::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  border-radius: 20px;
  border: 3px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};
}

`
