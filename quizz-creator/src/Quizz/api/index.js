import API_URL from "../../config/config.dev";

export const fetchQuizz = (param = "all") => {
    if (param === "all") {
        return fetch(API_URL + "quizz")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Erreur:', error);
                return [];
            });
    }
};
