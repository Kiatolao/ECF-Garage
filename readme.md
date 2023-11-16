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
  - Première solution importer la base de données fournie dans le rapport rendu
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
     - Il faudra s'assurer d"ajouter un utilisateur dans la table 'users' avec un mot de passe d'au moins 8 caractères et un chiffre
     - L'utilisateur devra avoir le rôle 'admin'
