import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import React from "react";

import { Home } from './../pages/Home'
import { Login } from '../pages/Login'
import { Produtos } from '../pages/Produtos'
import { Usuarios } from '../pages/Usuarios'
import { Trabalho } from '../pages/Trabalho'
import { GerenciarUsuarios } from '../pages/Usuarios/Gerenciar'
import { Sobre } from '../pages/Sobre'
import { DashboardLayout } from '../DashboardLayout'

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
            <React.StrictMode>
            <DashboardLayout>
              <Home />
            </DashboardLayout>
            </React.StrictMode>
          }
        />
        <Route
          path='/produtos/:parametro'
          element={
            <React.StrictMode>
            <DashboardLayout>
              <Produtos />
            </DashboardLayout>
            </React.StrictMode>
          }
        />
        <Route
          path='/usuarios'
          element={
            <React.StrictMode>
            <DashboardLayout>
              <Usuarios />
            </DashboardLayout>
            </React.StrictMode>
          }
        />
        <Route
          path='/usuarios/:id'
          element={
            <React.StrictMode>
            <DashboardLayout>
              <GerenciarUsuarios />
            </DashboardLayout>
            </React.StrictMode>
          }
        />
        <Route
          path='/trabalho'
          element={
            <React.StrictMode>
            <DashboardLayout>
              <Trabalho />
            </DashboardLayout>
            </React.StrictMode>
          }
        />
        <Route
          path='/sobre'
          element={
             <React.StrictMode>
            <DashboardLayout>
              <Sobre />
            </DashboardLayout>
            </React.StrictMode>
          }
        />

        {/* Página 404 */}
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
