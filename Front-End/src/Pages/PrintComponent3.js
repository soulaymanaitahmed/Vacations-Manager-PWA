import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/print.css";
import rm from "../Images/rm.png";
import lg from "../Images/bg1.png";

import { baseURL } from "../config";
import { useTranslation } from "react-i18next";

const PrintComponent3 = React.forwardRef(({ data }, ref) => {
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

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const { i18n } = useTranslation();
  
  // 🔍 نتحقق من اللغة الحالية مباشرة (هل هي عربية؟)
  const isArabic = i18n.language === "ar";

  return (
    <div ref={ref} className="print55" style={{ direction: isArabic ? "rtl" : "ltr" }}>
      <div className="header-print">
        <div className="print-h1">
          Royaume du Maroc <br /> Ministère de la Santé <br /> et de la
          Protection sociale <br /> Direction Régionale de la Santé <br /> à la
          Région Dràa-Tafilalet
          <br />
          Délégation d'Ouarzazate
        </div>
        <div className="print-h1">
          <img className="print-logo" src={rm} alt="Logo" width="25mm" />
        </div>
        <div className="print-h1">
          المملكة المغربية <br /> ⵜⴰﮕⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ <br /> وزارة الصحة والحماية
          الإجتماعية <br /> ⵜⴰⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴷⵓⵙِ ⴷ ⴰﻨⴰⵎⵓⵏ <br /> المديرية الجهوية
          للصحة <br /> لجهة درعة تافيلالت <br /> مندوبية ورززات
        </div>
      </div>
      <br />
      <br />
      <br />
      
      {/* 1️⃣ عنوان الشهادة مستقر ومباشر */}
      <h3 className="des-print">
        {isArabic ? "شهادة العمل" : "Attestation de travail"}
      </h3>
      
      <br />
      <br />
      <br />
      <br />
      <br />
      
      {/* 2️⃣ الجملة الطويلة التي كانت تختفي نكتبها هنا نصاً ثابتاً ومباشراً */}
      <p className="dahir">
        {isArabic ? (
          <>
            {settings.delegue_gender === 1 ? "المندوب" : "المندوبة"}{" "}
            لوزارة الصحة والحماية الاجتماعية بإقليم ورززات، يشهد بموجب هذه الشهادة أن:
          </>
        ) : (
          <>
            {settings.delegue_gender === 1 ? "Le Délégué" : "La Déléguée"}{" "}
            du Ministère de la Santé et de la Protection Sociale à la Province d'Ouarzazate, atteste par la présente que :
          </>
        )}
      </p>
      
      <br />
      <br />
      <br />
      
      <div className="maininfos78" id="kkng55">
        {/* 3️⃣ حقل الاسم والنسب بشكل مباشر ومضمون */}
        <div className="line56">
          <p className="hbgu71">{isArabic ? "الاسم الكامل :" : "Nom et prénom :"}</p>
          <p className="hbg81">{data.nom + " " + data.prenom}</p>
        </div>
        <div className="line56">
          <p className="hbgu71">{isArabic ? "رقم البطاقة الوطنية :" : "CIN :"}</p>
          <p className="hbg81">{data.cin}</p>
        </div>
        <div className="line56">
          <p className="hbgu71">{isArabic ? "رقم التأجير :" : "PPR :"}</p>
          <p className="hbg81">{data.ppr}</p>
        </div>
        <div className="line56">
          <p className="hbgu71">{isArabic ? "الإطار / الدرجة :" : "Grade :"}</p>
          <p className="hbg81">{data.corp_name}</p>
        </div>
        <div className="line56">
          <p className="hbgu71">{isArabic ? "تاريخ التوظيف :" : "Date de recrutement :"}</p>
          <p className="hbg81">{formatDate(data.date_affect)}</p>
        </div>
      </div>
      
      <br />
      <br />
      <br />
      
      <p className="dahir">
        {isArabic 
          ? "يزاول (تزاول) مهامه بمندوبية وزارة الصحة والحماية الاجتماعية بإقليم ورززات."
          : "Est en fonction à la Délégation du Ministère de la Santé et de la protection Sociale à la Province d'Ouarzazate."}
      </p>
      
      <br />
      
      <p className="dahir">
        {isArabic ? (
          <>
            سلمت هذه الشهادة إلى المعني{data.gander === 0 ? "ة" : " بالأمر"} بناءً على طلبه لاستعمالها في أغراضها الإدارية.
          </>
        ) : (
          <>
            La présente attestation est délivrée à l'intéressé{data.gander === 0 ? "e" : null} sur sa demande pour servir et valoir ce que de droit.
          </>
        )}
      </p>
      
      <br />
      <br />
      
      <h4 className="delgsign44">
        {isArabic ? (
          <>
            ورززات في: {settings.delegue_gender === 1 ? "المندوب" : "المندوبة"} الإقليمي
          </>
        ) : (
          <>
            Ouarzazate le: {settings.delegue_gender === 1 ? "Le Délégué" : "La Déléguée"} Provincial
          </>
        )}
      </h4>
      
      <br />
      <p className="ft44">
        Cité des Cadres - OUARZAZATE - Tél: 05 24 88 22 00/ 02 - Fax: 05 24 88 23 94
        <img className="print-logo2" src={lg} alt="Logo" width="40mm" />
      </p>
    </div>
  );
});

export default PrintComponent3;