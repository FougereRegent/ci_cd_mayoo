import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../assets/styles/main.module.css";
import header from "../assets/styles/header.module.css";

const QuestionDetail = () => {
    const { questionNumber } = useParams();
    const navigate = useNavigate();
    const maxQuestionNumber = 12;
    const [question, setQuestion] = useState("");
    const [responses, setResponses] = useState(["", "", "", ""]);
    const [correctAnswers, setCorrectAnswers] = useState([false, false, false, false]);
    const [invalidFields, setInvalidFields] = useState([]);
    const [errorMessages, setErrorMessages] = useState({
        question: "",
        responses: ["", "", "", ""],
        correctAnswers: ""
    });
    const invalidFieldsArray = [];
    const newErrorMessages = { question: "", responses: ["", "", "", ""], correctAnswers: "" };

    const handleNextQuestion = () => {
        if (!question) {
            invalidFieldsArray.push("question");
            newErrorMessages.question = "Renseignez la question";
        }
        responses.forEach((response, index) => {
            if (!response.trim()) {
                invalidFieldsArray.push(`response${index + 1}`);
                newErrorMessages.responses[index] = "Renseignez la réponse";
            }
        });
        const isAnyCorrectAnswerSelected = correctAnswers.filter(answer => answer).length === 1;
        if (!isAnyCorrectAnswerSelected) {
            invalidFieldsArray.push("correctAnswers");
            newErrorMessages.correctAnswers = "Veuillez sélectionner une réponse correcte";
        }
        setInvalidFields(invalidFieldsArray);
        setErrorMessages(newErrorMessages);

        if (invalidFieldsArray.length === 0) {
            setQuestion("");
            setResponses(["", "", "", ""]);
            setCorrectAnswers([false, false, false, false]);

            const nextQuestionNumber = parseInt(questionNumber, 10) + 1;
            navigate(`/quizz/question/${nextQuestionNumber}`);
        }
    };

    const handleSaveQuizz = () => {
        if (!question) {
            invalidFieldsArray.push("question");
            newErrorMessages.question = "Renseigner la question";
        }
        responses.forEach((response, index) => {
            if (!response.trim()) {
                invalidFieldsArray.push(`response${index + 1}`);
                newErrorMessages.responses[index] = "Renseigner la réponse";
            }
        });
        const isAnyCorrectAnswerSelected = correctAnswers.filter(answer => answer).length === 1;
        if (!isAnyCorrectAnswerSelected) {
            invalidFieldsArray.push("correctAnswers");
            newErrorMessages.correctAnswers = "Veuillez sélectionner une réponse correcte";
        }
        setInvalidFields(invalidFieldsArray);
        setErrorMessages(newErrorMessages);

        if (invalidFieldsArray.length > 0) {
            return;
        } else {
            setQuestion("");
            setResponses(["", "", "", ""]);
            setCorrectAnswers([false, false, false, false]);

            navigate(`/quizz`);
        }
    };

    return (
        <main className={styles.main_section}>
            <div className={styles.container}>
                <h4>Question {questionNumber}/12</h4>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}><span className={styles.required}>*</span> Intitulé de la question :</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className={`${styles.formInput} ${invalidFields.includes("question") && styles.invalid}`}
                    />
                    {errorMessages.question && <div className={styles.errorMessage}>{errorMessages.question}</div>}
                    <div className={header.separation}></div>
                    <h4>Réponses</h4>
                    {[0, 1, 2, 3].map(index => (
                        <div key={index}>
                            <label className={styles.formLabel}><span className={styles.required}>*</span> Réponse {index + 1} :</label>
                            <div className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    checked={correctAnswers[index]}
                                    onChange={() => {
                                        const newCorrectAnswers = [...correctAnswers];
                                        newCorrectAnswers[index] = !correctAnswers[index];
                                        setCorrectAnswers(newCorrectAnswers);
                                    }}
                                    className={styles.checkboxInput}
                                />
                                Réponse correcte
                            </div>
                            <input
                                type="text"
                                value={responses[index]}
                                onChange={(e) => {
                                    const newResponses = [...responses];
                                    newResponses[index] = e.target.value;
                                    setResponses(newResponses);
                                }}
                                className={`${styles.formInput} ${invalidFields.includes(`response${index + 1}`) && styles.invalid}`}
                            />
                            {errorMessages.responses[index] && <div className={styles.errorMessage}>{errorMessages.responses[index]}</div>}
                        </div>
                    ))}
                    {invalidFields.includes("correctAnswers") && <div className={styles.errorMessage}>{errorMessages.correctAnswers}</div>}
                </div>
                <div className={"button-container"}>
                    {parseInt(questionNumber, 10) < maxQuestionNumber ? (
                        <button onClick={handleNextQuestion}>Question Suivante</button>
                    ) : (
                        <button onClick={handleSaveQuizz}>Enregistrer le Quizz</button>
                    )}
                </div>
            </div>
        </main>
    );
};

export default QuestionDetail;
