import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  excerpt: string;
  Content: () => ReactNode;
}

/* ─── Shared content primitives ─────────────────────────────────────────── */

function Lead({ children }: { children: ReactNode }) {
  return <p className="text-xl text-slate-700 leading-relaxed font-medium mb-8 border-l-4 border-indigo-300 pl-5">{children}</p>;
}
function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold text-slate-900 mt-14 mb-4">{children}</h2>;
}
function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">{children}</h3>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="text-slate-700 leading-relaxed mb-4">{children}</p>;
}
function Info({ children }: { children: ReactNode }) {
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-5 rounded-r-xl my-8">
      <p className="text-indigo-900 leading-relaxed">{children}</p>
    </div>
  );
}
function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl my-8">
      <p className="text-amber-900 leading-relaxed">{children}</p>
    </div>
  );
}
function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl my-8">
      <p className="text-emerald-900 leading-relaxed">{children}</p>
    </div>
  );
}
function Table({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            {rows[0].map((h, i) => (
              <th key={i} className="px-5 py-3 text-left font-semibold border-b border-slate-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-5 py-3 text-slate-600 border-b border-slate-100">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Divider() {
  return <hr className="my-12 border-slate-200" />;
}

/* ─── Monetization primitives ───────────────────────────────────────────── */

/*
 * Liens partenaires (affiliation).
 * Remplacez chaque `url` par VOTRE lien de tracking d'affiliation une fois
 * inscrit au programme correspondant (le paramètre d'identifiant partenaire
 * vous est fourni par la plateforme : Awin, Kwanko, programme propre, etc.).
 * Tant qu'aucun lien de tracking n'est en place, ces URL pointent simplement
 * vers le site officiel du partenaire — aucune commission n'est perçue.
 */
export const affiliates: Record<string, { url: string; partner: string }> = {
  assuranceExpat: { url: 'https://www.april-international.com/fr', partner: 'April International' },
  banqueMulti:    { url: 'https://wise.com/fr/', partner: 'Wise' },
  transfert:      { url: 'https://wise.com/fr/send-money/', partner: 'Wise' },
};

// Petite mention de transparence à placer en tête d'un article monétisé.
function AffDisclosure() {
  return (
    <p className="text-xs text-slate-400 italic mb-6">
      Transparence : cet article contient des liens vers des partenaires. Si vous
      souscrivez via l'un d'eux, nous pouvons percevoir une commission, sans surcoût
      pour vous. Cela n'influence ni nos recommandations ni le contenu de ce guide.
    </p>
  );
}

// Encart d'affiliation (lien externe sponsorisé, balisé rel="sponsored").
function AffiliateBox({
  title, children, cta, href,
}: { title: string; children: ReactNode; cta: string; href: string }) {
  return (
    <div className="my-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-500">Notre recommandation</span>
        <span className="text-[10px] font-medium text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">Lien sponsorisé</span>
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <div className="text-slate-600 text-sm leading-relaxed mb-5">{children}</div>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
      >
        {cta} <span aria-hidden>↗</span>
      </a>
    </div>
  );
}

// Encart de génération de leads (CTA interne vers la page Contact).
function LeadBox({
  title, children, cta,
}: { title: string; children: ReactNode; cta: string }) {
  return (
    <div className="my-8 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">Accompagnement</span>
      <h4 className="text-lg font-bold text-slate-900 mt-2 mb-2">{title}</h4>
      <div className="text-slate-600 text-sm leading-relaxed mb-5">{children}</div>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
      >
        {cta} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

// Encart de téléchargement de la checklist (lead magnet → page /checklist).
function ChecklistBox() {
  return (
    <div className="my-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-500">Ressource gratuite</span>
        <h4 className="text-lg font-bold text-slate-900 mt-1 mb-1">La checklist complète du dossier TAECHIR</h4>
        <p className="text-slate-600 text-sm leading-relaxed">
          Toutes les étapes et toutes les pièces à réunir, dans un PDF imprimable de 2 pages.
        </p>
      </div>
      <Link
        to="/checklist"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shrink-0"
      >
        Télécharger le PDF <span aria-hidden>↓</span>
      </Link>
    </div>
  );
}

// FAQ repliable (favorise le rich snippet FAQ et le temps de lecture).
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="my-10 space-y-4">
      {items.map((it, i) => (
        <details key={i} className="group rounded-xl border border-slate-200 bg-white p-5">
          <summary className="cursor-pointer font-semibold text-slate-800 list-none flex justify-between items-center gap-4">
            {it.q}
            <span className="text-indigo-400 text-lg leading-none group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="text-slate-600 text-sm leading-relaxed mt-3">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ─── Article 1 ─────────────────────────────────────────────────────────── */

function Article1Content() {
  return (
    <>
      <Lead>
        Si vous êtes en train de lire ça, c'est probablement que vous avez un candidat étranger
        sous la main et que vous ne savez pas par où commencer. Je suis passé par là des dizaines
        de fois — et je vais vous éviter les semaines de galère que j'ai vécues sur mes premiers dossiers.
        Voici comment ça se passe concrètement, du début à la fin.
      </Lead>

      <ChecklistBox />

      <H2>D'abord, votre entreprise est-elle en règle ?</H2>
      <P>
        Avant même de penser au salarié étranger, regardez du côté de votre propre boîte.
        C'est une erreur que je vois beaucoup trop souvent : un employeur me contacte tout excité
        parce qu'il a trouvé le profil parfait, et quand on vérifie sa situation administrative...
        c'est le désastre. CNSS en retard de 3 mois, modèle 7 expiré depuis 2024. On ne peut même
        pas démarrer.
      </P>
      <P>Concrètement, trois choses sont vérifiées :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Vos déclarations CNSS.</strong> Si vous avez un seul mois de retard, l'ANAPEC bloque tout. J'ai vu un dossier à Tanger rester en suspens pendant 6 semaines juste à cause de ça.</li>
        <li><strong>Le modèle 7 ou le registre de commerce.</strong> L'année dernière, un client dans le textile à Tanger a perdu 3 semaines parce que son modèle 7 était expiré. Trois semaines pour un papier qu'il aurait pu renouveler en une matinée au tribunal.</li>
        <li><strong>Un poste qui a du sens.</strong> Le contrat TAECHIR doit correspondre à un vrai métier de la nomenclature marocaine. Pas question d'inventer un titre de poste fantaisiste — ça se voit et ça bloque.</li>
      </ul>
      <Info>
        Mon conseil : allez chercher votre attestation de régularité CNSS maintenant, avant de faire quoi
        que ce soit d'autre. Ça prend quelques jours à sortir et on vous la demandera forcément
        à un moment ou un autre.
      </Info>

      <H2>Étape 1 — Le passage par l'ANAPEC : la partie la plus pénible</H2>
      <P>
        Honnêtement, c'est la partie la plus pénible de toute la procédure. L'ANAPEC doit vérifier
        qu'il n'existe pas de profil marocain pour le poste — c'est l'article 516 du Code du Travail,
        la fameuse priorité nationale à l'emploi. Sur le principe, ça se comprend. Sur le terrain,
        ça veut dire des jours d'attente.
      </P>
      <P>Voici les trois cas de figure possibles :</P>
      <Table
        rows={[
          ['Situation', 'Délai ANAPEC', 'Frais HT'],
          ['Profil standard (1er dossier)', '20 jours ouvrables', '5 000 Dhs'],
          ['Profil standard (dossiers supplémentaires, même métier)', '20 jours ouvrables', '1 500 Dhs'],
          ['Profil rare — listes A1/A2', '48 heures', '1 500 Dhs'],
          ['Catégorie dispensée', 'Pas de délai ANAPEC', '0 Dhs'],
        ]}
      />
      <P>
        Franchement, 5 000 Dhs pour un premier dossier, c'est cher. Mais c'est le tarif.
        L'ANAPEC publie une annonce pendant 20 jours ouvrables — dans les faits, ça fait presque
        un mois calendaire. Si personne ne se manifeste, vous avez votre attestation.
        Pour les profils rares (listes A1/A2), pas d'annonce : 48 heures et 1 500 Dhs. Si votre
        profil rentre dedans, c'est une vraie bénédiction.
      </P>

      <H2>Étape 2 — TAECHIR : le dossier en ligne</H2>
      <P>
        Une fois l'attestation ANAPEC en poche — ou si vous êtes dispensé —, direction la plateforme
        TAECHIR. Depuis la mise à jour de la plateforme en 2024, l'interface s'est améliorée,
        mais prévoyez quand même un bon moment la première fois.
      </P>
      <H3>Créer votre compte employeur</H3>
      <P>
        Vous allez devoir rentrer toutes les infos de votre société : ICE, RC, données du gérant...
        Prenez le temps de bien remplir. Un collègue à Casablanca s'est retrouvé avec un compte bloqué
        parce qu'il avait mal saisi son numéro d'ICE. Résultat : 4 jours perdus pour rectifier.
      </P>
      <H3>Générer le contrat de travail</H3>
      <P>
        TAECHIR va vous générer un contrat type à partir de ce que vous saisissez : identité du salarié,
        nationalité, poste, durée, salaire. Ensuite — et c'est là que beaucoup se font avoir — il faut
        imprimer ce contrat en <strong>trois exemplaires</strong>, le faire signer par les deux parties,
        y mettre le cachet de l'entreprise, puis faire légaliser le tout.
      </P>
      <Tip>
        Comptez une bonne journée si vous allez à la légalisation à Casablanca — entre le déplacement,
        l'attente au bureau de l'adoul et les va-et-vient. À Rabat c'est un peu plus rapide,
        à Fès ça dépend du quartier. Ne gardez surtout pas ça pour la dernière minute.
      </Tip>

      <H2>Étape 3 — Le dépôt physique au guichet du Ministère</H2>
      <P>
        Et oui, malgré tout le digital, le dépôt reste physique. Vous devez vous rendre au guichet
        régional du Ministère de l'Emploi — celui qui correspond au lieu du poste de travail.
        Le guichet de Casablanca, c'est à Aïn Sebaâ. Celui de Rabat est au centre-ville.
        Prévoyez votre matinée.
      </P>
      <P>Dans votre chemise, il vous faut :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Les 3 exemplaires légalisés du contrat TAECHIR</li>
        <li>L'attestation ANAPEC (ou vos justificatifs de dispense)</li>
        <li>Les diplômes et certificats de travail — copies certifiées conformes, avec traduction assermentée si c'est pas en français ou en arabe</li>
        <li>La copie du passeport valide</li>
        <li>Vos documents d'entreprise : statuts, modèle 7, tout ça</li>
      </ul>
      <P>
        Le Ministère a normalement <strong>10 jours</strong> pour apposer le visa sur le contrat.
        Dans les faits, j'ai vu des dossiers sortir en 3 jours à Rabat et d'autres traîner
        8 jours à Casablanca. Mais le délai légal, c'est 10 jours max. Le visa, c'est le graal :
        c'est à partir de cette date que le contrat prend effet.
      </P>
      <Warning>
        Un employeur m'a appelé un vendredi en me disant que son salarié commençait lundi — sans visa.
        On a dû tout arrêter. C'est une infraction à l'article 516. Pas de visa = pas de premier jour
        de travail. Point final. Même pas un jour.
      </Warning>

      <H2>Et après le visa ? C'est pas fini.</H2>
      <P>
        Beaucoup pensent que le visa, c'est la ligne d'arrivée. Non. C'est juste la mi-temps.
        Il reste deux choses à faire, et vite.
      </P>
      <H3>Déclarer le salarié à la CNSS</H3>
      <P>
        Dès le jour du visa — pas le jour où le salarié arrive, pas le jour où il commence
        réellement à travailler, mais le jour du visa — vous devez le déclarer à la CNSS.
        Les pénalités de retard sont rétroactives. J'ai vu des entreprises se prendre des
        majorations de 3,5% par mois parce qu'elles avaient attendu que le salarié soit
        "installé". Mauvaise idée.
      </P>
      <H3>La carte de séjour auprès de la DGSN</H3>
      <P>
        En parallèle, le salarié doit demander sa carte d'immatriculation à la police — la DGSN.
        C'est un autre dossier, une autre administration, un autre délai. Le visa de travail
        autorise à travailler. La carte de séjour autorise à résider. Les deux sont obligatoires.
        Et non, avoir l'un ne dispense pas de l'autre — j'insiste parce que la confusion est
        permanente.
      </P>

      <Divider />

      <H2>Le calendrier réaliste — pour de vrai</H2>
      <Table
        rows={[
          ['Phase', 'Durée estimée', 'Ce qui se passe vraiment'],
          ['Préparation du dossier', '3–7 jours', 'Courir après les docs, légalisation chez l\'adoul'],
          ['Traitement ANAPEC (standard)', '20 jours ouvrables', 'L\'annonce tourne, on attend. On attend.'],
          ['Traitement ANAPEC (profil rare)', '2 jours', 'Beaucoup plus supportable'],
          ['Dépôt & visa Ministère', '1–10 jours', 'Dépôt le matin, récépissé, puis on attend le visa'],
          ['Carte de séjour DGSN', '7–15 jours', 'Le salarié s\'en occupe, mais préparez les pièces'],
        ]}
      />
      <P>
        En pratique, pour un premier recrutement standard, comptez <strong>4 à 6 semaines</strong>
        {' '}si tout se passe bien et que votre dossier est carré dès le départ. Mais "si tout se
        passe bien", dans l'administratif marocain, c'est un grand "si". Personnellement, je
        recommande de prévoir 8 semaines pour être tranquille. Pour un profil rare ou dispensé,
        on peut boucler en 10-15 jours.
      </P>
    </>
  );
}

/* ─── Article 2 ─────────────────────────────────────────────────────────── */

function Article2Content() {
  return (
    <>
      <Lead>
        Tout le monde râle contre l'ANAPEC. "C'est trop long", "ça sert à rien", "c'est juste
        une taxe déguisée". Je comprends la frustration — j'ai moi-même passé des matinées entières
        dans leurs locaux à Casablanca. Mais quand on comprend pourquoi c'est là et comment ça
        marche, on perd beaucoup moins de temps. Je vous explique tout.
      </Lead>

      <H2>Pourquoi on doit passer par l'ANAPEC, déjà ?</H2>
      <P>
        La raison est dans la loi : l'article 516 du Code du Travail dit qu'un employeur doit
        d'abord prouver qu'il n'a pas trouvé de Marocain pour le poste. C'est le principe de
        <strong> priorité nationale à l'emploi</strong>. On peut débattre de son efficacité, mais
        c'est la règle et on ne la contourne pas.
      </P>
      <P>
        L'ANAPEC est l'organisme qui vérifie ça. Concrètement, ils diffusent votre offre d'emploi,
        regardent si des candidats marocains se présentent, et si personne ne correspond — ce qui
        arrive très souvent pour les profils techniques — ils vous donnent le feu vert sous forme
        d'attestation.
      </P>
      <Info>
        L'attestation ne veut pas dire que votre entreprise a un problème ou que votre recrutement
        est suspect. C'est juste un tampon qui dit : "on a cherché un Marocain, on n'a pas trouvé
        pour ce poste précis." Rien de plus.
      </Info>

      <H2>Les trois situations possibles</H2>
      <P>
        Sur le terrain, selon votre profil, ça peut aller très vite... ou très lentement.
        Voici les trois cas :
      </P>

      <H3>1. Le profil standard — le plus courant et le plus long</H3>
      <P>
        C'est le cas de base. L'ANAPEC publie une annonce pendant <strong>20 jours ouvrables</strong>.
        Vingt jours ouvrables, ça fait presque un mois réel. Pendant ce temps, vous attendez.
        Si un candidat marocain se pointe avec les bonnes qualifications, l'ANAPEC peut
        théoriquement bloquer votre dossier. Mais dans les faits, pour un poste de développeur
        Java senior ou un ingénieur process industriel, les candidatures nationales qui matchent
        vraiment sont rares.
      </P>
      <P>
        Le prix : <strong>5 000 Dhs HT</strong> pour le premier dossier d'un métier donné
        dans l'année. Si vous recrutez un deuxième profil sur le même métier, c'est <strong>1 500
        Dhs HT</strong>. Personnellement, je recommande aux entreprises qui savent qu'elles vont
        recruter plusieurs étrangers de regrouper leurs dossiers pour profiter de ce tarif réduit.
      </P>

      <H3>2. Le profil rare (listes A1/A2) — la bonne surprise</H3>
      <P>
        Si le poste figure sur les listes A1 ou A2 de l'ANAPEC — des profils reconnus comme
        introuvables au Maroc —, c'est le jackpot : pas d'annonce, <strong>48 heures</strong> de
        traitement, et seulement <strong>1 500 Dhs HT</strong>. J'ai eu un dossier pour un CTO
        à Rabat qui est sorti en une journée et demie. Mais attention : il faut que le poste
        soit vraiment sur la liste, pas juste "similaire".
      </P>

      <H3>3. La dispense totale — le meilleur des cas</H3>
      <P>
        Certains salariés n'ont pas besoin d'attestation du tout. Les Algériens, Tunisiens et
        Sénégalais grâce aux conventions bilatérales. Les époux de Marocains. Le personnel CFC.
        Les gérants et actionnaires. Les détachés. Pour eux, on passe directement à TAECHIR.
        Zéro frais ANAPEC, zéro délai. C'est le rêve.
      </P>

      <H2>Les frais : combien ça coûte vraiment</H2>
      <Table
        rows={[
          ['Type de dossier', 'Frais HT', 'Délai'],
          ['1er dossier standard (avec annonce)', '5 000 Dhs', '20 jours ouvrables'],
          ['Dossiers suivants, même métier/an', '1 500 Dhs', '20 jours ouvrables'],
          ['Profil rare (liste A1 ou A2)', '1 500 Dhs', '48 heures'],
          ['Renouvellement chez même employeur', '1 500 Dhs', '48 heures'],
          ['Catégorie dispensée', '0 Dhs', 'Pas de démarche ANAPEC'],
        ]}
      />
      <P>
        Vous payez directement à l'ANAPEC au moment du dépôt. N'oubliez pas la TVA à 20% en plus —
        donc le premier dossier standard revient à 6 000 Dhs TTC. TAECHIR et le visa au Ministère,
        par contre, c'est gratuit. Petit réconfort.
      </P>

      <H2>Comment ça se passe sur le terrain</H2>
      <H3>Monter le dossier</H3>
      <P>
        Vous allez à l'agence ANAPEC de votre région — celle de Casablanca est à Maârif, celle de
        Rabat au centre-ville. Vous amenez les documents de votre entreprise, la description du poste,
        et vous expliquez pourquoi vous avez besoin de recruter à l'international. Un conseil : soyez
        précis dans la description du poste. Plus c'est vague, plus l'agent va poser de questions et
        vous faire revenir.
      </P>
      <H3>L'annonce (profil standard)</H3>
      <P>
        L'ANAPEC rédige l'annonce et la diffuse. Vous n'avez pas la main dessus. Puis ils évaluent
        les candidatures reçues. J'ai vu une fois un dossier où l'ANAPEC a proposé un candidat
        marocain à l'employeur — un profil qui, sur le papier, correspondait. L'employeur l'a
        convoqué en entretien, le candidat ne parlait pas anglais alors que le poste l'exigeait.
        L'attestation a été délivrée ensuite sans problème. Mais ça a ajouté une semaine.
      </P>
      <H3>L'attestation sort enfin</H3>
      <P>
        Au bout des 20 jours (ou 48h pour les profils rares), l'ANAPEC vous donne l'attestation
        d'activité. Gardez-la précieusement — c'est elle qui va dans votre dossier Ministère.
        Et surtout, notez bien : elle est datée, et elle a une durée de validité. Ne traînez pas
        pour la suite.
      </P>

      <H2>Les pièges à éviter</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Votre CNSS doit être nickel.</strong> J'ai vu des dossiers bloqués pendant 2 mois
          à cause de ça. L'ANAPEC vérifie avant même de publier l'annonce. Des cotisations en retard ?
          Ils ne bougent pas.
        </li>
        <li>
          <strong>Ne gonflez pas le poste artificiellement.</strong> Certains employeurs sur-qualifient
          le poste pour essayer de passer en profil rare. L'ANAPEC connaît le jeu, surtout les agents
          expérimentés à Casa et Rabat. Si ça ne colle pas, ils requalifient en standard et vous perdez
          du temps.
        </li>
        <li>
          <strong>Les listes A1/A2 changent.</strong> Avant 2023, on pouvait encore classer certains
          profils IT en A2 assez facilement. Depuis, les listes ont été mises à jour. Vérifiez toujours
          la version en cours avant de vous lancer.
        </li>
      </ul>
      <Warning>
        Une attestation ANAPEC est valable pour un poste précis et un employeur précis. Un client
        m'a demandé de réutiliser l'attestation d'un précédent recrutement pour un nouveau salarié
        sur le même poste. Refus catégorique. Chaque dossier = une nouvelle attestation.
      </Warning>
    </>
  );
}

/* ─── Article 3 ─────────────────────────────────────────────────────────── */

function Article3Content() {
  return (
    <>
      <Lead>
        Le Maroc fait face à une pénurie de compétences dans plusieurs secteurs stratégiques.
        Pour y répondre sans alourdir les démarches des entreprises, l'ANAPEC a instauré deux
        listes de profils prioritaires — A1 et A2 — qui bénéficient d'une procédure allégée,
        rapide et moins coûteuse.
      </Lead>

      <H2>Le contexte : pourquoi des listes de profils rares ?</H2>
      <P>
        La procédure standard d'attestation ANAPEC — 20 jours d'annonce, 5 000 Dhs — a du sens
        pour les postes où des candidats nationaux qualifiés existent. Mais pour certains métiers
        très spécialisés ou de très haut niveau, imposer ce délai serait contre-productif : cela
        freinerait les investissements sans servir l'emploi marocain puisqu'aucun candidat local
        ne peut répondre au besoin.
      </P>
      <P>
        Les listes A1 et A2 permettent à l'ANAPEC de reconnaître officiellement ces situations
        de pénurie structurelle. Pour les postes qui y figurent, la procédure se réduit à
        48 heures et 1 500 Dhs.
      </P>

      <H2>La liste A1 : profils de haut niveau</H2>
      <P>
        La liste A1 regroupe les fonctions de direction et d'encadrement de haut rang pour
        lesquelles le Maroc cherche à attirer des talents internationaux dans une logique
        d'attractivité économique.
      </P>
      <P>On y retrouve généralement :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Directeurs Généraux et directeurs de filiales</li>
        <li>Directeurs fonctionnels : DSI, DAF, DRH, Directeur Commercial, CTO</li>
        <li>Experts de haut niveau avec plus de 10 ans d'expérience internationale dans leur domaine</li>
        <li>Consultants seniors spécialisés dans des secteurs peu représentés au Maroc</li>
        <li>Responsables de projets d'investissement étrangers d'envergure</li>
      </ul>
      <Info>
        Pour la liste A1, l'idée directrice est que la rareté tient au niveau d'expérience et de
        séniorité plutôt qu'à la spécialité technique elle-même. Un DSI avec 15 ans d'expérience
        internationale relève de la liste A1, même si des profils DSI existent au Maroc.
      </Info>

      <H2>La liste A2 : profils pointus et rares</H2>
      <P>
        La liste A2 cible des métiers techniques spécialisés dont la disponibilité est
        structurellement insuffisante sur le marché de l'emploi marocain. Contrairement à la
        liste A1 qui est orientée séniorité, la liste A2 est orientée spécialité.
      </P>
      <P>Parmi les types de profils qui figurent typiquement dans cette liste :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Ingénieurs spécialisés dans des technologies de niche (semi-conducteurs, systèmes embarqués avancés, etc.)</li>
        <li>Data scientists et experts IA dans des domaines pointus</li>
        <li>Experts en cybersécurité offensive ou en infrastructure critique</li>
        <li>Spécialistes de procédés industriels rares (métallurgie avancée, chimie fine, etc.)</li>
        <li>Profils de l'ingénierie offshore et parapétrolière</li>
      </ul>
      <Warning>
        Les listes A1 et A2 ne sont pas exhaustives et sont mises à jour régulièrement par l'ANAPEC
        en concertation avec le Ministère chargé du Travail. Avant de qualifier un poste de "rare",
        vérifiez les listes en vigueur. En cas de doute, contactez directement l'agence ANAPEC
        régionale pour une confirmation préalable.
      </Warning>

      <H2>Les avantages concrets de la procédure allégée</H2>
      <Table
        rows={[
          ['Critère', 'Profil standard', 'Profil rare (A1/A2)'],
          ['Délai ANAPEC', '20 jours ouvrables', '48 heures'],
          ['Frais ANAPEC', '5 000 Dhs HT', '1 500 Dhs HT'],
          ['Annonce obligatoire', 'Oui', 'Non'],
          ['Délai visa Ministère', '10 jours max', '10 jours max'],
        ]}
      />
      <P>
        Au total, pour un profil rare, la procédure complète peut être bouclée en une à deux
        semaines contre quatre à six semaines pour un profil standard. Ce gain de temps est
        décisif pour les entreprises qui opèrent dans des secteurs compétitifs où les talents
        internationaux reçoivent plusieurs offres simultanées.
      </P>

      <H2>Comment savoir si votre poste est éligible ?</H2>
      <H3>Étape 1 : consulter les listes officielles</H3>
      <P>
        Les listes A1 et A2 sont publiées sur le site officiel de l'ANAPEC. La terminologie
        utilisée est celle de la Classification Internationale Type des Professions (CITP). Il
        est recommandé de rechercher non seulement le titre exact du poste, mais aussi les
        catégories et sous-catégories qui pourraient y correspondre.
      </P>
      <H3>Étape 2 : contacter l'ANAPEC pour confirmation</H3>
      <P>
        Si vous avez un doute sur l'éligibilité, prenez contact avec l'agence ANAPEC régionale
        avant de déposer votre dossier. Un agent peut confirmer ou infirmer l'appartenance du
        poste aux listes A1/A2 et vous éviter une mauvaise surprise lors du traitement.
      </P>
      <H3>Étape 3 : préparer une description de poste détaillée</H3>
      <P>
        Que le poste soit sur liste A1/A2 ou non, une description précise — missions, compétences
        requises, technologies maîtrisées, niveau d'expérience — facilite le travail de l'ANAPEC
        et réduit les allers-retours. Pour les profils rares, une justification explicite de la
        rareté du profil sur le marché national peut accompagner le dossier.
      </P>
      <Tip>
        Pensez à conserver une copie de la confirmation de l'ANAPEC si elle est donnée par écrit.
        Ce document peut vous servir en cas de contestation lors du traitement ou d'un audit
        ultérieur.
      </Tip>
    </>
  );
}

/* ─── Article 4 ─────────────────────────────────────────────────────────── */

function Article4Content() {
  return (
    <>
      <Lead>
        Bonne nouvelle si vous êtes concerné : tout le monde ne passe pas par la case ANAPEC.
        J'ai vu des employeurs perdre 3 semaines et 5 000 Dhs alors que leur salarié était
        dispensé depuis le début. Ça fait mal quand on s'en rend compte après. Voici les cas
        où vous pouvez sauter cette étape — et les pièces qui la remplacent.
      </Lead>

      <H2>D'abord, comprendre pourquoi certains sont dispensés</H2>
      <P>
        Le Code du Travail dit que le marché de l'emploi marocain est prioritaire. OK. Mais
        le législateur a prévu des exceptions — et elles sont logiques quand on y réfléchit.
        Un Tunisien qui vient travailler au Maroc, c'est la réciprocité d'un accord entre
        deux pays. Un gérant étranger qui investit son argent, il ne "prend" le poste de personne.
      </P>
      <P>
        Attention quand même : dispensé d'ANAPEC ne veut pas dire dispensé de TAECHIR.
        Le dossier Ministère reste complet, avec les 10 jours de délai visa. Vous remplacez
        juste les papiers ANAPEC par d'autres justificatifs. C'est plus rapide et gratuit
        côté ANAPEC, mais le reste ne change pas.
      </P>

      <H2>Algériens, Tunisiens, Sénégalais : les conventions bilatérales</H2>
      <P>
        Le Maroc a des accords d'établissement avec trois pays. Leurs ressortissants n'ont
        pas besoin d'attestation ANAPEC pour travailler ici. En pratique, ça concerne beaucoup
        de dossiers — surtout les Tunisiens dans l'IT et les Sénégalais dans le commerce.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Algérie</strong> — Convention d'établissement étendue</li>
        <li><strong>Tunisie</strong> — Convention bilatérale Maroc-Tunisie</li>
        <li><strong>Sénégal</strong> — Convention bilatérale Maroc-Sénégal</li>
      </ul>
      <P>
        J'ai accompagné une boîte IT à Rabat qui recrutait un développeur tunisien. Ils avaient
        déjà payé l'ANAPEC avant de me consulter. Quand je leur ai dit que c'était inutile pour
        un Tunisien... le gérant n'était pas content. 5 000 Dhs et 20 jours dans le vent.
        Vérifiez toujours la nationalité en premier.
      </P>
      <Info>
        Le principe, c'est la réciprocité : ces pays facilitent l'accès à l'emploi pour les
        Marocains chez eux, le Maroc fait pareil. Le dossier TAECHIR reste obligatoire, mais
        sans la pièce ANAPEC — et sans les frais qui vont avec.
      </Info>

      <H2>Marié(e) à un(e) Marocain(e) ? Vous êtes dispensé(e)</H2>
      <P>
        C'est un cas très fréquent et pourtant les gens ne le savent pas toujours.
        Un Français marié à une Marocaine, une Camerounaise mariée à un Marocain — pas besoin
        d'ANAPEC. L'idée derrière, c'est qu'on ne va pas compliquer la vie d'une famille
        installée au Maroc.
      </P>
      <P>À la place de l'attestation ANAPEC, vous fournissez :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>L'acte de mariage — légalisé et traduit en arabe si c'est un mariage étranger</li>
        <li>Copie de la CIN du conjoint marocain</li>
        <li>Le livret de famille si vous l'avez</li>
      </ul>
      <P>
        Un détail qui surprend souvent : même si le mariage a eu lieu à l'étranger, la dispense
        s'applique. J'ai eu le cas d'un couple franco-marocain marié à Nantes. Le guichet à
        Casablanca a d'abord hésité, mais l'acte de mariage transcrit et légalisé a suffi.
      </P>

      <H2>Gérants, associés, actionnaires : les investisseurs</H2>
      <P>
        Si vous avez des parts dans la boîte qui vous emploie, vous êtes dispensé. La logique
        est simple : vous investissez votre argent au Maroc, vous créez de l'emploi — on ne
        va pas vous demander de prouver qu'aucun Marocain ne pouvait faire votre job.
      </P>
      <Table
        rows={[
          ['Statut', 'Ce qu\'il faut prouver', 'Pièces justificatives'],
          ['Gérant désigné', 'Nomination officielle', 'PV de nomination + statuts'],
          ['Associé', 'Part dans le capital', 'Statuts à jour'],
          ['Actionnaire', 'Détention de titres', 'Registre des actionnaires'],
          ['Fondé de pouvoir', 'Délégation de pouvoirs', 'Procuration notariée'],
        ]}
      />
      <P>
        Un piège classique : le gérant étranger qui a 0% du capital. Techniquement, c'est un
        salarié comme un autre. J'ai vu un dossier à Marrakech où le gérant italien pensait
        être dispensé — sauf qu'il n'avait aucune part. Retour case ANAPEC, 5 000 Dhs.
      </P>

      <H2>Les salariés détachés</H2>
      <P>
        Le détachement, c'est quand une boîte étrangère envoie son salarié au Maroc pour une
        mission temporaire. Le salarié garde son contrat d'origine — il ne signe rien au Maroc.
        C'est fréquent dans le BTP, l'ingénierie et l'industrie automobile.
      </P>
      <P>Les pièces qu'on vous demandera :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Lettre de détachement de la société mère</li>
        <li>Le contrat ou le marché qui justifie la mission au Maroc</li>
        <li>Attestation de sécurité sociale du pays d'origine</li>
        <li>Durée précise du détachement (ça doit être temporaire)</li>
      </ul>
      <Warning>
        Le détachement, c'est pas un raccourci pour éviter l'embauche locale. J'ai vu une
        entreprise à Tanger qui "détachait" le même gars depuis 3 ans. Le Ministère a fini
        par requalifier la situation et exiger un dossier TAECHIR complet avec ANAPEC et tout.
        Si le salarié est installé durablement et intégré à l'équipe locale, c'est plus du
        détachement.
      </Warning>

      <H2>Le personnel CFC (Casablanca Finance City)</H2>
      <P>
        Les sociétés avec le statut CFC, c'est le cas le plus simple. Leurs cadres étrangers
        sont totalement dispensés d'ANAPEC — c'est inscrit dans les textes réglementaires
        de CFC. Banques d'investissement, sociétés de gestion, sièges régionaux de multinationales...
        ces structures attirent beaucoup d'expatriés et le législateur a voulu leur faciliter
        la vie.
      </P>
      <P>
        La seule pièce requise : une lettre de CFC confirmant le statut de la société et
        le fait que le salarié appartient à l'encadrement éligible. C'est rapide à obtenir.
      </P>

      <H2>Et les profils A1/A2 ?</H2>
      <P>
        Techniquement, les listes A1 et A2 ne sont pas une vraie dispense — il y a quand
        même un passage ANAPEC. Mais 48 heures et 1 500 Dhs au lieu de 20 jours et 5 000 Dhs...
        dans les faits, ça y ressemble beaucoup. Pas d'annonce publique, pas d'attente.
        Beaucoup de gens les mettent dans le même panier que les dispenses, et je comprends
        pourquoi.
      </P>

      <Tip>
        Le piège le plus bête que je vois régulièrement : un employeur qui est dans une catégorie
        dispensée mais qui ne fournit pas les bons justificatifs. Résultat, le guichet traite
        le dossier comme un cas standard et vous renvoie vers l'ANAPEC. Préparez bien vos
        pièces substitutives — acte de mariage, statuts, lettre CFC, peu importe — avant
        de vous pointer au guichet.
      </Tip>
    </>
  );
}

/* ─── Article 5 ─────────────────────────────────────────────────────────── */

function Article5Content() {
  return (
    <>
      <Lead>
        Le renouvellement, c'est la bonne nouvelle après le calvaire du premier dossier.
        C'est plus rapide, moins cher, et vous connaissez déjà la musique. Mais j'ai quand
        même vu des employeurs se planter dessus — souvent parce qu'ils s'y prennent trop tard
        ou qu'ils confondent renouvellement et nouveau recrutement.
      </Lead>

      <H2>Pourquoi c'est plus simple la deuxième fois</H2>
      <P>
        Quand vous renouvelez chez le même employeur et pour le même poste, l'administration
        considère que la question de la priorité nationale a déjà été tranchée. Résultat :
        l'ANAPEC passe de 20 jours à 48 heures, et les frais tombent de 5 000 à 1 500 Dhs.
        C'est quand même une belle différence.
      </P>
      <P>
        Par contre — et c'est là que certains tombent des nues — si vous changez quoi que ce
        soit au contrat (nouveau poste, nouvel employeur, même une promotion significative),
        le Ministère traite ça comme un nouveau recrutement. Retour à la case départ.
      </P>
      <Info>
        La formule magique : même employeur + même poste = renouvellement simplifié.
        Dès qu'un des deux change, c'est reparti pour la procédure complète.
      </Info>

      <H2>Le timing : ne faites pas comme 80% des employeurs</H2>
      <P>
        Je le dis franchement : la majorité des problèmes de renouvellement viennent du timing.
        L'employeur se réveille 15 jours avant l'expiration, alors qu'il faut compter au minimum
        un mois. J'ai eu un client à Mohammedia qui m'a appelé un jeudi, contrat qui expirait
        le lundi suivant. On n'a rien pu faire à temps.
      </P>
      <P>
        Lancez la procédure <strong>2 à 3 mois avant l'expiration</strong>. Ça laisse le temps
        pour :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>L'ANAPEC (48h, mais faut quand même les lancer)</li>
        <li>Regénérer le contrat sur TAECHIR, l'imprimer, le signer, le légaliser</li>
        <li>Le visa Ministère (jusqu'à 10 jours)</li>
        <li>Les demandes de pièces complémentaires — ça arrive plus souvent qu'on ne croit</li>
      </ul>
      <Warning>
        Un contrat expiré sans renouvellement en cours, ça place votre salarié en situation
        irrégulière. Même si le dossier est déposé, même si tout est en cours. Le gap entre
        l'expiration et le nouveau visa, c'est un trou juridique. Et ça peut compliquer le
        renouvellement de la carte de séjour derrière.
      </Warning>

      <H2>Les papiers en plus par rapport au premier dossier</H2>
      <P>
        Le renouvellement demande des pièces que vous n'aviez pas la première fois — logique,
        puisqu'il faut prouver que la relation de travail s'est bien passée.
      </P>
      <Table
        rows={[
          ['Document', 'Pourquoi c\'est nouveau', 'À savoir'],
          ['Contrat TAECHIR', '3 exemplaires légalisés', 'Même procédure que le premier, rien de nouveau'],
          ['Bordereaux CNSS', '3 derniers mois', 'Prouve que vous avez bien déclaré le salarié'],
          ['Carte de séjour DGSN', 'Copie de la carte en cours', 'Doit être valide ou en renouvellement'],
          ['Attestation ANAPEC', '48h, 1 500 Dhs', 'Sauf si dispensé (Tunisien, CFC, etc.)'],
          ['RC ou statuts', 'Seulement si modifiés', 'Si rien n\'a changé, pas besoin'],
        ]}
      />
      <P>
        Le point qui coince le plus souvent : les bordereaux CNSS. Si vous avez pris du retard
        dans vos déclarations, vous êtes bloqué. Un mois de retard CNSS = un dossier de
        renouvellement qui ne part pas. J'ai vu ça à Kénitra l'année dernière, l'employeur
        avait deux mois de retard. Le temps de régulariser, le contrat avait expiré.
      </P>

      <H2>La carte de séjour : le casse-tête de la synchronisation</H2>
      <P>
        Là c'est le moment où ça se complique un peu. Le visa de travail (Ministère) et la
        carte de séjour (DGSN) sont deux trucs différents, délivrés par deux administrations
        qui ne se parlent pas vraiment. Et chacune a besoin de l'autre comme justificatif.
      </P>
      <P>
        Pour renouveler le visa, on vous demande la carte de séjour en cours.
        Pour renouveler la carte de séjour, on vous demande le nouveau contrat visé.
        Vous voyez le problème ? C'est un peu l'œuf et la poule.
      </P>
      <Tip>
        En pratique, commencez par le renouvellement ANAPEC + dépôt Ministère.
        Dès que vous avez le nouveau contrat visé, enchaînez avec la carte de séjour
        à la DGSN. Certains bureaux de police acceptent un récépissé de dépôt
        au Ministère en attendant — mais ne comptez pas dessus partout, ça dépend
        de la préfecture.
      </Tip>

      <H2>Promotion = attention danger</H2>
      <P>
        Vous voulez promouvoir votre salarié étranger ? Super. Mais si la promotion
        implique un changement de titre, de fonction ou de niveau hiérarchique, le
        Ministère peut considérer que c'est un nouveau contrat. Et qui dit nouveau
        contrat dit nouvelle procédure complète avec ANAPEC.
      </P>
      <P>
        Un cas concret : un superviseur dans un centre d'appels à Casablanca promu
        directeur des opérations. L'employeur a fait le renouvellement normalement.
        Refusé. Le Ministère a considéré que c'était un nouveau poste — nouveau dossier,
        nouveau passage ANAPEC. Heureusement le profil rentrait dans la liste A1,
        donc c'est passé en 48h. Mais ça aurait pu être bien pire.
      </P>
      <P>
        Mon conseil : en cas de promotion, appelez le guichet du Ministère avant de
        déposer quoi que ce soit. Demandez-leur comment ils vont qualifier la situation.
        Cinq minutes au téléphone peuvent vous éviter des semaines de galère.
      </P>
    </>
  );
}

/* ─── Article 6 ─────────────────────────────────────────────────────────── */

function Article6Content() {
  return (
    <>
      <Lead>
        En 5 ans à accompagner des employeurs sur TAECHIR, j'ai vu les mêmes erreurs revenir
        encore et encore. Ce qui est frustrant, c'est que ce ne sont jamais des problèmes
        compliqués — c'est du timing, de l'organisation, parfois juste un manque d'information.
        Voici les 7 pièges que je vois le plus souvent, avec des exemples concrets.
      </Lead>

      <H2>Erreur n°1 — Faire bosser le salarié avant d'avoir le visa</H2>
      <P>
        Celle-là, c'est la pire. Et elle arrive bien plus souvent qu'on ne le croit.
        L'article 516 du Code du Travail est clair : pas de visa, pas de travail. Pas même
        un jour. Pas même "pour se mettre dans le bain". La date du visa = la date où le
        contrat prend effet. Point.
      </P>
      <P>
        J'ai eu un client à Rabat — une PME dans l'agroalimentaire — qui avait fait venir
        son ingénieur espagnol trois semaines avant le visa. "Il visitait les installations",
        qu'il m'a dit. Sauf que l'inspection du travail est passée pendant cette période.
        Le dossier TAECHIR a été compliqué ensuite, c'est le moins qu'on puisse dire.
      </P>
      <Warning>
        Il n'y a aucun "délai de grâce". Un seul jour de travail avant le visa, c'est
        une infraction. Et ça peut vous suivre sur vos prochains recrutements.
      </Warning>

      <H2>Erreur n°2 — Lancer la procédure au dernier moment</H2>
      <P>
        Même dans le cas le plus rapide — profil dispensé ou liste A1/A2 — il faut compter
        10 à 12 jours entre le dépôt et le visa. Pour un profil standard, c'est 4 à 6 semaines
        minimum. Et ça, c'est sans les imprévus : un document qui manque, une légalisation
        qui traîne, un jour férié qui tombe mal.
      </P>
      <P>
        Un DRH m'a contacté un vendredi pour un développeur sénégalais qui devait commencer
        le lundi suivant. Quand je lui ai expliqué le délai réel, il était dépité. On a fini
        par décaler la prise de poste de 5 semaines. C'est pas la fin du monde, mais c'est
        du temps perdu pour tout le monde.
      </P>
      <P>
        Mon conseil : lancez tout au minimum 6 à 8 semaines avant la date de prise de poste
        souhaitée. 3 à 4 semaines si c'est un profil rare ou dispensé.
      </P>

      <H2>Erreur n°3 — Se tromper sur le type de profil</H2>
      <P>
        Deux cas de figure, et les deux font mal. Premier cas : vous cochez "profil rare"
        alors que le poste n'est pas sur les listes A1/A2. L'ANAPEC requalifie en standard,
        vous repartez pour 20 jours d'attente et les frais montent à 5 000 Dhs.
      </P>
      <P>
        Deuxième cas, plus bête encore : vous mettez "standard" alors que le profil
        est éligible aux listes A1/A2. Vous venez de perdre 3 500 Dhs et 18 jours
        pour rien. J'ai vu ça trois fois rien que l'année dernière.
      </P>
      <Tip>
        Avant de constituer le dossier, un coup de fil à l'agence ANAPEC de votre
        région suffit pour trancher. Ça prend 10 minutes et ça peut vous économiser
        beaucoup.
      </Tip>

      <H2>Erreur n°4 — Oublier la légalisation des diplômes</H2>
      <P>
        Les diplômes et certificats étrangers doivent être légalisés — soit par apostille
        si le pays est signataire de la Convention de La Haye, soit par légalisation consulaire
        sinon. Et s'ils ne sont pas en français ou en arabe, il faut une traduction assermentée.
      </P>
      <P>
        C'est bête comme erreur, mais elle revient tout le temps. Le diplôme arrive tel quel,
        sans apostille, sans traduction. Refus au guichet. Et là, il faut 1 à 3 semaines pour
        rattraper le coup — selon le pays, parfois plus. Une boîte à Tanger m'a raconté qu'elle
        avait attendu 6 semaines pour une légalisation consulaire depuis le Cameroun parce que
        le consulat du Maroc à Yaoundé avait un retard monstre.
      </P>
      <P>
        La règle : lancez la légalisation en parallèle de tout le reste, dès que vous savez
        que vous allez recruter.
      </P>

      <H2>Erreur n°5 — Des retards CNSS chez l'employeur</H2>
      <P>
        Ça c'est le genre de truc qui bloque tout et qu'on découvre au pire moment. L'ANAPEC
        et le Ministère vérifient que vous êtes en règle avec la CNSS. Un mois de cotisation
        en retard, une déclaration manquante — et votre dossier est gelé.
      </P>
      <P>
        Un importateur de pièces auto à Casablanca m'a contacté en panique : son dossier était
        bloqué depuis 3 semaines au Ministère. Motif ? Deux mois de retard CNSS qu'il ne savait
        même pas qu'il avait. Son comptable avait raté un bordereau en septembre.
      </P>
      <P>
        Avant de lancer quoi que ce soit, allez chercher votre attestation de régularité CNSS.
        Ça doit dater de moins de 30 jours.
      </P>

      <H2>Erreur n°6 — Confondre visa de travail et carte de séjour</H2>
      <P>
        Deux documents, deux administrations, deux procédures. Le visa de travail (Ministère)
        autorise à travailler. La carte de séjour (DGSN) autorise à résider. Les deux sont
        obligatoires.
      </P>
      <Table
        rows={[
          ['Document', 'Délivré par', 'Ce que ça autorise', 'Délai'],
          ['Visa de travail', 'Ministère du Travail', 'Travailler au Maroc', '10 jours max'],
          ['Carte de séjour', 'DGSN (police)', 'Résider au Maroc', '2–6 semaines'],
        ]}
      />
      <P>
        J'ai vu des employeurs penser que le visa suffit et ne pas lancer la carte de séjour.
        Trois mois plus tard, le salarié ne peut pas ouvrir de compte bancaire, pas louer
        d'appartement à son nom, et la police peut techniquement le considérer en situation
        irrégulière. Pas idéal.
      </P>

      <H2>Erreur n°7 — Attendre pour déclarer à la CNSS</H2>
      <P>
        "On va attendre qu'il soit installé." "On va attendre son premier mois complet."
        Non. La déclaration CNSS doit se faire dès la date du visa — même si le salarié
        n'est pas encore arrivé physiquement. C'est la date du visa qui compte, pas la date
        où il met les pieds dans le bureau.
      </P>
      <P>
        Les pénalités de retard sont à 3,5% par mois et elles sont rétroactives.
        Un retard de 3 mois sur un salaire de 15 000 Dhs, faites le calcul — ça pique.
      </P>
      <Tip>
        Mettez en place un réflexe simple dans votre boîte : le jour où vous recevez le
        contrat visé, vous envoyez la copie au comptable pour l'affiliation CNSS.
        Le jour même. Pas la semaine d'après.
      </Tip>

      <Divider />

      <P>
        Ce qui me frappe avec ces 7 erreurs, c'est qu'aucune n'est vraiment compliquée
        à éviter. C'est de l'anticipation, de l'organisation. Mais quand on est dans le feu
        de l'action, avec un candidat qui attend et un business qui presse, on zappe les
        détails. Et ce sont les détails qui bloquent.
      </P>
    </>
  );
}

/* ─── Article 7 ─────────────────────────────────────────────────────────── */

function Article7Content() {
  return (
    <>
      <Lead>
        Le visa de travail en poche, beaucoup d'employeurs pensent que c'est fini. Raté.
        Il reste la carte de séjour — et c'est une autre administration, une autre procédure,
        un autre délai. Je vais vous expliquer comment ça marche concrètement, parce que
        les infos qu'on trouve en ligne sont souvent vagues ou datées.
      </Lead>

      <H2>Visa de travail ≠ carte de séjour</H2>
      <P>
        Je le répète parce que c'est la confusion numéro 1 que je vois : le visa de travail
        et la carte de séjour, c'est pas la même chose. Le visa, c'est le Ministère du Travail
        qui vous autorise à bosser. La carte de séjour, c'est la police (DGSN) qui vous
        autorise à résider. Deux administrations qui ne se coordonnent pas vraiment entre elles.
      </P>
      <Table
        rows={[
          ['', 'Visa de travail', 'Carte de séjour'],
          ['Qui le délivre', 'Ministère du Travail', 'DGSN (police/préfecture)'],
          ['Ce que ça autorise', 'Travailler', 'Résider sur le territoire'],
          ['Base légale', 'Code du Travail, art. 516', 'Loi n° 02-03 sur les étrangers'],
          ['Durée de validité', 'Durée du contrat', '1 an renouvelable, puis 10 ans'],
          ['Délai pour l\'obtenir', '10 jours max', '2 à 6 semaines selon la préfecture'],
        ]}
      />
      <Warning>
        Sans carte de séjour, votre salarié est en situation irrégulière au regard du droit
        des étrangers — même avec un contrat de travail visé par le Ministère. Ça paraît
        absurde mais c'est comme ça. Les deux documents sont obligatoires.
      </Warning>

      <H2>Qui doit faire la démarche ?</H2>
      <P>
        Tout étranger qui reste plus de 90 jours au Maroc doit avoir une carte de séjour.
        Ça concerne les salariés, mais aussi les conjoints de Marocains, les étudiants, les
        investisseurs... Pour un salarié, on lance la demande dès qu'on a le contrat visé.
      </P>
      <P>
        C'est le salarié lui-même qui fait la démarche — pas l'employeur. Mais en pratique,
        c'est souvent le service RH qui prépare le dossier et accompagne le salarié au
        commissariat. Surtout si le salarié ne parle pas darija et ne connaît pas encore la ville.
        J'ai accompagné un développeur ukrainien à Rabat qui ne parlait ni français ni arabe.
        Sans aide, il aurait mis des semaines à s'en sortir.
      </P>

      <H2>Les pièces à fournir (première demande)</H2>
      <P>Voici ce qu'il faut mettre dans le dossier :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Le formulaire de demande</strong> — vous le trouvez au guichet DGSN ou à la préfecture. Remplissez-le sur place, c'est plus sûr.</li>
        <li><strong>Le contrat de travail visé</strong> — original + copie. C'est la pièce maîtresse.</li>
        <li><strong>Le passeport valide</strong> — original + copie des pages d'identité et du tampon d'entrée au Maroc.</li>
        <li><strong>4 photos d'identité</strong> — fond blanc, format marocain. Pas celles que vous avez sur votre téléphone.</li>
        <li><strong>Un justificatif de domicile</strong> — contrat de bail légalisé, ou attestation d'hébergement, ou certificat de résidence du moqaddem.</li>
        <li><strong>Le casier judiciaire</strong> du pays d'origine — légalisé et traduit. C'est souvent celui-là qui traîne le plus.</li>
        <li><strong>Un certificat médical</strong> — fait par un médecin agréé au Maroc.</li>
        <li><strong>Un timbre fiscal</strong> de 100 Dhs.</li>
      </ul>
      <Info>
        Chaque préfecture a ses petites particularités. Celle de Casablanca demande parfois
        des pièces que celle de Rabat ne demande pas, et inversement. Appelez le service
        des étrangers de votre préfecture avant de monter le dossier pour avoir la liste
        exacte. Ça vous évitera un aller-retour inutile.
      </Info>

      <H2>Comment ça se passe concrètement</H2>
      <H3>1. Vous préparez tout le dossier</H3>
      <P>
        Rassemblez les pièces, faites les copies, vérifiez que les traductions sont faites
        et les légalisations en ordre. Prévoyez des copies en plus — on vous en demandera
        peut-être au guichet. Mieux vaut en avoir trop que pas assez.
      </P>
      <H3>2. Dépôt au service des étrangers</H3>
      <P>
        Vous allez à la préfecture de police du lieu de résidence du salarié. À Casablanca,
        c'est la préfecture de l'arrondissement. À Rabat, c'est au centre-ville. Prévoyez
        une matinée. On vous donne un récépissé de dépôt qui sert de titre provisoire en
        attendant la carte.
      </P>
      <H3>3. Les empreintes biométriques</H3>
      <P>
        Soit le jour du dépôt, soit sur convocation après. Le salarié doit venir en personne,
        pas moyen d'envoyer quelqu'un à sa place. C'est rapide — 10 minutes — mais il faut
        être là.
      </P>
      <H3>4. Retrait de la carte</H3>
      <P>
        Comptez 2 à 6 semaines de traitement. À Rabat, j'ai vu des cartes sortir en 2 semaines.
        À Casablanca, c'est plutôt 4-5 semaines en période chargée (septembre-octobre notamment).
        Vous récupérez la carte en personne avec le récépissé et votre passeport.
      </P>

      <H2>Le renouvellement : plus simple mais faut anticiper</H2>
      <P>
        La carte se renouvelle chaque année (les premières années). Le dossier est un peu plus
        léger que la première fois :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Le nouveau contrat de travail visé (si renouvellement du visa aussi)</li>
        <li>L'ancienne carte de séjour — on vous la reprend</li>
        <li>Les 3 derniers bulletins de paie ou une attestation CNSS récente</li>
        <li>Justificatif de domicile à jour</li>
        <li>Photos récentes</li>
      </ul>
      <Tip>
        Lancez le renouvellement 2 mois avant l'expiration. Une carte expirée = situation
        irrégulière, même si votre contrat de travail est valide. J'ai vu un salarié français
        à Marrakech se faire refuser l'ouverture d'un compte bancaire parce que sa carte
        avait expiré de 3 semaines. Trois semaines !
      </Tip>

      <H2>La carte de 10 ans : le graal</H2>
      <P>
        Après 4 ans de résidence légale continue au Maroc (en gros, 4 renouvellements
        annuels sans interruption), vous pouvez demander une carte de résidence de 10 ans.
        C'est un vrai soulagement — plus besoin de renouveler chaque année.
      </P>
      <P>
        Pour l'obtenir, il faut montrer que le séjour a été régulier sur toute la période,
        pas de problème judiciaire, une situation professionnelle stable et des revenus
        suffisants. C'est à la discrétion de l'administration — certains dossiers passent
        facilement, d'autres moins. Mais franchement, si vous avez 4 ans de contrats visés
        et de déclarations CNSS en règle, vous avez un bon dossier.
      </P>

      <Divider />

      <H2>Les boulettes les plus courantes</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Prendre le récépissé pour la carte définitive.</strong> Le récépissé, c'est
          un bout de papier provisoire. Il ne remplace pas la carte. Essayez d'ouvrir un
          compte Attijariwafa avec un récépissé — bonne chance.
        </li>
        <li>
          <strong>Laisser la carte expirer.</strong> "Ça va, j'ai encore le visa de travail."
          Non. La carte de séjour et le visa sont indépendants. Une carte expirée pose
          problème même si le contrat est en cours.
        </li>
        <li>
          <strong>Déménager sans prévenir la DGSN.</strong> Vous avez 30 jours pour signaler
          un changement d'adresse au service des étrangers. Personne ne le fait, et ça peut
          poser problème au moment du renouvellement.
        </li>
      </ul>
    </>
  );
}

/* ─── Article 8 ─────────────────────────────────────────────────────────── */

function Article8Content() {
  return (
    <>
      <Lead>
        La CNSS, c'est le truc que beaucoup d'employeurs repoussent en se disant "on verra
        quand le salarié sera là". Mauvaise idée. La déclaration doit se faire dès le jour
        du visa — pas le jour où le salarié arrive au Maroc, pas le jour où il commence à
        travailler. Le jour du visa. Et les pénalités de retard font mal.
      </Lead>

      <H2>Déclarer dès la date du visa, pas après</H2>
      <P>
        Je le dis d'entrée parce que c'est le point qui pose le plus de problèmes : la date
        de prise d'effet du contrat, c'est la date du visa apposé par le Ministère. C'est
        à partir de cette date que la CNSS considère que la relation de travail existe. Que
        le salarié soit encore à Paris ou à Dakar en train de faire ses valises, ça ne change rien.
      </P>
      <P>
        Un de mes clients à Casablanca a attendu 2 mois après le visa pour déclarer son
        comptable français à la CNSS. "Il n'avait pas encore commencé à travailler", m'a-t-il
        expliqué. Sauf que la CNSS s'en fiche. Résultat : 2 mois de majorations à 3,5% par mois,
        rétroactives depuis la date du visa. Ça pique.
      </P>
      <Warning>
        Les majorations de retard CNSS sont automatiques et rétroactives. 3,5% par mois
        de retard sur le montant des cotisations dues. Plus vous attendez, plus la facture
        monte. Et en plus, ça bloque vos futurs dossiers TAECHIR.
      </Warning>

      <H2>Comment ça se passe concrètement</H2>
      <H3>Votre entreprise est déjà affiliée ?</H3>
      <P>
        Si votre boîte existe depuis un moment et que vous avez déjà des salariés déclarés,
        vous avez déjà un numéro d'affiliation CNSS. Pas besoin de refaire cette étape.
        Si c'est une entreprise toute neuve, il faut d'abord vous affilier — mais c'est
        un cas rare dans le cadre d'un recrutement étranger.
      </P>
      <H3>La déclaration d'entrée du salarié</H3>
      <P>
        Vous passez par DAMANCOM (le portail en ligne de la CNSS) ou vous allez directement
        à votre agence CNSS. Voici ce qu'on vous demande :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Nom, prénom, date de naissance, nationalité du salarié</li>
        <li>Numéro de passeport + copie</li>
        <li>Copie du contrat de travail visé par le Ministère</li>
        <li>Date d'effet (= date du visa, pas la date d'arrivée !)</li>
        <li>Salaire brut mensuel</li>
        <li>Intitulé du poste</li>
      </ul>
      <P>
        Le salarié étranger reçoit son propre numéro CNSS — même format que pour un Marocain.
        Ce numéro le suit même s'il change d'employeur par la suite.
      </P>
      <Info>
        Sur DAMANCOM, la procédure est la même que pour un salarié marocain. Il n'y a pas de
        formulaire spécial "étranger". Vous ajoutez juste le numéro de passeport au lieu de
        la CIN. C'est tout.
      </Info>

      <H3>Les déclarations mensuelles ensuite</H3>
      <P>
        Chaque mois, vous déclarez le salaire brut du salarié dans la DNS (Déclaration
        Nominative des Salaires). C'est inclus avec le reste de vos salariés, pas de traitement
        à part. Les taux sont exactement les mêmes :
      </P>
      <Table
        rows={[
          ['Branche', 'Part employeur', 'Part salarié', 'Total'],
          ['Prestations sociales', '8,98 %', '0,52 %', '9,50 %'],
          ['AMO (assurance maladie)', '4,11 %', '2,26 %', '6,37 %'],
          ['Allocations familiales', '6,40 %', '0 %', '6,40 %'],
          ['Formation professionnelle', '1,60 %', '0 %', '1,60 %'],
        ]}
      />

      <H2>Ce que ça donne en termes de droits pour le salarié</H2>
      <P>
        Contrairement à ce que beaucoup pensent, un étranger déclaré à la CNSS a exactement
        les mêmes droits qu'un Marocain. Pas de version light, pas de couverture réduite.
        Ça inclut :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>L'AMO</strong> — couverture maladie pour lui et ses ayants droit qui vivent au Maroc</li>
        <li><strong>Les indemnités journalières</strong> — en cas de maladie ou d'accident du travail</li>
        <li><strong>Les allocations familiales</strong> — pour les enfants qui résident au Maroc</li>
        <li><strong>La pension de retraite</strong> — calculée sur les cotisations versées</li>
        <li><strong>L'indemnité pour perte d'emploi (IPE)</strong> — sous conditions</li>
      </ul>
      <P>
        Un truc que les salariés étrangers ne savent souvent pas : s'ils retournent dans
        leur pays, les cotisations retraite ne sont pas forcément perdues. Ça dépend des
        conventions bilatérales.
      </P>

      <H2>Les conventions bilatérales : vos cotisations ne sont pas perdues</H2>
      <P>
        Le Maroc a des accords de sécurité sociale avec pas mal de pays : la France, la
        Belgique, l'Espagne, les Pays-Bas, le Canada, la Tunisie, l'Allemagne... Ces
        conventions permettent trois choses importantes :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Totalisation des périodes</strong> — vos années cotisées au Maroc et dans votre pays d'origine se cumulent pour le calcul de la retraite</li>
        <li><strong>Export des prestations</strong> — vous pouvez toucher votre pension marocaine depuis la France ou la Belgique</li>
        <li><strong>Pas de double cotisation</strong> pour les détachés temporaires — vous cotisez dans un seul pays</li>
      </ul>
      <Tip>
        Si votre salarié vient d'un pays qui a une convention avec le Maroc (France, Belgique,
        Espagne, etc.), dites-lui de se renseigner auprès de la CNSS sur la totalisation
        des périodes. Ça peut changer ses droits à la retraite de façon significative.
        C'est le genre d'info que personne ne donne spontanément.
      </Tip>

      <H2>Ce qui se passe quand vous ne déclarez pas (ou en retard)</H2>
      <P>
        Je vais être direct : les conséquences sont lourdes et ça va au-delà de l'amende.
      </P>
      <Table
        rows={[
          ['Ce que vous avez fait', 'Ce qui vous attend'],
          ['Retard de déclaration', '3,5 % de majoration par mois de retard'],
          ['Salarié non déclaré', 'Amende de 5 000 à 10 000 Dhs par salarié'],
          ['Salaire sous-déclaré', 'Régularisation + majorations + sanctions'],
          ['Cotisations non payées', 'Poursuites judiciaires possibles'],
        ]}
      />
      <P>
        Et le pire dans tout ça : une situation CNSS pas en règle, ça bloque aussi vos
        futurs dossiers ANAPEC et TAECHIR. Vous ne pourrez plus recruter d'étranger tant
        que ce n'est pas régularisé. J'ai vu une société de services à Fès complètement
        paralysée pendant 4 mois parce qu'elle n'avait pas déclaré un salarié ivoirien.
        Quatre mois sans pouvoir lancer de nouveau recrutement.
      </P>

      <Divider />

      <P>
        Au final, la CNSS pour un étranger, c'est pas plus compliqué que pour un Marocain.
        Mêmes formulaires, mêmes taux, mêmes échéances. Le seul piège, c'est le timing :
        déclarez dès le visa, pas quand le salarié arrive ou quand "il commence vraiment".
        La CNSS ne fait pas dans la nuance sur ce point.
      </P>
    </>
  );
}

/* ─── Article 9 ─────────────────────────────────────────────────────────── */

function Article9Content() {
  return (
    <>
      <Lead>
        La légalisation des documents, c'est le truc invisible qui fait dérailler les dossiers.
        Vous avez tout préparé, l'ANAPEC est passée, le contrat TAECHIR est prêt — et là,
        on vous dit que le diplôme n'est pas apostillé. Retour case départ, 2 à 6 semaines
        d'attente. Je vais vous expliquer comment éviter ce piège selon le pays d'origine
        du salarié.
      </Lead>

      <H2>Apostille ou légalisation consulaire : c'est quoi la différence ?</H2>
      <P>
        En gros, il y a deux façons de faire reconnaître un document étranger au Maroc.
        Laquelle s'applique dépend d'une seule chose : est-ce que le pays d'origine du
        document a signé la Convention de La Haye ou pas.
      </P>
      <Table
        rows={[
          ['Système', 'Quand ça s\'applique', 'En pratique'],
          ['Apostille', 'Le pays a signé la Convention de La Haye (1961)', 'Un tampon unique du pays d\'origine — rapide et simple'],
          ['Légalisation consulaire', 'Le pays n\'a PAS signé La Haye', 'Chaîne longue : autorité locale → Ministère des Affaires Étrangères → consulat du Maroc'],
        ]}
      />
      <P>
        Le Maroc a adhéré à la Convention de La Haye, donc pour tous les pays qui l'ont
        aussi signée, une simple apostille suffit. C'est le cas facile. Pour les autres
        — et ça concerne pas mal de pays africains et du Moyen-Orient — c'est la
        légalisation consulaire, qui est beaucoup plus longue.
      </P>

      <H2>L'apostille : le cas simple (France, Espagne, etc.)</H2>
      <P>
        Si votre salarié vient de France, d'Espagne, d'Allemagne, de Belgique, du
        Royaume-Uni, des États-Unis, du Japon ou d'un autre pays signataire, vous avez
        de la chance. L'apostille, c'est un tampon officiel qu'on appose sur le document
        original dans le pays d'émission. Et c'est tout.
      </P>
      <H3>Qui délivre l'apostille ?</H3>
      <P>
        Ça dépend du pays. En France, c'est la Cour d'appel — celle du lieu où le document
        a été émis ou celle du lieu de résidence. En Espagne, c'est le Ministerio de Justicia.
        Aux USA, c'est le Secretary of State de l'État concerné (attention, chaque État a
        le sien). C'est rarement compliqué, mais il faut savoir où aller.
      </P>
      <H3>Combien de temps ça prend ?</H3>
      <P>
        En France, comptez 5 à 10 jours et c'est gratuit. En Espagne, une semaine environ.
        Aux États-Unis, ça varie selon l'État — parfois c'est en ligne, parfois il faut
        envoyer par courrier. Budget : généralement entre 10 et 50 euros selon les pays.
        Par rapport à la légalisation consulaire, c'est le paradis.
      </P>

      <H2>La légalisation consulaire : le parcours du combattant</H2>
      <P>
        Pour les pays qui n'ont pas signé La Haye — notamment le Cameroun, la Côte d'Ivoire,
        le Mali, le Niger, le Congo, l'Égypte, l'Inde... — c'est une autre histoire.
        Il faut passer par trois étapes :
      </P>
      <ol className="list-decimal pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>L'autorité locale certifie le document.</strong> L'université confirme le
          diplôme, le tribunal confirme le casier judiciaire, etc.
        </li>
        <li>
          <strong>Le Ministère des Affaires Étrangères du pays d'émission</strong> légalise
          la signature de l'autorité locale.
        </li>
        <li>
          <strong>Le consulat ou l'ambassade du Maroc</strong> dans ce pays légalise la
          signature du MAE.
        </li>
      </ol>
      <P>
        Trois tampons, trois guichets, souvent trois villes différentes. J'ai eu le cas
        d'un ingénieur camerounais recruté par une boîte à Tanger : il a fallu 6 semaines
        pour légaliser son diplôme. L'université à Douala, le MAE à Yaoundé, le consulat
        du Maroc à Yaoundé aussi mais dans un autre quartier. Et le consulat ne recevait
        que le mardi et le jeudi matin.
      </P>
      <Warning>
        La chaîne de légalisation consulaire peut prendre de 2 à 6 semaines — parfois plus.
        Dans certains pays, le consulat du Maroc n'est que dans la capitale, ce qui ajoute
        du transport et du temps. Lancez cette démarche le plus tôt possible, c'est souvent
        le goulot d'étranglement de tout le dossier.
      </Warning>

      <H2>Et la traduction ?</H2>
      <P>
        Tout document qui n'est pas en français ou en arabe doit être traduit par un
        traducteur assermenté. Un diplôme en anglais, un certificat en espagnol, un
        casier judiciaire en allemand — traduction obligatoire.
      </P>
      <P>Quelques points importants :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Le traducteur doit être <strong>assermenté</strong> — inscrit auprès d'une cour d'appel, au Maroc ou dans le pays d'origine</li>
        <li>La traduction elle-même doit être <strong>légalisée</strong> (la signature du traducteur)</li>
        <li>Faites plutôt traduire au Maroc par un traducteur assermenté marocain — ça évite les discussions au guichet</li>
        <li>Les documents en <strong>anglais</strong> passent parfois sans traduction dans certains guichets, mais c'est pas garanti. Je ne prendrais pas le risque.</li>
      </ul>
      <P>
        Budget traduction : comptez 200 à 500 Dhs par page au Maroc. Un diplôme de 2 pages +
        un certificat de travail, vous en avez pour 600 à 1 500 Dhs environ.
      </P>

      <H2>Récap : qu'est-ce qui doit être légalisé exactement ?</H2>
      <Table
        rows={[
          ['Document', 'Légalisation ?', 'Traduction ?'],
          ['Diplômes', 'Oui (apostille ou consulaire)', 'Oui si pas en français/arabe'],
          ['Certificats de travail', 'Oui', 'Oui si pas en français/arabe'],
          ['Casier judiciaire', 'Oui', 'Oui dans tous les cas'],
          ['Acte de mariage (pour les dispensés)', 'Oui', 'Oui si étranger'],
          ['Passeport', 'Non — copie certifiée conforme suffit', 'Non'],
          ['Contrat TAECHIR', 'Légalisation au Maroc seulement', 'Non, il est en français'],
        ]}
      />

      <H2>Conseils concrets par pays d'origine</H2>
      <H3>France</H3>
      <P>
        Le cas le plus simple. Apostille gratuite à la Cour d'appel, 5 à 10 jours.
        Les diplômes français sont reconnus sans traduction — c'est déjà en français.
        Le casier judiciaire se demande en ligne sur le site du Ministère de la Justice.
      </P>
      <H3>Afrique francophone (Côte d'Ivoire, Cameroun, Sénégal, etc.)</H3>
      <P>
        Légalisation consulaire obligatoire pour la plupart. L'avantage : les documents
        sont généralement en français, donc pas de traduction. L'inconvénient : la chaîne
        de légalisation prend 3 à 4 semaines minimum. Le Sénégal est un peu à part car
        dispensé d'ANAPEC, mais les documents doivent quand même être légalisés pour le
        dossier TAECHIR.
      </P>
      <H3>Pays anglophones (UK, USA, Canada)</H3>
      <P>
        Apostille disponible dans les trois cas. Mais tous les documents devront être
        traduits en français ou en arabe par un traducteur assermenté. Comptez 200 à
        500 Dhs par page de traduction au Maroc.
      </P>
      <Tip>
        Mon conseil numéro 1 : lancez la légalisation et la traduction dès que vous
        savez que vous allez recruter. N'attendez pas d'avoir l'attestation ANAPEC
        pour commencer. Faites tout en parallèle. La légalisation, c'est presque
        toujours ce qui retarde le plus le dossier — et c'est bête parce que ça peut
        se faire en amont, sans bloquer le reste.
      </Tip>
    </>
  );
}

/* ─── Article 10 ────────────────────────────────────────────────────────── */

function Article10Content() {
  return (
    <>
      <Lead>
        Si vous gérez un centre d'appels ou une boîte de BPO au Maroc, vous savez que le
        recrutement d'étrangers fait partie du quotidien — surtout pour les langues rares.
        Mais les règles ne sont pas les mêmes que pour les autres secteurs, et la confusion
        entre statut CFC et statut offshoring coûte cher à beaucoup d'opérateurs.
        Je décortique tout ça ici.
      </Lead>

      <H2>L'offshoring marocain, c'est quoi exactement ?</H2>
      <P>
        Quand on parle d'offshoring au Maroc, on met dans le même sac des choses assez
        différentes : les centres de relation client (les fameux call centers), le BPO
        (externalisation de processus métier), l'ITO (services IT externalisés) et le KPO
        (prestations intellectuelles à haute valeur ajoutée). Tout ça est regroupé sous
        le label "offshoring" dans la politique industrielle marocaine.
      </P>
      <P>
        Les opérateurs sont généralement installés dans des zones dédiées : Casablanca
        Nearshore (le plus gros), Rabat Technopolis, Fès Shore, Marrakech Shore, Oujda Shore.
        J'ai travaillé avec des centres dans presque toutes ces zones et franchement, les
        réalités administratives varient pas mal d'un endroit à l'autre.
      </P>
      <Info>
        Le statut d'opérateur d'offshoring reconnu donne des avantages fiscaux intéressants —
        IS à 15% après 5 ans d'exonération, pas de droits de douane sur les équipements.
        Mais attention, ça ne veut pas dire dispense automatique d'ANAPEC. C'est la confusion
        numéro 1 dans le secteur.
      </Info>

      <H2>CFC vs offshoring : ne confondez surtout pas</H2>
      <P>
        C'est l'erreur que je vois le plus souvent. Un DRH de centre d'appels me dit
        "on est dispensé d'ANAPEC, on est dans l'offshoring". Non. La dispense automatique,
        c'est pour le statut <strong>CFC (Casablanca Finance City)</strong>, pas pour
        l'offshoring en général.
      </P>
      <H3>Le statut CFC</H3>
      <P>
        CFC, c'est la place financière internationale de Casablanca. On parle de sièges
        régionaux de multinationales, de banques d'investissement, de sociétés de gestion.
        Leurs cadres étrangers sont <strong>totalement dispensés d'ANAPEC</strong> — c'est
        dans la loi. Une lettre de CFC, et c'est réglé. Pas de frais ANAPEC, pas de délai
        de 20 jours.
      </P>
      <H3>L'offshoring "classique"</H3>
      <P>
        Pour tous les autres — et c'est la grande majorité des centres d'appels et BPO
        au Maroc — pas de dispense automatique. Vous passez par l'ANAPEC comme tout le monde.
        Mais il y a des mécanismes qui facilitent les choses, surtout pour les cadres.
      </P>
      <Table
        rows={[
          ['', 'Statut CFC', 'Offshoring classique'],
          ['Dispense ANAPEC', 'Oui, pour tous les cadres', 'Non (sauf cas généraux : Tunisien, époux, etc.)'],
          ['Procédure allégée', 'Oui, automatique', 'Oui, via les listes A1/A2'],
          ['Zones', 'Casablanca Finance City', 'Nearshore, Technopolis, Fès Shore...'],
          ['Secteurs', 'Finance, conseil, holdings', 'BPO, ITO, centres d\'appels, KPO'],
          ['Réglementation', 'Textes CFC', 'Code du Travail + circulaires ANAPEC'],
        ]}
      />

      <H2>Pour les cadres : les listes A1/A2 sont vos amies</H2>
      <P>
        Même sans statut CFC, vos cadres seniors ont de bonnes chances de passer par
        la procédure allégée — 48 heures et 1 500 Dhs au lieu de 20 jours et 5 000 Dhs.
        Comment ? Grâce aux listes A1 et A2 de l'ANAPEC.
      </P>
      <P>
        En pratique, un directeur de site avec 10 ans d'expérience, un responsable qualité
        international, un chef de projet bilingue avec une expertise sectorielle pointue —
        ces profils rentrent presque toujours dans les critères A1 ou A2. Pas d'annonce à
        publier, traitement en 48h. C'est un vrai gain de temps.
      </P>
      <Tip>
        Avant de lancer un dossier ANAPEC standard pour un cadre de votre centre, vérifiez
        d'abord s'il relève des listes A1/A2. Un directeur des opérations bilingue avec 8+
        ans d'expérience en BPO ? C'est probablement A1. Un CTO avec un profil technique
        pointu ? Probablement A2. Vérifiez, ça peut vous économiser 3 500 Dhs et 18 jours.
      </Tip>

      <H2>Les agents et superviseurs : là c'est plus compliqué</H2>
      <P>
        Pour les profils opérationnels — agents de call center, chargés de clientèle,
        superviseurs juniors — c'est la procédure standard : 20 jours ANAPEC, 5 000 Dhs
        pour le premier dossier. Pas de raccourci.
      </P>
      <P>
        Sauf... si vous recrutez pour une compétence linguistique rare. Un locuteur natif
        néerlandais, un agent qui parle le suédois ou le flamand — bonne chance pour trouver
        ça au Maroc. Dans ce cas, vous pouvez argumenter auprès de l'ANAPEC que le profil
        est rare de fait, et tenter de basculer en procédure A2.
      </P>
      <P>
        J'ai accompagné un centre à Casablanca Nearshore qui recrutait des agents néerlandophones
        pour un client belge. On a présenté le cas à l'ANAPEC régionale avec des chiffres —
        nombre de locuteurs néerlandais au Maroc, résultats de la publication d'annonces
        précédentes sans réponse. Ça a marché, traitement en 48h.
      </P>
      <Warning>
        Attention : le critère linguistique seul ne suffit pas formellement pour qualifier
        un profil de rare au sens des listes A1/A2. C'est à la discrétion de l'agence ANAPEC
        régionale. Allez les voir avant de déposer le dossier pour présenter votre besoin.
        Arriver avec un dossier déjà constitué sans les avoir consultés, c'est risqué.
      </Warning>

      <H2>L'ANAPEC régionale : toutes ne se valent pas</H2>
      <P>
        Point important que beaucoup ignorent : il n'y a pas d'agence ANAPEC spéciale
        pour l'offshoring. C'est l'agence régionale de votre zone géographique qui traite
        votre dossier. Casablanca Nearshore → agence ANAPEC de Casablanca. Rabat Technopolis
        → agence de Rabat. Et ainsi de suite.
      </P>
      <P>
        Et franchement, certaines agences connaissent mieux le secteur que d'autres.
        L'agence de Casablanca traite des dizaines de dossiers offshoring par mois — ils
        comprennent les enjeux. À Oujda ou Marrakech, c'est parfois moins fluide simplement
        parce que le volume est plus faible. Mon conseil : allez vous présenter à votre
        agence ANAPEC en amont, expliquez votre activité et vos besoins en recrutement
        international. Ça facilite tout pour la suite.
      </P>

      <H2>Sur TAECHIR : pas de traitement spécial</H2>
      <P>
        Sur la plateforme TAECHIR elle-même, les opérateurs d'offshoring suivent la procédure
        standard. Pas de file prioritaire, pas de tunnel dédié. La différence se fait en
        amont (ANAPEC) et en aval (Ministère), mais la plateforme ne distingue pas.
      </P>
      <P>
        Par contre, mentionnez dans votre dossier que vous êtes opérateur d'offshoring
        en zone shore. Joignez votre convention d'implantation, votre attestation de zone.
        Ça contextualise votre demande et les agents du Ministère apprécient quand le
        dossier est bien présenté.
      </P>
      <P>
        Pour l'intitulé du poste sur le contrat TAECHIR, utilisez les appellations reconnues :
        "Agent de relation client", "Superviseur centre de relation client", "Directeur
        des opérations BPO". Évitez les titres en anglais ou les intitulés fantaisistes —
        le contrat TAECHIR suit la nomenclature marocaine.
      </P>

      <Divider />

      <H2>Récap : quelle procédure pour quel profil ?</H2>
      <Table
        rows={[
          ['Profil', 'Statut probable', 'Procédure', 'Délai'],
          ['Directeur de site', 'Liste A1', 'ANAPEC 48h + TAECHIR', '2–3 semaines'],
          ['CTO / responsable IT', 'Liste A1 ou A2', 'ANAPEC 48h + TAECHIR', '2–3 semaines'],
          ['Expert senior (KPO)', 'Liste A2', 'ANAPEC 48h + TAECHIR', '2–3 semaines'],
          ['Agent langue rare (néerlandais...)', 'À voir avec ANAPEC', 'Consulter l\'agence d\'abord', '3–5 semaines'],
          ['Agent langue courante', 'Standard', 'ANAPEC 20j + TAECHIR', '5–7 semaines'],
          ['Personnel CFC', 'Dispensé', 'TAECHIR direct', '1–2 semaines'],
        ]}
      />
      <P>
        Le mot-clé pour l'offshoring, c'est <strong>qualifier le profil en amont</strong>.
        Un mauvais classement, ça coûte des semaines et des milliers de dirhams. Prenez
        le temps de vérifier avant de lancer quoi que ce soit. Un appel à l'ANAPEC, une
        vérification des listes A1/A2 — 30 minutes qui peuvent vous épargner un mois de délai.
      </P>
      <Tip>
        Si vous recrutez régulièrement à l'international (3+ salariés étrangers par an),
        allez voir votre agence ANAPEC pour établir un "profil type" de vos postes.
        Ça permet de savoir à l'avance quels postes relèvent de quelle procédure et
        d'accélérer tous vos futurs dossiers. Les grosses boîtes de BPO à Casablanca
        Nearshore le font toutes.
      </Tip>
    </>
  );
}

/* ─── Article 11 ────────────────────────────────────────────────────────── */

function Article11Content() {
  return (
    <>
      <Lead>
        "Ça coûte combien de recruter un étranger au Maroc ?" — c'est la première question
        que tout le monde me pose. Et la réponse honnête, c'est : plus que ce qu'on croit.
        Les 5 000 Dhs de l'ANAPEC, tout le monde les connaît. Mais derrière, il y a la
        légalisation, la traduction, le notaire, la carte de séjour, les déplacements...
        Voici le vrai budget, sans arrondir.
      </Lead>

      <H2>Les 6 postes de coût à prévoir</H2>
      <P>
        Quand je fais un devis pour un employeur qui recrute pour la première fois
        à l'international, je lui liste toujours les mêmes 6 familles de dépenses.
        Certaines sont fixes, d'autres dépendent du profil du salarié.
      </P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>Les frais ANAPEC</li>
        <li>La légalisation des documents</li>
        <li>Les traductions assermentées</li>
        <li>Le notaire ou l'adoul</li>
        <li>La carte de séjour DGSN</li>
        <li>Les déplacements et le temps passé en interne</li>
      </ol>
      <Info>
        Tout ça, c'est à la charge de l'employeur. Faire payer le salarié étranger pour
        sa propre procédure d'embauche, en plus d'être moralement discutable, ça peut
        poser des problèmes juridiques. Ne le faites pas.
      </Info>

      <H2>1. Les frais ANAPEC — le gros morceau</H2>
      <P>
        C'est le poste le plus connu. Voici ce que ça donne selon votre situation :
      </P>
      <Table
        rows={[
          ['Situation', 'Montant HT', 'Ce que ça implique'],
          ['1er dossier standard', '5 000 Dhs', 'Annonce 20 jours, le plus cher'],
          ['Dossier suivant même métier', '1 500 Dhs', 'Jusqu\'à 5 par an pour le même poste'],
          ['Profil rare (A1 ou A2)', '1 500 Dhs', '48h de traitement, pas d\'annonce'],
          ['Renouvellement même employeur', '1 500 Dhs', 'Procédure accélérée'],
          ['Dispensé (CFC, convention, etc.)', '0 Dhs', 'Vous ne passez pas par l\'ANAPEC'],
        ]}
      />
      <P>
        N'oubliez pas la TVA à 20%. Le premier dossier standard, en réalité, c'est
        <strong> 6 000 Dhs TTC</strong>. Si vous êtes assujetti à la TVA, vous la récupérez.
        Sinon, c'est pour votre pomme. Un restaurateur à Marrakech que j'ai accompagné
        ne le savait pas — il avait budgété 5 000 et s'est retrouvé à payer 6 000. Pas
        dramatique, mais autant le savoir à l'avance.
      </P>

      <H2>2. La légalisation — petits montants, gros délais</H2>
      <P>
        Le contrat TAECHIR, il faut l'imprimer en 3 exemplaires, le faire signer par les
        deux parties, et légaliser le tout. Plus les diplômes étrangers à apostiller ou
        faire légaliser par voie consulaire.
      </P>
      <H3>Au Maroc</H3>
      <P>
        Légaliser une signature chez l'adoul ou chez un notaire, c'est entre <strong>20 et
        50 Dhs par signature</strong>. Pour les 3 exemplaires du contrat, comptez 150 à 400 Dhs
        en tout. Le coût est faible, mais prévoyez une journée — entre le déplacement et
        l'attente, ça peut vite prendre du temps. À Casablanca, j'ai déjà perdu une matinée
        entière chez un adoul à Ain Sebaâ un mardi de Ramadan.
      </P>
      <H3>À l'étranger (apostille ou consulaire)</H3>
      <P>
        Pour un pays signataire de La Haye (France, Espagne, USA...), l'apostille coûte
        entre <strong>30 et 150 euros</strong>. En France c'est gratuit à la Cour d'appel, mais
        comptez 5 à 10 jours de délai.
      </P>
      <P>
        Pour les pays hors Convention de La Haye (beaucoup de pays africains, Moyen-Orient),
        la légalisation consulaire coûte <strong>100 à 300 euros</strong> et peut prendre
        3 à 6 semaines. C'est souvent le poste le plus imprévisible de toute la procédure.
      </P>
      <Warning>
        La légalisation consulaire, c'est le truc le plus imprévisible. J'ai eu des cas
        où l'ambassade du Maroc n'avait pas de rendez-vous avant 5 semaines. Lancez cette
        démarche dès que vous avez identifié le candidat, pas quand le dossier est prêt.
      </Warning>

      <H2>3. Les traductions assermentées</H2>
      <P>
        Tout document qui n'est pas en français ou en arabe doit passer par un traducteur
        assermenté. Les tarifs varient pas mal selon la langue :
      </P>
      <Table
        rows={[
          ['Document', 'Tarif indicatif', 'Commentaire'],
          ['Diplôme français → arabe', '200–350 Dhs/page', 'Le plus courant et le moins cher'],
          ['Diplôme anglais → arabe', '300–500 Dhs/page', 'Beaucoup de traducteurs disponibles'],
          ['Certificat de travail', '200–400 Dhs', 'Document court, rarement plus d\'une page'],
          ['Diplôme langue rare (néerlandais, etc.)', '600–1 200 Dhs/page', 'Peu de traducteurs, ça se paye'],
          ['Acte de mariage étranger', '400–700 Dhs', 'Variable selon le pays'],
        ]}
      />
      <P>
        Pour un dossier classique (1 diplôme de 2 pages + 1 certificat de travail),
        comptez <strong>700 à 1 500 Dhs</strong>. Mais j'ai eu des profils avec 3 diplômes
        en anglais et des certificats en espagnol — là ça monte vite au-dessus de 3 000 Dhs.
      </P>

      <H2>4. Le notaire ou l'adoul</H2>
      <P>
        Pour la légalisation des 3 exemplaires du contrat, c'est <strong>100 à 200 Dhs
        chez l'adoul</strong>, un peu plus chez le notaire (200 à 400 Dhs). Rien de
        dramatique, mais c'est dans le budget.
      </P>
      <Tip>
        Si vous n'avez pas le temps de gérer les allers-retours chez l'adoul, certaines
        boîtes de "conciergerie juridique" à Casablanca et Rabat prennent tout en charge
        pour 300 à 800 Dhs. Ça vaut le coup si votre RH est débordé. J'ai un client
        dans l'automobile à Tanger qui fait ça systématiquement — il dit que le gain
        de temps justifie largement le coût.
      </Tip>

      <H2>5. La carte de séjour DGSN</H2>
      <P>
        La carte de séjour, c'est le service des étrangers de la police — indépendant
        du visa de travail du Ministère. Les frais directs :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Timbre fiscal et frais administratifs : <strong>200 à 500 Dhs</strong></li>
        <li>Visite médicale (médecin agréé) : <strong>200 à 400 Dhs</strong></li>
        <li>Photos d'identité biométriques : 30 à 60 Dhs</li>
      </ul>
      <P>
        Total carte de séjour : environ <strong>500 à 1 000 Dhs</strong> de frais directs.
        Plus une ou deux demi-journées du salarié pour se présenter au guichet. Et ça
        se renouvelle chaque année.
      </P>

      <H2>6. Les coûts qu'on oublie toujours</H2>
      <H3>Les déplacements du salarié</H3>
      <P>
        Si le candidat doit venir au Maroc pour signer le contrat avant d'avoir son visa,
        c'est un billet d'avion à prévoir : <strong>300 à 1 500 euros</strong> selon l'origine.
        Certains employeurs font signer à distance via le consulat marocain du pays d'origine,
        mais ça ajoute de la complexité.
      </P>
      <H3>Le temps passé en interne</H3>
      <P>
        Un dossier TAECHIR complet, c'est entre <strong>4 et 12 heures de travail</strong> pour
        un chargé RH. Pour un premier dossier sans expérience, doublez. À 50-100 Dhs de l'heure,
        ça fait <strong>200 à 1 200 Dhs</strong> de coût interne. Ça paraît rien, mais quand
        votre RH passe 2 jours sur un dossier au lieu de faire son vrai boulot, ça se sent.
      </P>

      <Divider />

      <H2>Le tableau qui résume tout</H2>
      <Table
        rows={[
          ['Poste de coût', 'Profil standard', 'Profil rare (A1/A2)', 'Dispensé (CFC, etc.)'],
          ['ANAPEC TTC', '6 000 Dhs', '1 800 Dhs', '0 Dhs'],
          ['Légalisation contrat', '150–400 Dhs', '150–400 Dhs', '150–400 Dhs'],
          ['Traductions', '700–3 000 Dhs', '700–3 000 Dhs', '700–3 000 Dhs'],
          ['Apostille diplômes', '100–400 Dhs', '100–400 Dhs', '100–400 Dhs'],
          ['Carte de séjour DGSN', '500–1 000 Dhs', '500–1 000 Dhs', '500–1 000 Dhs'],
          ['Temps interne', '500–1 200 Dhs', '300–800 Dhs', '200–500 Dhs'],
          ['TOTAL (hors voyage)', '7 950–12 000 Dhs', '3 550–6 600 Dhs', '1 650–5 300 Dhs'],
        ]}
      />
      <P>
        Si vous prenez un avocat ou un cabinet spécialisé en immigration d'entreprise,
        ajoutez <strong>3 000 à 8 000 Dhs</strong> d'honoraires. Pour un premier recrutement,
        ça peut valoir le coup — ça évite les erreurs qui coûtent encore plus cher.
      </P>

      <H2>Ce que personne ne vous dit : les coûts récurrents</H2>
      <H3>La carte de séjour, c'est chaque année</H3>
      <P>
        500 à 1 000 Dhs de frais DGSN par an, plus une visite médicale les premières années.
        Sur 3 ans, c'est 1 500 à 3 000 Dhs juste pour la carte de séjour.
      </P>
      <H3>Le renouvellement du visa aussi</H3>
      <P>
        Le contrat TAECHIR est généralement d'un an. Chaque renouvellement = 1 500 Dhs ANAPEC
        + légalisation du nouveau contrat + temps interne. C'est un poste récurrent tant que
        le salarié est chez vous.
      </P>
      <H3>Le coût invisible du délai</H3>
      <P>
        20 jours ouvrables d'attente ANAPEC pour un profil standard, c'est un mois
        calendaire où le poste reste vide. Si le profil vous rapporte 50 000 Dhs par mois,
        c'est 50 000 Dhs de manque à gagner. Ça n'apparaît sur aucune facture, mais c'est
        bien réel. Raison de plus pour vérifier si votre profil peut passer en A1/A2.
      </P>

      <H2>Comment dépenser moins</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Regroupez vos recrutements.</strong> Le 2e dossier ANAPEC pour le même
          métier dans l'année ne coûte que 1 500 Dhs au lieu de 5 000. Si vous recrutez
          3 développeurs étrangers en 2026, faites-les passer dans la même année civile.
        </li>
        <li>
          <strong>Lancez les traductions et légalisations en avance.</strong> Demandez au
          candidat de faire apostiller ses diplômes dès l'entretien, avant même la décision
          finale. Si ça ne marche pas, c'est juste une apostille de perdue. Si ça marche,
          vous gagnez 3 semaines.
        </li>
        <li>
          <strong>Vérifiez les listes A1/A2 avant de payer.</strong> La différence entre
          un profil standard et un profil rare, c'est 3 500 Dhs et 18 jours. Un coup de
          fil à l'ANAPEC pour vérifier ne coûte rien.
        </li>
        <li>
          <strong>Préparez un "kit entreprise" réutilisable.</strong> Vos statuts, votre RC,
          votre ICE, votre attestation CNSS — c'est les mêmes pour chaque dossier. Gardez
          un dossier prêt à l'emploi, à jour, pour ne pas refaire le travail à chaque fois.
        </li>
      </ul>
      <Tip>
        Si vous recrutez 3 étrangers ou plus par an, investissez dans un prestataire
        spécialisé ou formez quelqu'un en interne. Le temps gagné et les erreurs évitées
        remboursent l'investissement dès le 2e ou 3e dossier. J'ai vu des boîtes de BPO
        à Casablanca passer de 6 semaines par dossier à 2 semaines juste en ayant une
        personne dédiée qui connaît la procédure.
      </Tip>
    </>
  );
}


/* ─── Article registry ───────────────────────────────────────────────────── */

/* ─── Article 12 — Assurance santé expatrié (affiliation) ───────────────── */

function Article12Content() {
  return (
    <>
      <Lead>
        Vous venez de décrocher un contrat au Maroc, ou vous y faites venir un salarié étranger,
        et la question de la couverture santé revient toujours au même moment : la CNSS suffit-elle,
        ou faut-il une assurance privée ? Je vais être direct avec vous — pour un expatrié,
        la réponse est presque toujours « les deux ».
      </Lead>
      <AffDisclosure />

      <H2>La CNSS, c'est bien, mais ce n'est pas suffisant</H2>
      <P>
        Dès qu'un salarié étranger a son visa de travail, il est déclaré à la CNSS comme n'importe
        quel salarié marocain. Bonne nouvelle : il a accès à l'AMO (assurance maladie obligatoire).
        Mauvaise nouvelle : l'AMO rembourse sur la base de tarifs de référence souvent très en
        dessous du coût réel dans les cliniques privées où vont la plupart des expatriés.
      </P>
      <P>
        Concrètement, une consultation chez un spécialiste à Casablanca, une hospitalisation dans
        une clinique privée, des soins dentaires ou une évacuation sanitaire : l'AMO ne couvre
        qu'une fraction, parfois 20 à 40 % de la facture réelle. Le reste est à votre charge.
      </P>
      <Info>
        L'erreur classique : croire que la carte CNSS du salarié couvre aussi sa famille restée
        à l'étranger ou ses soins hors du Maroc. Ce n'est pas le cas. Pour une couverture
        internationale, il faut une assurance santé dédiée.
      </Info>

      <H2>Assurance locale ou assurance internationale ?</H2>
      <P>
        Deux familles de produits existent, et le bon choix dépend vraiment de votre profil.
      </P>
      <Table
        rows={[
          ['Critère', 'Assurance locale (Maroc)', 'Assurance internationale'],
          ['Prix', 'Plus économique', 'Plus élevé'],
          ['Soins hors Maroc', 'Limités ou exclus', 'Couverts (selon zone)'],
          ['Rapatriement', 'Souvent en option', 'Généralement inclus'],
          ['Famille restée au pays', 'Non', 'Oui (formules famille)'],
          ['Idéal pour', 'Expatrié installé durablement', 'Cadre mobile, dirigeant, famille'],
        ]}
      />
      <P>
        Si vous restez au Maroc plusieurs années et que votre vie est ici, une bonne complémentaire
        locale par-dessus la CNSS peut suffire. Si vous voyagez beaucoup, si votre famille est
        répartie sur plusieurs pays, ou si vous voulez pouvoir vous faire soigner en Europe,
        l'assurance santé internationale est plus adaptée.
      </P>

      <AffiliateBox
        title="Comparer les assurances santé internationales pour le Maroc"
        cta="Obtenir un devis gratuit"
        href={affiliates.assuranceExpat.url}
      >
        <p>
          Des assureurs spécialisés expatriés comme <strong>{affiliates.assuranceExpat.partner}</strong>{' '}
          proposent des formules modulables (Maroc seul, Afrique, monde entier), avec ou sans
          rapatriement, et la possibilité d'inclure le conjoint et les enfants. Le devis est
          gratuit et sans engagement — c'est le meilleur moyen de comparer avant de signer.
        </p>
      </AffiliateBox>

      <H2>Ce qu'il faut vérifier avant de signer</H2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>La zone de couverture.</strong> « Monde sauf USA » est souvent bien moins cher que « Monde entier » — inutile de payer pour les États-Unis si vous n'y allez jamais.</li>
        <li><strong>Le rapatriement sanitaire.</strong> Vérifiez qu'il est inclus, pas en option payante.</li>
        <li><strong>Les délais de carence.</strong> Certains soins (maternité, dentaire) ne sont couverts qu'après plusieurs mois.</li>
        <li><strong>Le tiers payant.</strong> Pouvez-vous être soigné sans avancer les frais, ou faut-il payer puis se faire rembourser ?</li>
      </ul>
      <Tip>
        Pour un salarié que vous recrutez, proposer une assurance santé internationale est un
        vrai argument d'attractivité. Beaucoup d'entreprises l'intègrent au package — c'est
        déductible et ça fait souvent la différence pour convaincre un profil rare.
      </Tip>

      <FAQ
        items={[
          { q: 'Un salarié étranger a-t-il droit à la CNSS au Maroc ?', a: 'Oui. Dès la date du visa de travail, il est déclaré à la CNSS et bénéficie de l\'AMO comme tout salarié. Mais les remboursements restent partiels, d\'où l\'intérêt d\'une couverture complémentaire.' },
          { q: 'Une assurance internationale est-elle obligatoire ?', a: 'Non, elle n\'est pas obligatoire légalement. Elle est fortement recommandée pour les soins à l\'étranger, le rapatriement et la couverture de la famille.' },
          { q: 'Peut-on couvrir sa famille restée dans le pays d\'origine ?', a: 'Avec une assurance internationale famille, oui. Les formules locales marocaines, non.' },
        ]}
      />
    </>
  );
}

/* ─── Article 13 — Compte bancaire étranger (affiliation) ───────────────── */

function Article13Content() {
  return (
    <>
      <Lead>
        Recevoir son salaire, payer son loyer, mettre en place des prélèvements : sans compte
        bancaire marocain, la vie d'un salarié étranger se complique vite. La bonne nouvelle,
        c'est que c'est faisable. La moins bonne, c'est qu'il y a deux statuts bien différents
        et qu'on se trompe souvent au début.
      </Lead>
      <AffDisclosure />

      <H2>Compte en dirhams convertibles ou compte « résident » ?</H2>
      <P>
        C'est LE point que personne ne vous explique clairement. Au Maroc, un étranger peut ouvrir :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Un compte en dirhams convertibles</strong> tant qu'il n'est pas considéré comme résident. Il permet de rapatrier librement des fonds depuis l'étranger et de les reconvertir en devises à la sortie.</li>
        <li><strong>Un compte en dirhams « résident »</strong> une fois installé durablement (généralement dès qu'on travaille et qu'on a sa carte de séjour). C'est le compte classique sur lequel tombe le salaire.</li>
      </ul>
      <Warning>
        L'erreur fréquente : verser un salaire marocain sur un compte convertible, ou vouloir
        transférer librement vers l'étranger depuis un compte résident. L'Office des Changes
        encadre strictement ces mouvements. Posez la question à votre banque dès l'ouverture.
      </Warning>

      <H2>Les documents qu'on vous demandera</H2>
      <P>
        D'une banque à l'autre ça varie un peu, mais préparez au minimum :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Passeport en cours de validité</li>
        <li>Carte de séjour (ou récépissé de demande) pour un compte résident</li>
        <li>Contrat de travail visé / attestation de l'employeur</li>
        <li>Justificatif de domicile au Maroc (bail, facture, attestation d'hébergement)</li>
      </ul>
      <Tip>
        Si vous venez tout juste d'arriver et que vous n'avez pas encore la carte de séjour,
        certaines banques ouvrent un compte convertible en attendant, puis le basculent en
        compte résident une fois la carte obtenue. Demandez cette bascule pour ne pas avoir
        à tout recommencer.
      </Tip>

      <H2>En attendant : un compte multi-devises pour ne pas être bloqué</H2>
      <P>
        Entre l'arrivée et l'ouverture du compte local, il s'écoule souvent plusieurs semaines.
        Pendant cette période, un compte multi-devises en ligne permet de recevoir des fonds,
        d'avoir une carte utilisable immédiatement et de changer des devises à un taux bien plus
        juste que les bureaux de change.
      </P>

      <AffiliateBox
        title="Une carte multi-devises utilisable dès l'arrivée au Maroc"
        cta="Découvrir le compte"
        href={affiliates.banqueMulti.url}
      >
        <p>
          <strong>{affiliates.banqueMulti.partner}</strong> permet d'ouvrir un compte en quelques
          minutes, de détenir plusieurs devises (EUR, USD, MAD à l'usage) et de payer au taux réel
          du marché, sans les marges de change des banques classiques. Pratique le temps que votre
          compte marocain soit opérationnel.
        </p>
      </AffiliateBox>

      <FAQ
        items={[
          { q: 'Un étranger peut-il ouvrir un compte bancaire au Maroc sans carte de séjour ?', a: 'Oui, généralement un compte en dirhams convertibles, qui sera ensuite basculé en compte résident une fois la carte de séjour obtenue.' },
          { q: 'Peut-on transférer son salaire marocain vers l\'étranger ?', a: 'Les transferts depuis un compte résident sont encadrés par l\'Office des Changes. Une partie du revenu peut être transférée sous conditions ; renseignez-vous auprès de votre banque.' },
          { q: 'Quelle banque choisir ?', a: 'Les grandes banques marocaines ont toutes des offres pour étrangers. Comparez surtout les frais de tenue de compte, les frais à l\'international et la qualité du service en agence.' },
        ]}
      />
    </>
  );
}

/* ─── Article 14 — Transfert d'argent (affiliation) ─────────────────────── */

function Article14Content() {
  return (
    <>
      <Lead>
        Envoyer de l'argent vers le Maroc, ou en envoyer depuis le Maroc vers sa famille à
        l'étranger : c'est une opération qu'on fait souvent, et où l'on perd beaucoup d'argent
        sans s'en rendre compte. Le coût, ce n'est presque jamais les « frais affichés » —
        c'est le taux de change.
      </Lead>
      <AffDisclosure />

      <H2>Le vrai coût d'un transfert, c'est le taux de change caché</H2>
      <P>
        La plupart des services affichent « 0 € de frais » ou « 1,99 € de commission » — et vous
        croyez payer presque rien. En réalité, ils se rémunèrent sur la marge de change : ils vous
        appliquent un taux moins avantageux que le taux réel du marché. Sur 1 000 €, cette marge
        cachée peut représenter 30 à 50 € qui disparaissent silencieusement.
      </P>
      <Info>
        La règle d'or : comparez toujours le <strong>montant final reçu</strong>, pas les frais
        affichés. C'est le seul chiffre qui compte. Deux services peuvent annoncer « sans frais »
        et pourtant l'un vous fait recevoir nettement plus que l'autre.
      </Info>

      <H2>Les différentes options, du plus cher au moins cher</H2>
      <Table
        rows={[
          ['Méthode', 'Vitesse', 'Coût réel'],
          ['Virement bancaire international classique', 'Lent (2-5 j)', 'Élevé (frais + marge de change)'],
          ['Bureaux de transfert physiques', 'Rapide', 'Élevé (marge importante)'],
          ['Services de transfert en ligne', 'Rapide', 'Faible (taux proche du réel)'],
        ]}
      />
      <P>
        Pour les transferts récurrents — un expatrié qui aide sa famille, ou une entreprise qui
        verse des honoraires à l'étranger — les services en ligne spécialisés sont presque
        toujours les plus avantageux, parce qu'ils appliquent le taux interbancaire réel et
        facturent une commission transparente.
      </P>

      <AffiliateBox
        title="Transférer au taux réel, sans marge cachée"
        cta="Comparer le montant reçu"
        href={affiliates.transfert.url}
      >
        <p>
          <strong>{affiliates.transfert.partner}</strong> applique le taux de change réel du marché
          (le même que celui que vous voyez sur Google) et affiche une commission claire avant
          l'envoi. Vous voyez exactement combien le destinataire recevra. Faites une simulation
          et comparez avec votre banque : l'écart surprend souvent.
        </p>
      </AffiliateBox>

      <Warning>
        Attention à la réglementation des changes : depuis le Maroc, les transferts de dirhams vers
        l'étranger sont encadrés par l'Office des Changes et soumis à des plafonds. Les transferts
        <em> vers </em> le Maroc, en revanche, sont libres.
      </Warning>

      <FAQ
        items={[
          { q: 'Quel est le moyen le moins cher pour envoyer de l\'argent au Maroc ?', a: 'En général les services de transfert en ligne qui appliquent le taux de change réel, car l\'essentiel du coût se cache dans la marge de change, pas dans les frais affichés.' },
          { q: 'Peut-on envoyer de l\'argent depuis le Maroc vers l\'étranger ?', a: 'Oui, mais c\'est encadré par l\'Office des Changes avec des plafonds selon le motif (études, soins, voyage, etc.). Les transferts entrants vers le Maroc sont libres.' },
          { q: 'Comment comparer deux services ?', a: 'Regardez uniquement le montant final reçu par le destinataire pour une même somme envoyée. C\'est le seul indicateur fiable.' },
        ]}
      />
    </>
  );
}

/* ─── Article 15 — Domiciliation d'entreprise (lead-gen) ────────────────── */

function Article15Content() {
  return (
    <>
      <Lead>
        Vous voulez créer ou implanter une société au Maroc mais vous n'avez pas (encore) de
        bureau ? La domiciliation est la solution la plus simple et la plus économique pour
        démarrer avec une adresse professionnelle légale. Voici comment ça marche, et combien
        ça coûte réellement en 2026.
      </Lead>

      <H2>La domiciliation, c'est quoi exactement ?</H2>
      <P>
        Domicilier son entreprise, c'est utiliser l'adresse d'un prestataire agréé comme siège
        social, sans y louer de bureau physique. C'est parfaitement légal et très courant pour
        les sociétés qui démarrent, les filiales étrangères ou les activités de conseil qui
        n'ont pas besoin de locaux.
      </P>
      <Info>
        Depuis la loi 89-17, l'activité de domiciliation est réglementée : le domiciliataire doit
        être inscrit sur un registre spécial et tenir un répertoire des sociétés domiciliées.
        Vérifiez toujours que votre prestataire est en règle — sinon votre siège social peut
        être contesté.
      </Info>

      <H2>Combien ça coûte ?</H2>
      <Table
        rows={[
          ['Formule', 'Inclus', 'Prix indicatif / mois'],
          ['Domiciliation simple', 'Adresse + réception courrier', '200 – 500 Dhs'],
          ['Domiciliation + secrétariat', 'Courrier + appels + scan', '500 – 1 200 Dhs'],
          ['Bureau partagé / coworking', 'Adresse + poste de travail', '1 500 – 3 500 Dhs'],
        ]}
      />
      <P>
        À comparer avec un bail commercial classique à Casablanca ou Rabat, où le moindre
        plateau dépasse vite plusieurs milliers de dirhams par mois, sans compter la caution
        et les charges. Pour une société qui démarre, la domiciliation divise les coûts fixes
        par dix.
      </P>

      <H2>Domiciliation et recrutement de salariés étrangers</H2>
      <P>
        Un point que beaucoup d'entrepreneurs étrangers négligent : pour recruter via TAECHIR,
        votre société doit être <strong>en règle administrativement</strong> — registre de
        commerce, modèle 7, déclarations CNSS à jour. Une domiciliation propre et un prestataire
        sérieux facilitent grandement ces démarches, car c'est lui qui réceptionne et trie tout
        votre courrier officiel (Ministère, CNSS, impôts).
      </P>

      <LeadBox
        title="Besoin d'être mis en relation avec un domiciliataire fiable ?"
        cta="Demander une recommandation"
      >
        <p>
          Nous pouvons vous orienter vers des prestataires de domiciliation agréés à Casablanca,
          Rabat et Tanger, et vous aider à articuler création de société et recrutement de
          salariés étrangers. Décrivez votre projet, nous vous recontactons rapidement.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'La domiciliation est-elle légale au Maroc ?', a: 'Oui, elle est encadrée par la loi 89-17. Le domiciliataire doit être agréé et tenir un registre des sociétés domiciliées.' },
          { q: 'Peut-on recruter un salarié étranger avec une société domiciliée ?', a: 'Oui, à condition que la société soit régulièrement immatriculée et à jour de ses obligations (CNSS, registre de commerce). La domiciliation n\'est pas un obstacle au recrutement via TAECHIR.' },
          { q: 'Combien de temps pour mettre en place une domiciliation ?', a: 'Quelques jours en général : signature du contrat de domiciliation, puis utilisation de l\'adresse pour l\'immatriculation ou le transfert de siège.' },
        ]}
      />
    </>
  );
}

/* ─── Article 16 — Casablanca Finance City (lead-gen) ───────────────────── */

function Article16Content() {
  return (
    <>
      <Lead>
        Casablanca Finance City (CFC) est sans doute le statut le plus avantageux pour une
        entreprise internationale qui s'implante au Maroc — y compris quand il s'agit de recruter
        des cadres étrangers. Voici à quoi vous avez droit, qui peut en bénéficier, et le lien
        souvent méconnu avec la procédure TAECHIR.
      </Lead>

      <H2>CFC, c'est quoi ?</H2>
      <P>
        CFC est un hub financier et de services qui octroie un statut spécial aux entreprises
        tournées vers l'international : sièges régionaux, sociétés de services, holdings, fintechs,
        etc. L'idée : faire de Casablanca une porte d'entrée vers l'Afrique pour les groupes
        internationaux.
      </P>

      <H2>Les avantages concrets</H2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Fiscalité attractive</strong> sur les bénéfices à l'export et un régime avantageux pour les salariés.</li>
        <li><strong>Facilités de change</strong> pour les opérations internationales.</li>
        <li><strong>Guichet facilité</strong> pour l'installation et les démarches administratives.</li>
        <li><strong>Recrutement international simplifié</strong> — et c'est le point qui nous intéresse le plus ici.</li>
      </ul>

      <H2>CFC et recrutement d'étrangers : la dispense ANAPEC</H2>
      <P>
        Voici l'élément clé que beaucoup ignorent : le personnel étranger d'une entreprise
        titulaire du statut CFC bénéficie généralement d'une <strong>dispense de l'attestation
        ANAPEC</strong>. Autrement dit, on saute l'étape la plus longue et la plus coûteuse de la
        procédure (les fameux 20 jours et 5 000 Dhs).
      </P>
      <Info>
        Concrètement, pour un cadre étranger recruté par une société CFC, le dossier TAECHIR se
        monte directement, sans passer par l'annonce ANAPEC. Le gain de temps est considérable —
        souvent plusieurs semaines.
      </Info>
      <Warning>
        Attention : la dispense découle du statut CFC de l'entreprise et des justificatifs à
        fournir au Ministère. Elle n'est pas automatique « parce qu'on est à Casablanca » —
        il faut bien produire les pièces prouvant l'éligibilité.
      </Warning>

      <H2>Qui peut prétendre au statut ?</H2>
      <P>
        Les entreprises à vocation régionale ou internationale dans la finance, les services aux
        entreprises, les holdings et certaines activités de support. L'éligibilité s'apprécie au
        cas par cas selon l'activité, la substance et l'orientation à l'export.
      </P>

      <LeadBox
        title="Vérifier votre éligibilité CFC et son impact sur vos recrutements"
        cta="Être recontacté"
      >
        <p>
          Le statut CFC peut transformer votre fiscalité et simplifier radicalement vos
          recrutements internationaux. Nous pouvons vous mettre en relation avec des conseils
          spécialisés pour évaluer votre éligibilité et structurer votre implantation. Parlez-nous
          de votre projet.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Le statut CFC dispense-t-il de l\'ANAPEC ?', a: 'Oui, le personnel étranger d\'une entreprise CFC bénéficie généralement d\'une dispense de l\'attestation ANAPEC, ce qui accélère fortement la procédure TAECHIR.' },
          { q: 'Quelles entreprises peuvent obtenir le statut CFC ?', a: 'Les sociétés à vocation régionale ou internationale (finance, services aux entreprises, holdings, sièges régionaux). L\'éligibilité dépend de l\'activité et de l\'orientation à l\'export.' },
          { q: 'Le statut CFC est-il réservé à Casablanca ?', a: 'Le statut est délivré dans le cadre de la place financière de Casablanca, mais il concerne l\'orientation de l\'activité plus que l\'implantation physique exacte.' },
        ]}
      />
    </>
  );
}

/* ─── Article 17 — Cabinet RH vs direct (lead-gen) ──────────────────────── */

function Article17Content() {
  return (
    <>
      <Lead>
        Faut-il monter soi-même son dossier TAECHIR ou passer par un cabinet spécialisé ? J'ai vu
        les deux approches réussir — et échouer. La vraie réponse dépend de votre temps, de votre
        tolérance au risque administratif et du profil que vous recrutez. Faisons le point
        honnêtement.
      </Lead>

      <H2>Faire en direct : pour qui ?</H2>
      <P>
        Si vous avez déjà recruté des étrangers, que votre société est parfaitement en règle et
        que vous avez quelqu'un en interne qui maîtrise les démarches, faire en direct vous fait
        économiser des honoraires. C'est tout à fait jouable pour un profil standard, sans
        urgence particulière.
      </P>
      <P>Les points de friction quand on fait seul :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Le passage ANAPEC, chronophage et parfois déroutant la première fois</li>
        <li>La légalisation et la traduction assermentée des diplômes étrangers</li>
        <li>Les allers-retours au guichet régional du Ministère</li>
        <li>La synchronisation visa de travail / carte de séjour / CNSS</li>
      </ul>

      <H2>Passer par un cabinet : pour qui ?</H2>
      <P>
        Un cabinet (RH, juridique ou spécialisé mobilité internationale) prend du sens quand :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>C'est votre <strong>premier recrutement</strong> d'étranger et vous ne voulez pas tâtonner</li>
        <li>Le poste est <strong>urgent</strong> et chaque semaine perdue coûte cher</li>
        <li>Vous recrutez <strong>plusieurs profils</strong> et voulez industrialiser le process</li>
        <li>Le dossier est <strong>complexe</strong> : nationalité sensible, diplômes difficiles à légaliser, situation particulière</li>
      </ul>

      <H2>Combien ça coûte, et est-ce rentable ?</H2>
      <Table
        rows={[
          ['Approche', 'Coût indicatif', 'Quand c\'est rentable'],
          ['En direct', 'Frais officiels seuls', 'Profil standard, équipe rodée, pas d\'urgence'],
          ['Cabinet (à la mission)', '8 000 – 25 000 Dhs / dossier', 'Premier dossier, urgence, profil complexe'],
        ]}
      />
      <P>
        Le calcul est simple : si un retard de 3 semaines vous fait perdre un candidat rare ou
        décale un projet, les honoraires d'un cabinet sont vite amortis. Pour du volume ou du
        récurrent, beaucoup négocient un forfait au dossier.
      </P>
      <Tip>
        Quel que soit votre choix, commencez par vérifier que votre société est à jour (CNSS,
        modèle 7). C'est la première chose qu'un bon cabinet contrôlera — autant gagner du temps.
      </Tip>

      <LeadBox
        title="Vous voulez un accompagnement pour votre dossier TAECHIR ?"
        cta="Demander à être mis en relation"
      >
        <p>
          Selon votre situation, nous pouvons vous orienter vers des cabinets RH et juridiques
          fiables, habitués aux dossiers de recrutement étranger au Maroc. Décrivez votre besoin
          (profil, nationalité, délai) et nous vous mettons en relation avec le bon interlocuteur.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Est-il obligatoire de passer par un cabinet pour TAECHIR ?', a: 'Non, une entreprise peut monter son dossier elle-même. Le recours à un cabinet est un choix de confort, de rapidité et de sécurité, surtout pour un premier dossier ou un cas complexe.' },
          { q: 'Combien coûte l\'accompagnement d\'un cabinet ?', a: 'Selon la complexité et la région, comptez généralement de 8 000 à 25 000 Dhs par dossier, parfois en forfait dégressif pour plusieurs recrutements.' },
          { q: 'Un cabinet peut-il accélérer la procédure ?', a: 'Il ne raccourcit pas les délais légaux, mais il évite les erreurs et les allers-retours qui, eux, font perdre des semaines. Sur un profil rare ou dispensé d\'ANAPEC, le gain est réel.' },
        ]}
      />
    </>
  );
}

/* ─── Article 18 ─────────────────────────────────────────────────────────── */

function Article18Content() {
  return (
    <>
      <Lead>
        Un dossier TAECHIR qui revient refusé, c'est un coup dur — surtout quand le candidat
        attend et que le poste reste vacant. Mais dans la grande majorité des cas que j'ai vus,
        un refus n'est pas une impasse : c'est un dossier à corriger, ou un motif à contester.
        Voici comment identifier ce qui a coincé et ce qu'on peut vraiment faire ensuite.
      </Lead>

      <H2>D'abord, comprendre où le refus s'est produit</H2>
      <P>
        « Mon dossier TAECHIR est refusé » recouvre en réalité deux situations très différentes,
        et la marche à suivre n'est pas la même. Le blocage peut venir de l'ANAPEC, en amont,
        ou du guichet du Ministère du Travail, en aval. La première chose à faire est de
        déterminer précisément à quelle étape ça s'est arrêté.
      </P>
      <Info>
        Le réflexe à avoir : demandez systématiquement le motif par écrit, même s'il vous a été
        donné oralement au guichet. Sans motif clair et daté, impossible de savoir si on corrige
        et redépose, ou si on conteste.
      </Info>

      <H2>Refus côté ANAPEC : les cas les plus fréquents</H2>
      <Table
        rows={[
          ['Motif', 'Ce qui se passe', 'Solution la plus courante'],
          ['Candidat marocain jugé apte trouvé', 'L\'annonce a fait remonter un profil compatible', 'Entretien obligatoire ; si le poste reste non pourvu, possibilité de relancer'],
          ['Mauvaise catégorie choisie', 'Profil déclaré rare (A1/A2) mais requalifié en standard', 'Redépôt en catégorie standard, délai ANAPEC repart à 20 jours'],
          ['Intitulé de poste flou', 'Le poste ne correspond à aucun métier reconnu de la nomenclature', 'Reformuler le poste avec un intitulé et des missions clairement identifiables'],
          ['Annonce mal diffusée ou incomplète', 'Vice de forme sur la publication du poste', 'Nouvelle annonce, généralement sans repartir de zéro sur les frais déjà réglés'],
        ]}
      />
      <P>
        Le cas le plus mal vécu reste le premier : un candidat marocain « apte » a été identifié
        pendant les 20 jours d'annonce. J'ai accompagné une PME à Salé qui recrutait un chef de
        chantier tunisien — deux candidatures marocaines sont arrivées la dernière semaine. La loi
        oblige à recevoir ces candidats en entretien. Ça ne veut pas dire que le recrutement de
        l'étranger tombe automatiquement à l'eau : si le profil marocain ne correspond finalement
        pas au poste (expérience, disponibilité, prétentions), le dossier peut repartir avec les
        justificatifs de ces entretiens.
      </P>

      <H2>Refus ou blocage côté Ministère du Travail</H2>
      <P>
        Une fois l'attestation ANAPEC en poche, le dossier peut encore être bloqué au guichet
        régional — ce n'est pas toujours un « refus » formel, souvent c'est un rejet provisoire
        pour pièce manquante ou incohérence.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Entreprise non à jour CNSS ou modèle 7.</strong> Le motif de blocage le plus courant, et le plus facile à anticiper.</li>
        <li><strong>Documents non légalisés ou traduction manquante.</strong> Diplômes, casier judiciaire, certificats de travail — un document non conforme suffit à faire échouer le dépôt.</li>
        <li><strong>Incohérence contrat / attestation ANAPEC.</strong> Le poste, le salaire ou la durée déclarés sur TAECHIR ne correspondent pas exactement à ce qui a été validé par l'ANAPEC.</li>
        <li><strong>Salaire jugé non conforme.</strong> Un salaire trop proche du SMIG pour un poste qualifié fait parfois l'objet d'une demande de justification.</li>
      </ul>
      <Warning>
        Un rejet provisoire pour pièce manquante n'est pas un refus définitif — mais si vous ne
        redéposez pas dans un délai raisonnable, le dossier est classé sans suite et il faut
        recommencer depuis le dépôt physique, parfois même reprendre l'attestation ANAPEC
        si elle a expiré entre-temps.
      </Warning>

      <H2>Les voies de recours quand le désaccord persiste</H2>
      <P>
        Si vous estimez que le refus n'est pas justifié — un motif contestable, une erreur
        d'appréciation de l'administration — deux voies existent, à ne pas confondre.
      </P>
      <Table
        rows={[
          ['Voie de recours', 'À qui s\'adresser', 'Délai à connaître'],
          ['Recours gracieux (hiérarchique)', 'Courrier motivé à la direction régionale, puis au Ministère du Travail', 'Pas de délai légal strict, mais à faire rapidement pendant que le dossier est « chaud »'],
          ['Recours contentieux', 'Tribunal administratif compétent', 'Le silence de l\'administration pendant 60 jours vaut décision implicite de rejet ; le recours doit ensuite être introduit dans les 60 jours'],
        ]}
      />
      <P>
        Dans la pratique, le recours gracieux — une simple lettre bien argumentée, avec les
        pièces justificatives — règle la grande majorité des situations, surtout quand le motif
        du refus repose sur une pièce mal interprétée ou un malentendu administratif. Le recours
        contentieux devant le tribunal administratif reste l'exception : on y a recours quand
        l'entreprise est certaine d'être dans son bon droit et que le dialogue avec l'administration
        n'a rien donné.
      </P>
      <Tip>
        Gardez une trace écrite de tout : accusé de dépôt, courrier de refus, échanges avec le
        guichet. En cas de recours, c'est ce dossier de preuves qui fait la différence — pas
        seulement l'argument oral.
      </Tip>

      <H2>Combien de temps un refus fait-il vraiment perdre ?</H2>
      <Table
        rows={[
          ['Situation', 'Retard estimé', 'Repartir de zéro ?'],
          ['Pièce manquante, redépôt rapide', '1 à 2 semaines', 'Non — complément de dossier'],
          ['Requalification de catégorie ANAPEC', '3 à 4 semaines', 'Partiellement — nouvelle annonce si standard'],
          ['Candidat marocain à recevoir en entretien', '2 à 3 semaines', 'Non, sauf si le poste est finalement pourvu localement'],
          ['Recours gracieux abouti', '3 à 6 semaines', 'Non'],
          ['Recours contentieux', 'Plusieurs mois', 'Dépend de la décision du tribunal'],
        ]}
      />
      <P>
        Dans l'immense majorité des dossiers que j'ai vus refusés, la cause était une pièce
        manquante ou une incohérence facilement corrigible — pas un vrai désaccord de fond.
        Avant d'envisager un recours, il vaut presque toujours la peine de vérifier une dernière
        fois chaque document, chaque champ du formulaire TAECHIR, et de redéposer proprement.
      </P>

      <LeadBox
        title="Un dossier TAECHIR refusé et vous ne savez pas comment réagir ?"
        cta="Demander un avis sur mon dossier"
      >
        <p>
          Décrivez-nous le motif de refus reçu (ANAPEC ou Ministère) et nous pouvons vous
          orienter vers la bonne démarche : correction et redépôt, recours gracieux, ou mise
          en relation avec un cabinet juridique pour un recours contentieux si nécessaire.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Peut-on redéposer un dossier TAECHIR après un refus ?', a: 'Oui, dans la grande majorité des cas. Un dossier corrigé (pièce ajoutée, catégorie rectifiée, poste reformulé) peut être redéposé sans repartir totalement de zéro, sauf si l\'attestation ANAPEC a expiré entre-temps.' },
          { q: 'Un refus ANAPEC empêche-t-il définitivement le recrutement de l\'étranger ?', a: 'Non. Même si un candidat marocain est identifié pendant l\'annonce, l\'entreprise doit simplement le recevoir en entretien. Si ce profil ne correspond pas réellement au poste, le recrutement de l\'étranger peut se poursuivre avec les justificatifs de cet entretien.' },
          { q: 'Quel délai pour contester un refus du Ministère du Travail ?', a: 'Le silence de l\'administration pendant 60 jours vaut rejet implicite. Un recours contentieux devant le tribunal administratif doit ensuite être introduit dans un délai de 60 jours à compter de cette décision implicite ou du refus explicite notifié.' },
          { q: 'Faut-il un avocat pour contester un refus TAECHIR ?', a: 'Pour un recours gracieux (courrier à l\'administration), non, ce n\'est pas nécessaire. Pour un recours contentieux devant le tribunal administratif, l\'accompagnement par un avocat ou un cabinet spécialisé est fortement recommandé.' },
        ]}
      />
    </>
  );
}

/* ─── Article 19 — Fiscalité de l'expatrié (lead-gen) ───────────────────── */

function Article19Content() {
  return (
    <>
      <Lead>
        Un salarié étranger qui découvre son premier bulletin de paie marocain a presque
        toujours la même réaction : « Attendez, on m'a prélevé combien, et est-ce que je vais
        aussi être imposé chez moi sur ce même salaire ? » La fiscalité de l'expatrié au Maroc
        n'est pas si compliquée une fois qu'on a compris trois choses : qui est résident fiscal,
        comment se calcule l'impôt sur le salaire, et comment jouer avec les conventions pour
        ne pas payer deux fois.
      </Lead>

      <H2>Résident fiscal ou pas ? La question qui décide de tout</H2>
      <P>
        Toute votre fiscalité marocaine découle de ce statut. Et contrairement à ce que
        beaucoup pensent, ce n'est pas d'abord une question de nombre de jours passés au Maroc.
        La loi marocaine applique une hiérarchie de trois critères, dans cet ordre :
      </P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Le foyer permanent.</strong> Là où se trouve votre logement principal et votre famille.</li>
        <li><strong>Le centre des intérêts économiques.</strong> Là où se trouve l'essentiel de votre activité professionnelle ou de vos investissements.</li>
        <li><strong>La durée de séjour.</strong> Plus de 183 jours, consécutifs ou non, au cours d'une même année civile.</li>
      </ol>
      <P>
        Le troisième critère n'intervient que si les deux premiers ne permettent pas de trancher.
        Concrètement, ça veut dire qu'on peut devenir résident fiscal marocain dès son arrivée,
        avant même d'avoir passé six mois dans le pays.
      </P>
      <Info>
        La conséquence est majeure. Un résident fiscal marocain doit déclarer et payer l'impôt
        sur l'ensemble de ses revenus mondiaux — salaire marocain, mais aussi loyers, dividendes
        ou pension perçus à l'étranger. Un non-résident, lui, n'est imposé au Maroc que sur ses
        revenus de source marocaine.
      </Info>
      <P>
        J'ai eu le cas d'un cadre belge arrivé à Casablanca avec sa femme et ses enfants dès le
        premier mois, logement loué en son nom, enfants scolarisés sur place. Bien qu'il n'ait pas
        encore atteint les 183 jours lors de sa première année, l'administration l'a considéré
        résident fiscal dès son installation, parce que son foyer permanent était déjà au Maroc.
      </P>

      <H2>Comment se calcule l'impôt sur votre salaire marocain</H2>
      <P>
        Pour un salarié, l'impôt sur le revenu (IR) est prélevé directement par l'employeur
        chaque mois — c'est la retenue à la source. Avant d'appliquer le barème, plusieurs
        éléments sont déduits du salaire brut :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Cotisation CNSS</strong> — environ 4,48 %, plafonnée à un salaire de 6 000 Dhs/mois</li>
        <li><strong>Cotisation AMO</strong> — environ 2,26 %, sans plafond</li>
        <li><strong>Frais professionnels forfaitaires</strong> — 35 % du brut (plafonnés à 2 500 Dhs/mois) si le brut est ≤ 6 500 Dhs, sinon 25 % (plafonnés à 2 916,67 Dhs/mois)</li>
        <li><strong>Charges de famille</strong> — 50 Dhs/mois par personne à charge, dans la limite de 300 Dhs/mois (6 personnes)</li>
      </ul>
      <P>
        Ce qui reste après ces déductions, c'est le revenu net imposable. C'est sur ce montant
        qu'on applique le barème progressif — celui en vigueur depuis la réforme 2025-2026 a
        relevé le seuil d'exonération et abaissé le taux marginal :
      </P>
      <Table
        rows={[
          ['Tranche annuelle (RNI)', 'Taux'],
          ['0 – 40 000 Dhs', '0 %'],
          ['40 001 – 60 000 Dhs', '10 %'],
          ['60 001 – 80 000 Dhs', '20 %'],
          ['80 001 – 100 000 Dhs', '30 %'],
          ['100 001 – 180 000 Dhs', '34 %'],
          ['Au-delà de 180 000 Dhs', '37 %'],
        ]}
      />
      <Tip>
        Si votre contrat mentionne un « salaire net garanti » plutôt qu'un salaire brut,
        assurez-vous de bien faire préciser par écrit qui prend en charge la différence si le
        barème ou les cotisations évoluent d'une année sur l'autre. C'est un point qui génère
        des malentendus à la signature.
      </Tip>

      <H2>Salaire déjà imposé ailleurs : le risque de double imposition</H2>
      <P>
        Le Maroc a signé des conventions fiscales bilatérales avec une cinquantaine de pays,
        dont la France, la Belgique, l'Espagne, l'Allemagne et le Canada. Ces conventions
        prévoient un mécanisme — crédit d'impôt ou exonération, selon les textes — pour éviter
        qu'un même revenu soit taxé deux fois.
      </P>
      <Warning>
        Le mécanisme exact varie d'une convention à l'autre, et il ne joue pas automatiquement :
        dans la plupart des cas, il faut le faire valoir vous-même dans votre déclaration, pièces
        justificatives à l'appui. Si le pays d'origine n'a pas de convention avec le Maroc, le
        risque de double imposition est réel.
      </Warning>
      <P>
        Un piège fréquent : un Français installé au Maroc pense que la convention franco-marocaine
        le dispense de toute démarche en France. En réalité, il doit souvent continuer à déclarer
        ses revenus marocains à l'administration fiscale française, ne serait-ce que pour faire
        valoir le crédit d'impôt correspondant à l'IR déjà payé au Maroc. Un client à qui j'avais
        pourtant signalé le point a reçu une relance des impôts français deux ans plus tard pour
        n'avoir rien déclaré.
      </P>

      <H2>Quelques cas particuliers fréquents</H2>
      <H3>Les retraités : l'abattement de 80 % sur la pension</H3>
      <P>
        Si vous percevez une pension de retraite étrangère et que vous la faites rapatrier en
        dirhams via une banque marocaine, la loi marocaine prévoit un abattement de 80 % sur le
        montant imposable. Concrètement, seuls 20 % de la pension entrent dans le calcul de l'IR
        — un avantage que beaucoup de retraités expatriés ignorent la première année.
      </P>
      <H3>Le salarié détaché : généralement imposé dans son pays d'origine</H3>
      <P>
        Si votre salarié reste rémunéré par la maison mère à l'étranger pour une mission
        temporaire au Maroc, la plupart des conventions fiscales prévoient qu'il continue d'être
        imposé dans son pays d'origine — sous conditions de durée de mission et à condition que
        l'employeur marocain ne supporte pas directement la charge de sa rémunération.
      </P>
      <H3>Gérants et actionnaires : salaire et dividendes ne se traitent pas pareil</H3>
      <P>
        Le salaire perçu en tant que gérant suit le barème IR classique. Les dividendes, eux,
        relèvent d'un régime distinct avec une retenue à la source forfaitaire — ne confondez
        pas les deux quand vous établissez votre budget personnel.
      </P>

      <H2>Vos obligations déclaratives concrètes</H2>
      <Table
        rows={[
          ['Situation', 'Obligation', 'Échéance'],
          ['Salaire unique, un seul employeur marocain', 'Aucune déclaration à déposer : la retenue à la source est libératoire', '—'],
          ['Résident avec revenus étrangers ou plusieurs sources', 'Déclaration annuelle du revenu global en ligne (portail SIMPL, tax.gov.ma)', 'Avant le 1er mars'],
          ['Revenus professionnels (régime réel ou simplifié)', 'Déclaration annuelle du revenu global', 'Avant le 1er avril'],
        ]}
      />
      <Warning>
        Ne pas déclarer des revenus étrangers alors que vous êtes résident fiscal marocain
        expose à un redressement avec majorations — l'administration fiscale marocaine échange
        désormais des informations avec de nombreux pays dans le cadre d'accords d'échange
        automatique.
      </Warning>

      <LeadBox
        title="Besoin d'y voir clair sur votre situation fiscale d'expatrié ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Résidence fiscale, double imposition, déclaration de revenus étrangers : chaque
          situation est différente. Décrivez-nous la vôtre et nous pouvons vous orienter vers
          un fiduciaire ou un expert-comptable habitué aux dossiers d'expatriés au Maroc.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Un salarié étranger paie-t-il l\'impôt marocain comme un salarié marocain ?', a: 'Oui. Dès qu\'il perçoit un salaire de source marocaine, le même barème progressif de l\'IR s\'applique, qu\'il soit résident fiscal ou non.' },
          { q: 'Quand devient-on résident fiscal au Maroc ?', a: 'Dès que votre foyer permanent (famille, logement principal) ou le centre de vos intérêts économiques s\'y trouve, ou à défaut dès que vous dépassez 183 jours de séjour dans l\'année civile.' },
          { q: 'Comment éviter de payer l\'impôt deux fois sur le même salaire ?', a: 'Vérifiez si le Maroc a signé une convention fiscale avec votre pays d\'origine et faites valoir le mécanisme de crédit d\'impôt ou d\'exonération qu\'elle prévoit, généralement dans votre propre déclaration.' },
          { q: 'Les retraités étrangers bénéficient-ils d\'un avantage fiscal au Maroc ?', a: 'Oui, un abattement de 80 % s\'applique sur les pensions de retraite étrangères rapatriées en dirhams via une banque marocaine.' },
        ]}
      />
    </>
  );
}

