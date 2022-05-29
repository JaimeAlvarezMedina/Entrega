import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Articulo from './Pagina_articulo';

import Creacion from './Creacion_articulos';
import Perfil from './Perfil';
import Foro from './Foro';
import Admin from './Anadir_admin';
import Nuestro_equipo from './Nuestro_equipo';
import Login from './login';
import Editar_perfil from './Editar_perfil';
export default function router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='pagina_articulo' element={<Articulo />}/>
         
            <Route path="crear_post" element={<Creacion />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="login" element={<Login />} />
            <Route path="nuestro_equipo" element={<Nuestro_equipo />} />
            <Route path='anadir_admin' element={<Admin/>} />
            <Route path='foro' element={<Foro/>} />
            <Route path="editar_perfil" element={<Editar_perfil />} />
            <Route index element={<Foro />} />

            <Route path="/" element={<Foro />} >
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }