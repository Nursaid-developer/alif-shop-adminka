import { useContext, useState } from "react";
import MainLayout from "./components/MainLayout";
import { Login } from "./pages";
import { AuthContext } from "./contexts/Authcontext";

const App = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      {isAuth ? <MainLayout /> : <Login />}
    </>
  );
};

export default App;
