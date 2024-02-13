import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from './pages/Login';
import Registrar from "./pages/Registrar";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import EditarPerfil from "./pages/EditarPerfil";
import AdministrarPacientes from "./pages/AdministrarPacientes";
import CambiarPassword from "./pages/CambiarPassword";


import ProtectedRoute from "./layout/ProtectedRoute";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
            </Route>

            <Route path="/admin" element={<ProtectedRoute/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path="perfil" element={<EditarPerfil/>}></Route>
              <Route path="cambiar-password" element={<CambiarPassword/>}></Route>
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
