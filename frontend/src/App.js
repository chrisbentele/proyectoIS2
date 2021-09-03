import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Profile from "./pages/profile";
import Project from "./pages/projects/projects";
import ProjectMembers from "./pages/projectMembers";
import MyProjects from "./pages/myProjects";
import ProjectConfig from "./pages/projectConfig";
import Roles from "./pages/roles";
import EditRole from "./pages/editRole";
import Users from "./pages/users";
import User from "./pages/user";
import { Box } from "@chakra-ui/react";

export default function App() {
  return (
    <Router>
      <Header />
      <Box mt="3rem">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/users" component={Users} exact />
          <Route path="/users/:id" component={User} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/roles" component={Roles} exact />
          <Route path="/roles/:id" component={EditRole} exact />
          <Route path="/myprojects" component={MyProjects} exact />
          <Route path="/projects/:id" component={Project} exact />
          <Route
            path="/projects/:id/members"
            component={ProjectMembers}
            exact
          />
          <Route path="/projects/:id/config" component={ProjectConfig} exact />
        </Switch>
      </Box>
    </Router>
  );
}
