import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useAppContext } from "./utils/context";
import { client } from "./api/app";
import { gql } from "@apollo/client";
import { useStateContext } from "./utils/internal.context";

const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(LoginInputType: { username: $username, password: $password }) {
      name {
        first
        last
      }
      uuid
      picture
      role
      isOnline
      gender
      email
      job
      token {
        accessToken
        expiresIn
      }
    }
  }
`;

function Auth() {
  const { store, api } = useAppContext();
  const [userLogin, setUserLogin] = useState("");
  const [userPass, setUserPass] = useState("");
  const { currentColor } = useStateContext();
  useEffect(() => {
    const login = localStorage.getItem("login");
    const pass = localStorage.getItem("pass");
    if (!!login && !!pass) logIn(login, pass);
  }, []);
  const logIn = async (username: string, password: string) => {
    try {
      const { data } = await client.query({
        query: LOGIN,
        variables: { username, password },
      });
      localStorage.setItem("login", userLogin);
      localStorage.setItem("pass", userPass);
      store.user.setCurrentUser(data.login);
      api.serverConnection.post("/setOnline", {
        uuid: data.login.uuid,
        isVerified: true,
      });

      store.user.setAuth(true);
    } catch (error) {
      console.error("Error login:", error);
      throw error;
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-6 bg-main-bg dark:bg-main-dark-bg">
      <h1 className="text-3xl" style={{ color: currentColor }}>
        Welcome to admin panel, please Log In!
      </h1>

      <h2 className="text-xl" style={{ color: currentColor }}>
        Login
      </h2>
      <input
        type="text"
        className="w-60 h-12 p-2"
        style={{
          borderBottom: "1px solid",
          borderBottomColor: currentColor,
          color: currentColor,
        }}
        onChange={(e) => setUserLogin(e.target.value)}
        value={userLogin}
      />

      <h2 className="text-xl" style={{ color: currentColor }}>
        Password
      </h2>
      <input
        type="text"
        className="w-60 h-12 p-2"
        onChange={(e) => setUserPass(e.target.value)}
        style={{
          borderBottom: "1px solid",
          borderBottomColor: currentColor,
          color: currentColor,
        }}
        value={userPass}
      />

      <button
        onClick={() => {
          logIn(userLogin, userPass);
        }}
        className="w-60 h-12"
        style={{ backgroundColor: currentColor }}
      >
        Log In
      </button>
    </div>
  );
}

export default observer(Auth);
