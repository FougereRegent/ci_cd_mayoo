# Utilisation d'une image node.js comme base
FROM node

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
# Copier le reste des fichiers de l'application
COPY ./public ./public
COPY ./src ./src
COPY package*.json ./

# Installer les dépendances

RUN ls -al

RUN npm install \
&& npm run build


# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
