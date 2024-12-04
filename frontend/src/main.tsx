import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { App } from "@/App"
import { Provider } from "jotai"
import { BrowserRouter } from "react-router"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Failed to find the root element.")
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
