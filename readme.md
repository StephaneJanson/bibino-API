# API rest Bibino

Cette API sur le monde de la bière peut fonctionner en local ou vous pouvez la mettre en ligne (Heroku ou autre). Elle fonctionne avec nodeJs et postgreSQL

## Pré-requis

### L'installation de quelques programmes est nécéssaire

-   Dans le terminal faire npm init puis npm i
-   Créer à la racine du projet un fichier .env et y copier le contenu du fichier .env.example, mettre a jour avec vos données
-   L'utilisation de **postgreSQL** est nécéssaire :
    -   sudo -i -u postgres psql
    -   CREATE ROLE nomDuRole WITH LOGIN ENCRYPTED PASSWORD 'votreMotDePasse';
    -   CREATE DATABASE bibino OWNER nomDuRole;
-   **Sqitch** afin de manager la base de donnée
    -   créer un fichier sqitch.conf à la racine du projet et y copier le contenu du fichier sqitch.conf.example
    -   il y a 2 scripts pour sqitch que l'on peut lancer directement dans vscode sous l'explorateur script npm ou lançant la commande dans le terminal npm run resetdb afin de lancer sqitch revert puis sqitch deploy et npm run resetdbproduction afin de faire la même chose mais pour l'api en ligne
-   L'extension VSCode **REST Client** pour l'utilisation du fichier test.http afin de tester les routes

### Démarrage

nodemon ou node index.js

Codé avec
NodeJs
PostgreSQL

### Version

1.0.0

### Auteurs

Eva, Stéphane en back-end et
Nicolas, Arnaud en front-end
