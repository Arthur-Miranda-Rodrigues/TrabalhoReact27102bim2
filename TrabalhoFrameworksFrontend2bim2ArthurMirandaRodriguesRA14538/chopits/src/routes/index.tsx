import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import { Home } from './../pages/Home'
import { Login } from '../pages/Login'
import { Produtos } from '../pages/Produtos'
import { Usuarios } from '../pages/Usuarios'
import { Trabalho } from '../pages/Trabalho'
import { GerenciarUsuarios } from '../pages/Usuarios/Gerenciar'
import { Sobre } from '../pages/Sobre'
import { DashboardLayout } from '../DashboardLayout'
import {Clientes} from '../pages/Clientes'



export const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rota fora do layout (sem dashboard) --- */}
        <Route path='/' element={<Login />} />

        {/* --- Grupo de rotas dentro do DashboardLayout --- */}
        <Route
          path='/home'
          element={
            
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          
          }
        />
        <Route
          path='/produtos/:parametro'
          element={
          
            <DashboardLayout>
              <Produtos />
            </DashboardLayout>
           
          }
        />
        <Route
          path='/usuarios'
          element={
          
            <DashboardLayout>
              <Usuarios />
            </DashboardLayout>
          
          }
        />
        <Route
          path='/usuarios/:id'
          element={
        
            <DashboardLayout>
              <GerenciarUsuarios />
            </DashboardLayout>
        
          }
        />
         
        <Route
          path='/clientes/'
          element={
        
            <DashboardLayout>
              <Clientes />
            </DashboardLayout>
        
          }
        />
        <Route
          path='/trabalho'
          element={
     
            <DashboardLayout>
              <Trabalho />
            </DashboardLayout>
         
          }
        />
        <Route
          path='/sobre'
          element={
           
            <DashboardLayout>
              <Sobre />
            </DashboardLayout>
           
          }
        />

        {/* Página 404 */}
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
