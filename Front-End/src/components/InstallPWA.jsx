import { useEffect, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <button
      onClick={handleInstall}
      className="install-pwa-btn"
      title="Installer l'application"
    >
      <HiOutlineDownload className="install-pwa-icon" />
      <span className="install-pwa-label">Download</span>
    </button>
  );
};

export default InstallPWA;