/* ─── Article 20 ─────────────────────────────────────────────────────────── */

function Article20Content() {
  return (
    <>
      <Lead>
        Un recrutement TAECHIR abouti, un salarié étranger installé, sa carte de séjour en poche —
        et puis vient la question qu'on me pose presque à chaque fois : « Et pour faire venir ma
        femme et mes enfants, comment on fait ? » Le regroupement familial au Maroc n'a rien
        d'impossible, mais il obéit à ses propres règles, distinctes de celles du dossier de
        travail. Voici comment ça fonctionne concrètement.
      </Lead>

      <H2>Le principe : une résidence qui ouvre le droit, pas un visa automatique</H2>
      <P>
        Contrairement à certains pays où le regroupement familial est une procédure formalisée
        avec un visa dédié, le Maroc fonctionne différemment. Ce qui compte, c'est le statut du
        salarié étranger : dès qu'il détient sa <strong>carte de séjour</strong> — la même que
        celle obtenue à la DGSN une fois le visa TAECHIR délivré — son conjoint et ses enfants
        mineurs peuvent, à leur tour, demander une carte de séjour au titre de membre de famille
        d'un étranger résident.
      </P>
      <Info>
        Retenez l'ordre logique : d'abord le salarié obtient sa propre carte de séjour, ensuite
        seulement la famille peut engager sa demande. On ne peut pas faire les deux dossiers en
        parallèle dès le premier jour — l'administration veut voir un statut de résident déjà établi.
      </Info>

      <H2>Qui est concerné par le regroupement familial ?</H2>
      <P>
        La notion de « famille » retenue par l'administration marocaine est plus restrictive
        qu'on ne le pense souvent :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Le conjoint marié.</strong> Le mariage doit être légalement établi — un acte de mariage légalisé (et traduit si besoin) suffit, y compris pour un mariage célébré à l'étranger.</li>
        <li><strong>Les enfants mineurs</strong> du couple, ou de l'un des deux conjoints avec justificatif de l'autorité parentale.</li>
        <li><strong>Les enfants majeurs à charge</strong>, dans certains cas — mais c'est apprécié au dossier, avec justificatif de dépendance (études en cours, absence de ressources propres) ; ne comptez pas dessus par défaut.</li>
      </ul>
      <Warning>
        Le concubinage et le partenariat civil ne sont pas reconnus pour le regroupement familial
        au Maroc. J'ai eu le cas d'un couple néerlandais pacsé chez eux mais non marié : la
        compagne n'a pas pu prétendre à une carte de séjour comme conjointe. La seule option
        restante était une demande de carte de séjour à titre personnel, sur un autre fondement
        (activité professionnelle propre, par exemple).
      </Warning>

      <H2>Les conditions à remplir côté salarié résident</H2>
      <P>
        Ce n'est pas parce que vous avez votre carte de séjour que le regroupement est automatique.
        L'administration vérifie trois choses chez le sponsor — c'est-à-dire le salarié déjà résident :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Un logement adapté.</strong> Un bail ou un titre de propriété au nom du résident, avec une surface jugée cohérente avec la taille de la famille.</li>
        <li><strong>Des ressources suffisantes.</strong> Le salaire figurant sur le contrat TAECHIR sert généralement de référence — pas besoin de revenus mirobolants, mais il faut pouvoir montrer que le foyer peut subvenir aux besoins de la famille.</li>
        <li><strong>Une carte de séjour en cours de validité.</strong> Une demande de regroupement déposée avec une carte de séjour sur le point d'expirer se retrouve souvent bloquée en attendant le renouvellement du dossier principal.</li>
      </ul>
      <Tip>
        Un dossier de bail simple, quelques bulletins de salaire et l'attestation de résidence
        suffisent dans la grande majorité des cas. Inutile de monter un dossier financier
        sophistiqué — la préfecture cherche la cohérence, pas la richesse.
      </Tip>

      <H2>La question qui change tout : votre famille a-t-elle besoin d'un visa d'entrée ?</H2>
      <P>
        C'est le point que je vois le plus souvent mal anticipé, et il dépend uniquement de la
        nationalité du conjoint et des enfants — pas de celle du salarié.
      </P>
      <H3>Nationalité dispensée de visa court séjour</H3>
      <P>
        Pour de nombreuses nationalités (plusieurs pays d'Europe, d'Amérique du Nord et certains
        pays arabes et africains), l'entrée au Maroc ne nécessite pas de visa préalable pour un
        séjour touristique. Dans ce cas, la famille entre simplement avec son passeport, puis
        dépose sa demande de carte de séjour une fois sur place — dans les 90 jours suivant
        l'entrée, en pratique.
      </P>
      <H3>Nationalité soumise à visa</H3>
      <P>
        Si la nationalité du conjoint ou des enfants nécessite un visa pour entrer au Maroc, il
        faut le demander au consulat marocain du pays de résidence <strong>avant le départ</strong>,
        en présentant les justificatifs de la relation familiale et de la résidence du salarié
        au Maroc. Une entrée en tourisme puis une régularisation sur place n'est pas la bonne
        méthode dans ce cas — le consulat est l'interlocuteur de départ.
      </P>
      <Warning>
        Un client basé à Fès m'a appelé après avoir fait venir son épouse philippine avec un
        simple billet d'avion, sans anticiper le visa. Elle a été refoulée à l'aéroport
        Mohammed V. Le couple a dû reprendre toute la démarche depuis Manille, consulat par
        consulat, avec plusieurs semaines de retard. Vérifiez systématiquement le régime de
        visa applicable à la nationalité concernée, pas seulement à celle du salarié.
      </Warning>

      <H2>Le dossier à constituer à la préfecture</H2>
      <Table
        rows={[
          ['Document', 'Concerne', 'Point d\'attention'],
          ['Acte de mariage légalisé et traduit', 'Conjoint', 'Apostille ou légalisation consulaire selon le pays'],
          ['Actes de naissance des enfants', 'Enfants mineurs', 'Traduction arabe ou française requise'],
          ['Copie de la carte de séjour du salarié résident', 'Sponsor', 'Doit être en cours de validité'],
          ['Justificatif de logement', 'Foyer', 'Bail ou titre de propriété au nom du résident'],
          ['Justificatifs de ressources', 'Foyer', 'Bulletins de salaire ou attestation employeur'],
          ['Photos d\'identité et copies de passeport', 'Chaque membre', 'Format réglementaire, comme pour toute carte de séjour'],
        ]}
      />
      <P>
        Le dossier se dépose au bureau des étrangers de la préfecture ou du commissariat de
        police dont dépend le domicile de la famille — le même guichet DGSN que celui qui a
        traité la carte de séjour du salarié. Les délais de traitement varient sensiblement
        d'une ville à l'autre : plutôt rapide à Rabat ou à Tanger d'après les retours que je
        reçois, plus long à Casablanca aux périodes de forte affluence.
      </P>

      <H2>Une fois la carte de séjour familiale obtenue</H2>
      <P>
        Le conjoint et les enfants reçoivent une carte de séjour dont la durée est généralement
        alignée sur celle du résident principal — logique, puisqu'elle découle de son statut.
        Si le contrat de travail du salarié est renouvelé, pensez à renouveler dans la foulée
        les cartes de séjour de la famille : elles ne se prolongent pas automatiquement.
      </P>
      <Info>
        La carte de séjour du conjoint ne donne pas automatiquement le droit de travailler.
        Si le conjoint souhaite lui-même occuper un emploi au Maroc, il doit en principe suivre
        sa propre procédure TAECHIR auprès d'un employeur — sauf s'il entre dans une catégorie
        dispensée d'ANAPEC, comme celle des époux de Marocains évoquée pour d'autres situations.
      </Info>

      <H2>La scolarisation des enfants : anticiper le dossier scolaire</H2>
      <P>
        Une fois la famille installée, la scolarisation est souvent l'urgence suivante. Deux
        options principales : les écoles publiques marocaines, ou les établissements de la
        mission française, les écoles américaines et autres écoles internationales, très
        présentes à Casablanca et Rabat.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Les <strong>relevés de notes et bulletins</strong> des années précédentes, légalisés voire traduits, sont demandés par la quasi-totalité des établissements.</li>
        <li>Les <strong>écoles internationales</strong> ont des listes d'attente qui se remplissent des mois à l'avance, en particulier à Casablanca — inscrivez-vous dès que la date d'arrivée est connue, sans attendre la carte de séjour.</li>
        <li>Un <strong>test de niveau ou un entretien</strong> est fréquent, surtout en cours d'année scolaire.</li>
      </ul>
      <Tip>
        Ne bloquez pas l'inscription scolaire en attendant que toutes les cartes de séjour
        soient délivrées. La plupart des établissements acceptent un dossier avec un récépissé
        de dépôt de la demande de titre de séjour en attendant la carte définitive.
      </Tip>

      <Divider />

      <H2>Le calendrier réaliste</H2>
      <Table
        rows={[
          ['Étape', 'Durée estimée', 'Remarque'],
          ['Carte de séjour du salarié déjà obtenue', 'Prérequis', 'Doit être en cours de validité'],
          ['Visa d\'entrée famille (si nationalité soumise)', '1 à 4 semaines', 'Démarche au consulat avant le départ'],
          ['Dépôt du dossier regroupement familial', 'Le jour même ou sur rendez-vous', 'Selon la préfecture'],
          ['Traitement du dossier DGSN', '2 à 6 semaines', 'Variable selon la ville et la saison'],
          ['Inscription scolaire des enfants', 'À lancer en parallèle', 'Ne pas attendre la carte de séjour définitive'],
        ]}
      />
      <P>
        Au global, comptez <strong>1 à 3 mois</strong> entre le moment où le salarié obtient sa
        propre carte de séjour et l'installation complète de sa famille avec des cartes de séjour
        en règle. C'est plus long qu'on ne l'imagine au départ — mieux vaut lancer les démarches
        tôt, en particulier le volet visa si la nationalité de la famille l'exige.
      </P>

      <LeadBox
        title="Besoin d'aide pour organiser le regroupement familial de votre salarié ?"
        cta="Être mis en relation"
      >
        <p>
          Chaque situation familiale est différente selon les nationalités en jeu, le régime de
          visa applicable et la ville d'installation. Décrivez-nous votre cas, nous pouvons vous
          orienter vers des professionnels habitués aux démarches DGSN pour familles d'expatriés.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Peut-on demander la carte de séjour de la famille en même temps que celle du salarié ?', a: 'Non, en pratique le salarié doit d\'abord obtenir sa propre carte de séjour avant que sa famille puisse déposer sa demande en tant que membre de famille d\'un résident.' },
          { q: 'Le concubinage ouvre-t-il droit au regroupement familial ?', a: 'Non, seul le mariage légalement établi est reconnu pour la carte de séjour du conjoint. Le concubinage ou le partenariat civil ne sont pas retenus.' },
          { q: 'La carte de séjour du conjoint autorise-t-elle à travailler au Maroc ?', a: 'Pas automatiquement. Pour occuper un emploi, le conjoint doit en principe suivre sa propre procédure TAECHIR, sauf s\'il entre dans une catégorie dispensée d\'ANAPEC.' },
          { q: 'Faut-il un visa pour faire venir sa famille au Maroc ?', a: 'Cela dépend uniquement de la nationalité du conjoint et des enfants. Si leur nationalité est soumise à visa, il doit être demandé au consulat marocain avant le départ, pas régularisé sur place après une entrée touristique.' },
        ]}
      />
    </>
  );
}

