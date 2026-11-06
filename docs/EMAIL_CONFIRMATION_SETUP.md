# Confirmation par lien email — LiveWebMoon

LiveWebMoon utilise le modèle Supabase **Confirm sign up** par défaut : aucun SMTP personnalisé ou modèle OTP n'est nécessaire pour le test.

1. Dans Supabase > Authentication > Sign In / Providers > Email, conserver **Confirm email** activé.
2. Dans Authentication > URL Configuration, renseigner **Site URL** `https://abou-cell.github.io/livewebmoon/`.
3. Autoriser `https://abou-cell.github.io/livewebmoon/**` dans **Redirect URLs**.
4. Utiliser une **nouvelle adresse email dont vous contrôlez la boîte**, et un mot de passe unique. Ne pas réessayer plusieurs fois d'affilée avec une adresse déjà en attente de confirmation.
5. Sur `/livewebmoon/login`, choisir **S'inscrire**. Vérifier les spams. Dans l'email le plus récent « Confirm your email address », cliquer **une seule fois** sur le lien de confirmation.
6. Après le retour sur le site, ouvrir `/livewebmoon/login`, renseigner l'email et le mot de passe, puis se connecter.
7. Si le lien est expiré, utiliser **Renvoyer le lien de confirmation** une seule fois et attendre. Un nouveau lien peut invalider l'ancien ; respecter la limite d'envoi.

## Diagnostic

- `Email not confirmed` : l'adresse n'a pas encore été validée ; cliquer le lien du message le plus récent.
- `otp_expired` / `Email link is invalid or has expired` : lien déjà consommé ou expiré. Ne pas multiplier les essais ; demander un nouvel email après le délai indiqué.
- `429` : limite d'envoi Supabase ; attendre sa réinitialisation, ne pas rafraîchir en boucle.
- 404 sous `https://abou-cell.github.io/` sans `/livewebmoon/` : URL de redirection incorrecte ; vérifier `Site URL`, les Redirect URLs, et l'URL effective passée à `signUp`.

Les scanners automatiques des messageries peuvent consommer les liens de confirmation avant leur ouverture. Si le problème persiste même avec la bonne URL et un seul clic, les liens par défaut ne garantissent pas l'absence de blocage ; un flux OTP avec modèle email personnalisé constitue alors une solution de repli.

Ne pas désactiver la confirmation email et ne jamais attribuer automatiquement le rôle propriétaire à un nouvel inscrit.
