import axios from "axios";
import toast from "react-hot-toast";

const getBaseURL = () => {
  const { protocol, hostname } = window.location;
  const port = 7766;
  return `${protocol}//${hostname}:${port}`;
};

export const baseURL = getBaseURL();

let backendToastId = null;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      if (!backendToastId) {
        backendToastId = toast.error(
          "Le serveur est inaccessible. Veuillez vérifier votre connexion.",
          {
            duration: 5000,
            style: {
              background: "#1e293b",
              color: "#fff",
              borderRadius: "10px",
            },
            onClose: () => {
              backendToastId = null;
            },
          }
        );
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
