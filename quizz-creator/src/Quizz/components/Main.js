import React, { useState, useEffect } from "react";
import Table from "./MuiTable";
import styles from "../assets/styles/main.module.css";
import { fetchQuizz } from "../api";
import button from "../assets/styles/button.css";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

const Main = () => {
  const [quizzData, setQuizzData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialQuizzData, setInitialQuizzData] = useState([]);

  const navigate = useNavigate();

  const handleRedirect = (event) => {
    event.preventDefault();
    navigate("/quizz/new");
  };

  const fetchData = async () => {
    await fetchQuizz()
    .then((data) => {
      setQuizzData(data);
      setCategories(prev => [...new Set(data.map((item) => item.categorie))]);
      setInitialQuizzData(data);
    })
    .catch((e) => {
      console.error(e);
    });
  };

  const fetchDataByCategorie = (e) =>{
    fetchQuizz(e.target.value)
        .then((data) => {
          setQuizzData(data);
        })
        .catch((e) => {
          console.error(e);
        });
  }

  const fetchDataByNom = (e) => {
    const nomRecherche = e.target.value.toLowerCase();
    if (nomRecherche === "") {
      setQuizzData([...initialQuizzData]); // Affichez tous les produits si le champ de recherche est vide
    } else {
      const quizzFiltres = initialQuizzData.filter((quizz) =>
          quizz.name.toLowerCase().includes(nomRecherche)
      );
      setQuizzData(quizzFiltres);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <main className={styles.main_section}>
        <div className={styles.container}>
          <div className={"button-container"}>
            <button onClick={handleRedirect}>
              <AddIcon style={{ marginRight: 8 }} />Créer un quiz
            </button>
          </div>
          <div className={styles.filter_section}>
            <div className={styles.filter_input}>
              <i className={`fas fa-search ${styles.search_icon}`}></i>
              <select className={styles.filter_select} onChange={e => fetchDataByCategorie(e)}>
                <option value="all">Catégorie</option>
                {categories.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                ))}
              </select>
            </div>
            <div className={styles.filter_input}>
              <i className={`fas fa-search ${styles.search_icon}`}></i>
              <input
                  type="text"
                  className={styles.filter_text}
                  placeholder="Filtrer par nom"
                  onChange={e => fetchDataByNom(e)}
              />
            </div>
          </div>
          <Table quizz={quizzData} />
        </div>
      </main>
  );
};

export default Main;
