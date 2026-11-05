# Confirmation email avec code à six chiffres

La page `/login` propose maintenant la validation via `supabase.auth.verifyOtp({ email, token, type: 'signup' })`. Le bouton de renvoi utilise `supabase.auth.resend({ type: 'signup', email })`. L'application **ne contourne pas** la confirmation email.

## Configuration obligatoire dans Supabase (par le propriétaire)

Ouvrir : https://supabase.com/dashboard/project/cffvwtbjkkjkyuunmuzp/auth/templates

1. Ouvrir **Confirm signup**.
2. Conserver un objet explicite, par exemple `Votre code de confirmation LiveWebMoon`.
3. Dans le corps HTML, afficher le code OTP avec la variable **exacte** `{{ .Token }}` et non `{{ .TokenHash }}`. Exemple :

```html
<p>Bienvenue sur LiveWebMoon !</p>
<p>Votre code de confirmation :</p>
<p style="font-size: 28px; font-weight: bold; letter-spacing: 5px;">{{ .Token }}</p>
<p>Saisissez ce code sur la page de connexion LiveWebMoon. Si vous n'avez pas demandé de code, ignorez ce message.</p>
```

4. Enregistrer le modèle. Ne pas inclure de secrets dans le modèle.
5. Vérifier la configuration d'envoi (limites d'envoi du SMTP mutualisé Supabase) et attendre la fin d'une éventuelle limitation 429.
6. Se rendre sur https://abou-cell.github.io/livewebmoon/login, cliquer sur **J’ai déjà un code à 6 chiffres** ou **Renvoyer un code de confirmation**, saisir l'email et le dernier code.

## Remarques

- Le code reçu avant la mise à jour du modèle peut ne pas être visible : demander un **nouvel** email une fois le modèle enregistré.
- Le mode Test OAuth Google est distinct de cette confirmation par email.
- Les erreurs `OTP expired` et `email rate limit exceeded` sont gérées dans l'interface, sans désactiver la vérification.
- Les liens de confirmation resteront problématiques si un scanner de messagerie les consomme ; l'utilisation de `{{ .Token }}` permet une saisie directe.
