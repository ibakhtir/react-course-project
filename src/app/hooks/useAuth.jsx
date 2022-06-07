import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import userService from "../services/user.service";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState(null);

  async function signUp({ email, password, ...rest }) {
    const key = "AIzaSyA4lS3PWgV3z1_r-mT2u5VcMRBn3Wyun7Q";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует"
          };
          throw errorObject;
        }
      }
    }
  }

  async function signIn({ email, password }) {
    const key = "AIzaSyA4lS3PWgV3z1_r-mT2u5VcMRBn3Wyun7Q";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Пользователь с таким Email не найден"
          };
          throw errorObject;
        } else if (message === "INVALID_PASSWORD") {
          const errorObject = {
            password: "Неверный пароль"
          };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <AuthContext.Provider value={{ signIn, signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
