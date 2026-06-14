import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { PiCalendarCheckFill } from "react-icons/pi";
import { MdOutlineSettings } from "react-icons/md";
import InstallPWA from "./components/InstallPWA";
import { FaGraduationCap } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";


import "./Style/app.css";
import "./Style/responsive.css";
import settings from "./Settings.json";
import { useTranslation } from "react-i18next";


const Users = lazy(() => import("./Pages/Users"));
const Grades = lazy(() => import("./Pages/Grades"));
const Employees = lazy(() => import("./Pages/Employees"));
const SingleEmployee = lazy(() => import("./Pages/SingleEmployee"));
const Fsanitaire = lazy(() => import("./Pages/Fsanitaire"));
const Vacations = lazy(() => import("./Pages/Vacations"));
const VacationsMini = lazy(() => import("./Pages/VacationsMini"));
const Settings = lazy(() => import("./Pages/Settings"));
const NotAuth = lazy(() => import("./Pages/NotAuth"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Dashboardd = lazy(() => import("./Pages/Dashboardd"));
const VacationsPersonnel = lazy(() => import("./Pages/VacationsPersonnel"));

const ProtectedRoute = ({ children, allowedTypes, userType }) => {
  if (!allowedTypes.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logo = "/Images/bg1.png";
  const {t, i18n} =useTranslation('translation' , {keyPrefix:'App'})

  const closeMobileMenu = () => setMobileMenuOpen(false);


  useEffect(() => {
    const token = Cookies.get("gestion-des-conges");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken);
      } catch (error) {
        console.error("Invalid token");
      }
    }
    setLoading(false);
  }, []);

  const Logout = () => {
    Cookies.remove("gestion-des-conges");
    navigate("/login");
  };

  useEffect(() => {
    if (!loading && !userInfo) {
      navigate("/login");
    }
  }, [loading, userInfo, navigate]);

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "selected" : null;
  };

  if (loading) {
    return <div>{t("Chargement...")}</div>;
  }

  if (userInfo) {
    return (
      <div className="App">
        <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
        <div className={`nav-overlay ${mobileMenuOpen ? "show" : ""}`} onClick={closeMobileMenu}></div>
        <div className={`navigation ${mobileMenuOpen ? "open" : ""}`}>
          <div className="logos">
            <img src={logo} alt="App-logo" width="60px" className="img-logo" />
            <h4 className="logo-title">{settings.etablissement}</h4>
          </div>
          <div className="navs">
            {userInfo.type_ac !== 15 && (
              <div
                onClick={() => { navigate("/dashboard"); closeMobileMenu(); }}
                className="links1"
                id={isActive("/dashboard")}
              >
                <MdSpaceDashboard className="nav_icon" />
                <p className="nav-link">{t("Les demandes")}</p>
              </div>
            )}
            {userInfo.type_ac === 15 ? (
              <>
                <div
                  onClick={() => {
                    const gg = userInfo.id * 45657;
                    navigate(`/personnels/${gg}`);
                    closeMobileMenu();
                  }}
                  className="links1"
                  id={isActive("/personnels")}
                >
                  <FaUserDoctor className="nav_icon" />
                  <p className="nav-link">{t('Mes vacances')}</p>
                </div>
                <div
                  onClick={() => {
                    const gg = userInfo.id * 45657;
                    navigate(`/vacations-personnel/${gg}`);
                    closeMobileMenu();
                  }}
                  className="links1"
                  id={isActive("/vacations-personnel")}
                >
                  <PiCalendarCheckFill className="nav_icon" />
                  <p className="nav-link">{t("Résumer")}</p>
                </div>
              </>
            ) : (
              <div
                onClick={() => { navigate("/personnels"); closeMobileMenu(); }}
                className="links1"
                id={isActive("/personnels")}
              >
                <FaUserDoctor className="nav_icon" />
                <p className="nav-link">{t("Personnels")}</p>
              </div>
            )}
            <div
              onClick={() => { navigate("/vacances"); closeMobileMenu(); }}
              className="links1"
              id={isActive("/vacances")}
            >
              <FaRegCalendarAlt className="nav_icon" />
              <p className="nav-link">{t("Vacances")}</p>
            </div>
            {userInfo.type_ac === 20 && (
              <>
                <div
                  onClick={() => { navigate("/utilisateurs"); closeMobileMenu(); }}
                  className="links1"
                  id={isActive("/utilisateurs")}
                >
                  <FaUsersGear className="nav_icon" />
                  <p className="nav-link">{t("Utilisateurs")}</p>
                </div>
                <div
                  onClick={() => { navigate("/formation-sanitaire"); closeMobileMenu(); }}
                  className="links1"
                  id={isActive("/formation-sanitaire")}
                >
                  <HiMiniBuildingOffice2 className="nav_icon" />
                  <p className="nav-link">{t("Formation Sanitaire")}</p>
                </div>
                <div
                  onClick={() => { navigate("/grades"); closeMobileMenu(); }}
                  className="links1"
                  id={isActive("/grades")}
                >
                  <FaGraduationCap className="nav_icon" />
                  <p className="nav-link">{t("Grades")}</p>
                </div>
              </>
            )}
          </div>
          {userInfo && (
            <div className="nav-user">
              <div className="nav-user-info">
                <FaCircleUser className="nav-user-img" />
                <div className="kknhftb67">
                  <p className="nav-user-name">{userInfo.username}</p>
                <p className="nav-user-564">
                  {userInfo.type_ac === 15
                    ? t("Personnel")
                    : userInfo.type_ac === 1
                    ? t("Bureau d'ordre")
                    : userInfo.type_ac === 2
                    ? t("Chef archaique")
                    : userInfo.type_ac === 3
                    ? t("Délégué")
                    : userInfo.type_ac === 4
                    ? t("RH")
                    : userInfo.type_ac === 20
                    ? t("Administrateur")
                    : userInfo.type_ac === 0
                    ? t("Invité")
                    : t("Inconnu")}
                </p>
                </div>
              </div>
              <div className="nav-user-actions">
                <div className="links1" id="selected2" onClick={() => { Logout(); closeMobileMenu(); }}>
                  <HiOutlineLogout className="nav_icon" />
                  <p className="nav-link">{t("Se déconnecter")}</p>
                </div>
                <div
                  onClick={() => { navigate("/parametres"); closeMobileMenu(); }}
                  className="links1"
                  id={isActive("/parametres")}
                >
                  <MdOutlineSettings className="nav_icon" />
                  <p className="nav-link">{t("Paramètres")}</p>
                </div>
          </div>
          <InstallPWA />
        </div>
          )}
        </div>
        <div className="main-container">
          <Suspense fallback={<div>{t("Chargement...")}</div>}>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    allowedTypes={[20, 0, 1, 2, 3, 4]}
                    userType={userInfo.type_ac}
                  >
                    <Dashboardd type={userInfo.type_ac} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/personnels"
                element={
                  <ProtectedRoute
                    allowedTypes={[20, 0, 1, 2, 3, 4]}
                    userType={userInfo.type_ac}
                  >
                    <Employees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/personnels/:id"
                element={
                  <ProtectedRoute
                    allowedTypes={[15, 20, 0, 1, 2, 3, 4]}
                    userType={userInfo.type_ac}
                  >
                    <SingleEmployee type={userInfo.type_ac} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/utilisateurs"
                element={
                  <ProtectedRoute
                    allowedTypes={[20]}
                    userType={userInfo.type_ac}
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/grades"
                element={
                  <ProtectedRoute
                    allowedTypes={[20, 4]}
                    userType={userInfo.type_ac}
                  >
                    <Grades />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/formation-sanitaire"
                element={
                  <ProtectedRoute
                    allowedTypes={[20, 4]}
                    userType={userInfo.type_ac}
                  >
                    <Fsanitaire />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vacances"
                element={
                  <ProtectedRoute
                    allowedTypes={[15, 20, 0, 1, 2, 3, 4]}
                    userType={userInfo.type_ac}
                  >
                    {userInfo.type_ac === 15 ? (
                      <VacationsMini />
                    ) : (
                      <Vacations />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vacations-personnel/:id"
                element={
                  <ProtectedRoute
                    allowedTypes={[15, 20, 0, 1, 2, 3, 4]}
                    userType={userInfo.type_ac}
                  >
                    {userInfo.type_ac === 15 ? <VacationsPersonnel /> : null}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parametres"
                element={
                  <ProtectedRoute
                    allowedTypes={[15, 20, 0, 1, 2, 3, 4]}
                    userType={userInfo.type_ac}
                  >
                    <Settings id={userInfo.id} type={userInfo.type_ac} />
                  </ProtectedRoute>
                }
              />
              <Route path="/unauthorized" element={<NotAuth />} />
              <Route
                path="/"
                element={
                  <div className="welco33">
                    <div className="welco-card">
                      <h2 className="wel44">{t('Bonjour')} {userInfo.username} !</h2>
                      <br />
                      {userInfo.type_ac === 15 ? (
                        <p className="wel55">
                          {t('ce compte est')}{" "}
                          <span className="tpact88">{t('Personnel')}</span>, {t('vous pouvez demander des congés et vérifier vos demandes.')}
                        </p>
                      ) : (
                        <p className="wel55">
                          {t('Ce compte est destiné aux')}
                          <span className="tpact88"> {t('administrateurs')}</span>,
                         {t('vous avez les privilèges de')}{" "}
                          <span className="tpact88">
                            {userInfo.type_ac === 1
                              ? t("Bureau d'ordre")
                              : userInfo.type_ac === 2
                              ? t('Chef archaique')
                              : userInfo.type_ac === 3
                              ? t('Délégué')
                              : userInfo.type_ac === 4
                              ? t("RH")
                              : userInfo.type_ac === 20
                              ? t("Administrateur")
                              : userInfo.type_ac === 0
                              ? t("Invité")
                              : t("Inconnu")}
                          </span>
                          .
                        </p>
                      )}
                    </div>
                  </div>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
