/**
 * @file App.js
 * @brief Componente principal del website, funciona como router a las distintas páginas.
 */

//! Librerías de React.js.
import React from "react";
//! Librerías de routing declarativo para React.
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//! Componente de la página del login.
import Login from "./pages/login";
//! Componente de la página de inicio.
import Home from "./pages/home/home";
//! Componente de la página de la cabecera del sitio web.
import Header from "./components/header/header";
//! Componente de la página de perfil de usuario (actualmente sirve como página principal del proyecto).
import Profile from "./pages/profile";
//! Componente de la página de proyecto un proyecto.
import Project from "./pages/project";
//! Componente de la página de configuración de miembros.
import ProjectMembers from "./pages/projectMembers";
//! Componente de la página de configuración de proyectos
import ProjectConfig from "./pages/projectConfig";
//! Componente de la página de configuración de roles del proyecto.
import Roles from "./pages/roles";
//! Componente de la página de edición de roles (actualmente la página de roles cumple esta función).
import EditRole from "./pages/editRole";
//! Componente de la página de usuarios.
import Users from "./pages/users";
//! Componente de la página de usuario.
import User from "./pages/user";

import { Box } from "@chakra-ui/react";
//! Componente de página de 404.
import NotFound from "./pages/notFound";
//! Componente de la página de creación de proyectos.
import createProject from "./pages/createProject/index";
//! Componente de la página de routing.
import PrivateRoute from "./components/privateRoute";
import CreateUserStory from "./pages/createUS";

/**
 * Función principal de la aplicación, funciona como router a las distintas páginas
 * @param ninguno
 */

export default function App() {
  return (
    <Router>
      <Header />
      <Box m="0" height="100%" width="100%">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <PrivateRoute path="/users" component={Users} exact />
          <PrivateRoute path="/users/:id" component={User} exact />
          <PrivateRoute path="/profile" component={Profile} exact />
          <PrivateRoute path="/roles" component={Roles} exact />
          <PrivateRoute path="/roles/:id" component={EditRole} exact />
          <PrivateRoute path="/createProject" component={createProject} exact />
          <PrivateRoute path="/projects/:id" component={Project} exact />
          <PrivateRoute
            path="/projects/:id/members"
            component={ProjectMembers}
            exact
          />
          <PrivateRoute path="/projects/:id/roles" component={Roles} exact />
          <PrivateRoute
            path="/projects/:id/config"
            component={ProjectConfig}
            exact
          />
          <PrivateRoute
            path="/projects/:id/createUS"
            component={CreateUserStory}
            exact
          />
          <Route path="/" component={NotFound} />
        </Switch>
      </Box>
    </Router>
  );
}
