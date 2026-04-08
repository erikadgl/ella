# Ella

Landing page pour un evenement avec formulaire d'inscription, emails automatiques et tableau de bord admin.

## Stack

- **Next.js 16** (App Router)
- **PostgreSQL** via Supabase (pooler connection)
- **Resend** pour les emails
- **Tailwind CSS** pour le style
- **Vercel** pour le deploiement

## Fonctionnalites

- Landing page avec formulaire d'inscription (nom, email, telephone)
- Email de confirmation automatique avec informations de paiement
- Notification email a l'admin pour chaque nouvelle inscription
- Tableau de bord admin protege par mot de passe
- Gestion des statuts (en attente / paye / annule)
- Email automatique au participant a chaque changement de statut

## Installation

### 1. Cloner le repo

```bash
git clone <url-du-repo>
cd ella
npm install
```

### 2. Creer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com) et creer un compte / projet
2. Dans le dashboard Supabase, aller dans **SQL Editor**
3. Copier-coller le contenu de `migration.sql` et executer la requete

### 3. Recuperer la connection string Supabase

1. Dans Supabase, aller dans **Settings > Database**
2. Dans la section **Connection string**, choisir l'onglet **URI**
3. Selectionner le mode **Transaction** (pooler)
4. Copier l'URI — elle ressemble a :
   ```
   postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

### 4. Creer un compte Resend

1. Aller sur [resend.com](https://resend.com) et creer un compte
2. Generer une API key dans **API Keys**
3. Note : en mode gratuit, les emails sont envoyes depuis `onboarding@resend.dev` — les destinataires doivent verifier leurs spams

### 5. Configurer les variables d'environnement

Copier le fichier d'exemple et remplir les valeurs :

```bash
cp .env.example .env.local
```

Editer `.env.local` :

```env
# Connection string Supabase (pooler transaction mode)
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

# Cle API Resend
RESEND_API_KEY=re_xxxxxxxxxxxx

# Mot de passe pour acceder au tableau de bord admin
ADMIN_PASSWORD=votre-mot-de-passe

# URL publique de l'app (localhost en dev, votre domaine en prod)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optionnel : email de l'admin pour recevoir les notifications
ADMIN_EMAIL=admin@exemple.com
```

### 6. Lancer en local

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Pages

| URL | Description |
|-----|-------------|
| `/` | Landing page + formulaire d'inscription |
| `/confirmation` | Page de confirmation apres inscription |
| `/admin` | Connexion admin |
| `/admin/dashboard` | Tableau de bord admin |

## Deploiement sur Vercel

1. Pusher le repo sur GitHub
2. Importer le projet sur [vercel.com](https://vercel.com)
3. Ajouter les variables d'environnement dans **Settings > Environment Variables** :
   - `DATABASE_URL`
   - `RESEND_API_KEY`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_APP_URL` (mettre l'URL Vercel, ex: `https://ella.vercel.app`)
   - `ADMIN_EMAIL` (optionnel)
4. Deployer

## Structure du projet

```
ella/
├── app/
│   ├── page.tsx                    # Landing page + formulaire
│   ├── confirmation/page.tsx       # Page de confirmation
│   ├── admin/page.tsx              # Login admin
│   ├── admin/dashboard/page.tsx    # Tableau de bord
│   └── api/
│       ├── subscribe/route.ts      # API inscription
│       ├── admin/login/route.ts    # API login admin
│       └── admin/subscriptions/route.ts  # API gestion des inscriptions
├── lib/
│   ├── db.ts                       # Client PostgreSQL
│   ├── email.ts                    # Envoi d'emails via Resend
│   └── auth.ts                     # Authentification admin (JWT)
├── migration.sql                   # Schema de la base de donnees
└── .env.example                    # Template des variables d'environnement
```
