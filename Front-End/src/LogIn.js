import React, { useState, useEffect } from "react";
import { SlSettings } from "react-icons/sl";
import { BsPersonCircle } from "react-icons/bs";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

import Cookies from "js-cookie";
import axios from "axios";

import "./Style/login.css";
import logo1 from "./Images/deleg-logo.png";
import sideIllustration from "./Images/vacation_login_illustration.png";

import { baseURL } from "./config";
import { InstallAppButton } from "./pwaInstall";

const LoginPage = () => {
  const [choi, setChoi] = useState(0);
  const [pass, setPass] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [alr, setAlr] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setRememberMe(false);
    setAlr(false);
  }, [choi]);

  useEffect(() => {
    const token = Cookies.get("gestion-des-conges");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        choi,
        username,
        password,
        rememberMe,
      });
      if (response.status === 200) {
        const token = response.data["gestion-des-conges"];
        const cookieOptions = rememberMe ? { expires: 30 } : { expires: 1 };
        Cookies.set("gestion-des-conges", token, cookieOptions);
        window.location.href = "/";
      } else {
        console.error("Error:", response.data.error);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message,
      );
      setAlr(true);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="pwa-install-login-wrap">
        <InstallAppButton variant="login" />
      </div>

      <div className="login-card">
        {/* Left Side: Illustration */}
        <div className="login-illustration">
          <img
            src={sideIllustration}
            alt="Illustration des congés"
            loading="lazy"
          />
          <div className="illustration-overlay">
            <h2>
              Bienvenue sur
              <br />
              Gestion des Congés
            </h2>
            <p>Simplifiez la planification de vos congés et la gestion du personnel.</p>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="login-form-side">
          <div className="login-header">
            <img className="login-logo" alt="Logo" src={logo1} />
            <h1 className="login-title">Se connecter</h1>
            <p className="login-subtitle">
              Veuillez sélectionner votre portail pour continuer
            </p>
          </div>

          {choi === 0 ? (
            <div className="portal-selection">
              <button
                className="portal-btn admin-btn"
                onClick={() => setChoi(1)}
              >
                <div className="portal-icon">
                  <SlSettings />
                </div>
                <span>Administration</span>
                <p>Gérer les demandes et les paramètres</p>
              </button>

              <button
                className="portal-btn personnel-btn"
                onClick={() => setChoi(2)}
              >
                <div className="portal-icon">
                  <BsPersonCircle />
                </div>
                <span>Personnel</span>
                <p>Accédez à votre espace personnel</p>
              </button>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-back-header">
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => setChoi(0)}
                >
                  <FaArrowLeft /> Retour
                </button>
                <span className="portal-indicator">
                  {choi === 1 ? "Portail Administrateur" : "Portail Personnel"}
                </span>
              </div>

              <div className="input-group">
                <label>{choi === 1 ? "Nom d'utilisateur" : "PPR"}</label>
                <input
                  type="text"
                  minLength={4}
                  maxLength={16}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={`Entrez votre ${choi === 1 ? "nom d'utilisateur" : "PPR"}`}
                  required
                />
              </div>

              <div className="input-group">
                <label>Mot de passe</label>
                <div className="password-input-wrapper">
                  <input
                    type={pass ? "text" : "password"}
                    minLength={4}
                    maxLength={16}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setPass(!pass)}
                  >
                    {pass ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
              </div>

              <div className="remember-me-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Se souvenir de moi (30 Jours)
                </label>
              </div>

              {alr && (
                <div className="error-message">
                  {choi === 1 ? "Nom d'utilisateur" : "PPR"} ou mot de passe incorrect !
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={!username || !password}
              >
                Se connecter
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
