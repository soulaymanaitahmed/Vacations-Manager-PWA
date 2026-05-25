import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/print.css";
import rm from "../Images/rm.png";
import lg from "../Images/bg1.png";

import { baseURL } from "../config";
import { useTranslation } from "react-i18next";

const PrintComponent = React.forwardRef(({ data }, ref) => {
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

  // 🛡️ سطر الحماية: إذا لم تكن هناك بيانات للرخصة، المكون يختفي تماماً ولا يترك ورقة بيضاء
  if (!data || !data.type) {
    return null;
  }

  const typeLabels = {
    1: "Annuel",
    2: "Exceptionnel",
    3: "Aut d'absence",
    11: "C-Maladie C",
    12: "C-Maladie M",
    13: "C-Maladie L",
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthInFrench = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { month: "long" });
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
          المملكة المغربية <br /> ⵜⴰﮕⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ <br /> وزارة الصحة والحماية
          الإجتماعية <br /> ⵜⴰⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴷⵓⵙⵉ ⴷ ⴰﻨⴰ幕ⵎⵓⵏ <br /> المديرية الجهوية
          للصحة <br /> لجهة درعة تافيلالت <br /> مندوبية ورززات
        </div>
      </div>
      <br />
      <h3 className="des-print">
        <span className="n-con66">N° {data.id}</span>
        {isArabic ? " مقرر" : "Décision"}
      </h3>
      <br />
      <br />
      <h4 className="deleg66">
        {isArabic ? (
          <>
            {settings.delegue_gender === 1 ? "المندوب،" : "المندوبة،"} لوزارة الصحة والحماية الاجتماعية بإقليم ورززات
          </>
        ) : (
          <>
            {settings.delegue_gender === 1 ? "Le Délégué," : "La Déléguée,"} du Ministère de la Santé et de la Protection Sociale à la Province d'Ouarzazate
          </>
        )}
      </h4>
      <br />
      <br />
      <p className="dahir" id="silvergray">
        {isArabic ? (
          <>
            بناءً على الظهير الشريف رقم <b>1.58.008</b> الصادر في 04 شعبان 1377 (27 فبراير 1958) بمثابة النظام الأساسي العام للوظيفة العمومية.
          </>
        ) : (
          <>
            Vu le <b>Dahir 1.58.008</b> du 04 Chaabane 1377 (27 Février 1958) portant statut de la fonction puplique.
          </>
        )}
        <br />
        <br />
        {isArabic ? "بناءً على طلب الرخصة " : "Vu la demande du congé "}
        <b>
          {data.type < 10
            ? (isArabic ? "الإدارية" : "Administratif")
            : data.type >= 10 && data.type < 20
            ? (isArabic ? "المرضية" : "Congé de Maladie")
            : data.type === 21
            ? (isArabic ? "الولادة" : "Congé de Maternité")
            : data.type === 22
            ? (isArabic ? "الأبوة" : "Congé de Paternité")
            : null}
        </b>{" "}
        <b> {typeLabels[data.type] || "Autre"}</b>
        <br /> 
        {isArabic ? "المقدمة من طرف المعني(ة) بالأمر بتاريخ: " : "présentée par l'intéressé (é) le: "}
        <b className="datedem551">{formatDate(data.demand_date)}</b>
      </p>
      <br />
      <br />
      <h3 className="des-print">{isArabic ? "يقرر ما يلي" : "Décide"}</h3>
      <br />
      <br />
      <p className="dahir">
        {isArabic ? (
          <>
            فصل فريد: تمنح رخصة {typeLabels[data.type] || "Autre"} مدتها{" "}
            <span className="adlgkj6">
              {data.total_duration} أيام
            </span>{" "}
            برسم{" "}
            {data.year_2 ? "السنوات" : "سنة"} <b>{data.year_1}</b>
            {data.year_2 ? " و " + data.year_2 : null} لفائدة:
          </>
        ) : (
          <>
            Article unique : Un Congé {typeLabels[data.type] || "Autre"} de{" "}
            <span className="adlgkj6">
              {formatMonthInFrench(data.start_at)} ({data.total_duration})
            </span>{" "}
            jours ouvrables au titre {data.year_2 ? "des années" : "de l'année"} <b>{data.year_1}</b>
            {data.year_2 ? " et " + data.year_2 : null} est accordé à :
          </>
        )}
      </p>
      <br />
      <div className="maininfos78">
        <div className="line56">
          <p className="hbgu7">{isArabic ? "الاسم الكامل :" : "Nom et prénom : "}</p>
          <p className="hbg84">{data.nom + " " + data.prenom}</p>
        </div>
        <div className="line56">
          <p className="hbgu7">{isArabic ? "رقم التأجير :" : "PPR : "}</p>
          <p className="hbg84">{data.ppr}</p>
        </div>
        <div className="line56">
          <p className="hbgu7">{isArabic ? "الإطار / الدرجة :" : "Grade : "}</p>
          <p className="hbg84">{data.corp_name}</p>
        </div>
        <div className="line56">
          <p className="hbgu7">{isArabic ? "مقر العمل :" : "Affectation : "}</p>
          <p className="hbg84">{data.formation_sanitaire}</p>
        </div>
      </div>
      <br />
      <p className="dahir">
        {isArabic 
          ? "بمندوبية وزارة الصحة والحماية الاجتماعية بإقليم ورززات، على أن تبدأ الاستفادة منها ابتداء من:"
          : "A la Délégation dun Ministére de la Santé et de la Protection Sociale à la Province d'Ouarzazate, pur en bénéficier à compter:"}
      </p>
      <br />
      <div className="maininfos78">
        <div className="line56" id="kkopu6">
          <p className="hbgu78">{isArabic ? "من :" : "Du : "}</p>
          <p className="hbg8">{formatDate(data.start_at)}</p>
        </div>
        <div className="line56" id="kkopu6">
          <p className="hbgu78">{isArabic ? "إلى :" : "Au : "}</p>
          <p className="hbg8">{formatDate(data.end_at)}</p>
        </div>
      </div>
      <br />
      <h4 className="delgsign">
        {isArabic ? (
          <>
            ورززات في: <br /> {settings.delegue_gender === 1 ? "المندوب" : "المندوبة"} الإقليمي
          </>
        ) : (
          <>
            Ouarzazate le: <br /> {settings.delegue_gender === 1 ? "Le Délégué," : "La Déléguée,"} Provincial
          </>
        )}
      </h4>
      <br />
      <div className="ampttg">
        <p className="koyfbdg44">{isArabic ? "التقرير والتوزيع" : "Ampliations"}</p>
        <p className="list55">{isArabic ? "- رئيس مصلحة شبكة المؤسسات الصحية بالنيابة؛" : "- Chef du SRES par intérim;"}</p>
        <p className="list55">{isArabic ? "- المعني(ة) بالأمر؛" : "- L'intéressé;"}</p>
        <p className="list55">{isArabic ? "- ملف الإدارة؛" : "- Dossier;"}</p>
      </div>
      <br />
      <p className="ft44">
        Cité des Cadres - OUARZAZATE - Tél: 05 24 88 22 00/ 02 - Fax: 05 24 88 23 94
        <img className="print-logo2" src={lg} alt="Logo" width="40mm" />
      </p>
    </div>
  );
});

export default PrintComponent;