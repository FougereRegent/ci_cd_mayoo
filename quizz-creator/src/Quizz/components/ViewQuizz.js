import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../assets/styles/main.module.css";
import { format } from "date-fns";
import "../assets/styles/viewQuizz.css";
import header from "../assets/styles/header.module.css";
import validate from "../assets/icons/validate.png";
import arrowUp from "../assets/icons/arrow-up.png";
import API_URL from "../../config/config.dev";
import "../assets/styles/checkbox.css";

const ViewQuizzComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuestions, setEditedQuestions] = useState([]);
    const [isResponseValid, setIsResponseValid] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [textareaWidth, setTextareaWidth] = useState('100%');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth * 0.8;
            setTextareaWidth(`${width}px`);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const storedQuiz = localStorage.getItem('quiz');
        if (storedQuiz) {
            const parsedQuiz = JSON.parse(storedQuiz);
            setQuiz(parsedQuiz);
            setEditedQuestions([...parsedQuiz.questions]);
        } else if (location.state) {
            setQuiz(location.state);
            setEditedQuestions([...location.state.questions]);
        }
    }, [location.state]);

    useEffect(() => {
        return () => {
            localStorage.removeItem("quiz");
        };
    }, []);

    const deleteQuiz = () => {
        fetch(API_URL + "quizz/" + quiz.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.removeItem("quiz");
                    navigate(`/quizz`);
                } else {
                    console.error("Erreur lors de la suppression du quiz");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la communication avec l'API", error);
            });
    };

    const updateQuiz = () => {
        setIsEditing(true);
    };

    const saveChanges = () => {
        const allResponsesValid = editedQuestions.every(question =>
            question.responses.some(response => response.good_response)
        );

        if (allResponsesValid) {
            setIsResponseValid(true);
            setIsEditing(false);
            const updatedQuiz = {
                ...quiz,
                questions: editedQuestions
            };
            fetch(API_URL + "quizz", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedQuiz)
            })
                .then((response) => {
                    if (response.ok) {
                        localStorage.setItem("quiz", JSON.stringify(updatedQuiz));
                    } else {
                        console.error("Erreur lors de la modification du quiz");
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la communication avec l'API", error);
                });
        } else {
            setIsResponseValid(false);
        }
    };

    const updateQuestion = (index, newValue) => {
        const updatedQuestions = [...editedQuestions];
        updatedQuestions[index].question = newValue;
        setEditedQuestions(updatedQuestions);
    };

    const updateResponse = (questionIndex, responseIndex, newValue) => {
        const updatedQuestions = [...editedQuestions];
        updatedQuestions[questionIndex].responses[responseIndex].response = newValue;
        setEditedQuestions(updatedQuestions);
    };

    const updateGoodResponse = (questionIndex, responseIndex) => {
        const updatedQuestions = [...editedQuestions];
        updatedQuestions[questionIndex].responses[responseIndex].good_response = !updatedQuestions[questionIndex].responses[responseIndex].good_response;
        setEditedQuestions(updatedQuestions);
    };

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowScrollTop(true);
        } else {
            setShowScrollTop(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <main className={styles.main_section}>
            <div className={styles.container}>
                {quiz && (
                    <>
                        <h4>{quiz.name}</h4>
                        <div className={"description-container"}>
                            <div className={styles.formGroup} style={{ display: "flex", flexDirection: "column" }}>
                                <label className={styles.formLabel}>
                                    Description :
                                    <span className="normalText">{quiz.description}</span>
                                </label>
                                <label className={styles.formLabel}>
                                    Date de parution :
                                    <span className="normalText">
                                        Du {format(new Date(quiz.start_date), "dd/MM/yyyy")} au{" "}
                                        {format(new Date(quiz.end_date), "dd/MM/yyyy")}
                                    </span>
                                </label>
                            </div>
                            <div className={"button-container"}>
                                <button
                                    onClick={deleteQuiz}
                                    className={`${"button-delete"} ${"button-container"}`}
                                >
                                    Supprimer le quiz
                                </button>
                                <button
                                    onClick={isEditing ? saveChanges : updateQuiz}
                                    className={`${"button-update"} ${"button-container"}`}
                                >
                                    {isEditing ? "Enregistrer les modifications" : "Modifier le quiz"}
                                </button>
                                {!isResponseValid && <p style={{ color: 'red' }}>Veuillez sélectionner au moins une réponse correcte pour chaque question.</p>}
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={header.separation}></div>
                            {editedQuestions && editedQuestions.map((question, index) => (
                                <div key={index}>
                                    {isEditing ? (
                                        <textarea
                                            value={question.question}
                                            className="formInput"
                                            onChange={(e) => updateQuestion(index, e.target.value)}
                                            style={{ width: textareaWidth, whiteSpace: "pre-wrap" }}
                                        />
                                    ) : (
                                        <p>Question {index + 1}: {question.question}</p>
                                    )}
                                    <ul>
                                        {question.responses && question.responses.map((response, idx) => (
                                            <li key={idx}>
                                                {isEditing ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            className="formInput"
                                                            value={response.response}
                                                            onChange={(e) => updateResponse(index, idx, e.target.value)}
                                                            style={{ width: "70%" }}
                                                        />
                                                        <label className="checkbox-container">
                                                            <input
                                                                type="checkbox"
                                                                checked={response.good_response}
                                                                onChange={() => updateGoodResponse(index, idx)}
                                                            />
                                                            <span className="custom-checkbox"></span>
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        {response.response}
                                                        {response.good_response && (
                                                            <img
                                                                src={validate}
                                                                alt="Validé"
                                                                className="validateImage"
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {showScrollTop && (
                <div
                    className="scroll-top"
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        cursor: "pointer"
                    }}
                >
                    <img src={arrowUp} alt="Scroll to top"/>
                </div>

            )}
        </main>
    );
};

export default ViewQuizzComponent;
