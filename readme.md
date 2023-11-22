Note pour le correcteur

Mises à jour faites après avoir déposé l'évaluation:

1- Ajout Regex
  - Auth.js
    - Ajout d'un Regex email/password dans les controleurs register et  login
    - Les modifications  ont été faites en conséquence dans le frontend

2- Bug détécté dans le dashboard - Supprimer un utilisateur
  - Deboggage en cours
    - Les requêtes sont succesfull coté front et back end mais l'utilisateur ne s'efface pas dans la BDD

3- Ajout d'un ReCaptcha login en cours

-------------------------------
Installation du projet en local 

1 - Télecharger le repository

2 - Se rendre dans le dossier "api" avec le terminal
  - cd api
  - npm install

3 - Se rendre dans le dossier "client" avec le terminal
  - cd client
  - npm install

4 - Configurer les variables d'environnement client et API ( celles sont fournies dans le dossier projet en annexe)

5 - Créer un admin / se connecter en local
  - Première solution importer la base de données fournie dans le rapport 
    - Avec le logiciel MYSQL workbench créer une nouvelle connexion
    - Connection name : nom_de_la_connexion
    - Dans hostname : localhost port : 3306
    - username : root
    - password : password
    - Tester la connexion puis se rendre sur l'interface de celle-ci
    - Dans l'option Server choisir Data import
    - Choisir le fichier dump fourni et l'importer
    - Ajouter un fichier .env à la racin du dossier API ( .env fourni dans le rapport)
    - Editer le fichier en ajoutant les paramètres choisis lors de la création de la connection

   - Deuxième solution recréer un base de données, grâce à la liste de commande SQL fourni dans le dossier
    - Créer un nouvel admin directement dans la base de données
        - lui attribuer un nom d'utilisateur, un email, un id qui n'existe pas déja
        - pour le mot de passe il faudra se rendre sur https://www.bcrypt.fr/
          - générer un mot de passe hashé, le récupérer et le rentrer dans la BDD
     - L'utilisateur devra avoir le rôle 'admin'
