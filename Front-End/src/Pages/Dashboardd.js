import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import PrintComponent from "./PrintComponent";
import "../Style/dashboard.css";

import { VscInspect } from "react-icons/vsc";

import { baseURL } from "../config";

function Dashboardd(props) {
  const tpp = props.type;
  const gg = tpp - 1;

  const [requests, setRequests] = useState([]);
  const [outEpl, setOutEpl] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [expand, setExpand] = useState(false);
  const [stats, setStats] = useState({ totalEmployees: 0, currentlyOnVacation: 0, vacationDetails: [], pendingRequests: 0 });

  const typeLabels = {
    1: "Annuel",
    2: "Exceptionnel",
    3: "Aut d'absence",
    11: "C-Maladie C",
    12: "C-Maladie M",
    13: "C-Maladie L",
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${baseURL}/filteredVacations`, {
        params: { type: tpp },
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  const fetchOutEmployees = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/filteredVacationsByDecision`,
      );
      setOutEpl(response.data);
    } catch (error) {
      console.error("Error fetching Out employees:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${baseURL}/dashboard/stats`, {
        params: { type: tpp },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchOutEmployees();
    fetchStats();
  }, []);

  useEffect(() => {
    const selectableRequests = requests.filter(
      (r) => r.decision === tpp && r.cancel !== 2,
    );
    setSelectAll(
      selectedIds.length === selectableRequests.length &&
        selectableRequests.length > 0,
    );
  }, [selectedIds, requests, tpp]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const printRefs = useRef([]);
  const handlePrint = useReactToPrint({
    content: () => printRefs.current[printRefs.current.index],
  });
  const onPrintClick = useCallback(
    (index) => {
      printRefs.current.index = index;
      handlePrint();
    },
    [handlePrint],
  );

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((selectedId) => selectedId !== id)
        : [...prevIds, id],
    );
  };
  const handleSelectAll = () => {
    const selectableRequests = requests.filter(
      (r) => r.decision === tpp && r.cancel !== 2,
    );
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(selectableRequests.map((r) => r.id));
    }
  };
  const updateSelectedRequests = async (des) => {
    try {
      await axios.put(`${baseURL}/updateRequests`, {
        ids: selectedIds,
        type: tpp,
        acc: des,
      });
      fetchRequests();
      fetchStats();
      setSelectedIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error updating requests:", error);
    }
  };
  const changeDecision = async (idd) => {
    try {
      await axios.put(`${baseURL}/changeDecision`, {
        id: idd,
        type: tpp,
      });
      fetchRequests();
      fetchStats();
      setSelectedIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error changing decision:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="stats-cards-container">
        <div className="stat-card pending-card">
          <div className="stat-icon pending-icon"></div>
          <div className="stat-info">
            <div className="stat-card-title">Demandes en attente</div>
            <div className="stat-card-value">{stats.pendingRequests}</div>
          </div>
        </div>
        <div className="stat-card team-card">
          <div className="stat-icon team-icon"></div>
          <div className="stat-info">
            <div className="stat-card-title">Total Personnel</div>
            <div className="stat-card-value">{stats.totalEmployees}</div>
          </div>
        </div>
        <div className="stat-card vacation-card">
          <div className="vacation-card-header">
            <div className="stat-icon vacation-icon"></div>
            <div className="stat-info">
              <div className="stat-card-title">En vacances actuellement</div>
              <div className="stat-card-value">{stats.currentlyOnVacation}</div>
            </div>
          </div>
          <div className="vacation-list-container">
            {stats.vacationDetails && stats.vacationDetails.length > 0 ? (
              <div className="mini-dash-table">
                <div className="mini-th">
                  <div className="m-th-name">Nom complet</div>
                  <div className="m-th-corp">Corps</div>
                  <div className="m-th-date">Période</div>
                </div>
                <div className="mini-tb">
                  {stats.vacationDetails.map((v, i) => (
                    <div key={i} className="mini-tr">
                      <div className="m-td-name">{v.prenom} {v.nom}</div>
                      <div className="m-td-corp"><span className="mini-corp-pill">{v.corp_name}</span></div>
                      <div className="m-td-date">{formatDate(v.start_at)} ➔ {formatDate(v.end_at)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="no-vacation-text">Aucun employé n'est en vacances actuellement.</p>
            )}
          </div>
        </div>
      </div>

      <div className="modern-dash-table">
        <div className="dash-table-header">
          <div className="th-cell th-checkbox">
            <label className="modern-checkbox">
              <input
                id="selectAllCheckbox"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="th-cell th-name">Nom Complet</div>
          <div className="th-cell th-type">Type</div>
          <div className="th-cell th-duration">Durée</div>
          <div className="th-cell th-date">Période</div>
          <div className="th-cell th-action">Consulter</div>
        </div>

        <div className={expand ? "dash-table-body expand" : "dash-table-body"}>
          {requests.length === 0 ? (
            <div className="no-data-state">
              Il n'y a aucune demande pour vous en ce moment.
            </div>
          ) : (
            requests.map((r, index) => {
              const isChecked = selectedIds.includes(r.id);
              return (
                <div key={r.id} className={`dash-table-row ${isChecked ? 'selected' : ''}`}>
                  <div className="td-cell td-checkbox">
                    {r.cancel === 2 ? (
                      <span className="badge badge-cancelled">Annuler</span>
                    ) : r.decision >= tpp && r.decision < 10 ? (
                      <span className="badge badge-validated">✔ Validé</span>
                    ) : r.decision >= 20 ? (
                      <span
                        className="badge badge-rejected"
                        onClick={() => changeDecision(r.id)}
                        title="Réinitialiser la décision"
                      >
                        ✖ Rejeté
                      </span>
                    ) : r.decision === gg ? (
                      <label className="modern-checkbox">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(r.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    ) : (
                      <span className="badge badge-pending">--</span>
                    )}
                  </div>
                  <div className="td-cell td-name">
                    <div className="employee-name">{r.prenom} {r.nom}</div>
                  </div>
                  <div className="td-cell td-type">
                    <span className="type-pill">{typeLabels[r.type] || "Type"}</span>
                  </div>
                  <div className="td-cell td-duration"><strong>{r.total_duration}</strong> Jours</div>
                  <div className="td-cell td-date">
                    {formatDate(r.start_at)} ➔ {formatDate(r.end_at)}
                  </div>
                  <div className="td-cell td-action">
                    <button 
                      className="inspect-btn"
                      onClick={() => {
                        const oo = r.per_id * 45657;
                        window.location.href = `/personnels/${oo}`;
                      }}
                    >
                      <VscInspect />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {requests.length > 0 && (
          <div className="dash-table-footer">
            <div className="bulk-actions">
              <button
                className="btn-reject"
                onClick={() => updateSelectedRequests(0)}
                disabled={selectedIds.length === 0}
              >
                Rejeter Sélections
              </button>
              <button
                className="btn-validate"
                onClick={() => updateSelectedRequests(1)}
                disabled={selectedIds.length === 0}
              >
                Valider Sélections
              </button>
            </div>
            {requests.length > 5 && (
              <button onClick={() => setExpand(!expand)} className="btn-expand">
                {expand ? "Réduire la liste" : "Voir plus de demandes"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboardd;
