import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Profile from "./pages/profile";
import Project from "./pages/project";
import ProjectMembers from "./pages/projectMembers";
import ProjectConfig from "./pages/projectConfig";
import Roles from "./pages/roles";
import EditRole from "./pages/editRole";
import Users from "./pages/users";
import User from "./pages/user";
import { Box } from "@chakra-ui/react";
import NotFound from "./pages/notFound";
import createProject from "./pages/createProject/index";
import PrivateRoute from "./components/privateRoute";
import CreateUserStory from "./pages/createUS";

export default function App() {
  return (
    <Router>
      <Header />
      <Box m="0" mt="55px" height="100%" width="100%">
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
