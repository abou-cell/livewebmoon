# LiveWebMoon — première installation d'un studio indépendant

## Architecture

- Un déploiement = une créatrice (un seul enregistrement `creator_settings`, clé primaire `id=true`).
- Les visiteurs peuvent créer des comptes membres, mais ne deviennent jamais propriétaires automatiquement.
- L'initialisation propriétaire est réservée à une utilisatrice **connectée avec son email confirmé** et disposant d'une **clé secrète d'installation** connue du serveur.
- Les contenus privés ne doivent jamais être distribués sans une vérification serveur des droits. Stripe et Cloudflare nécessitent une intégration backend indépendante des pages publiques.

## Configuration sécurisée avant la première utilisation

1. Préparer Supabase et appliquer le schéma `supabase/schema.sql` sur le projet neuf. Ne pas réappliquer aveuglément des `create policy` déjà exécutés.
2. Ajouter les variables de la fonction Edge Supabase : `OWNER_SETUP_TOKEN` (valeur aléatoire d'au moins 32 caractères **secret côté serveur uniquement**) et `PUBLIC_SITE_ORIGIN` (origine exacte du site, par ex. `https://abou-cell.github.io`). `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont fournis par l'environnement Supabase Edge ; ne jamais les intégrer au frontend.
3. Déployer `supabase/functions/bootstrap-owner/index.ts` sous le nom `bootstrap-owner`, avec la vérification JWT activée. Exemple avec la CLI déjà authentifiée et liée au projet : `supabase functions deploy bootstrap-owner`.
4. Configurer les URLs Auth (Site URL + redirects) pour le domaine du déploiement et la confirmation email. Tester avec un compte vérifié.
5. Se connecter au site, ouvrir `/setup`, saisir nom public, introduction et **clé privée d'installation**. La fonction crée le propriétaire uniquement si aucun compte créateur n'existe. L'unicité en base empêche deux utilisateurs de revendiquer la même installation.
6. La clé doit être remplacée ou supprimée après l'installation. La fonction refusera toute nouvelle revendication tant que le propriétaire existe.

## Important pour le test LiveWebMoon preprod

La fonction Edge doit être déployée et le secret doit être provisionné avant d'utiliser le formulaire. **La page seule ne suffit pas à accorder un rôle propriétaire.** Ne publiez jamais la clé dans GitHub, dans `VITE_*` ou dans le navigateur.

## Produits non encore opérationnels

- Les cartes Galerie/Live sont des éléments de présentation tant que les médias et les jetons Cloudflare ne sont pas servis par une API autorisée.
- Les boutons Stripe et achat de crédits sont volontairement désactivés jusqu'aux endpoints de paiement et webhooks validés. Les montants ne doivent jamais être crédités côté client.
- La messagerie privée et le chat live nécessitent des policies RLS explicites, un contrôle des abonnements et de la modération.
- Un nom de domaine personnalisé et un hébergement AWS peuvent remplacer GitHub Pages sans modifier les règles de sécurité ; mettre à jour les URLs Supabase et CORS à chaque installation.
