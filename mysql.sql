CREATE DATABASE IF NOT EXISTS SuperTasksManager;

use SuperTasksManager;

CREATE TABLE dashboard 
    (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(100) NOT NULL
    );

CREATE TABLE user 
    (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(100) NOT NULL
    );

CREATE TABLE task 
    (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        id_dashboard INT NOT NULL,
        id_creator INT NOT NULL,
        description VARCHAR(100),
        state VARCHAR(100) NOT NULL,

        FOREIGN KEY (id_dashboard) 
            REFERENCES dashboard (id)
            ON DELETE CASCADE,

        FOREIGN KEY (id_creator) 
            REFERENCES user (id)
            ON DELETE CASCADE
    );

/* Permet d'attribuer les tâches au users */
CREATE TABLE attribution 
(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_user INT NOT NULL,
    id_task INT NOT NULL,

    FOREIGN KEY (id_user) 
        REFERENCES user (id)
        ON DELETE CASCADE,

    FOREIGN KEY (id_task)
        REFERENCES task (id)
        ON DELETE CASCADE
);

INSERT INTO user VALUES (null, "Richard");
INSERT INTO user VALUES (null, "Raymond");
INSERT INTO user VALUES (null, "Hugo");
INSERT INTO user VALUES (null, "Henri");
INSERT INTO user VALUES (null, "Charles");
INSERT INTO user VALUES (null, "Jacque");

INSERT INTO dashboard VALUES (null, "Projet Trottinette");
INSERT INTO dashboard VALUES (null, "Site Web");

INSERT INTO task VALUES (null, 1, 1, "ajouter une nouvelle feature", "en cours");
INSERT INTO task VALUES (null, 1, 3, "Faire le planning des reservations", "en cours");
INSERT INTO task VALUES (null, 2, 3, "Faire la page d'accueil", "en cours");
INSERT INTO task VALUES (null, 2, 4, "Travailler le SEO", "terminé");

INSERT INTO attribution VALUE (null, 1, 1);
INSERT INTO attribution VALUE (null, 1, 2);
INSERT INTO attribution VALUE (null, 2, 1);
INSERT INTO attribution VALUE (null, 2, 3);
INSERT INTO attribution VALUE (null, 3, 1);
INSERT INTO attribution VALUE (null, 4, 2);
INSERT INTO attribution VALUE (null, 4, 3);
INSERT INTO attribution VALUE (null, 4, 4);