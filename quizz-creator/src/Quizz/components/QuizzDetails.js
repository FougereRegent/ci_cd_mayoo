import React, { useState } from "react";
import styles from "../assets/styles/main.module.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const QuizzDetails = () => {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [quizName, setQuizName] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidFields, setInvalidFields] = useState([]);

    const redirectToQuestion = () => {
        const invalidFieldsArray = [];
        if(!quizName) invalidFieldsArray.push("quizName");
        if(!category) invalidFieldsArray.push("category");
        if(!startDate) invalidFieldsArray.push("startDate");
        if(!endDate) invalidFieldsArray.push("endDate");
        setInvalidFields(invalidFieldsArray);

        if(invalidFieldsArray.length > 0) {
            //setErrorMessage("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        navigate(`/quizz/question/${questionNumber}`);
        setQuestionNumber(prevNumber => prevNumber + 1);
    };

    return (
        <main className={styles.main_section}>
            <div className={styles.container}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}><span className={styles.required}>*</span> Nom du quiz :</label>
                    <input
                        type="text"
                        className={`${styles.formInput} ${invalidFields.includes("quizName") && styles.invalid}`}
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                    />
                    {invalidFields.includes("quizName") && <div className={styles.errorMessage}>Renseignez un nom</div>}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}><span className={styles.required}>*</span> Choisissez une catégorie :</label>
                    <select
                        id="quizzCategorie"
                        className={`${styles.formInput} ${invalidFields.includes("category") && styles.invalid}`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="sante">Santé</option>
                        <option value="region">Région</option>
                        <option value="saisonnalite">Saisonnalité</option>
                        <option value="devine">Devine</option>
                        <option value="pays">Pays producteur</option>
                    </select>
                    {invalidFields.includes("category") && <div className={styles.errorMessage}>Renseignez une catégorie</div>}
                </div>
                <div className={styles.dateContainer}>
                    <div className={styles.dateItem}>
                        <label className={styles.formLabel}><span className={styles.required}>*</span> Date de parution :</label>
                        <TextField
                            id="dateDebut"
                            label="Date de début"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            className={`${styles.formDate} ${invalidFields.includes("startDate") && styles.invalid}`}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        {invalidFields.includes("startDate") && <div className={styles.errorMessage}>Renseignez une date</div>}
                    </div>
                    <div className={styles.dateItem}>
                        <label className={styles.formLabel}> <span className={styles.required}>*</span> Date de fin :</label>
                        <TextField
                            id="dateFin"
                            label="Date de fin"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            className={`${styles.formDate} ${invalidFields.includes("endDate") && styles.invalid}`}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        {invalidFields.includes("endDate") && <div className={styles.errorMessage}>Renseignez une date</div>}
                    </div>
                </div>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <div className={"button-container"}>
                    <button onClick={redirectToQuestion}>
                        Créer les questions
                    </button>
                </div>
            </div>
        </main>
    );

};

export default QuizzDetails;
