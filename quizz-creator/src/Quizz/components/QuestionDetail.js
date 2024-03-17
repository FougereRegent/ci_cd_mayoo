import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "../assets/styles/main.module.css";
import header from "../assets/styles/header.module.css";
import API_URL from "../../config/config.dev";

const QuestionDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { questionNumber } = useParams();
    const maxQuestionNumber = 12;
    const [question, setQuestion] = useState("");
    const [responses, setResponses] = useState(["", "", "", ""]);
    const [correctAnswers, setCorrectAnswers] = useState([false, false, false, false]);
    const [invalidFields, setInvalidFields] = useState([]);
    const [errorMessages, setErrorMessages] = useState({
        question: "",
        responses: ["", "", "", ""],
        good_response: ""
    });
    const invalidFieldsArray = [];
    const newErrorMessages = { question: "", responses: ["", "", "", ""], good_response: "" };

    const [quizData, setQuizData] = useState({ questions: [] });

    const formatResponses = () => {
        const formattedResponses = responses.map((response, index) => ({
            response: response,
            good_response: correctAnswers[index]
        }));
        return formattedResponses;
    };

    const newQuestion = {
        question: question,
        responses: formatResponses()
    };

    useEffect(() => {
        if (location.state && location.state.newQuizData) {
            setQuizData(location.state.newQuizData);
        } else {
            // Gérer le cas où newQuizData n'est pas défini
        }
    }, [location.state]);


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
        const isAnyCorrectAnswerSelected = correctAnswers.filter(answer => answer).length >= 1;
        if (!isAnyCorrectAnswerSelected) {
            invalidFieldsArray.push("correctAnswers");
            newErrorMessages.good_response = "Veuillez sélectionner la/les réponse(s) correcte(s)";
        }
        setInvalidFields(invalidFieldsArray);
        setErrorMessages(newErrorMessages);

        if (invalidFieldsArray.length === 0) {
            const updatedQuestions = [...quizData.questions, newQuestion];
            const updatedQuizData = {
                ...quizData,
                questions: updatedQuestions,
            };

            setQuizData(updatedQuizData);

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
        const isAnyCorrectAnswerSelected = correctAnswers.filter(answer => answer).length >= 1;
        if (!isAnyCorrectAnswerSelected) {
            invalidFieldsArray.push("correctAnswers");
            newErrorMessages.good_response = "Veuillez sélectionner la/les réponse(s) correcte(s)";
        }
        setInvalidFields(invalidFieldsArray);
        setErrorMessages(newErrorMessages);

        if (invalidFieldsArray.length > 0) {
            return;
        } else {
            const updatedQuestions = [...quizData.questions, newQuestion];
            const updatedQuizData = {
                ...quizData,
                questions: updatedQuestions,
            };

            setQuizData(updatedQuizData);

            fetch(API_URL + "quizz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedQuizData)
            })
                .then(response => {
                    if (response.ok) {
                        navigate(`/quizz`);
                    } else {
                        console.error("Erreur lors de la création du quiz");
                    }
                })
                .catch(error => {
                    console.error("Erreur lors de la communication avec l'API", error);
                });

            setQuestion("");
            setResponses(["", "", "", ""]);
            setCorrectAnswers([false, false, false, false]);
        }
    };


    return (
        <main className={styles.main_section}>
            <div className={styles.container}>
                <h4>Question {questionNumber}/12</h4>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}><span className={styles.required}>*</span> Intitulé de la question :</label>
                    <textarea
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
                    {invalidFields.includes("correctAnswers") && <div className={styles.errorMessage}>{errorMessages.good_response}</div>}
                </div>
                <div className={"button-app"}>
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