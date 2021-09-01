import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Profile from "./pages/profile";
import Projects from "./pages/projects/projects";
import ProjectMembers from "./pages/projectMembers";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/projects/:id" component={Projects} exact />
        <Route path="/projects/:id/members" component={ProjectMembers} exact />
      </Switch>
    </Router>
  );
}
