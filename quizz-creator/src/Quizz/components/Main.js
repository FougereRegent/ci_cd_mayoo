import React, { useState, useEffect, useCallback } from "react";
import Table from "./MuiTable";
import styles from "../assets/styles/main.module.css";
import { fetchQuizz } from "../api";
import "../assets/styles/button.css";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh"; // Import de l'icône de rafraîchissement
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [quizzData, setQuizzData] = useState([]);
  const [initialQuizzData, setInitialQuizzData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const handleRedirect = (event) => {
    event.preventDefault();
    navigate("/quizz/new");
  };

  const fetchData = async () => {
    try {
      const data = await fetchQuizz();
      setQuizzData(data);
      setInitialQuizzData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataByNom = (e) => {
    const nomRecherche = e.target.value.toLowerCase();
    if (nomRecherche === "") {
      setQuizzData([...initialQuizzData]);
    } else {
      const quizzFiltres = initialQuizzData.filter((quizz) =>
          quizz.name.toLowerCase().includes(nomRecherche)
      );
      setQuizzData(quizzFiltres);
    }
  };

  const filterByDate = useCallback(() => {
    const filteredQuizz = initialQuizzData.filter((quizz) => {
      const startDateMatch =
          !startDate || new Date(quizz.start_date) >= new Date(startDate);
      const endDateMatch =
          !endDate || new Date(quizz.end_date) <= new Date(endDate);
      return startDateMatch && endDateMatch;
    });
    setQuizzData(filteredQuizz);
  }, [initialQuizzData, startDate, endDate]);

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    filterByDate();
  }, [filterByDate]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <main className={styles.main_section}>
        <div className={styles.container}>
          <div className={"button-app"}>
            <button onClick={handleRedirect}>
              <AddIcon style={{marginRight: 8}}/> Créer un quiz
            </button>
          </div>
          <div className={styles.filter_section}>
            <div className={styles.filter_input}>
              <input
                  type="text"
                  className={styles.filter_text}
                  placeholder="Filtrer par nom"
                  onChange={(e) => fetchDataByNom(e)}
              />
            </div>
            <div className={styles.filter_input}>
              <label htmlFor="startDate" className={styles.filter_label}>
                Date de parution du :
              </label>
              <input
                  id="startDate"
                  type="date"
                  className={styles.filter_text}
                  value={startDate || ""}
                  onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className={styles.filter_input}>
              <label htmlFor="endDate" className={styles.filter_label}>
                au :
              </label>
              <input
                  id="endDate"
                  type="date"
                  className={styles.filter_text}
                  value={endDate || ""}
                  onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className={"button-container"}>
              <button onClick={handleRefresh} className={`${"button-refresh"} ${"button-container"}`}>
                <RefreshIcon style={{marginRight: 8}}/>Actualiser
              </button>
            </div>
          </div>
          <Table quizz={quizzData}/>
        </div>
      </main>
  );
};

export default Main;
