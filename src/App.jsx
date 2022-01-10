
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// Layouts
import Layout from "./layout/Layout";
// Pages
import Inicio from "./pages/Inicio";
import NuevoCliente from "./pages/NuevoCliente";
import EditarCliente from "./pages/EditarCliente";
import VerCliente from "./pages/VerCliente";

// Routes es el reemplazo de Switch en la nuevo release
function App() {

  return (
      <Router>
        <Routes >
          {/* "/clientes/nuevo" */}
          <Route path="/clientes" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="nuevo" element={<NuevoCliente />} />
            <Route path="editar/:id" element={<EditarCliente />} />
            <Route path=":id" element={<VerCliente />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
