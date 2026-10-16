# Fuit'Eau

Application web de gestion des **fiches fuite AEP** — Communauté d'Agglomération du Pays Voironnais (CAPV), Service Cycle de l'Eau.

Fait partie de l'écosystème **AquaPilot**.

## Stack

- Frontend : HTML/JS vanilla — hébergé sur GitHub Pages
- Base de données : Supabase Postgres (Paris, eu-west-3)
- Auth : Supabase Auth email/password (comptes créés manuellement)
- Emails : Supabase Edge Functions + Resend

## URL

https://aquapilot-capv.github.io/fuite-eau/

## Scripts SQL

| Script | Contenu |
|--------|---------|
| 01_fuites.sql | Tables principales, RLS, triggers, données par défaut |

## Profils

| Rôle | Droits |
|------|--------|
| superadmin | Tout, y compris paramètres et gestion utilisateurs |
| agent_rdf | Créer / modifier / envoyer des fiches |
| consultant | Lecture seule |
| demo | Lecture seule, tout verrouillé |

## Développement local

Ouvrir `index.html` directement dans le navigateur (pas de build nécessaire).
