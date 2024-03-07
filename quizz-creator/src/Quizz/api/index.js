const customData = [
    { id: 1, categorie: "Catégorie 1", name: "Produit 1" },
    { id: 2, categorie: "Catégorie 2", name: "Produit 2" },
    { id: 3, categorie: "Catégorie 2", name: "Produit 3" },
    { id: 4, categorie: "Catégorie 3", name: "Produit 4" },
    { id: 5, categorie: "Catégorie 2", name: "Produit 5" },
    { id: 6, categorie: "Catégorie 3", name: "Produit 6" },
    // ... autres produits
];

export const fetchQuizz = (param = "all") => {
    if (param === "all") {
        return Promise.resolve(customData);
    } else {
        const filteredData = customData.filter(item => item.categorie === param);
        return Promise.resolve(filteredData);
    }
};