export const articles: Article[] = [
  {
    slug: 'guide-recruter-salarie-etranger-maroc-2026',
    title: 'Recruter un salarié étranger au Maroc : le guide complet 2026',
    description: 'Toutes les étapes pour recruter un travailleur étranger au Maroc via le programme TAECHIR : ANAPEC, visa Ministère, CNSS et carte de séjour.',
    date: '15 janvier 2026',
    readTime: 8,
    category: 'Guide',
    excerpt: 'De l\'attestation ANAPEC au visa du Ministère, en passant par la plateforme TAECHIR : la feuille de route complète pour un recrutement international réussi au Maroc.',
    Content: Article1Content,
  },
  {
    slug: 'attestation-anapec-frais-delais-procedure',
    title: 'Attestation ANAPEC : frais, délais et procédure expliqués',
    description: 'Tout savoir sur l\'attestation d\'activité ANAPEC pour recruter un étranger au Maroc : types de dossiers, frais détaillés et déroulement concret.',
    date: '22 janvier 2026',
    readTime: 6,
    category: 'ANAPEC',
    excerpt: 'La pièce maîtresse du dossier Taechir décryptée : pourquoi l\'ANAPEC est impliquée, combien ça coûte, combien de temps ça prend et comment se déroule concrètement la procédure.',
    Content: Article2Content,
  },
  {
    slug: 'profils-rares-listes-a1-a2-anapec-maroc',
    title: 'Profils rares au Maroc : listes A1 et A2 de l\'ANAPEC expliquées',
    description: 'Qu\'est-ce que les listes A1 et A2 de l\'ANAPEC ? Comment bénéficier de la procédure allégée (48h, 1500 Dhs) pour recruter des talents rares au Maroc.',
    date: '29 janvier 2026',
    readTime: 5,
    category: 'ANAPEC',
    excerpt: 'Pour les métiers rares ou de haut niveau, l\'ANAPEC propose une procédure en 48 heures au lieu de 20 jours. Tout ce qu\'il faut savoir sur les listes A1 et A2 et comment savoir si votre poste y figure.',
    Content: Article3Content,
  },
  {
    slug: 'dispense-anapec-categories-exemptees-maroc',
    title: 'Dispense d\'ANAPEC : qui peut recruter sans attestation ?',
    description: 'Les catégories de salariés étrangers dispensés de l\'attestation ANAPEC au Maroc : conventions bilatérales, CFC, époux de marocains, détachés et actionnaires.',
    date: '5 février 2026',
    readTime: 5,
    category: 'Exemptions',
    excerpt: 'Algériens, Tunisiens, Sénégalais, époux de marocains, personnel CFC, gérants et salariés détachés : toutes les catégories qui n\'ont pas besoin d\'attestation ANAPEC et les pièces qui la remplacent.',
    Content: Article4Content,
  },
  {
    slug: 'renouvellement-contrat-travail-etranger-maroc',
    title: 'Renouvellement du contrat de travail étranger au Maroc : mode d\'emploi',
    description: 'Comment renouveler le visa de travail d\'un salarié étranger au Maroc : procédure simplifiée, documents requis, délais et lien avec la carte de séjour.',
    date: '12 février 2026',
    readTime: 5,
    category: 'Procédure',
    excerpt: 'Le renouvellement est plus simple que le premier recrutement, mais il exige la même anticipation. Procédure, documents spécifiques, synchronisation avec la carte de séjour DGSN : tout ce que vous devez savoir.',
    Content: Article5Content,
  },
  {
    slug: 'erreurs-taechir-visa-travail-maroc',
    title: '7 erreurs coûteuses à éviter avec le programme Taechir',
    description: 'Les 7 pièges les plus fréquents lors d\'une demande de visa de travail étranger au Maroc via Taechir, et comment les éviter pour ne pas perdre du temps et de l\'argent.',
    date: '19 février 2026',
    readTime: 6,
    category: 'Conseils',
    excerpt: 'Faire commencer le salarié avant le visa, confondre carte de séjour et visa de travail, négliger la légalisation des diplômes... Ces erreurs reviennent sans cesse dans les dossiers Taechir. Voici comment les éviter.',
    Content: Article6Content,
  },
  {
    slug: 'carte-sejour-etranger-maroc-dgsn',
    title: 'Carte de séjour au Maroc : guide complet pour les salariés étrangers',
    description: 'Tout savoir sur la carte de séjour au Maroc pour les salariés étrangers : documents requis, procédure DGSN, renouvellement, carte de 10 ans et erreurs à éviter.',
    date: '26 février 2026',
    readTime: 7,
    category: 'Procédure',
    excerpt: 'Visa de travail et carte de séjour sont deux titres distincts et complémentaires. Ce guide détaille la procédure DGSN pas à pas, les documents requis et les pièges à éviter.',
    Content: Article7Content,
  },
  {
    slug: 'cnss-salarie-etranger-maroc-declaration',
    title: 'Déclaration CNSS d\'un salarié étranger au Maroc : obligations et procédure',
    description: 'Comment déclarer un salarié étranger à la CNSS au Maroc : obligation légale, procédure DAMANCOM, taux de cotisation, droits sociaux et conventions bilatérales.',
    date: '5 mars 2026',
    readTime: 6,
    category: 'Obligations',
    excerpt: 'La déclaration CNSS doit intervenir dès la date du visa. Procédure d\'affiliation, taux de cotisation, droits sociaux, conventions bilatérales et pénalités en cas de retard.',
    Content: Article8Content,
  },
  {
    slug: 'legalisation-documents-etrangers-maroc-apostille',
    title: 'Légalisation et apostille des documents étrangers pour le Maroc',
    description: 'Guide complet de la légalisation des documents étrangers pour le dossier TAECHIR : apostille, légalisation consulaire, traduction assermentée et conseils par pays.',
    date: '12 mars 2026',
    readTime: 7,
    category: 'Documents',
    excerpt: 'Apostille ou légalisation consulaire ? Convention de La Haye ou chaîne consulaire ? Ce guide détaille les deux systèmes et donne des conseils pratiques par pays d\'origine.',
    Content: Article9Content,
  },
  {
    slug: 'offshoring-maroc-recrutement-etranger',
    title: 'Recrutement d\'étrangers dans l\'offshoring au Maroc : cadre spécifique',
    description: 'Le cadre légal et pratique pour recruter des salariés étrangers dans le secteur de l\'offshoring marocain : BPO, ITO, centres d\'appels, statut CFC vs offshoring, traitement ANAPEC et TAECHIR.',
    date: '19 mars 2026',
    readTime: 6,
    category: 'Secteurs',
    excerpt: 'Offshoring, CFC, profils rares : le recrutement international dans les zones shore obéit à des règles particulières que tout opérateur doit maîtriser.',
    Content: Article10Content,
  },
  {
    slug: 'cout-total-recrutement-etranger-maroc-2026',
    title: 'Coût total du recrutement d\'un étranger au Maroc en 2026 : budget détaillé',
    description: 'Tous les coûts réels d\'un recrutement étranger au Maroc en 2026 : frais ANAPEC, légalisation, traductions assermentées, carte de séjour DGSN, temps administratif et coûts cachés.',
    date: '26 mars 2026',
    readTime: 8,
    category: 'Coûts',
    excerpt: 'Au-delà des 5 000 Dhs ANAPEC, combien coûte vraiment le recrutement d\'un salarié étranger au Maroc ? Le budget complet avec tableau comparatif par profil.',
    Content: Article11Content,
  },
  {
    slug: 'assurance-sante-expatrie-maroc',
    title: 'Assurance santé pour expatrié au Maroc : bien choisir en 2026',
    description: 'CNSS, complémentaire locale ou assurance santé internationale : comment couvrir efficacement un salarié étranger ou un expatrié au Maroc, et ce qu\'il faut vérifier avant de signer.',
    date: '2 avril 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'La CNSS ne couvre qu\'une fraction des soins en clinique privée. Assurance locale ou internationale, rapatriement, famille restée au pays : le guide complet pour bien se couvrir au Maroc.',
    Content: Article12Content,
  },
  {
    slug: 'ouvrir-compte-bancaire-etranger-maroc',
    title: 'Ouvrir un compte bancaire au Maroc quand on est étranger',
    description: 'Compte en dirhams convertibles ou compte résident, documents requis, lien avec la carte de séjour et solution multi-devises en attendant : tout pour bancariser un salarié étranger au Maroc.',
    date: '9 avril 2026',
    readTime: 6,
    category: 'Expatrié',
    excerpt: 'Compte convertible ou compte résident ? La distinction que personne n\'explique clairement, les documents à fournir et comment ne pas rester bloqué à l\'arrivée.',
    Content: Article13Content,
  },
  {
    slug: 'transfert-argent-maroc-etranger',
    title: 'Transférer son argent vers et depuis le Maroc sans se ruiner en frais',
    description: 'Le vrai coût d\'un transfert d\'argent est la marge de change cachée, pas les frais affichés. Comparatif des méthodes et règles de l\'Office des Changes pour transférer vers et depuis le Maroc.',
    date: '16 avril 2026',
    readTime: 6,
    category: 'Expatrié',
    excerpt: 'Les « 0 € de frais » cachent une marge de change qui peut coûter 30 à 50 € sur 1 000 €. Comment comparer intelligemment et garder le maximum à l\'arrivée.',
    Content: Article14Content,
  },
  {
    slug: 'domiciliation-entreprise-maroc',
    title: 'Domicilier son entreprise au Maroc : guide complet et coûts 2026',
    description: 'Domiciliation d\'entreprise au Maroc : cadre légal (loi 89-17), coûts par formule, avantages pour une société qui démarre et lien avec le recrutement de salariés étrangers via TAECHIR.',
    date: '23 avril 2026',
    readTime: 6,
    category: 'Entreprise',
    excerpt: 'Une adresse professionnelle légale sans louer de bureau : combien ça coûte vraiment, ce que dit la loi 89-17 et pourquoi c\'est utile pour recruter des étrangers.',
    Content: Article15Content,
  },
  {
    slug: 'casablanca-finance-city-avantages-eligibilite',
    title: 'Casablanca Finance City : avantages, éligibilité et recrutement international',
    description: 'Le statut CFC : avantages fiscaux et de change, éligibilité, et surtout la dispense d\'attestation ANAPEC pour le personnel étranger qui accélère fortement la procédure TAECHIR.',
    date: '30 avril 2026',
    readTime: 7,
    category: 'Finance',
    excerpt: 'Le statut CFC dispense souvent le personnel étranger de l\'attestation ANAPEC — soit plusieurs semaines de gagnées sur la procédure. Avantages, éligibilité et points de vigilance.',
    Content: Article16Content,
  },
  {
    slug: 'recruter-cabinet-rh-vs-direct-maroc',
    title: 'Recruter un étranger au Maroc : cabinet RH ou démarche en direct ?',
    description: 'Faire son dossier TAECHIR seul ou passer par un cabinet spécialisé : avantages, coûts indicatifs et critères de décision selon le profil recruté, l\'urgence et la complexité du dossier.',
    date: '7 mai 2026',
    readTime: 7,
    category: 'RH',
    excerpt: 'En direct on économise des honoraires ; via un cabinet on gagne du temps et on évite les erreurs. Le comparatif honnête pour décider selon votre situation.',
    Content: Article17Content,
  },
  {
    slug: 'refus-visa-taechir-recours-maroc',
    title: 'Refus de visa TAECHIR : motifs fréquents et voies de recours',
    description: 'Que faire quand un dossier TAECHIR est refusé par l\'ANAPEC ou le Ministère du Travail : motifs les plus courants, recours gracieux, recours contentieux et délais à connaître.',
    date: '2 juillet 2026',
    readTime: 7,
    category: 'Recours',
    excerpt: 'ANAPEC défavorable, dossier rejeté au guichet du Ministère : pourquoi ça arrive, ce qu\'on peut faire dans la foulée, et quand envisager un vrai recours.',
    Content: Article18Content,
  },
  {
    slug: 'fiscalite-expatrie-impot-revenu-maroc',
    title: 'Fiscalité de l\'expatrié au Maroc : impôt sur le revenu et double imposition',
    description: 'Résidence fiscale, calcul de l\'impôt sur le revenu (IR) d\'un salarié étranger au Maroc, conventions de non double imposition et obligations déclaratives à connaître.',
    date: '14 juillet 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Résident fiscal ou pas, barème de l\'IR 2026, conventions bilatérales pour éviter de payer deux fois, cas des retraités et des détachés : le guide complet de la fiscalité de l\'expatrié salarié au Maroc.',
    Content: Article19Content,
  },
  {
    slug: 'regroupement-familial-conjoint-enfants-maroc',
    title: 'Regroupement familial au Maroc : faire venir son conjoint et ses enfants',
    description: 'Comment un salarié étranger titulaire d\'une carte de séjour au Maroc peut faire venir son conjoint et ses enfants mineurs : conditions, visa, dossier DGSN et scolarisation.',
    date: '21 juillet 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Une fois sa propre carte de séjour obtenue, le salarié étranger peut faire venir sa famille — mais la démarche a ses propres règles. Conditions, régime de visa selon la nationalité, dossier DGSN et scolarisation des enfants.',
    Content: Article20Content,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
