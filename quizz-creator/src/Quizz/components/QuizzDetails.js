import React, { useState } from "react";
import styles from "../assets/styles/main.module.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const QuizzDetails = () => {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidFields, setInvalidFields] = useState([]);
    const [quizData, setQuizData] = useState(null);

    const redirectToQuestion = (e) => {
        e.preventDefault();

        const invalidFieldsArray = [];
        if (!quizName) invalidFieldsArray.push("quizName");
        if (!quizDescription) invalidFieldsArray.push("quizDescription");
        if (!startDate) invalidFieldsArray.push("startDate");
        if (!endDate) invalidFieldsArray.push("endDate");

        //Vérification des dates de parutions
        if (new Date(startDate) >= new Date(endDate)) {
            setErrorMessage("La date de début doit être avant la date de fin");
            return;
        }

        setInvalidFields(invalidFieldsArray);

        if (invalidFieldsArray.length > 0) {
            return;
        }

        const newQuizData = {
            name: quizName,
            description: quizDescription,
            start_date: new Date(startDate).toISOString(),
            end_date: new Date(endDate).toISOString(),

            questions: [],
        };
        setQuizData(newQuizData);

        navigate(`/quizz/question/${questionNumber}`, { state: { newQuizData } });
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
                    <label className={styles.formLabel}><span className={styles.required}>*</span> Description :</label>
                    <input
                        type="text"
                        className={`${styles.formInput} ${invalidFields.includes("quizDescription") && styles.invalid}`}
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                    />
                    {invalidFields.includes("quizDescription") && <div className={styles.errorMessage}>Renseignez une description</div>}
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
                <div className={"button-app"}>
                    <button onClick={redirectToQuestion}>
                        Créer les questions
                    </button>
                </div>
            </div>
        </main>
    );
};

export default QuizzDetails;
