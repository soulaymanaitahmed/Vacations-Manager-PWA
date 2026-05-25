import { MdOutlineLockPerson } from "react-icons/md";
import "../Style/notaut.css";
import { useTranslation } from "react-i18next";
function NotAuth() {
  const {t,i18n}=useTranslation('translation' , {keyPrefix:'NotAuth'});
  return (
    <div className="not66">
      <MdOutlineLockPerson className="desoalert" />
      <span className="deso44">
        {t("Désolé, vous n'avez pas accès à cette page avec ce compte.")}
      </span>
    </div>
  );
}
export default NotAuth;
