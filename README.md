# Projetweb - Gestion des associations

Projet du module "Programmation serveur web" (ESIR S8). Backend REST développé avec NestJS (TypeScript) pour la gestion des associations : les utilisateurs et les associations auxquelles ils sont rattachés.

## Lancement

```bash
npm install
npm run start:dev
```

## Organisation du projet

Le code source est dans `src/`, découpé en modules. Chaque module gère une ressource et contient trois couches :

- `*.controller.ts` : reçoit les requête HTTP, découpe les données d'entrée et renvoie les réponses (ou les erreurs 404)
- `*.service.ts` : la logique métier (création, recherche, modification, suppression), c'est aussi les services qui s'appellent entre eux quand un module a besoin d'un autre
- `*.entity.ts` : le modèle de la ressource

### Module users

Gestion des utilisateurs (`User` : id, lastname, firstname, age).

### Module associations

Gestion des associations (`Association` : id, idUsers, name). Le module utilise le service du module users pour récupérer les membres d'une association.

## API

| Méthode | Route | Description |
| --- | --- | --- |
| GET | /users | Tous les utilisateurs |
| GET | /users/:id | Un utilisateur |
| POST | /users | Créer un utilisateur |
| PUT | /users/:id | Modifier un utilisateur |
| DELETE | /users/:id | Supprimer un utilisateur |
| GET | /associations | Toutes les associations |
| GET | /associations/:id | Une association |
| GET | /associations/:id/members | Les membres d'une association |
| POST | /associations | Créer une association |
| PUT | /associations/:id | Modifier une association |
| DELETE | /associations/:id | Supprimer une association |