import React, { useEffect, useState } from "react";
import axios, { baseURL } from "../config";
import "../Style/print.css";
import rm from "../Images/rm.png";
import lg from "../Images/bg1.png";
import { useTranslation } from "react-i18next";

const PrintComponent2 = React.forwardRef(({ data, dt }, ref) => {
  const [settings, setSettings] = useState({
    delegue_gender: 1,
    delegue: "",
    etablissement: "",
  });

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${baseURL}/settings`);
      if (response.data.length > 0) {
        setSettings(response.data[0]);
      } else {
        console.error("No settings found in response");
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // 🛡️ سطر الحماية: إذا لم تكن هناك بيانات للموظف أو الطلب، يختفي المكون تماماً ولا يظهر فارغاً
  if (!dt || !dt.nom || !data) {
    return null;
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div ref={ref} className="print55" style={{ direction: isArabic ? "rtl" : "ltr" }}>
      <div className="header-print">
        <div className="print-h1">
          Royaume du Maroc <br /> Ministère de la Santé <br /> et de la
          Protection sociale <br /> Direction Régionale de la Santé <br /> à la
          Région Dràa-Tafilalet <br /> Délégation d'Ouarzazate
        </div>
        <div className="print-h1">
          <img className="print-logo" src={rm} alt="Logo" width="25mm" />
        </div>
        <div className="print-h1">
          المملكة المغربية <br /> ⵜⴰﮕⵍⴷيت ⵏ ⵍⵎⵖⵔⵉⴱ <br /> وزارة الصحة والحماية
          الإجتماعية <br /> ⵜⴰⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴷⵓⵙⵉ ⴷ ⴰﻨⴰⵎⵓⵏ <br /> المديرية الجهوية
          للصحة <br /> لجهة درعة تافيلالت <br /> مندوبية ورززات
        </div>
      </div>
      <br />
      <span className="n-con661">N° {data.id}</span>
      <h3 className="des-print" id="hhjk88">
        {isArabic ? "طلب الاستفادة من رخصة إدارية" : "Demande en vue de bénéficier d'un congé administratif"}
      </h3>
      <br />
      <p className="dahir" id="silvergray">
        {isArabic ? (
          <>
            بناءً على الظهير الشريف رقم 1.58.008 الصادر في 4 شعبان 1377 (27 فبراير 1958) بمثابة النظام الأساسي العام للوظيفة العمومية.
          </>
        ) : (
          <>
            Vu le <b>Dahir 1.58.008</b> du 04 Chaabane 1377 (27 Février 1958) portant statut de la fonction puplique.
          </>
        )}
      </p>
      <br />
      <br />
      <div className="maininfos78" id="ghj6">
        <div className="line56" id="dist55">
          <p className="hbgu7">PPR : </p>
          <p className="hbg8">{dt.ppr}</p>
          <p className="hbgu76">رقم التأجير :</p>
        </div>
        <div className="line56" id="dist55">
          <p className="hbgu7">Nom : </p>
          <p className="hbg8">{dt.nom}</p>
          <p className="hbgu76">الاسم العائلي :</p>
        </div>
        <div className="line56" id="dist55">
          <p className="hbgu7">Prénom : </p>
          <p className="hbg8">{dt.prenom}</p>
          <p className="hbgu76">الاسم الشخصي :</p>
        </div>
        <div className="line56" id="dist55">
          <p className="hbgu7">Grade : </p>
          <p className="hbg8">{dt.corp_name}</p>
          <p className="hbgu76">الدرجة :</p>
        </div>
        <div className="line56" id="dist55">
          <p className="hbgu7">Affectation : </p>
          <p className="hbg8">{dt.formation_sanitaire}</p>
          <p className="hbgu76">مقر العمل :</p>
        </div>
        <div className="line56" id="dist55">
          <p className="hbgu7">N° de téléphone : </p>
          <p className="hbg8">{dt.phone}</p>
          <p className="hbgu76">رقم الهاتف :</p>
        </div>
      </div>
      <br />
      <br />
      <p className="dahir">
        {isArabic ? (
          <>
            إلى {settings.delegue_gender === 1 ? "السيد المندوب المحترم،" : "السيدة المندوبة المحترمة،"}
          </>
        ) : (
          <>
            {settings.delegue_gender === 1 ? "Monsieur le Délégué," : "Madame la Déléguée,"}
          </>
        )}
        <br />
        {isArabic ? (
          <>
            يشرفني أن أتقدم إليكم بطلبي هذا قصد الاستفادة من رخصة مدتها <b>{data.total_duration} أيام </b> من نوع:
          </>
        ) : (
          <>
            Par le présente, je vous prie de bien vouloir m'acorder <b>{data.total_duration} jours </b> de congé:
          </>
        )}
      </p>
      <p className="dahir">
        <u>
          <b>
            {data.type === 1
              ? (isArabic ? "سنوية" : "Annuel")
              : data.type === 2
              ? (isArabic ? "استثنائية" : "Exceptionnel")
              : data.type === 3
              ? (isArabic ? "إذن بالغياب" : "D'autorisation d'absence")
              : data.type === 21
              ? (isArabic ? "ولادة" : "De Maternité")
              : data.type === 22
              ? (isArabic ? "أبوة" : "De Paternité")
              : null}
          </b>
        </u>
        <b>
          {data.quitter === 1 && data.type === 1
            ? (isArabic ? " مع رخصة مغادرة التراب الوطني." : " Avec autorisation de quitter le territoire.")
            : data.quitter === 0 && data.type === 1
            ? (isArabic ? " دون رخصة مغادرة التراب الوطني." : " Sans autorisation de quitter le territoire.")
            : null}
        </b>
      </p>
      <br />
      <p className="dahir">
        {isArabic ? "برسم سنة : " : "Au titre de l'année : "} <b>{data.year_1} </b>
        {data.year_2 ? (
          <span className="grt78">
            ({data.duration_1}) <b>/</b> {data.year_2} ({data.duration_2})
          </span>
        ) : null}
      </p>
      <br />
      <div className="maininfos78" id="ghj6">
        <div className="line56" id="kkopu6">
          <p className="hbgu78">{isArabic ? "من :" : "Du : "}</p>
          <p className="hhfhggt1">{formatDate(data.start_at)}</p>
        </div>
        <div className="line56" id="kkopu6">
          <p className="hbgu78">{isArabic ? "إلى :" : "Au : "}</p>
          <p className="hhfhggt1">{formatDate(data.end_at)}</p>
        </div>
      </div>
      <br />
      <p className="dahir" id="silvergray">
        {isArabic ? "وفي انتظار جوابكم، تقبلوا فائق عبارات التقدير والاحترام." : "Veuillez agréer, l'expression de mes salutations distinguées."}
      </p>
      <br />
      <div className="kknyi5">
        <div className="agentsing">
          <span className="sintitre">{isArabic ? "توقيع الموظف(ة)" : "Signature de l'agent"}</span>
        </div>
        <b className="hhfhggt">
          {isArabic ? "ورززات في : " : "Ouarzazate le : "} {formatDate(data.demand_date)}
        </b>
      </div>
      <br />
      <div className="table55">
        {isArabic ? "رأي الإدارة" : "Avis"}
        <div className="tbgg">
          <div className="col1">
            <span className="cds">{isArabic ? "رئيس المؤسسة الصحية" : "Chef archaic"}</span>
            <span className="cds" id="hhgv55">
              {isArabic ? "" : (settings.delegue_gender === 1 ? "Délégué" : "Déléguée")} {isArabic ? "المندوب الإقليمي" : "Provincial"}
            </span>
          </div>
          <div className="col2">
            <span className="cds1"></span>
            <span className="cds1" id="hhgv55"></span>
          </div>
        </div>
      </div>
      <p className="ft44">
        Cité des Cadres - OUARZAZATE - Tél: 05 24 88 22 00/ 02 - Fax: 05 24 88 23 94
        <img className="print-logo2" src={lg} alt="Logo" width="40mm" />
      </p>
    </div>
  );
});

export default PrintComponent2;