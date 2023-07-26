import axios from "axios";
import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { login } from "../features/slices/loginSlice";
import Translator from "./Translator";
import { useAppSelector } from "../app/hooks";
import { useTranslation } from 'react-i18next';

import "./styles/Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();
  const user = useAppSelector(state => state.user);
 // console.log('location-user', user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5005/auth", { username, password });
      const { description, email, uidNumber, phoneNumber, groupId, imagePath } = response.data.user;
      
      if (response.data) {
        console.log('Authentication successful for user:', response.data.user);
        console.log('role', description);
        
        dispatch(login({
          username: username,
          id: uidNumber,
          email: email,
          role: description,
          phoneNumber: phoneNumber,
          groupId: groupId,
          imagePath: imagePath,
          loggedIn: true,
        }));
        navigate("/dashboard/userselect", {
          state: {
            user: response.data.user,
          }
        });
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return (
    <div className="login">
      <header className="login_header">
        <div></div>
        <h1>{t("Colleague Feedback")}</h1>
        <div className="lang"><Translator/></div>
      </header>
      <form className="login__form" onSubmit={handleSubmit}>
        <h1>{t("LOG IN")}</h1>
        <input
          type="text"
          placeholder={t("Username") as string}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("Password") as string}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="submit__btn">{t("Login")}</Button>
        {/* <div className="link">
          <h3>
            Don't have an account? <Link to="/signup">Signup</Link>
          </h3>
        </div> */}
      </form>
    </div>
  );
};

export default Login;