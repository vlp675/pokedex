# La meilleure appli de Pokédex (j'espère)

Bienvenue dans mon tout premier README ! Il va fournir des explications et conseils pour installer le projet et avoir ton propre Pokédex !

## Installation & initialisation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- MongoDB portable (et l'avoir lancé via la commande : `./bin/mongod.exe --dbpath data`)

### Étapes d'installation & lancement

1. Cloner le dépôt : 
   ```sh
   git clone https://github.com/vlp675/pokedex.git
   ```
2. Ouvrir 2 terminaux : un pour le back-end (`pokedex/back`) et un pour le front-end (`pokedex/front`).
3. Installer toutes les dépendances (React, CORS, ...) côté front et back dans les terminaux respectifs : 
   ```sh
   npm install
   ```

4. Configurer l'environnement en créant un fichier `props.env` dans le dossier `src` du back qui va contenir les variables :
   ```env
   IMGPATH="./images"
   TOKEN_SECRET="super_texte_long_retourné_par_node_src_keygen.js"
   ```

5. Configurer le token secret : exécuter la commande suivante dans le terminal back, cela retournera un super texte à coller dans le fichier `props.env` sous la variable `TOKEN_SECRET` :
   ```sh
   node src/keygen.js
   ```

6. Fetcher les pokémons pour remplir la BDD :
   ```sh
   node ./src/script/importPkmn.js
   ```

   Cela va peupler la base de données MongoDB avec tous les pokémons de PokéApi.
7. Lancer ce super projet de Pokédex :
   ```sh
   npm run start   # dans le terminal back de Visual Studio
   npm run dev     # dans le terminal front de Visual Studio
   ```
   
8. Ouvrir le lien `http://localhost:5173/` pour accéder à l'application.

## Structure du Projet

### Back & API

Le backend est une API construite avec Express.js et Mongoose pour interagir avec une base de données MongoDB, avec plusieurs requêtes prédéfinies :

- **Users**
  - `GET /api/users/check_user` : vérifie si l'utilisateur est connecté en tant qu'admin
  - `GET /api/users/:id_or_email` : récupère un utilisateur en fonction de son ID/email
  - `GET /api/users/` : récupère tous les utilisateurs
  - `PUT /api/users/:id` : met à jour un utilisateur
  - `DELETE /api/users/:id` : supprime un utilisateur
  - `POST /api/users/` : ajoute un utilisateur

- **Trainers**
  - `GET /api/trainer/` : récupère un trainer à partir de son ID fourni dans le body
  - `PUT /api/trainer/` : met à jour un trainer à partir de son ID fourni dans le body
  - `DELETE /api/trainer/` : supprime un trainer à partir de son ID fourni dans le body
  - `POST /api/trainer/` : ajoute un trainer
  - `POST /api/trainer/mark` : ajoute un pokémon comme vu/capturé à un trainer

- **Authentification**
  - `POST /api/login/` : permet de se connecter à l'application (et pouvoir gérer les captures/trainers/...)

- **Pokémons**
  - `POST /api/pkmn/` : ajoute un pokémon
  - `POST /api/pkmn/region` : ajoute une région à un pokémon à partir de son ID
  - `GET /api/pkmn/:id_or_name` : récupère un pokémon à partir de son ID ou de son nom
  - `GET /api/pkmn/` : récupère tous les pokémons avec des filtres (si besoin, à fournir dans le body)
  - `DELETE /api/pkmn/:id` : supprime un pokémon à partir de son ID
  - `DELETE /api/pkmn/:id` : supprime une région d'un pokémon à partir de son ID
  - `PATCH /api/pkmn/:id` : met à jour un pokémon à partir de son ID

### Front-end

Le front-end est construit avec React et communique avec l'API pour afficher les pokémons, gérer les utilisateurs et permettre l'interaction avec la base de données.