import { TbError404 } from "react-icons/tb";
import "../Style/notaut.css";
import { useTranslation } from "react-i18next";
function NotFound() {
  const {t,i18n}=useTranslation('translation', {keyPrefix:'NotFound'});
  return (
    <div className="not66">
      <TbError404 className="desoalert1" />
      <span className="deso441">
        {t("Page non trouvée. Désolé, la page que vous cherchez n'existe pas ou a été déplacée.")}
      </span>
    </div>
  );
}
export default NotFound;
