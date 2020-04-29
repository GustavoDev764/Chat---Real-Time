import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { RotasWeb } from "./Router";

//import Routes
import LoginScreen from "./Screen/Login";
import DashboardScreen from "./Screen/Dashboard";
import api from "./services/api";

function App() {
  useEffect(() => {}, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        userAuth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  function getLocalStorage() {
    if (typeof Storage !== "undefined") {
      return localStorage.getItem("authAdmin");
    }
  }

  function setLocalStorage(email) {
    if (typeof Storage !== "undefined") {
      let authAdmin = [
        {
          email,
        },
      ];
      localStorage.setItem("authAdmin", JSON.stringify(authAdmin));
    }
  }

  function validaLogin() {
    const data = JSON.parse(getLocalStorage());
    if (data) {
      const { email } = data[0];

      if (email) {
        console.log(email);
        return true;
      }
    }
    return false;
  }

  const [userAuth, setUserAuth] = useState({
    isAuthenticated: validaLogin(),

    userlogado() {
      this.isAuthenticated = true;
    },

    async authenticate(email, pwd) {
      const resp = await api.post("/authUser", { email, pwd });
      const { data } = resp;
      if (data) {
        console.log("autenticado com sucesso!");
        setLocalStorage(email);
        this.isAuthenticated = true;
      }
      return this.isAuthenticated;
    },
    async signout(email, pwd) {
      this.isAuthenticated = false;
    },
  });

  async function Authe(email, pwd) {
    const isAuth = await userAuth.authenticate(email, pwd);

    if (isAuth) {
      window.location.href = RotasWeb.dashboard;
    }

    return { msg: "Email ou Senha Invalido!" };
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path={"/"}
            exact
            render={(props) => <LoginScreen {...props} authe={Authe} />}
          />
          <PrivateRoute
            path={RotasWeb.dashboard}
            exact
            component={DashboardScreen}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
