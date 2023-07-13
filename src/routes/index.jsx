import { BrowserRouter } from "react-router-dom"

import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.app.routes"

export function Routes() {
  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  )
}
