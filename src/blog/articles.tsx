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
          <strong>Ne confondez pas les deux listes.</strong> La liste A1 dépend du niveau
          hiérarchique du poste et de la taille de l'entreprise — un cadre n-1 dans une société
          de plus de 50 salariés y entre. La liste A2, elle, énumère des métiers précis. Un poste
          du numérique n'y figure pas nommément : c'est presque toujours par la liste A1 qu'il
          faut passer. Et les deux listes sont mises à jour, vérifiez la version en cours.
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
        pour les postes où des candidats nationaux qualifiés existent. Mais pour les fonctions
        de direction et pour certains métiers structurellement absents du marché, imposer ce
        délai serait contre-productif : cela freinerait les investissements sans servir l'emploi
        marocain puisqu'aucun candidat local ne peut répondre au besoin.
      </P>
      <P>
        Les deux listes ne répondent pas à la même logique, et c'est la source de confusion la
        plus fréquente : <strong>A1 raisonne en niveau hiérarchique</strong>, A2 énumère des{' '}
        <strong>métiers précis</strong>. Un poste peut relever de A1 dans une entreprise et pas
        dans une autre, alors que l'appartenance à A2 ne dépend, elle, que du métier exercé.
      </P>
      <P>
        Les listes A1 et A2 permettent à l'ANAPEC de reconnaître officiellement ces situations
        de pénurie structurelle. Pour les postes qui y figurent, la procédure se réduit à
        48 heures et 1 500 Dhs.
      </P>

      <H2>La liste A1 : le niveau hiérarchique, pas le métier</H2>
      <P>
        C'est le point que presque tout le monde comprend de travers. La liste A1 ne
        raisonne pas en intitulés de poste ni en années d'expérience, mais en{' '}
        <strong>position dans l'organigramme</strong>, croisée avec la taille de
        l'entreprise. Un même titre peut donc être éligible dans une société et pas dans
        une autre.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Président-directeur général, président du conseil, directeur général, directeur général adjoint, secrétaire général</li>
        <li><strong>Cadres de niveau n-1</strong> dans les multinationales, les entreprises de plus de 50 salariés, ou celles dont le capital dépasse 1 000 000 Dhs</li>
        <li><strong>Cadres de niveau n-2</strong> dans les entreprises de plus de 500 salariés</li>
        <li>Responsables d'associations et d'ONG justifiant d'au moins 3 ans d'expérience</li>
        <li>Directeurs de succursale de société étrangère, avec au moins 2 ans d'expérience similaire dans la maison mère</li>
      </ul>
      <Info>
        Conséquence pratique : la question à se poser n'est pas « ce poste est-il
        prestigieux ? » mais « à qui ce poste est-il rattaché, et quelle est la taille de
        l'entreprise ? ». Un responsable commercial rattaché directement au dirigeant dans
        une société de 60 salariés est un cadre n-1 : il entre dans la liste A1. Le même
        poste, rattaché à un directeur commercial dans une PME de 20 salariés, n'y entre
        pas.
      </Info>

      <H2>La liste A2 : une liste de métiers, pas une catégorie technique</H2>
      <P>
        La liste A2 recense des professions précises jugées rares ou indisponibles sur le
        marché marocain. Elle est plus hétéroclite qu'on ne l'imagine : on n'y trouve pas
        une catégorie « profils techniques pointus », mais des métiers nommément désignés.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Ingénieurs et architectes justifiant de plus de 5 ans d'expérience</li>
        <li>Professeurs et chercheurs de l'enseignement supérieur (5 ans d'expérience), professeurs de langues, conseillers d'orientation</li>
        <li>Commandants de bord, pilotes d'avion, capitaines de navire, mécaniciens aéronautiques</li>
        <li>Directeurs des programmes d'antennes de radio et de télévision</li>
        <li>Chefs cuisiniers, toutes spécialités gastronomiques confondues</li>
        <li>Interprètes et traducteurs, bibliothécaires</li>
        <li>Thérapeutes spa, entraîneurs de chevaux, pilotes de montgolfière, éleveurs de chameaux, professionnels de la plongée</li>
      </ul>
      <Warning>
        Un poste du numérique — data scientist, expert en cybersécurité, développeur
        senior — ne figure <strong>pas</strong> nommément sur la liste A2. Si vous recrutez
        sur ces métiers, votre voie d'accès à la procédure allégée est la liste A1 par le
        niveau hiérarchique, ou l'entrée « ingénieurs justifiant de plus de 5 ans
        d'expérience » de la liste A2 — à faire confirmer par votre agence, car son
        interprétation varie.
      </Warning>
      <Warning>
        Les listes A1 et A2 sont mises à jour régulièrement par l'ANAPEC en concertation
        avec le Ministère chargé du Travail, et les intitulés ci-dessus sont donnés à titre
        indicatif. Avant de qualifier un poste de « rare », vérifiez la version en vigueur
        et faites confirmer l'éligibilité par votre agence ANAPEC régionale.
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
        Les listes A1 et A2, ainsi que les pièces à fournir pour l'attestation d'activité,
        sont publiées par l'ANAPEC :{' '}
        <a
          href="https://anapec.ma/home-page-o1/employeur/lattestation-dactivite-pieces/"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 underline font-medium"
        >
          pièces à fournir — attestation d'activité
        </a>. La procédure est encadrée par la loi n° 65-99 (Code du Travail) et l'arrêté
        ministériel n° 350-05 du 9 février 2005.
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
        Attention toutefois au critère réel : ce n'est pas l'expérience du candidat qui ouvre
        la liste A1, mais <strong>sa position dans l'organigramme</strong>. Un cadre de niveau
        n-1 dans une entreprise de plus de 50 salariés — ou dont le capital dépasse
        1 000 000 Dhs — y entre ; un cadre n-2 y entre à partir de 500 salariés. Les centres
        offshore dépassant très souvent ces seuils, leurs directeurs de site et leurs
        responsables rattachés à la direction générale sont en général éligibles.
      </P>
      <Tip>
        Avant de lancer un dossier ANAPEC standard pour un cadre de votre centre, posez-vous
        la seule question qui compte : à qui ce poste est-il rattaché, et combien de salariés
        compte la structure ? Un directeur des opérations rattaché au directeur général d'un
        centre de 300 personnes est un cadre n-1, donc liste A1. En revanche un expert
        technique, aussi pointu soit-il, n'est éligible que s'il est lui aussi n-1, ou s'il
        relève de l'entrée « ingénieurs justifiant de plus de 5 ans d'expérience » de la
        liste A2. Vérifiez : ça peut vous économiser 3 500 Dhs et 18 jours.
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

/* ─── Article 20 — Fin de contrat d'un salarié étranger (lead-gen) ──────── */

function Article20Content() {
  return (
    <>
      <Lead>
        « Est-ce qu'il doit quitter le Maroc immédiatement ? » C'est la première question que
        me posent presque tous les employeurs quand le contrat d'un salarié étranger touche à
        sa fin — que ce soit une démission, un licenciement ou simplement l'arrivée du terme
        d'un CDD. La réponse est presque toujours non, mais la gestion administrative de ce
        moment est pleine de pièges que je vois revenir dossier après dossier.
      </Lead>

      <H2>Le principe de base : le titre de séjour suit le contrat, pas l'inverse</H2>
      <P>
        Beaucoup d'employeurs — et de salariés — pensent que la fin du contrat de travail
        entraîne automatiquement l'annulation de la carte de séjour. Ce n'est pas le cas.
        La carte de séjour reste valable jusqu'à sa date d'expiration, quel que soit le sort
        du contrat. Ce qui s'arrête immédiatement, en revanche, c'est <strong>l'autorisation
        de travailler pour cet employeur précis</strong>, sur ce poste précis.
      </P>
      <Info>
        Le visa TAECHIR n'autorise jamais un salarié étranger à travailler « au Maroc » de
        façon générale. Il autorise un salarié précis, chez un employeur précis, sur un poste
        précis. Dès que l'un des trois change, l'autorisation de travail correspondante
        s'éteint — même si la carte de séjour, elle, continue de courir.
      </Info>
      <P>
        J'ai eu le cas d'un DRH à Casablanca persuadé qu'il devait signaler le départ de son
        salarié congolais à la police des frontières dans les 48 heures, comme s'il s'agissait
        d'une expulsion. Rien de tout ça. La carte de séjour reste un droit acquis pour sa
        durée de validité ; c'est la suite de son parcours professionnel qui doit être
        régularisée.
      </P>

      <H2>Les trois scénarios de fin de contrat</H2>
      <H3>1. La fin normale d'un CDD</H3>
      <P>
        C'est le cas le plus simple sur le plan juridique. Le contrat arrive à échéance,
        aucune des deux parties ne le renouvelle. Aucun préavis légal n'est requis pour un
        CDD arrivant à terme, mais je recommande toujours d'anticiper la conversation avec
        le salarié au moins un mois avant — ne serait-ce que pour lui laisser le temps de
        chercher un nouvel employeur si besoin.
      </P>
      <H3>2. La démission</H3>
      <P>
        Un salarié étranger a exactement les mêmes droits de démissionner qu'un salarié
        marocain, avec le même préavis contractuel ou conventionnel. Le seul point d'attention
        propre à sa situation : s'il n'a pas de nouvel employeur prêt à l'accueillir avec un
        dossier TAECHIR en cours, il se retrouve sans autorisation de travail dès son dernier
        jour, même si sa carte de séjour est valable encore deux ans.
      </P>
      <H3>3. Le licenciement</H3>
      <P>
        Là, la procédure du Code du Travail s'applique intégralement — convocation, entretien
        préalable, notification motivée, indemnités le cas échéant. La nationalité du salarié
        ne change strictement rien à la procédure de licenciement elle-même.
      </P>
      <Table
        rows={[
          ['Type de rupture', 'Préavis', 'Effet sur l\'autorisation de travail'],
          ['Fin de CDD (terme normal)', 'Aucun préavis légal', 'S\'éteint à la date de fin du contrat'],
          ['Démission', 'Selon contrat/convention (souvent 1 mois cadres)', 'S\'éteint à la fin du préavis'],
          ['Licenciement pour faute grave', 'Aucun', 'S\'éteint immédiatement'],
          ['Licenciement (autre motif)', 'Selon ancienneté (1 à 3 mois)', 'S\'éteint à la fin du préavis'],
        ]}
      />

      <H2>Les obligations de l'employeur au moment du départ</H2>
      <P>Trois choses à faire sans tarder, comme pour n'importe quel salarié :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Radier le salarié de la CNSS</strong> via la déclaration de fin de période de travail sur DAMANCOM, dès la date effective de départ.</li>
        <li><strong>Remettre le certificat de travail et le solde de tout compte</strong>, comme pour tout salarié — le certificat de travail sert d'ailleurs souvent de pièce justificative pour le prochain employeur du salarié étranger.</li>
        <li><strong>Conserver une copie complète du dossier TAECHIR</strong> (contrat visé, attestation ANAPEC) au moins deux ans, en cas de contrôle de l'inspection du travail portant sur la période d'emploi.</li>
      </ul>
      <Warning>
        Il n'existe aucune procédure officielle pour « clôturer » un dossier TAECHIR côté
        Ministère lors d'un départ. Beaucoup d'employeurs en concluent, à tort, qu'ils n'ont
        rien à faire. En pratique, une radiation CNSS qui traîne après le départ d'un salarié
        étranger attire souvent l'attention lors d'un contrôle ultérieur — mieux vaut la faire
        dans les jours qui suivent, pas des mois après.
      </Warning>

      <H2>Que devient le salarié étranger après la rupture ?</H2>
      <P>
        Sa carte de séjour reste valable jusqu'à son échéance. Pendant cette période, il peut
        rester au Maroc, chercher un nouvel emploi, ou repartir. Ce qu'il ne peut pas faire,
        c'est travailler — même à temps partiel, même en freelance — sans une nouvelle
        autorisation liée à sa nouvelle situation.
      </P>
      <P>
        Le point qui coince le plus souvent en pratique : au moment du renouvellement de la
        carte de séjour, la DGSN demande un justificatif d'activité à jour. Un salarié sans
        emploi depuis plusieurs mois, sans nouveau contrat visé, peut voir son renouvellement
        se compliquer — pas refusé automatiquement, mais examiné de plus près.
      </P>
      <Tip>
        Si votre salarié quitte l'entreprise et cherche activement un nouveau poste, conseillez-lui
        de garder une trace écrite de ses démarches (candidatures, promesses d'embauche) — ça peut
        servir à justifier la continuité de son projet professionnel au Maroc lors du renouvellement
        de sa carte de séjour.
      </Tip>

      <H2>Changer d'employeur avec le même salarié : repartir de zéro, ou presque</H2>
      <P>
        Erreur fréquente : un nouvel employeur croit qu'il peut simplement « reprendre » le
        salarié étranger qui a déjà un visa TAECHIR chez un concurrent, sans nouvelle démarche.
        Faux. Un changement d'employeur est traité exactement comme un premier recrutement :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Nouvelle attestation ANAPEC (sauf si le salarié appartient à une catégorie dispensée)</li>
        <li>Nouveau contrat généré et visé sur TAECHIR, au nom du nouvel employeur</li>
        <li>Nouveau dépôt et nouveau visa au guichet régional du Ministère</li>
      </ul>
      <P>
        La seule vraie économie : la carte de séjour DGSN, elle, n'a pas besoin d'être refaite
        de zéro si elle est encore valide — un simple changement d'employeur est signalé lors
        du prochain renouvellement. Mais côté ANAPEC et TAECHIR, il n'y a aucun raccourci lié
        à l'ancienneté du salarié au Maroc.
      </P>
      <Warning>
        J'ai vu une entreprise à Marrakech faire travailler un chef cuisinier philippin dès sa
        signature, en se disant que son visa TAECHIR précédent — chez un autre restaurant du
        même groupe — suffisait. Contrôle de l'inspection du travail trois semaines plus tard :
        infraction caractérisée à l'article 516. Chaque employeur doit avoir sa propre
        autorisation, même au sein d'un même groupe.
      </Warning>

      <H2>Licenciement abusif : le salarié étranger a les mêmes recours</H2>
      <P>
        Rien dans le statut de travailleur étranger ne réduit les droits en cas de licenciement
        abusif. Le salarié peut saisir le tribunal social compétent, dans les mêmes délais et
        avec les mêmes indemnités potentielles qu'un salarié marocain. La situation du titre de
        séjour n'entre pas en compte dans l'appréciation du litige prud'homal.
      </P>
      <P>
        J'ai accompagné un ingénieur camerounais licencié sans procédure régulière par une
        entreprise industrielle à Tanger. Le tribunal lui a accordé des indemnités de
        licenciement abusif classiques, exactement comme il l'aurait fait pour un salarié
        marocain dans la même situation. Sa carte de séjour, valable encore un an, lui a
        permis de mener la procédure jusqu'au bout sans être sous pression pour quitter le pays.
      </P>

      <LeadBox
        title="Vous gérez le départ ou le remplacement d'un salarié étranger ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Radiation CNSS, nouveau dossier TAECHIR pour un changement d'employeur, question sur
          le renouvellement d'une carte de séjour après une rupture : décrivez-nous votre
          situation et nous pouvons vous orienter vers un spécialiste du droit du travail
          habitué aux dossiers de salariés étrangers.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'La carte de séjour est-elle annulée automatiquement à la fin du contrat de travail ?', a: 'Non. La carte de séjour reste valable jusqu\'à sa date d\'expiration. Seule l\'autorisation de travailler pour l\'employeur concerné s\'éteint à la fin du contrat.' },
          { q: 'Un salarié étranger licencié doit-il quitter le Maroc immédiatement ?', a: 'Non, tant que sa carte de séjour est valide, il peut rester sur le territoire pour chercher un nouvel emploi ou régler sa situation, mais il ne peut plus travailler sans nouvelle autorisation.' },
          { q: 'Peut-on transférer un visa TAECHIR d\'un employeur à un autre ?', a: 'Non, il n\'existe pas de mécanisme de transfert. Un changement d\'employeur exige un nouveau dossier complet : attestation ANAPEC (sauf dispense), nouveau contrat visé et nouveau dépôt au Ministère.' },
          { q: 'Un salarié étranger licencié abusivement a-t-il les mêmes recours qu\'un salarié marocain ?', a: 'Oui. Le droit du travail marocain s\'applique de la même façon, indépendamment de la nationalité. Le salarié peut saisir le tribunal compétent dans les mêmes conditions et délais.' },
        ]}
      />
    </>
  );
}

/* ─── Article 21 ────────────────────────────────────────────────────────── */

function Article21Content() {
  return (
    <>
      <Lead>
        « J'ai encore huit mois avant que ça expire, non ? » Un DRH à Casablanca m'a posé
        cette question pour son ingénieur portugais, convaincu qu'il pouvait rouler indéfiniment
        avec son permis étranger tant que sa carte de séjour était valable. Faux — et c'est
        une des démarches que les salariés étrangers oublient le plus souvent une fois installés.
        Voici comment ça marche vraiment.
      </Lead>

      <H2>Le principe de base : un an, pas un jour de plus</H2>
      <P>
        Dès que vous vous installez au Maroc en tant que résident — c'est-à-dire dès que vous
        obtenez votre carte de séjour —, vous avez le droit de conduire avec votre permis
        étranger pendant <strong>12 mois maximum</strong>. Passé ce délai, pour continuer à
        conduire légalement, il ne vous reste que deux options : l'échange de votre permis
        contre un permis marocain, ou le passage de l'examen marocain complet.
      </P>
      <Info>
        Ce délai d'un an court à partir de l'établissement de votre résidence, pas à partir
        de votre visa TAECHIR ni de votre date d'arrivée physique au Maroc. En pratique,
        c'est la date de votre carte de séjour qui sert de référence la plupart du temps.
      </Info>
      <P>
        Un touriste, lui, peut conduire jusqu'à 12 mois avec son permis étranger sans aucune
        démarche particulière — logique, puisqu'il n'est pas résident. C'est cette confusion
        entre statut touriste et statut résident qui piège le plus de monde : le salarié
        étranger fraîchement installé continue de se considérer comme « de passage » alors
        que l'horloge tourne déjà.
      </P>

      <H2>Échange ou examen : tout dépend de votre nationalité</H2>
      <P>
        Le Maroc n'échange pas les permis de tous les pays. Il faut que votre pays d'origine
        ait signé un accord de reconnaissance ou de réciprocité avec le Royaume. Si c'est le
        cas, la procédure est simple et rapide. Sinon, il faut repasser l'examen — comme un
        primo-candidat marocain.
      </P>

      <H3>Les pays reconnus (liste indicative)</H3>
      <Table
        rows={[
          ['Type d\'accord', 'Pays concernés'],
          ['Réciprocité totale', 'France, Corée du Sud, Japon, Pologne, Roumanie, Hongrie'],
          ['Reconnaissance', 'Belgique, Espagne (cat. A et B), Italie, Portugal, Suisse, Turquie, Bahreïn, Égypte, Jordanie (cat. B), Oman, Arabie Saoudite, Syrie'],
          ['Reconnaissance (Afrique)', 'Tunisie, Algérie, Mauritanie, Sénégal, Gabon, Niger, Mali, Bénin'],
        ]}
      />
      <Warning>
        Cette liste évolue régulièrement et je vois souvent des employeurs se fier à une
        information périmée. Avant de vous engager dans une démarche, vérifiez le statut
        exact de votre pays auprès de l'agence NARSA (Agence Nationale de la Sécurité
        Routière) — les catégories concernées varient parfois selon le type de permis (A, B).
        Notez aussi que des pays très représentés parmi les salariés étrangers au Maroc —
        les États-Unis, le Royaume-Uni, l'Allemagne ou le Canada, par exemple — n'ont pas
        d'accord d'échange à ce jour : leurs ressortissants doivent repasser l'examen marocain.
      </Warning>

      <H2>La procédure d'échange, pour les pays reconnus</H2>
      <P>Si votre pays figure sur la liste, vous déposez votre dossier auprès du centre NARSA de votre région avec :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Une copie de votre carte de séjour valide</li>
        <li>Un certificat de résidence de moins de 3 mois, délivré par la Sûreté Nationale ou la Gendarmerie Royale</li>
        <li>L'original de votre permis étranger, accompagné d'une traduction en français ou en arabe s'il n'est pas déjà dans l'une de ces langues</li>
        <li>Un certificat médical de moins de 3 mois</li>
        <li>Deux photos d'identité au format 35×45 mm</li>
        <li>Le règlement des droits de timbre — <strong>700 Dhs</strong> environ, frais de service inclus</li>
      </ul>
      <P>
        Un récépissé vous est remis le jour du dépôt, puis le permis définitif suit —
        comptez généralement <strong>4 à 8 semaines</strong> selon le centre. Le point que
        beaucoup négligent : ce récépissé ne vaut pas toujours autorisation de conduire dans
        l'intervalle. Renseignez-vous précisément auprès du centre où vous déposez, la
        pratique varie d'une préfecture à l'autre.
      </P>
      <Tip>
        Ne collectionnez pas les documents au dernier moment. Le certificat de résidence
        et le certificat médical ont une durée de validité de 3 mois : si vous les obtenez
        trop tôt et que le dossier traîne, il faudra les refaire. Un employeur à Rabat m'a
        raconté avoir dû refaire deux fois le certificat médical de son cadre allemand,
        simplement parce que le dossier NARSA avait pris du retard entre-temps.
      </Tip>

      <H2>Repasser l'examen, pour les pays sans accord</H2>
      <P>
        Pas de panique : ce n'est pas un retour à la case départ complète, mais il faut
        suivre le circuit officiel comme un candidat marocain, avec une pièce en plus —
        la copie de votre carte de séjour et un certificat de résidence de moins de 3 mois.
      </P>
      <H3>L'épreuve théorique</H3>
      <P>
        Elle se passe au centre régional de la NARSA. Pour la catégorie B (voiture
        particulière), 40 questions sont tirées au sort et il faut obtenir au moins
        <strong> 32 bonnes réponses sur 40</strong> pour être admis. En cas d'échec, une
        nouvelle convocation est délivrée pour repasser l'épreuve, au minimum 15 jours après.
      </P>
      <H3>L'épreuve pratique</H3>
      <P>
        Une fois le théorique validé, place à la conduite. En cas de réussite, vous recevez
        un permis provisoire valable 60 jours, échangé ensuite contre le permis définitif —
        valable 10 ans, comme pour tout titulaire au Maroc.
      </P>
      <Info>
        Contrairement à un candidat qui n'a jamais conduit, vous n'êtes généralement pas
        obligé de refaire les 20 heures de conduite obligatoires d'une auto-école si vous
        justifiez déjà d'une expérience de conduite à l'étranger — mais cette appréciation
        reste au cas par cas selon le centre. Demandez confirmation directement à l'auto-école
        ou au centre NARSA avant de vous engager dans un forfait complet inutile.
      </Info>

      <H2>Conduire après le délai d'un an sans avoir régularisé</H2>
      <P>
        C'est un risque que je vois sous-estimé en permanence. Passé les 12 mois, votre
        permis étranger n'a plus de valeur légale au Maroc. En cas de contrôle, cela équivaut
        à conduire sans permis. Et le vrai problème surgit surtout en cas d'accident : une
        assurance peut refuser la prise en charge — ou se retourner contre vous — si le
        conducteur n'était plus en règle au moment des faits.
      </P>
      <Warning>
        J'ai eu le cas d'un cadre néerlandais à Tanger, installé depuis 14 mois, impliqué
        dans un accrochage sans gravité. Son assureur a longuement chipoté sur la prise en
        charge parce que son permis étranger n'était plus valable pour circuler au Maroc
        depuis deux mois. Le dossier s'est réglé, mais ça a pris des semaines de tension
        évitables.
      </Warning>

      <H2>Le calendrier à connaître</H2>
      <Table
        rows={[
          ['Étape', 'Délai', 'À retenir'],
          ['Conduite libre avec permis étranger', '12 mois depuis la résidence', 'Aucune démarche nécessaire pendant cette période'],
          ['Dépôt du dossier d\'échange (pays reconnu)', 'Avant l\'échéance des 12 mois', '700 Dhs de droits de timbre'],
          ['Traitement du dossier d\'échange', '4 à 8 semaines', 'Variable selon le centre NARSA'],
          ['Examen complet (pays non reconnu)', '2 à 6 mois', 'Théorique puis pratique, via une auto-école'],
        ]}
      />
      <P>
        Mon conseil, valable pour les deux cas de figure : lancez la démarche <strong>dès le
        8ᵉ ou 9ᵉ mois</strong> de résidence, pas au 11ᵉ. Ça laisse une marge confortable si
        un document doit être refait ou si le centre est surchargé — ce qui arrive souvent
        à Casablanca et Rabat en période de forte affluence.
      </P>

      <H2>Le lien avec votre carte de séjour</H2>
      <P>
        Cette démarche est indépendante de votre carte de séjour DGSN et de votre dossier
        TAECHIR, mais elle s'inscrit dans le même calendrier d'installation. Beaucoup de
        salariés étrangers, occupés par les démarches CNSS et la carte de séjour à leur
        arrivée, relèguent le permis de conduire au second plan — jusqu'à ce que le délai
        soit presque écoulé. Autant l'intégrer dès le départ dans la liste des choses à faire
        pendant votre première année au Maroc.
      </P>

      <LeadBox
        title="Vous accompagnez l'installation d'un salarié étranger ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Carte de séjour, CNSS, permis de conduire : l'installation d'un salarié étranger
          comporte plusieurs démarches parallèles à ne pas manquer. Décrivez-nous votre
          situation et nous pouvons vous orienter vers un spécialiste habitué à ces dossiers.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Un salarié étranger peut-il conduire au Maroc dès son arrivée ?', a: 'Oui, avec son permis étranger, sans démarche particulière, pendant 12 mois à compter de l\'établissement de sa résidence au Maroc.' },
          { q: 'Que se passe-t-il si mon pays n\'a pas d\'accord avec le Maroc ?', a: 'Vous devez repasser l\'examen marocain complet — théorique puis pratique — comme un candidat marocain, avec votre carte de séjour et un certificat de résidence en plus dans le dossier.' },
          { q: 'Combien coûte l\'échange d\'un permis étranger contre un permis marocain ?', a: 'Environ 700 Dhs de droits de timbre et frais de service, pour les ressortissants des pays ayant un accord de reconnaissance avec le Maroc.' },
          { q: 'Le permis marocain obtenu par échange est-il valable 10 ans ?', a: 'Oui, comme tout permis délivré au Maroc, qu\'il soit obtenu par échange ou par examen complet.' },
        ]}
      />
    </>
  );
}

/* ─── Article 22 — Se loger au Maroc ─────────────────────────────────────── */

function Article22Content() {
  return (
    <>
      <Lead>
        Une fois le visa de travail en poche, la question qui revient tout de suite après
        c'est : où est-ce qu'on habite ? Beaucoup d'employeurs pensent que c'est l'affaire
        du salarié et s'en désintéressent — grosse erreur, parce que le logement conditionne
        souvent la suite : le compte bancaire, la carte de séjour, et même la tranquillité
        d'esprit des premières semaines. Voici comment ça se passe vraiment.
      </Lead>

      <H2>Louer avant d'avoir sa carte de séjour : oui, c'est possible</H2>
      <P>
        C'est la première question qu'on me pose, presque à chaque fois : « il n'a pas encore
        sa carte de séjour, peut-il signer un bail ? » Oui, sans problème. Un passeport valide
        et, idéalement, le contrat de travail visé par le Ministère suffisent pour la plupart
        des propriétaires et agences. La carte de séjour n'est pas une condition légale pour
        louer un logement au Maroc — c'est souvent l'inverse qui pose problème : c'est le bail
        qui sert de justificatif de domicile pour <strong>obtenir</strong> la carte de séjour.
      </P>
      <Info>
        Gardez bien cette logique en tête : contrat de travail visé → logement → justificatif
        de domicile → dossier carte de séjour à la DGSN. Si vous inversez l'ordre et que le
        salarié traîne sans adresse fixe, tout le reste prend du retard derrière.
      </Info>

      <H2>Meublé, non meublé, ou résidence de standing ?</H2>
      <P>
        Trois grandes options s'offrent à un salarié étranger qui arrive, et le bon choix
        dépend surtout de la durée prévue du séjour.
      </P>
      <H3>Le meublé courte à moyenne durée</H3>
      <P>
        Pour les 2 à 6 premiers mois, je recommande presque toujours un appartement meublé,
        loué directement au propriétaire ou via une agence spécialisée dans les expatriés.
        C'est plus cher au mètre carré, mais ça évite d'acheter de l'électroménager pour
        repartir six mois plus tard si le poste ne convient finalement pas.
      </P>
      <H3>Le non meublé, une fois installé durablement</H3>
      <P>
        Passé les premiers mois, beaucoup basculent vers un bail non meublé classique,
        nettement moins cher au m² et plus stable dans la durée. C'est le choix logique pour
        un contrat TAECHIR d'un an renouvelable, une fois qu'on sait qu'on reste.
      </P>
      <H3>La résidence gérée, pour les profils très mobiles</H3>
      <P>
        Pour les cadres qui font des allers-retours fréquents ou dont la mission n'excède
        pas quelques mois, les résidences hôtelières avec services (ménage, réception,
        parfois salle de sport) évitent de gérer un bail classique. C'est le plus cher au
        mois, mais le plus simple à arrêter du jour au lendemain.
      </P>
      <Table
        rows={[
          ['Formule', 'Durée typique', 'Prix indicatif (Casablanca)', 'Avantage principal'],
          ['Meublé courte durée', '1 à 6 mois', '6 000–15 000 Dhs/mois', 'Flexibilité, zéro équipement à acheter'],
          ['Non meublé classique', '1 an et plus', '4 000–12 000 Dhs/mois', 'Prix au m² nettement inférieur'],
          ['Résidence gérée / hôtelière', 'Variable, sans engagement long', '8 000–20 000 Dhs/mois', 'Aucune gestion, services inclus'],
        ]}
      />
      <P>
        Ces fourchettes varient fortement selon la ville et le quartier — Casablanca et Rabat
        sont sensiblement plus chers que Tanger, Marrakech ou Fès, et un quartier comme
        Californie ou Anfa à Casablanca n'a rien à voir avec un quartier plus périphérique.
      </P>

      <H2>Le dépôt de garantie : la vraie source de litiges</H2>
      <P>
        Au Maroc, il est encore courant que les propriétaires demandent <strong>2 à 3 mois
        de loyer d'avance</strong> à la signature — parfois en plus d'une caution distincte.
        Rien d'illégal en soi, mais c'est souvent bien plus élevé que ce à quoi un salarié
        venant d'Europe ou d'ailleurs s'attend, et ça peut représenter une grosse sortie de
        trésorerie au moment le plus mal choisi, juste après le déménagement.
      </P>
      <Warning>
        J'ai vu un cadre canadien à Rabat verser 3 mois de loyer d'avance en liquide sans
        aucune quittance écrite, sur simple confiance envers l'agence. Six mois plus tard,
        au moment de récupérer sa caution en quittant le logement, le propriétaire a nié
        avoir reçu quoi que ce soit au-delà d'un mois. Sans preuve écrite, impossible de
        faire valoir quoi que ce soit. Exigez toujours une quittance signée pour chaque
        somme versée, y compris le dépôt de garantie.
      </Warning>
      <P>
        Autre point à négocier avant de signer : la restitution du dépôt de garantie n'est
        pas automatique ni rapide dans la pratique. Prévoyez, dans le bail lui-même, un délai
        précis de restitution (30 jours est raisonnable) et les conditions d'un éventuel
        retrait pour dégradations, avec état des lieux d'entrée et de sortie signé des deux
        parties.
      </P>

      <H2>Ce qu'il faut vérifier avant de signer le bail</H2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>
          <strong>Le titre de propriété ou le mandat de l'agence.</strong> Demandez à voir
          le titre foncier ou, si vous passez par une agence, son mandat de gestion. Ça évite
          de traiter avec quelqu'un qui n'a pas le droit de louer le bien.
        </li>
        <li>
          <strong>La durée et les conditions de résiliation.</strong> Un bail d'un an renouvelable
          tacitement est courant ; vérifiez le préavis à donner si le contrat de travail se
          termine plus tôt que prévu.
        </li>
        <li>
          <strong>Les charges incluses ou non.</strong> Eau, électricité, syndic, gardiennage :
          précisez noir sur blanc ce qui est compris dans le loyer affiché.
        </li>
        <li>
          <strong>L'état des lieux détaillé.</strong> Photos datées à l'appui, pour chaque pièce,
          avant d'emménager. C'est ce qui vous protège au moment de récupérer le dépôt de garantie.
        </li>
      </ul>
      <Tip>
        Faites toujours rédiger le bail en français ou en arabe — les deux versions ont valeur
        légale au Maroc. Si vous ne lisez pas l'arabe, demandez la version française et
        faites-la relire par quelqu'un qui connaît les usages locaux avant de signer, surtout
        pour les clauses de résiliation anticipée.
      </Tip>

      <H2>Le justificatif de domicile, la pièce qui débloque tout le reste</H2>
      <P>
        Une fois installé, le bail — ou, à défaut, une attestation d'hébergement si le
        salarié loge chez quelqu'un — sert de justificatif de domicile pour trois démarches
        qui suivent de près l'arrivée :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>La demande de carte de séjour à la DGSN</li>
        <li>L'ouverture d'un compte bancaire résident</li>
        <li>Le certificat de résidence nécessaire pour certaines démarches administratives, comme l'échange du permis de conduire</li>
      </ul>
      <P>
        Un bail sans quittance, ou un logement chez un proche sans attestation d'hébergement
        en bonne et due forme, peut bloquer ces trois démarches en cascade. Mon conseil : dès
        la signature du bail, demandez systématiquement une quittance de loyer mensuelle avec
        l'adresse complète — même si vous payez par virement.
      </P>

      <Divider />

      <H2>Casablanca, Rabat, Tanger : des marchés très différents</H2>
      <P>
        Le marché locatif n'a rien d'uniforme d'une ville à l'autre. À Casablanca, la demande
        des expatriés se concentre sur des quartiers comme Californie, Bourgogne, Racine ou
        Anfa, avec des loyers qui grimpent vite pour du meublé de standing. À Rabat, Agdal et
        Hay Riad sont les quartiers de référence pour les cadres internationaux, avec une offre
        un peu plus abordable qu'à Casablanca pour un niveau de confort comparable. À Tanger,
        portée par l'industrie automobile et logistique, le marché s'est nettement tendu ces
        dernières années, en particulier près des zones industrielles.
      </P>
      <Info>
        Si l'entreprise recrute régulièrement des profils étrangers dans la même ville,
        ça vaut le coup de nouer une relation avec une ou deux agences locales fiables plutôt
        que de repartir de zéro à chaque arrivée. Ça accélère la recherche et ça limite le
        risque de tomber sur un logement mal en règle.
      </Info>

      <LeadBox
        title="Vous préparez l'arrivée d'un salarié étranger ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Logement, carte de séjour, compte bancaire : l'installation complète d'un salarié
          étranger comporte plusieurs étapes à bien enchaîner. Décrivez-nous votre situation
          et nous pouvons vous orienter vers un spécialiste habitué à ces dossiers.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Un salarié étranger peut-il louer un logement sans carte de séjour ?', a: 'Oui. Un passeport valide et idéalement le contrat de travail visé suffisent pour signer un bail. C\'est même souvent le bail qui sert ensuite de justificatif de domicile pour obtenir la carte de séjour.' },
          { q: 'Combien faut-il prévoir de dépôt de garantie ?', a: 'La pratique courante est de 2 à 3 mois de loyer d\'avance, parfois cumulés à une caution distincte. Exigez toujours une quittance écrite pour chaque somme versée.' },
          { q: 'Le bail suffit-il comme justificatif de domicile pour la carte de séjour ?', a: 'Oui, un bail en bonne et due forme, accompagné de quittances, est généralement accepté par la DGSN. À défaut, une attestation d\'hébergement signée par l\'hébergeant peut convenir.' },
        ]}
      />
    </>
  );
}

/* ─── Article 23 — Regroupement familial ────────────────────────────────── */

function Article23Content() {
  return (
    <>
      <Lead>
        « Ma femme et mes enfants me rejoignent le mois prochain, qu'est-ce qu'il faut
        préparer ? » — c'est une question qu'un DRH ou le salarié lui-même me pose presque
        systématiquement quelques semaines après l'obtention du visa TAECHIR. Et la réponse
        surprend souvent : ce n'est pas parce que le salarié a son contrat visé et sa carte
        de séjour que sa famille peut simplement débarquer et s'installer sans démarche.
        Voici comment ça fonctionne réellement.
      </Lead>

      <H2>Le principe : la carte de séjour « membre de famille »</H2>
      <P>
        Le regroupement familial au Maroc est encadré par la loi 02-03 relative à l'entrée
        et au séjour des étrangers. Concrètement, un salarié étranger titulaire d'une carte
        de séjour en cours de validité peut faire venir son conjoint et ses enfants mineurs,
        qui obtiennent à leur tour une carte de séjour au titre du <strong>regroupement
        familial</strong> — parfois appelée carte « membre de famille » selon les préfectures.
      </P>
      <Info>
        Point important à bien comprendre dès le départ : cette carte autorise à
        <strong> résider</strong> au Maroc, pas à y <strong>travailler</strong>. Si le conjoint
        souhaite lui aussi occuper un emploi, c'est une démarche totalement séparée, avec son
        propre dossier TAECHIR — j'y reviens plus bas, c'est le point qui piège le plus de
        familles.
      </Info>

      <H2>Qui peut en bénéficier, et qui ne peut pas</H2>
      <P>
        En pratique, la préfecture regarde deux critères simples : le lien de parenté ou
        d'alliance, et l'âge pour les enfants.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Le conjoint marié.</strong> Un mariage civil ou religieux légalement constitué à l'étranger, avec acte de mariage traduit et légalisé, ouvre droit au regroupement. Le concubinage ou le PACS, qui n'ont pas d'existence reconnue en droit marocain, ne suffisent pas.</li>
        <li><strong>Les enfants mineurs</strong> — du couple ou d'une union précédente, à condition de prouver le lien de filiation par un acte de naissance légalisé et traduit.</li>
        <li><strong>Les enfants majeurs</strong> ne rentrent en principe plus dans ce cadre. S'ils poursuivent des études au Maroc, ils basculent vers une carte de séjour « étudiant » distincte ; s'ils travaillent, vers leur propre dossier TAECHIR.</li>
      </ul>
      <Warning>
        J'ai eu le cas d'un couple néerlandais non mariés, en union libre depuis 8 ans avec
        un enfant commun, qui pensaient que leur situation était équivalente à un mariage.
        La préfecture a refusé la demande de la conjointe faute d'acte de mariage — l'enfant,
        lui, a pu obtenir sa carte grâce à l'acte de naissance établissant la filiation avec
        le salarié. Un mariage, même célébré rapidement dans le pays d'origine, aurait évité
        ce blocage pour la conjointe.
      </Warning>

      <H2>Le dossier à préparer, membre par membre</H2>
      <P>
        Chaque membre de la famille dépose son propre dossier — il n'existe pas de demande
        groupée unique. Voici ce qu'on demande le plus souvent :
      </P>
      <Table
        rows={[
          ['Document', 'Pour qui', 'À savoir'],
          ['Acte de mariage légalisé et traduit', 'Conjoint', 'Apostille ou légalisation consulaire selon le pays'],
          ['Acte de naissance légalisé et traduit', 'Enfants', 'Doit établir clairement la filiation avec le salarié'],
          ['Copie de la carte de séjour du salarié', 'Tous', 'Doit être en cours de validité au moment du dépôt'],
          ['Justificatif de ressources du salarié', 'Tous', 'Bulletins de salaire, contrat TAECHIR visé, parfois attestation bancaire'],
          ['Justificatif de logement', 'Tous', 'Bail légalisé ou attestation d\'hébergement du salarié'],
          ['Casier judiciaire du pays d\'origine', 'Conjoint (majeur)', 'Légalisé et traduit, souvent la pièce la plus lente à obtenir'],
          ['Certificat médical marocain', 'Tous', 'Délivré par un médecin agréé, comme pour toute carte de séjour'],
          ['Photos d\'identité + timbre fiscal', 'Tous', 'Environ 100 Dhs de timbre par dossier'],
        ]}
      />
      <Tip>
        Faites légaliser et traduire les actes de mariage et de naissance <strong>avant le
        départ</strong>, dans le pays d'origine — c'est souvent plus rapide et moins cher
        qu'une fois au Maroc, surtout si le consulat marocain local traite l'apostille sur
        place. Une famille qui arrive avec ces pièces déjà prêtes gagne facilement deux à
        trois semaines sur l'ensemble de la démarche.
      </Tip>

      <H2>Le bon ordre : ne faites pas venir la famille trop tôt</H2>
      <P>
        Erreur classique que je vois revenir : l'employeur fait venir toute la famille dès
        l'arrivée du salarié, avant même que celui-ci n'ait sa propre carte de séjour en main.
        Or la carte de séjour du salarié étant la pièce justificative de base du dossier
        familial, la préfecture ne peut instruire les demandes des proches avant qu'elle
        n'existe.
      </P>
      <Table
        rows={[
          ['Étape', 'Qui', 'Délai indicatif'],
          ['Visa TAECHIR + arrivée du salarié', 'Salarié', 'Voir le calendrier standard TAECHIR'],
          ['Carte de séjour du salarié (DGSN)', 'Salarié', '2 à 6 semaines selon la préfecture'],
          ['Dépôt des dossiers famille', 'Conjoint et enfants', 'Dès la carte de séjour du salarié en main'],
          ['Traitement des dossiers famille', 'Conjoint et enfants', 'Généralement 2 à 8 semaines, variable selon la préfecture'],
        ]}
      />
      <P>
        Concrètement, pour un salarié qui arrive seul en éclaireur puis fait venir sa famille
        ensuite, je recommande de compter <strong>2 à 3 mois</strong> entre son installation
        et l'obtention des cartes de séjour de son conjoint et de ses enfants, en tenant compte
        des allers-retours de pièces. Rien n'empêche la famille d'arriver physiquement au
        Maroc plus tôt en tant que visiteurs, mais la démarche administrative de la carte
        de séjour, elle, suit ce calendrier.
      </P>

      <H2>Le conjoint veut travailler : une démarche à part entière</H2>
      <P>
        C'est le point qui surprend le plus de familles, et qui génère le plus de frustration
        quand il est mal anticipé. La carte « membre de famille » autorise à résider, à ouvrir
        un compte bancaire, à scolariser les enfants — mais <strong>pas</strong> à occuper un
        emploi. Si le conjoint trouve un poste au Maroc, l'employeur qui l'embauche doit monter
        un dossier TAECHIR classique en son nom, avec passage par l'ANAPEC comme pour n'importe
        quel autre recrutement international.
      </P>
      <Info>
        Seule exception : si le conjoint est marocain, le salarié étranger relève alors des
        catégories dispensées d'ANAPEC — c'est un cas différent du regroupement familial classique.
        Mais quand les deux membres du couple sont étrangers, chacun a besoin de son propre
        titre de travail s'il veut être salarié au Maroc.
      </Info>
      <P>
        Beaucoup de couples découvrent cette règle une fois installés, pensant qu'avoir « une
        carte de séjour » suffit pour travailler n'importe où. J'ai vu une conjointe française,
        traductrice indépendante, se faire recaler par un client marocain qui, en vérifiant
        son statut, s'est rendu compte qu'aucun dossier TAECHIR n'avait été déposé pour elle.
        Il a fallu tout reprendre depuis le début, avec plusieurs semaines de retard sur le contrat.
      </P>

      <H2>Et la scolarité des enfants ?</H2>
      <P>
        Une fois la carte de séjour obtenue, l'inscription scolaire des enfants suit son propre
        calendrier — mission française, écoles internationales ou système marocain, selon le
        projet familial et la ville d'affectation. Casablanca et Rabat concentrent l'essentiel
        de l'offre d'écoles internationales, avec des listes d'attente qui peuvent être longues
        selon le niveau. Un conseil qui revient souvent chez les employeurs qui gèrent plusieurs
        mobilités par an : lancer les démarches d'inscription scolaire en parallèle du dossier
        de regroupement familial, sans attendre la carte de séjour des enfants — la plupart
        des établissements acceptent un dossier d'inscription sur la base du passeport et
        du justificatif de la mobilité professionnelle du parent.
      </P>
      <Warning>
        Pour un enfant qui approche de ses 18 ans au moment du regroupement, anticipez sa
        situation après la majorité : s'il reste au Maroc pour poursuivre ses études, il
        devra basculer vers une carte de séjour « étudiant » avant l'expiration de sa carte
        « membre de famille ». C'est une démarche distincte, avec ses propres pièces
        (certificat de scolarité, justificatif de ressources), à ne pas laisser filer au
        dernier moment.
      </Warning>

      <Divider />

      <H2>Le calendrier réaliste, famille par famille</H2>
      <P>
        Chaque situation familiale a ses propres délais selon la nationalité, la préfecture
        et le nombre de pièces à faire traduire. Mais globalement, pour une famille de deux
        adultes et deux enfants avec des documents déjà légalisés au départ, on peut boucler
        l'ensemble des cartes de séjour <strong>en 2 à 3 mois après l'arrivée du salarié</strong>.
        Sans anticipation sur les actes d'état civil, il n'est pas rare que ça dépasse
        <strong> 4 à 5 mois</strong>, notamment pour les pays où l'apostille ou la légalisation
        consulaire prend du temps.
      </P>

      <LeadBox
        title="Vous accompagnez l'installation d'un salarié étranger et de sa famille ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Regroupement familial, scolarisation des enfants, dossier TAECHIR pour un conjoint
          qui souhaite travailler : ces démarches parallèles se planifient mieux qu'elles ne
          se rattrapent. Décrivez-nous votre situation et nous pouvons vous orienter vers un
          spécialiste habitué à ces dossiers.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Un salarié étranger peut-il faire venir sa famille dès son arrivée au Maroc ?', a: 'La famille peut arriver physiquement en tant que visiteurs, mais la demande de carte de séjour au titre du regroupement familial ne peut être instruite qu\'une fois le salarié lui-même titulaire de sa propre carte de séjour valide.' },
          { q: 'La carte de séjour « membre de famille » permet-elle de travailler ?', a: 'Non. Elle autorise uniquement à résider. Le conjoint qui souhaite travailler doit passer par son propre dossier TAECHIR, avec attestation ANAPEC sauf s\'il relève d\'une catégorie dispensée.' },
          { q: 'Le concubinage ou le PACS ouvre-t-il droit au regroupement familial ?', a: 'Non. Le droit marocain ne reconnaît que le mariage légalement constitué pour ouvrir la carte de séjour du conjoint. Un acte de mariage légalisé et traduit est indispensable.' },
          { q: 'Que se passe-t-il quand un enfant à charge atteint la majorité ?', a: 'Il ne peut plus rester sur la carte « membre de famille ». Il doit basculer vers une carte « étudiant » s\'il poursuit des études au Maroc, ou vers son propre dossier TAECHIR s\'il travaille.' },
        ]}
      />
    </>
  );
}

/* ─── Article 24 — CDD ou CDI pour un salarié étranger ──────────────────── */

function Article24Content() {
  return (
    <>
      <Lead>
        « On part sur un CDD ou un CDI ? » — c'est une question que beaucoup d'employeurs
        expédient en deux minutes au moment de générer le contrat sur TAECHIR, en pensant
        que ça n'a pas grande importance. Erreur. Ce choix détermine la durée de votre visa
        de travail, la façon dont vous allez devoir le renouveler, et ce qui vous attend si
        la collaboration s'arrête plus tôt que prévu. Voici ce qu'il faut trancher avant de
        remplir le formulaire, pas après.
      </Lead>

      <H2>Ce que dit le Code du travail, sans le jargon</H2>
      <P>
        Le CDI reste le contrat de référence en droit marocain — c'est la forme par défaut,
        celle que le législateur privilégie. Le CDD, lui, n'est autorisé que dans des cas
        précis prévus par l'article 16 du Code du travail : remplacement d'un salarié absent,
        accroissement temporaire d'activité, travaux à caractère saisonnier, ou lancement
        d'une nouvelle activité pour une durée maximale d'un an, renouvelable une fois.
      </P>
      <P>
        Rien dans ces textes ne traite différemment un salarié étranger d'un salarié marocain
        sur ce point — les mêmes règles de fond s'appliquent. Ce qui change, c'est
        l'articulation avec la procédure TAECHIR, qui elle est spécifique aux étrangers.
      </P>
      <Info>
        Le formulaire TAECHIR ne vous impose pas un type de contrat plutôt qu'un autre.
        Mais le type de contrat que vous saisissez détermine directement la durée du visa
        qui sera apposé — c'est là que le choix devient stratégique.
      </Info>

      <H2>Comment le contrat détermine la durée du visa</H2>
      <P>
        Le visa de travail délivré par le Ministère est calé sur la durée du contrat déposé.
        Pour un CDI, le visa est généralement délivré pour <strong>un an</strong>, renouvelable
        ensuite chaque année selon la procédure allégée décrite dans notre guide du
        renouvellement. Pour un CDD, le visa suit la durée exacte du contrat — s'il porte sur
        6 mois, le visa couvre 6 mois, pas un jour de plus.
      </P>
      <P>
        Concrètement, ça veut dire qu'un CDD de 3 mois pour tester une collaboration
        oblige à repasser une procédure complète de renouvellement — ANAPEC compris si le
        profil n'est pas dispensé — dès que le contrat arrive à échéance. J'ai vu un
        employeur à Casablanca enchaîner deux CDD de 3 mois sur le même poste pour « voir
        venir » : au final, il avait payé deux fois les frais ANAPEC pour une situation
        qu'un CDI avec période d'essai aurait réglée d'entrée en une seule démarche.
      </P>

      <Table
        rows={[
          ['Critère', 'CDI', 'CDD'],
          ['Durée du visa TAECHIR', '1 an, renouvelable', 'Calée sur la durée du contrat'],
          ['Cas d\'usage légal', 'Poste pérenne, sans limite de durée', 'Motif précis : remplacement, surcroît, saisonnier, nouvelle activité'],
          ['Renouvellement ANAPEC', 'Procédure allégée après le 1er dossier', 'Nouveau passage à chaque échéance, sauf dispense'],
          ['Rupture anticipée', 'Préavis + indemnités selon ancienneté', 'Dommages-intérêts dus au salarié, sauf faute grave'],
          ['Perception côté Ministère', 'Poste jugé stable, dossier généralement plus simple', 'Justification du motif du CDD parfois demandée'],
        ]}
      />

      <H2>Pourquoi la plupart des employeurs choisissent le CDI</H2>
      <P>
        Sur les dossiers que j'accompagne, le CDI reste très largement majoritaire dès le
        premier recrutement — et pas seulement par préférence légale. C'est aussi le choix
        le plus simple à gérer administrativement : un visa d'un an, une période d'essai qui
        permet de mettre fin à la relation sans les contraintes du CDD si ça ne convient pas,
        et un renouvellement qui devient une formalité de 48 heures les années suivantes.
      </P>
      <P>
        La période d'essai d'un CDI — 3 mois pour un cadre, renouvelable une fois — joue
        souvent le rôle que certains employeurs cherchent à donner artificiellement à un CDD
        court : tester la collaboration avant de s'engager durablement. Sauf qu'avec un CDI,
        vous n'avez pas à repasser par l'ANAPEC au bout de trois mois si tout se passe bien.
      </P>

      <H3>Le CDD, réservé aux vraies situations temporaires</H3>
      <P>
        Le CDD garde tout son sens dans certains contextes bien précis : un ingénieur détaché
        sur un chantier BTP à Tanger pour la durée exacte du projet, un expert technique venu
        remplacer un salarié en congé de maternité, ou un renfort saisonnier dans
        l'agroalimentaire. Dans ces cas, le CDD colle à la réalité de la mission et le visa
        calé sur sa durée n'est pas une contrainte, c'est simplement cohérent.
      </P>
      <Warning>
        Un piège classique : enchaîner des CDD successifs sur le même poste au-delà de la
        durée maximale légale pour éviter de s'engager en CDI. Le droit du travail marocain
        requalifie automatiquement la relation en CDI si cette limite est dépassée — et ce,
        qu'il s'agisse d'un salarié marocain ou étranger. Une requalification en cours de
        contrat TAECHIR peut compliquer sérieusement le dossier auprès du Ministère, qui se
        retrouve avec un contrat visé qui ne correspond plus à la réalité juridique de la
        relation de travail.
      </Warning>

      <H2>Rupture anticipée : les conséquences ne sont pas les mêmes</H2>
      <P>
        Si le contrat s'arrête avant son terme — décision de l'employeur, du salarié, ou
        d'un commun accord — les conséquences légales diffèrent nettement selon le type de
        contrat, et elles ont aussi un impact direct sur le titre de séjour du salarié.
      </P>
      <P>
        Pour un CDI, une rupture avant l'issue de la période d'essai reste libre pour les
        deux parties ; passé cette période, elle suit les règles du licenciement ou de la
        démission, avec préavis et indemnités selon l'ancienneté. Pour un CDD rompu
        anticipativement sans faute grave ni accord des deux parties, l'employeur qui met fin
        au contrat doit en principe des dommages-intérêts correspondant aux salaires restant
        dus jusqu'au terme prévu.
      </P>
      <Tip>
        Que ce soit un CDD ou un CDI, gardez en tête que la fin du contrat de travail met fin
        à l'autorisation de travailler du salarié étranger, indépendamment de sa carte de
        séjour qui, elle, peut rester valide plus longtemps. Notre guide sur la fin de contrat
        d'un salarié étranger détaille précisément ce qui se passe ensuite, démarche par
        démarche.
      </Tip>

      <Divider />

      <H2>Notre recommandation, dossier par dossier</H2>
      <P>
        Il n'existe pas de bon choix universel — tout dépend de la nature réelle du poste.
        Voici la grille que j'utilise en pratique pour trancher avec les employeurs que
        j'accompagne :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Poste pérenne, sans date de fin prévisible</strong> → CDI, avec période d'essai pour sécuriser les deux parties.</li>
        <li><strong>Mission liée à un chantier ou un projet daté</strong> → CDD calé sur la durée réelle du projet, sans excéder les limites légales.</li>
        <li><strong>Remplacement d'un salarié absent</strong> → CDD pour la durée de l'absence, avec le motif clairement indiqué dans le contrat.</li>
        <li><strong>Vous hésitez encore sur le profil après plusieurs entretiens</strong> → CDI avec période d'essai plutôt qu'un CDD de complaisance, pour éviter une double procédure ANAPEC en cas de confirmation.</li>
      </ul>
      <P>
        Dans le doute, un contrat qui reflète honnêtement la réalité du poste évite les
        mauvaises surprises — aussi bien devant l'inspection du travail que devant le guichet
        du Ministère au moment du dépôt ou du renouvellement.
      </P>

      <LeadBox
        title="Vous hésitez entre CDD et CDI pour votre prochain recrutement ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Le bon choix dépend de la nature du poste, de la durée réelle du besoin et de votre
          stratégie de renouvellement. Décrivez-nous votre situation et nous pouvons vous
          orienter vers un spécialiste habitué aux dossiers TAECHIR.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Le formulaire TAECHIR impose-t-il un type de contrat ?', a: 'Non. Vous choisissez CDD ou CDI selon la réalité du poste, mais ce choix détermine ensuite la durée du visa de travail délivré par le Ministère.' },
          { q: 'Un CDD peut-il être renouvelé indéfiniment pour un salarié étranger ?', a: 'Non, les mêmes limites légales qu\'un salarié marocain s\'appliquent. Au-delà de la durée maximale autorisée, la relation est automatiquement requalifiée en CDI, ce qui peut compliquer le dossier TAECHIR en cours.' },
          { q: 'Quelle est la durée du visa TAECHIR pour un CDI ?', a: 'Généralement un an, renouvelable ensuite selon la procédure allégée (48 heures, 1 500 Dhs) décrite dans notre guide du renouvellement.' },
          { q: 'Que se passe-t-il si un CDD est rompu avant son terme ?', a: 'Sauf faute grave ou accord des deux parties, l\'employeur qui met fin au CDD par anticipation doit en principe des dommages-intérêts au salarié correspondant aux salaires restant dus jusqu\'à l\'échéance prévue.' },
        ]}
      />
    </>
  );
}

/* ─── Article 25 — Carte de résident après plusieurs années ────────────── */

function Article25Content() {
  return (
    <>
      <Lead>
        Après trois ou quatre renouvellements TAECHIR, beaucoup de mes clients me posent la
        même question : « On est obligés de refaire ça chaque année, indéfiniment ? » La
        réponse est non — à condition que le salarié étranger, de son côté, passe à la carte
        de résident. C'est un changement de statut qui allège vraiment la vie de tout le
        monde, mais qui reste mal connu et souvent découvert trop tard.
      </Lead>

      <H2>Carte de séjour et carte de résident : deux titres, pas un seul</H2>
      <P>
        La confusion est fréquente, alors autant la lever tout de suite. La <strong>carte
        de séjour</strong> — celle que le salarié obtient à son arrivée, comme détaillé dans
        notre guide sur la carte de séjour DGSN — est un titre limité dans le temps, calé sur
        la durée du contrat de travail visé. Elle se renouvelle chaque année, en même temps
        que le dossier TAECHIR.
      </P>
      <P>
        La <strong>carte de résident</strong>, elle, est un titre différent, réservé aux
        étrangers qui justifient d'une résidence régulière et ininterrompue au Maroc depuis
        plusieurs années. Elle est délivrée pour <strong>10 ans</strong>, renouvelable, et
        dispense son titulaire de repasser chaque année par le guichet de la préfecture pour
        la partie « séjour ». C'est un vrai confort administratif.
      </P>
      <Info>
        Attention à ne pas confondre les deux plans : la carte de résident règle la question
        du <strong>séjour</strong>. Elle ne dispense pas l'employeur de la procédure TAECHIR
        pour l'<strong>autorisation de travail</strong>, qui reste une démarche distincte liée
        au contrat. Les deux titres coexistent, mais l'un devient beaucoup plus stable que
        l'autre.
      </Info>

      <H2>Qui peut demander la carte de résident ?</H2>
      <P>
        Le cadre est fixé par la loi 02-03 relative à l'entrée et au séjour des étrangers au
        Royaume. Pour un salarié étranger recruté via TAECHIR, la voie la plus courante est
        celle de la résidence continue : avoir résidé au Maroc de manière <strong>régulière
        et ininterrompue pendant au moins quatre années</strong>, sous couvert d'une carte de
        séjour valide, renouvelée sans interruption sur cette période.
      </P>
      <P>D'autres situations donnent accès à la carte de résident, parfois plus rapidement :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Conjoint(e) de ressortissant marocain</strong> — sous condition de deux années de mariage et de résidence régulière.</li>
        <li><strong>Enfant né au Maroc de parents étrangers</strong> — à sa majorité, sous certaines conditions.</li>
        <li><strong>Retraité ayant résidé durablement au Maroc</strong> — cas plus rare pour nos dossiers, mais qui existe.</li>
      </ul>
      <P>
        Pour la grande majorité des salariés que j'accompagne, c'est la voie des quatre
        années de résidence continue qui s'applique. Concrètement, cela veut dire quatre
        renouvellements TAECHIR réussis, sans trou dans le dossier.
      </P>

      <H2>La régularité, c'est le nerf de la guerre</H2>
      <P>
        Le mot qui compte le plus dans ce dossier, c'est « ininterrompue ». Si la carte de
        séjour a expiré à un moment donné — même quelques semaines, même pour une raison
        purement administrative — la préfecture peut considérer que la continuité est rompue
        et refuser de comptabiliser les années antérieures.
      </P>
      <P>
        J'ai vu un cas à Casablanca où un salarié en était à sa quatrième année, mais son
        renouvellement de carte de séjour avait pris trois semaines de retard l'année
        précédente à cause d'un dossier TAECHIR déposé trop tard par l'employeur. Résultat :
        la préfecture a estimé que la résidence n'était pas strictement continue et a demandé
        de repartir sur une nouvelle période de référence. C'est exactement le genre de
        situation qu'on peut éviter en anticipant les renouvellements TAECHIR de 2 à 3 mois,
        comme on le recommande systématiquement.
      </P>
      <Warning>
        Chaque interruption de la carte de séjour — expiration non renouvelée à temps, gap
        entre deux contrats lors d'un changement d'employeur — remet potentiellement le
        compteur à zéro. Gardez une trace de chaque titre délivré : les dates de validité de
        chaque carte de séjour sont la première pièce qu'on vous demandera pour prouver la
        continuité.
      </Warning>

      <H2>Le dossier à préparer</H2>
      <Table
        rows={[
          ['Document', 'Détail'],
          ['Les cartes de séjour successives', 'Toutes les cartes obtenues depuis l\'arrivée, sans trou de validité'],
          ['Justificatif de revenus stables', 'Bulletins de salaire et attestation de travail récente de l\'employeur'],
          ['Bordereaux CNSS', 'Historique de cotisation sur la période de résidence'],
          ['Justificatif de domicile', 'Contrat de bail ou titre de propriété récent'],
          ['Casier judiciaire', 'Extrait marocain, et parfois du pays d\'origine selon le dossier'],
          ['Passeport en cours de validité', 'Avec les cachets d\'entrée si demandés'],
        ]}
      />
      <P>
        Le dossier se dépose au bureau des étrangers de la préfecture ou de la DGSN dont
        dépend le domicile du salarié — les mêmes services qui gèrent la carte de séjour au
        quotidien. Comptez plusieurs semaines de traitement, parfois plusieurs mois selon la
        préfecture : Casablanca et Rabat, qui traitent le plus de dossiers, ne sont pas
        toujours les plus rapides.
      </P>

      <H2>Ce qui change concrètement une fois la carte obtenue</H2>
      <P>
        Le bénéfice principal est simple : plus besoin de repasser chaque année au guichet
        DGSN pour renouveler le titre de séjour. La carte de résident couvre dix ans, ce qui
        supprime une bonne partie du stress administratif annuel côté salarié.
      </P>
      <P>
        Mais — et c'est le point que beaucoup d'employeurs négligent — la mécanique TAECHIR,
        elle, continue de tourner normalement si le salarié reste en poste. Le contrat de
        travail garde sa propre durée de validité, et le visa doit toujours être renouvelé
        selon les règles habituelles décrites dans notre guide du renouvellement. La carte de
        résident simplifie la vie du salarié, pas les obligations de l'employeur envers le
        Ministère.
      </P>
      <Tip>
        Une carte de résident valide facilite en revanche les futurs renouvellements TAECHIR :
        elle constitue une preuve de stabilité et de régularité du séjour qui rassure le
        guichet, et elle évite d'avoir à jongler chaque année entre deux administrations qui
        ne se parlent pas toujours.
      </Tip>

      <H2>Et si le salarié change d'employeur entre-temps ?</H2>
      <P>
        Un changement d'employeur ne remet pas en cause la carte de résident une fois qu'elle
        est délivrée — elle reste valable dix ans, indépendamment du contrat de travail en
        cours. Par contre, pendant la phase de constitution du dossier, avant que les quatre
        années de résidence continue ne soient acquises, un changement d'employeur mal
        anticipé — avec un gap entre l'ancien et le nouveau contrat visé — peut, comme on l'a
        vu, casser la continuité recherchée. Si une transition est prévue, mieux vaut la
        préparer en amont avec le nouvel employeur pour qu'il n'y ait pas de trou dans le
        dossier TAECHIR.
      </P>

      <Divider />

      <LeadBox
        title="Votre salarié étranger approche des quatre ans de présence ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Le passage à la carte de résident demande un dossier solide et une continuité sans
          faille dans l'historique des renouvellements. Décrivez-nous la situation et nous
          pouvons vous orienter vers un spécialiste habitué à ces dossiers.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Au bout de combien de temps un salarié étranger peut-il demander la carte de résident ?', a: 'En général après quatre années de résidence régulière et ininterrompue au Maroc, sous couvert de cartes de séjour valides et renouvelées sans interruption sur toute la période.' },
          { q: 'La carte de résident remplace-t-elle le dossier TAECHIR ?', a: 'Non. La carte de résident concerne uniquement le droit au séjour. L\'autorisation de travailler, elle, reste liée au contrat de travail et continue de suivre la procédure TAECHIR habituelle, avec ses renouvellements.' },
          { q: 'Une interruption de la carte de séjour empêche-t-elle d\'obtenir la carte de résident ?', a: 'Elle peut casser la continuité exigée par la préfecture, qui peut alors refuser de comptabiliser les années antérieures et demander de reconstituer une nouvelle période de référence de résidence ininterrompue.' },
          { q: 'La carte de résident est-elle valable si le salarié change d\'employeur ?', a: 'Oui, une fois délivrée, la carte de résident reste valable dix ans indépendamment de l\'employeur. Seule la phase d\'acquisition, avant l\'obtention du titre, est sensible à une éventuelle interruption du séjour régulier.' },
        ]}
      />
    </>
  );
}

/* ─── Article 26 ────────────────────────────────────────────────────────── */

function Article26Content() {
  return (
    <>
      <Lead>
        De plus en plus d'étrangers s'installent au Maroc tout en gardant leur emploi chez
        un employeur basé à l'étranger — développeurs, consultants, designers, cadres en
        télétravail complet. Le réflexe de beaucoup, c'est de me demander : « on fait un
        dossier TAECHIR ? » La réponse est presque toujours non, et c'est justement là que
        les choses se compliquent, parce que personne ne leur explique ce qu'il faut faire à la place.
      </Lead>

      <H2>Pourquoi TAECHIR ne s'applique pas ici</H2>
      <P>
        TAECHIR répond à une situation précise : un <strong>employeur marocain</strong> qui
        veut embaucher un salarié étranger sur un poste au Maroc. Toute la mécanique —
        attestation ANAPEC, contrat visé par le Ministère, priorité nationale à l'emploi —
        repose sur l'existence d'une relation de travail avec une entreprise installée ici.
      </P>
      <P>
        Un salarié qui reste sous contrat avec une société basée à Paris, Londres ou Dubaï,
        et qui se contente de travailler depuis un appartement à Casablanca ou Marrakech,
        ne rentre pas dans ce cadre. Il n'y a pas d'employeur marocain, donc pas de dossier
        TAECHIR à monter. C'est souvent un soulagement pour les gens que j'accompagne — mais
        ça ne veut absolument pas dire qu'il n'y a rien à faire.
      </P>
      <Info>
        Le vide juridique n'existe pas vraiment : il n'y a simplement pas de procédure
        <em> unique</em> et bien balisée comme TAECHIR pour ce cas de figure. Cela veut dire
        qu'il faut assembler soi-même les bonnes briques — séjour, fiscalité, couverture
        santé — plutôt que suivre un parcours tout tracé.
      </Info>

      <H2>Le vrai sujet : le titre de séjour, pas le travail</H2>
      <P>
        Le point que la plupart des télétravailleurs sous-estiment, c'est la durée de séjour.
        Un visa touristique ou une entrée sans visa autorise généralement <strong>90 jours</strong>
        {' '}sur le territoire. Au-delà, rester au Maroc sans régulariser sa situation devient
        un séjour irrégulier — même si le travail effectué se passe entièrement en ligne pour
        une entreprise à l'étranger.
      </P>
      <P>
        J'ai eu le cas d'un développeur canadien installé à Tanger depuis huit mois, payé par
        sa boîte à Montréal, qui pensait être « invisible » aux yeux de l'administration
        marocaine puisqu'il ne travaillait pour aucune entreprise locale. Sauf qu'il n'avait
        jamais renouvelé son statut au-delà des 90 premiers jours. Techniquement en situation
        irrégulière depuis des mois, sans le savoir.
      </P>
      <Warning>
        Travailler à distance pour un employeur étranger ne dispense jamais de régulariser
        son séjour au Maroc au-delà de 90 jours. Les deux sujets — autorisation de travail
        et droit au séjour — restent distincts, même quand le premier ne s'applique pas.
      </Warning>

      <H2>Quelle voie pour rester en règle sur le séjour ?</H2>
      <H3>La carte de séjour pour ressources suffisantes</H3>
      <P>
        C'est la voie la plus courante pour les télétravailleurs. Sans contrat de travail
        marocain à présenter, le dossier se construit autour de la preuve de revenus stables
        venant de l'étranger : bulletins de salaire ou contrats de prestation, relevés
        bancaires des derniers mois, parfois une attestation de l'employeur. La logique de la
        préfecture est simple : montrer que la personne dispose de moyens suffisants pour
        vivre au Maroc sans peser sur le marché du travail local.
      </P>
      <H3>Le statut d'indépendant local (auto-entrepreneur ou société)</H3>
      <P>
        Certains choisissent de facturer leurs prestations depuis une structure marocaine —
        statut d'auto-entrepreneur ou société de portage. Cette option a un avantage réel :
        elle simplifie la fiscalité et donne accès à une couverture sociale locale via l'AMO.
        Mais attention, l'inscription en tant qu'auto-entrepreneur suppose déjà d'avoir un
        titre de séjour en cours — ce n'est pas un raccourci pour l'obtenir.
      </P>
      <H3>Le portage salarial international</H3>
      <P>
        Une société de portage à l'étranger emploie formellement la personne et facture le
        client final ; le télétravailleur touche un salaire. Ça ne change rien côté séjour
        marocain — la carte pour ressources suffisantes reste nécessaire — mais ça peut
        simplifier la vie de ceux dont le statut de freelance pur pose problème vis-à-vis de
        leur ancien employeur ou de la réglementation de leur pays d'origine.
      </P>
      <Table
        rows={[
          ['Situation', 'Titre de séjour', 'Couverture sociale', 'Fiscalité au Maroc'],
          ['Salarié à distance, employeur étranger', 'Carte pour ressources suffisantes', 'Assurance privée à sa charge', 'Selon résidence fiscale (183 jours)'],
          ['Auto-entrepreneur / société locale', 'Titre de séjour préexistant requis', 'AMO via cotisations locales', 'Impôt marocain sur le revenu local'],
          ['Portage salarial international', 'Carte pour ressources suffisantes', 'Selon le pays de la société de portage', 'Selon résidence fiscale (183 jours)'],
        ]}
      />

      <H2>Et côté fiscal, ça se joue où ?</H2>
      <P>
        C'est le deuxième angle mort classique. Comme on le détaille dans notre article sur
        la fiscalité de l'expatrié, la résidence fiscale au Maroc se déclenche notamment au-delà
        de <strong>183 jours</strong> de présence sur une période de douze mois — indépendamment
        du pays qui verse le salaire. Un télétravailleur fiscalement résident au Maroc doit en
        principe déclarer l'ensemble de ses revenus mondiaux ici, sous réserve des conventions
        de non-double imposition entre le Maroc et le pays de l'employeur.
      </P>
      <P>
        J'ai vu plusieurs profils partir du principe que « puisque mon salaire arrive sur un
        compte à l'étranger, ça ne regarde pas le fisc marocain ». C'est une erreur classique
        qui peut coûter cher au moment d'une régularisation, surtout que les échanges
        automatiques d'informations bancaires entre administrations fiscales se sont
        largement généralisés.
      </P>
      <Tip>
        Avant de dépasser les six mois de présence, faites le point avec un fiscaliste sur
        votre statut de résident fiscal et sur la convention applicable entre le Maroc et
        votre pays d'origine. Anticiper coûte largement moins cher que régulariser après coup.
      </Tip>

      <H2>La couverture santé : personne ne s'en occupe à votre place</H2>
      <P>
        Sans employeur marocain, pas de CNSS, pas d'AMO automatique. C'est un point que
        beaucoup découvrent seulement en cas de pépin médical. La solution la plus répandue
        reste une assurance santé internationale privée, comme on l'explique dans notre guide
        sur l'assurance santé pour expatrié — à souscrire avant même le départ, pas une fois
        installé.
      </P>

      <H2>Les erreurs les plus fréquentes</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Enchaîner les sorties de territoire tous les 90 jours</strong> pour repartir
          sur un nouveau compteur touristique. Ça fonctionnait autrefois de façon tolérée dans
          certains cas, mais ce n'est pas un statut légal stable et ça peut être requalifié en
          contournement lors d'un contrôle.
        </li>
        <li>
          <strong>Ignorer la question fiscale</strong> en se disant que le salaire étranger «
          n'a rien à voir » avec le Maroc. Le lieu de résidence effective compte davantage que
          le lieu de versement du salaire.
        </li>
        <li>
          <strong>Confondre carte de séjour et autorisation de travail.</strong> La carte pour
          ressources suffisantes autorise à résider, pas à exercer une activité rémunérée
          <em> pour un employeur marocain</em>. Si la situation évolue vers un vrai poste local,
          c'est TAECHIR qui reprend la main.
        </li>
      </ul>
      <Warning>
        Si un télétravailleur bascule, même partiellement, vers une mission facturée à une
        entreprise marocaine, la logique change : selon la nature du lien, cela peut nécessiter
        un vrai contrat de travail local et donc un dossier TAECHIR classique. Le statut de
        télétravailleur pour un employeur étranger ne suit pas automatiquement la personne si
        son activité évolue.
      </Warning>

      <Divider />

      <LeadBox
        title="Vous vous installez au Maroc en télétravail pour un employeur étranger ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Titre de séjour, fiscalité, couverture santé : chaque situation a ses subtilités.
          Décrivez-nous votre cas et nous pouvons vous orienter vers un spécialiste habitué
          à ces dossiers.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Un télétravailleur payé par une entreprise étrangère a-t-il besoin d\'un dossier TAECHIR ?', a: 'Non, tant qu\'il n\'existe pas de relation d\'emploi avec une entreprise marocaine. TAECHIR concerne uniquement les recrutements par un employeur installé au Maroc.' },
          { q: 'Peut-on rester au Maroc indéfiniment avec des allers-retours tous les 90 jours ?', a: 'Ce n\'est pas un statut légal stable et ça peut être requalifié lors d\'un contrôle. Au-delà de 90 jours de présence continue, il faut régulariser sa situation, généralement via une carte de séjour pour ressources suffisantes.' },
          { q: 'Un télétravailleur pour un employeur étranger doit-il payer des impôts au Maroc ?', a: 'S\'il devient résident fiscal marocain — notamment au-delà de 183 jours de présence sur douze mois — il doit en principe déclarer ses revenus au Maroc, sous réserve des conventions de non-double imposition applicables.' },
          { q: 'Comment un télétravailleur étranger est-il couvert en cas de maladie ?', a: 'Sans employeur marocain, il n\'y a pas d\'affiliation CNSS ni d\'AMO automatique. Une assurance santé internationale privée, souscrite avant l\'installation, est la solution la plus courante.' },
        ]}
      />
    </>
  );
}

/* ─── Article 27 ────────────────────────────────────────────────────────── */

function Article27Content() {
  return (
    <>
      <Lead>
        C'est une confusion que je vois revenir sans arrêt : un employeur me demande de
        "faire faire l'équivalence" du diplôme de son futur salarié étranger avant de monter
        le dossier TAECHIR — alors que dans 9 cas sur 10, ce n'est pas du tout ce qu'on lui
        demandera au guichet. L'équivalence de diplôme est une vraie procédure, utile et
        parfois obligatoire, mais rarement pour les raisons qu'on croit.
      </Lead>

      <H2>Équivalence, légalisation, traduction : trois choses différentes</H2>
      <P>
        On mélange souvent ces trois démarches parce qu'elles concernent toutes le même bout
        de papier — le diplôme — mais elles ne répondent pas à la même question.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>La légalisation ou l'apostille</strong> atteste que le diplôme est authentique — qu'il a bien été émis par l'établissement indiqué. On en parle en détail dans notre guide sur la légalisation des documents étrangers.</li>
        <li><strong>La traduction assermentée</strong> rend le contenu du diplôme lisible en français ou en arabe pour l'administration marocaine.</li>
        <li><strong>L'équivalence</strong> va plus loin : elle compare le niveau du diplôme étranger à un diplôme marocain officiel et lui attribue une correspondance reconnue par l'État — bac, licence, master, doctorat.</li>
      </ul>
      <Info>
        Un diplôme peut être parfaitement légalisé et traduit sans jamais avoir fait l'objet
        d'une équivalence. Ce sont deux démarches indépendantes, qui ne se déclenchent pas au
        même moment ni pour les mêmes raisons.
      </Info>

      <H2>Est-ce vraiment nécessaire pour un dossier TAECHIR ?</H2>
      <P>
        C'est la question qui revient le plus souvent, et la réponse surprend beaucoup
        d'employeurs : pour la grande majorité des dossiers TAECHIR dans le secteur privé,
        <strong> non</strong>. Comme on le détaille dans notre guide du recrutement, le
        Ministère demande une copie certifiée conforme du diplôme, avec traduction assermentée
        si besoin — pas une équivalence officielle. Le guichet vérifie que le poste correspond
        au profil du salarié, pas que son diplôme a une correspondance administrative marocaine.
      </P>
      <P>Il y a cependant des situations où l'équivalence devient réellement nécessaire :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Les professions réglementées</strong> — médecin, pharmacien, architecte, expert-comptable, avocat — où l'inscription à un ordre professionnel marocain exige une équivalence reconnue avant même de pouvoir exercer.</li>
        <li><strong>L'enseignement</strong>, dans le public comme dans certains établissements privés sous convention.</li>
        <li><strong>La fonction publique</strong> ou les postes dans des organismes publics et semi-publics.</li>
        <li><strong>La poursuite d'études</strong> au Maroc après l'embauche, ou une future demande de naturalisation où le niveau de diplôme est pris en compte.</li>
      </ul>
      <Tip>
        Avant de vous lancer dans une démarche d'équivalence par précaution, vérifiez si le
        poste concerné en a réellement besoin. J'ai vu des employeurs payer un traducteur
        assermenté et lancer une procédure de plusieurs mois pour un poste d'ingénieur logiciel
        en entreprise privée, alors qu'une simple copie certifiée conforme suffisait pour le
        dossier TAECHIR.
      </Tip>

      <H2>Qui délivre l'équivalence, et pour quels diplômes</H2>
      <P>
        Pour les diplômes de l'enseignement supérieur — licence, master, doctorat, diplômes
        d'ingénieur — c'est le <strong>Ministère de l'Enseignement Supérieur, de la Recherche
        Scientifique et de l'Innovation</strong> (MESRSI) qui est compétent, via sa Direction
        des Affaires Pédagogiques à Rabat. Pour le baccalauréat, la démarche relève plutôt du
        Ministère de l'Éducation Nationale.
      </P>
      <Table
        rows={[
          ['Type de diplôme', 'Autorité compétente', 'Lieu de dépôt'],
          ['Baccalauréat étranger', 'Ministère de l\'Éducation Nationale', 'Délégation régionale ou dépôt en ligne selon les cas'],
          ['Licence, master', 'MESRSI — Direction des Affaires Pédagogiques', 'Rabat'],
          ['Doctorat', 'MESRSI — Direction des Affaires Pédagogiques', 'Rabat'],
          ['Diplômes de santé (médecine, pharmacie)', 'MESRSI, en lien avec le Ministère de la Santé', 'Rabat'],
        ]}
      />

      <H2>Le dossier à préparer</H2>
      <P>
        La liste type, quel que soit le diplôme, ressemble à ceci :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Copie certifiée conforme du diplôme original</li>
        <li>Traduction officielle en arabe ou en français, réalisée par un traducteur assermenté, si le diplôme n'est pas déjà dans l'une de ces deux langues</li>
        <li>Relevés de notes de toutes les années d'études concernées</li>
        <li>Attestation de l'établissement confirmant la reconnaissance du diplôme dans le pays d'origine</li>
        <li>Diplôme légalisé ou apostillé selon le pays d'émission</li>
        <li>Copie de la carte de séjour, de la CIN ou du passeport</li>
        <li>Formulaire de demande d'équivalence dûment rempli</li>
      </ul>
      <Warning>
        Un dossier d'équivalence incomplet n'est pas juste ralenti — il est le plus souvent
        purement et simplement renvoyé, et il faut reconstituer l'ensemble avant de le redéposer.
        Vérifiez systématiquement la légalisation ou l'apostille du diplôme avant le dépôt : c'est
        le document qui coince le plus souvent.
      </Warning>

      <H2>Les délais, très variables selon le diplôme et le pays</H2>
      <P>
        C'est le point sur lequel il faut le moins se faire d'illusions : il n'y a pas de délai
        garanti. En pratique, comptez <strong>2 à 4 mois</strong> pour un baccalauréat,
        <strong> 3 à 6 mois</strong> pour une licence ou un master, et <strong>6 à 12 mois</strong>
        {' '}pour les diplômes de santé, qui passent par une commission sectorielle plus exigeante.
        Les diplômes d'universités européennes bien identifiées — France, Espagne, Belgique —
        vont généralement plus vite que ceux d'établissements moins connus, pour lesquels le
        MESRSI peut demander des pièces complémentaires ou un temps d'instruction plus long.
      </P>
      <P>
        Pour les professions réglementées, ce délai a un impact direct sur la date de prise de
        poste : un médecin étranger ne peut pas s'inscrire à l'Ordre national des médecins, donc
        pas exercer légalement, tant que son équivalence n'est pas obtenue. Contrairement au
        visa TAECHIR, on ne peut pas "faire commencer le salarié en attendant" — c'est un vrai
        préalable.
      </P>

      <H2>La commission nationale d'équivalence : trois issues possibles</H2>
      <P>
        Le dossier déposé est examiné par une commission sectorielle, qui rend l'une des trois
        décisions suivantes :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Équivalence accordée</strong> — le diplôme est reconnu tel quel, au niveau demandé.</li>
        <li><strong>Équivalence accordée sous condition</strong> — un complément de formation, un stage ou un examen spécifique peut être exigé avant la reconnaissance définitive.</li>
        <li><strong>Équivalence refusée</strong> — la commission estime que le contenu ou le volume horaire de la formation ne correspond pas au niveau marocain visé.</li>
      </ul>
      <P>
        J'ai eu le cas d'une infirmière ivoirienne dont le diplôme a été reconnu sous condition
        d'un stage pratique de quelques mois dans un établissement marocain avant validation
        définitive. Frustrant sur le moment, mais ça reste beaucoup plus rapide qu'un refus pur
        et simple, qui oblige à repartir sur un autre type de dossier ou de poste.
      </P>

      <H2>Les pièges que je vois le plus souvent</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Confondre légalisation et équivalence.</strong> Le diplôme apostillé et
          traduit suffit très largement pour la majorité des dossiers TAECHIR — inutile de
          lancer une procédure de plusieurs mois si le poste ne l'exige pas.
        </li>
        <li>
          <strong>Croire qu'un diplôme européen est automatiquement reconnu.</strong> Même un
          master d'une grande école française passe par la même commission que n'importe quel
          autre diplôme étranger. Il n'y a pas de raccourci lié au pays d'origine.
        </li>
        <li>
          <strong>Lancer la démarche trop tard</strong> pour une profession réglementée. Si le
          poste visé nécessite une inscription à un ordre professionnel, il faut démarrer
          l'équivalence des mois avant la date de prise de poste souhaitée — bien avant même
          de penser au dossier TAECHIR.
        </li>
      </ul>

      <Divider />

      <LeadBox
        title="Un doute sur le diplôme d'un futur salarié étranger ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Équivalence nécessaire ou pas, quelle autorité saisir, quel délai anticiper : décrivez-nous
          le poste et le profil, et nous pouvons vous orienter vers un spécialiste habitué à ces
          dossiers.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Faut-il une équivalence de diplôme pour monter un dossier TAECHIR ?', a: 'Dans la grande majorité des cas en entreprise privée, non : une copie certifiée conforme du diplôme, légalisée ou apostillée et traduite si besoin, suffit. L\'équivalence devient nécessaire surtout pour les professions réglementées, l\'enseignement ou la fonction publique.' },
          { q: 'Qui délivre l\'équivalence des diplômes au Maroc ?', a: 'Pour les diplômes de l\'enseignement supérieur (licence, master, doctorat), c\'est le Ministère de l\'Enseignement Supérieur, de la Recherche Scientifique et de l\'Innovation, via sa Direction des Affaires Pédagogiques à Rabat. Le baccalauréat relève du Ministère de l\'Éducation Nationale.' },
          { q: 'Combien de temps prend une équivalence de diplôme ?', a: 'Cela varie fortement : 2 à 4 mois pour un baccalauréat, 3 à 6 mois pour une licence ou un master, et 6 à 12 mois pour les diplômes de santé. Les diplômes d\'universités moins connues peuvent prendre plus de temps.' },
          { q: 'Un diplôme européen est-il automatiquement reconnu au Maroc ?', a: 'Non. Même un diplôme d\'un pays européen passe par la même commission d\'équivalence que n\'importe quel autre diplôme étranger, sans traitement accéléré lié au pays d\'origine.' },
        ]}
      />
    </>
  );
}

/* ─── Article 28 ────────────────────────────────────────────────────────── */

function Article28Content() {
  return (
    <>
      <Lead>
        C'est une question qui arrive presque systématiquement juste après la carte de séjour
        du conjoint : "et pour l'école des enfants, on fait comment ?" Et c'est une bonne
        question à se poser tôt, parce que contrairement à beaucoup de démarches TAECHIR, ici
        c'est souvent l'école qui a le dernier mot sur le calendrier — pas l'administration.
      </Lead>

      <H2>Les grandes familles d'écoles pour enfants d'étrangers</H2>
      <P>
        Au Maroc, un salarié étranger qui installe sa famille a en pratique quatre options
        principales, avec des logiques et des coûts très différents.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>
          <strong>Le réseau homologué français</strong> — établissements de la Mission Laïque
          Française (groupe OSUI) et lycées conventionnés AEFE comme le Lycée Lyautey à
          Casablanca ou le Lycée Descartes à Rabat. Programme français, diplômes reconnus
          en France, très demandé.
        </li>
        <li>
          <strong>Les écoles internationales anglophones</strong> — British International
          School, écoles à programme américain (Casablanca American School, Rabat American
          School) : cursus en anglais, IB ou curriculum britannique/américain.
        </li>
        <li>
          <strong>Les écoles européennes de niche</strong> — Instituto Español, Deutsche Schule,
          écoles italiennes : utiles surtout si la famille prévoit de repartir dans le pays
          concerné ou si un des parents en est originaire.
        </li>
        <li>
          <strong>Les écoles privées marocaines bilingues</strong> — souvent moins chères,
          programme marocain avec un enseignement renforcé en français ou en anglais. Une
          option pragmatique pour les familles qui s'installent durablement.
        </li>
      </ul>
      <Info>
        Le réseau homologué français est de loin le plus demandé par les familles d'employés
        étrangers à Casablanca et à Rabat, ce qui en fait aussi le plus difficile à intégrer
        en cours d'année. On y revient plus bas.
      </Info>

      <H2>Comparatif rapide</H2>
      <Table
        rows={[
          ['Type d\'école', 'Langue principale', 'Frais annuels indicatifs', 'Niveau de tension'],
          ['Réseau AEFE / Mission Laïque', 'Français', '30 000 – 55 000 Dhs', 'Élevé, surtout Casablanca'],
          ['Écoles anglophones (IB, US, UK)', 'Anglais', '70 000 – 150 000 Dhs', 'Élevé'],
          ['Écoles européennes de niche', 'Espagnol / allemand / italien', '25 000 – 45 000 Dhs', 'Modéré'],
          ['Privé marocain bilingue', 'Arabe / français', '15 000 – 35 000 Dhs', 'Faible à modéré'],
        ]}
      />
      <P>
        À ces frais de scolarité s'ajoutent presque toujours des <strong>droits de première
        inscription</strong> non récurrents — parfois 20 000 à 50 000 Dhs dans les écoles
        anglophones les plus cotées — ainsi que la cantine, le transport scolaire et les
        fournitures, qui peuvent représenter plusieurs milliers de dirhams supplémentaires
        par an.
      </P>

      <H2>Le vrai sujet : les listes d'attente</H2>
      <P>
        C'est le point que je répète à chaque famille que j'accompagne : au Maroc, ce n'est
        pas la carte de séjour de l'enfant qui bloque la scolarisation, c'est la place
        disponible. Les établissements du réseau français à Casablanca affichent régulièrement
        des listes d'attente de plusieurs mois, parfois pour certains niveaux seulement.
      </P>
      <P>
        J'ai vu une famille française arriver en septembre avec le contrat TAECHIR du parent
        tout juste visé, en pensant inscrire les enfants dans la foulée. Résultat : pas de
        place en primaire au Lycée Lyautey avant la rentrée suivante. Ils ont dû basculer
        temporairement sur une école privée bilingue, le temps qu'une place se libère.
      </P>
      <Warning>
        Lancez les démarches de scolarisation <strong>dès que la décision de venir au Maroc
        est prise</strong> — idéalement plusieurs mois avant l'arrivée, et sans attendre la
        carte de séjour de l'enfant. Beaucoup d'écoles acceptent un dossier avec un simple
        justificatif de recrutement de l'employeur ou une promesse d'embauche.
      </Warning>

      <H2>Le dossier d'inscription : ce qu'on vous demandera</H2>
      <P>
        D'un établissement à l'autre, les pièces varient un peu, mais le socle commun
        ressemble à ceci :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Certificat de scolarité et bulletins des deux ou trois dernières années</li>
        <li>Copie du passeport de l'enfant et, si elle est déjà obtenue, sa carte de séjour "membre de famille"</li>
        <li>Carnet de vaccination à jour</li>
        <li>Justificatif de la situation professionnelle du parent au Maroc — contrat TAECHIR visé ou, à défaut, attestation de l'employeur</li>
        <li>Pour un changement de programme (par exemple d'un système anglophone vers le français), un test de niveau est presque systématique</li>
      </ul>
      <Tip>
        Faites traduire et faire certifier conforme les bulletins scolaires avant le départ,
        pendant que vous êtes encore dans le pays d'origine — c'est beaucoup plus simple et
        rapide que de le faire depuis le Maroc dans l'urgence de la rentrée.
      </Tip>

      <H2>Et si l'enfant n'a pas encore sa carte de séjour ?</H2>
      <P>
        Comme on le détaille dans notre guide du regroupement familial, la carte de séjour
        "membre de famille" d'un enfant prend souvent plusieurs semaines à obtenir après
        l'arrivée. Bonne nouvelle : dans la grande majorité des établissements, l'inscription
        scolaire n'attend pas ce document. Un dossier avec passeport valide et justificatif
        de la situation du parent salarié suffit généralement pour démarrer l'année, la carte
        de séjour venant compléter le dossier administratif de l'école une fois délivrée.
      </P>

      <H2>Arrivée en cours d'année : c'est possible, mais ça se prépare</H2>
      <P>
        Beaucoup de recrutements TAECHIR ne tombent pas en septembre. Une arrivée en janvier
        ou en avril complique un peu les choses, mais ce n'est pas bloquant. Les écoles
        privées et les établissements bilingues marocains sont en général plus souples que le
        réseau AEFE sur les entrées en cours d'année. Pour ce dernier, tout dépend des places
        libérées niveau par niveau — mieux vaut contacter directement l'établissement dès que
        la date de prise de poste est connue plutôt que d'attendre l'arrivée effective.
      </P>
      <Info>
        Un enfant qui rejoint le Maroc en cours d'année scolaire peut, dans certains cas,
        intégrer temporairement une école privée bilingue le temps qu'une place se libère
        dans l'établissement visé initialement — plutôt que de rester sans scolarisation
        plusieurs mois.
      </Info>

      <H2>Les pièges les plus fréquents</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Attendre la carte de séjour de l'enfant pour lancer l'inscription.</strong>
          {' '}C'est l'erreur numéro un — l'école et la DGSN ne fonctionnent pas dans le même
          calendrier, autant mener les deux démarches en parallèle.
        </li>
        <li>
          <strong>Sous-estimer les droits de première inscription.</strong> Certaines familles
          découvrent le montant une fois sur place, alors qu'il faut souvent le régler
          intégralement pour valider la place.
        </li>
        <li>
          <strong>Négliger l'écart de programme.</strong> Un enfant qui passe d'un système
          anglophone à un système français (ou l'inverse) a presque toujours besoin d'un
          semestre d'adaptation, parfois d'un accompagnement linguistique en plus des cours.
        </li>
      </ul>

      <Divider />

      <LeadBox
        title="Une installation familiale à préparer en même temps que le dossier TAECHIR ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Recrutement du salarié, regroupement familial, scolarisation des enfants : ces
          démarches avancent souvent en parallèle. Décrivez-nous votre situation, nous pouvons
          vous orienter vers les bons interlocuteurs pour ne rien décaler inutilement.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Faut-il attendre la carte de séjour de l\'enfant pour l\'inscrire à l\'école ?', a: 'Non, dans la grande majorité des établissements. Un passeport valide et un justificatif de la situation professionnelle du parent salarié suffisent généralement pour démarrer les démarches d\'inscription, la carte de séjour venant compléter le dossier une fois délivrée.' },
          { q: 'Quel est l\'établissement le plus demandé pour les enfants d\'étrangers au Maroc ?', a: 'Le réseau homologué français (Mission Laïque Française, lycées conventionnés AEFE comme Lyautey à Casablanca ou Descartes à Rabat) est généralement le plus demandé, avec des listes d\'attente qui peuvent atteindre plusieurs mois selon le niveau.' },
          { q: 'Peut-on inscrire un enfant en cours d\'année scolaire ?', a: 'Oui, c\'est possible, notamment dans les écoles privées et bilingues marocaines qui sont en général plus souples que le réseau AEFE. Il vaut mieux contacter l\'établissement dès que la date de prise de poste du parent est connue plutôt que d\'attendre l\'arrivée effective au Maroc.' },
          { q: 'Combien coûte la scolarité d\'un enfant d\'expatrié au Maroc ?', a: 'Cela varie fortement selon le type d\'école : de 15 000 à 35 000 Dhs par an dans le privé marocain bilingue, 30 000 à 55 000 Dhs dans le réseau français, et jusqu\'à 70 000-150 000 Dhs dans les écoles internationales anglophones — sans compter les droits de première inscription, parfois substantiels.' },
        ]}
      />
    </>
  );
}

/* ─── Article 29 ────────────────────────────────────────────────────────── */

function Article29Content() {
  return (
    <>
      <Lead>
        C'est une question qui revient presque à chaque installation : "je garde ma voiture,
        je peux l'amener au Maroc ?" La réponse est oui, mais pas n'importe comment. Le régime
        qui s'applique s'appelle l'admission temporaire douanière, et si vous ne respectez pas
        ses règles, vous pouvez vous retrouver avec un véhicule bloqué à la douane — ou pire,
        une amende salée à la sortie du territoire.
      </Lead>

      <H2>Le principe : l'admission temporaire, pas l'importation définitive</H2>
      <P>
        Un salarié étranger qui s'installe au Maroc n'a pas besoin de dédouaner définitivement
        son véhicule personnel pour pouvoir rouler avec. L'Administration des Douanes et Impôts
        Indirects (ADII) prévoit un régime spécifique : l'<strong>admission temporaire (AT)</strong>.
        Concrètement, votre voiture entre au Maroc en franchise des droits et taxes normalement
        dus à l'importation, à condition qu'elle reste immatriculée à l'étranger, qu'elle ne soit
        ni vendue ni prêtée sur place, et qu'elle finisse par ressortir du territoire — ou soit
        dédouanée définitivement plus tard si vous décidez de la garder pour de bon.
      </P>
      <Info>
        L'admission temporaire n'est pas réservée aux salariés TAECHIR. Elle concerne tout
        résident étranger qui s'installe au Maroc avec un titre de séjour valide. Mais dans les
        faits, c'est un sujet qui revient très souvent une fois le contrat visé et le
        déménagement lancé — d'où sa place ici.
      </Info>

      <H2>Qui peut en bénéficier ?</H2>
      <P>
        Le régime vise les personnes qui transfèrent leur résidence habituelle au Maroc, pas les
        touristes de passage (qui ont leur propre régime, plus court). Pour un salarié étranger
        embauché via TAECHIR, les conditions généralement demandées sont :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Être titulaire d'une carte de séjour marocaine en cours de validité (ou en cours d'obtention, selon le bureau douanier)</li>
        <li>Le véhicule doit vous appartenir personnellement, immatriculé à votre nom à l'étranger depuis un certain temps avant votre arrivée</li>
        <li>Le véhicule ne doit pas être destiné à un usage commercial au Maroc</li>
        <li>Une seule voiture par foyer, en général — au-delà, la douane pose des questions</li>
      </ul>
      <P>
        J'ai eu le cas d'un cadre belge à Casablanca qui pensait pouvoir faire venir la voiture
        de sa femme en même temps que la sienne, sous le même dossier. Le bureau douanier a
        refusé : un véhicule par titre de séjour, chacun devait faire sa propre demande avec
        ses propres justificatifs.
      </P>

      <H2>Les documents à réunir</H2>
      <P>
        La liste précise peut varier légèrement d'un bureau douanier à l'autre — port d'entrée,
        aéroport, ou poste frontière terrestre — mais le socle commun ressemble à ceci :
      </P>
      <Table
        rows={[
          ['Document', 'À propos'],
          ['Carte grise étrangère', 'Le véhicule doit être à votre nom'],
          ['Passeport et carte de séjour', 'Ou récépissé de dépôt si la carte est en cours'],
          ['Carte verte internationale ou assurance frontière', 'Le véhicule doit être assuré dès l\'entrée sur le territoire'],
          ['Justificatif de domicile au Maroc', 'Bail, attestation d\'hébergement ou facture récente'],
          ['Contrat de travail visé', 'Preuve que vous transférez votre résidence pour un motif professionnel'],
        ]}
      />
      <Tip>
        Faites une photocopie de tous ces documents avant de vous présenter au bureau de douane
        — j'ai vu plusieurs dossiers traîner simplement parce que le guichet n'avait pas de
        photocopieuse disponible ce jour-là.
      </Tip>

      <H2>Combien de temps ça dure, et comment ça se renouvelle</H2>
      <P>
        L'admission temporaire est accordée pour une durée initiale limitée, généralement de
        l'ordre de six mois, renouvelable auprès du même bureau douanier tant que votre situation
        de résident reste valable. Dans la pratique, tant que votre carte de séjour est à jour et
        que vous n'avez pas d'antécédent avec la douane, les renouvellements successifs se passent
        sans difficulté particulière.
      </P>
      <Warning>
        Les durées et modalités exactes de renouvellement peuvent évoluer et varient parfois
        selon le bureau douanier concerné. Ne vous fiez pas uniquement à ce qu'un ami expatrié
        vous a raconté : demandez une confirmation écrite ou orale précise à votre bureau de
        douane local avant l'échéance de votre autorisation.
      </Warning>
      <P>
        Le point à ne jamais rater : la date d'expiration de l'AT. Un véhicule qui circule au
        Maroc avec une admission temporaire expirée est en situation irrégulière, et ça peut
        aller jusqu'à la saisie du véhicule lors d'un contrôle. Notez la date quelque part et
        anticipez le renouvellement au moins un mois avant l'échéance.
      </P>

      <H2>Ce qui est formellement interdit pendant l'AT</H2>
      <P>
        Un véhicule en admission temporaire n'a pas quitté son statut de "véhicule étranger de
        passage" aux yeux de la douane, même s'il reste plusieurs années sur le territoire. Ça
        implique des règles strictes :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Interdiction de le vendre, le donner ou le prêter durablement à un résident marocain</li>
        <li>Interdiction de le laisser conduire par un tiers qui n'est pas couvert par votre autorisation, sauf exceptions encadrées (conjoint, par exemple, selon les règles locales)</li>
        <li>Interdiction de le laisser au Maroc en repartant définitivement sans régulariser sa situation douanière au préalable</li>
      </ul>
      <Warning>
        Un salarié étranger à Tanger a voulu revendre sa voiture à un collègue marocain juste
        avant de rentrer dans son pays, pour éviter les frais de réexportation. La transaction
        s'est faite sans en informer la douane. Résultat : le véhicule a été considéré comme
        importé en fraude, avec amende et régularisation forcée pour l'acheteur. Ne faites jamais
        ça — la seule sortie propre, c'est la réexportation ou le dédouanement définitif déclaré.
      </Warning>

      <H2>À l'expiration : trois options, pas une de plus</H2>
      <Table
        rows={[
          ['Option', 'Ce que ça implique', 'Quand la choisir'],
          ['Réexporter le véhicule', 'Le faire sortir physiquement du Maroc, constaté par la douane', 'Fin de mission, retour au pays d\'origine'],
          ['Dédouaner définitivement', 'Payer les droits et taxes d\'importation, calculés sur la valeur du véhicule dégressive selon son ancienneté', 'Vous vous installez durablement et voulez garder la voiture au Maroc'],
          ['Renouveler l\'admission temporaire', 'Reconduire l\'autorisation avant son expiration', 'Votre séjour au Maroc se poursuit'],
        ]}
      />
      <P>
        Le dédouanement définitif peut représenter une somme importante — les droits sont
        calculés sur une valeur vénale qui tient compte de l'âge du véhicule, et les taux varient
        selon la cylindrée et le type de motorisation. Avant de vous décider, demandez une
        simulation précise à votre bureau de douane ou à un transitaire : selon l'ancienneté de
        la voiture, il est parfois plus économique de la revendre dans votre pays d'origine et
        d'en racheter une au Maroc que de la dédouaner.
      </P>

      <H2>Cas particulier : véhicule de fonction ou de leasing</H2>
      <P>
        Si le véhicule appartient à votre employeur d'origine ou à une société de leasing
        étrangère plutôt qu'à vous personnellement, le dossier se complique un peu : il faut
        généralement une lettre de mise à disposition de l'entreprise ou du loueur, en plus des
        justificatifs habituels. Certains bureaux douaniers sont plus stricts sur ce point,
        car ils veulent s'assurer que le véhicule ne sert pas à une activité commerciale
        déguisée au Maroc.
      </P>
      <Info>
        Pour un véhicule de société qui vous accompagne depuis votre pays d'origine, prévenez
        votre employeur en amont : il devra probablement fournir une attestation officielle sur
        papier à en-tête, parfois légalisée, précisant que le véhicule reste sa propriété et que
        vous en avez l'usage personnel dans le cadre de votre mission au Maroc.
      </Info>

      <H2>Les pièges les plus fréquents</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Attendre la carte de séjour définitive pour se lancer.</strong> Certains bureaux
          douaniers acceptent d'ouvrir le dossier avec un récépissé de dépôt de la demande de
          carte de séjour — inutile d'attendre des semaines les bras croisés si votre véhicule
          est déjà sur place.
        </li>
        <li>
          <strong>Oublier l'assurance dès l'entrée sur le territoire.</strong> Une carte verte
          internationale a une couverture et une durée limitées ; vérifiez qu'elle reste valable
          jusqu'à ce que vous ayez souscrit une assurance marocaine ou renouvelé la couverture
          internationale.
        </li>
        <li>
          <strong>Laisser filer la date d'expiration de l'AT.</strong> C'est de loin l'erreur la
          plus fréquente et la plus coûteuse à corriger — un renouvellement anticipé prend
          quelques minutes, une régularisation après coup peut prendre des semaines.
        </li>
        <li>
          <strong>Confondre admission temporaire et immatriculation marocaine.</strong> Tant que
          le véhicule est en AT, il garde ses plaques d'origine. Le faire immatriculer au Maroc
          en cours d'AT sans passer par le dédouanement définitif n'est pas une option légale.
        </li>
      </ul>

      <Divider />

      <LeadBox
        title="Un déménagement à organiser en même temps que votre dossier TAECHIR ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Véhicule personnel, logement, carte de séjour, scolarisation des enfants : l'installation
          d'un salarié étranger au Maroc comporte plusieurs démarches parallèles. Décrivez-nous
          votre situation, nous pouvons vous orienter vers les bons interlocuteurs.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Un salarié étranger peut-il rouler au Maroc avec sa voiture immatriculée à l\'étranger ?', a: 'Oui, via le régime de l\'admission temporaire douanière (AT), qui permet de faire entrer un véhicule personnel en franchise des droits et taxes normalement dus à l\'importation, sous conditions de résidence et de non-cession sur place.' },
          { q: 'Combien de temps dure une admission temporaire de véhicule au Maroc ?', a: 'La durée initiale est généralement de l\'ordre de six mois, renouvelable auprès du bureau douanier tant que le titre de séjour reste valide. Les modalités précises de renouvellement peuvent varier selon le bureau : il vaut mieux confirmer directement auprès de la douane locale.' },
          { q: 'Peut-on vendre sa voiture en admission temporaire à un résident marocain ?', a: 'Non, c\'est formellement interdit tant que le véhicule est sous ce régime. Une vente non déclarée expose à une requalification en importation frauduleuse, avec amende et régularisation forcée pour l\'acheteur.' },
          { q: 'Que se passe-t-il si l\'admission temporaire expire sans être renouvelée ?', a: 'Le véhicule se retrouve en situation irrégulière vis-à-vis de la douane, ce qui peut aller jusqu\'à sa saisie lors d\'un contrôle. Il faut impérativement renouveler l\'autorisation avant son échéance ou entamer les démarches de réexportation ou de dédouanement définitif.' },
        ]}
      />
    </>
  );
}

/* ─── Article 30 ────────────────────────────────────────────────────────── */

function Article30Content() {
  return (
    <>
      <Lead>
        Après quelques années au Maroc sous statut TAECHIR, une question finit presque toujours
        par se poser : "Est-ce que je pourrais devenir marocain ?" La réponse existe bel et bien
        dans la loi, mais elle est moins automatique qu'on ne l'imagine — la naturalisation reste
        une faveur accordée par décret, pas un droit qu'on obtient en cochant des cases. Voici ce
        qu'il faut vraiment savoir avant de se lancer.
      </Lead>

      <H2>Le principe : une décision discrétionnaire, pas un guichet automatique</H2>
      <P>
        La nationalité marocaine est régie par le Dahir n° 1-58-250 du 6 septembre 1958 portant
        Code de la nationalité marocaine, profondément modifié par la loi n° 62-06 de 2007 —
        notamment pour permettre aux mères marocaines de transmettre leur nationalité à leurs
        enfants au même titre que les pères. C'est ce même texte qui encadre, à ses articles 11
        à 16, la naturalisation des étrangers.
      </P>
      <Info>
        Retenez ce point avant toute chose : même en remplissant toutes les conditions listées
        ci-dessous, l'administration n'est pas obligée de vous naturaliser. La naturalisation par
        résidence est accordée par décret royal, à la discrétion des autorités. Remplir les
        conditions ouvre le droit de déposer un dossier — pas d'obtenir automatiquement une
        réponse favorable.
      </Info>

      <H2>Les deux voies possibles pour un salarié étranger</H2>
      <P>
        En pratique, un salarié étranger installé durablement au Maroc dans le cadre d'un contrat
        TAECHIR peut emprunter l'une de deux voies, selon sa situation personnelle.
      </P>
      <Table
        rows={[
          ['Voie', 'Condition centrale', 'Qui est concerné'],
          ['Naturalisation par résidence', '5 ans de résidence habituelle et régulière au Maroc', 'Tout salarié étranger installé durablement, marié ou non à un(e) Marocain(e)'],
          ['Acquisition par mariage', 'Marié(e) depuis au moins 5 ans à un(e) Marocain(e), mariage enregistré, vie commune réelle', 'Conjoint(e) étranger(ère) d\'un(e) ressortissant(e) marocain(e)'],
        ]}
      />

      <H3>La naturalisation par résidence</H3>
      <P>
        Pour être naturalisé marocain par cette voie, le demandeur doit en principe réunir
        plusieurs conditions cumulatives :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Être âgé de 18 ans révolus au moment du dépôt de la demande</li>
        <li>Avoir résidé de façon habituelle et régulière au Maroc pendant au moins 5 ans immédiatement avant le dépôt</li>
        <li>Justifier d'une bonne conduite, sans condamnation pénale pour crime ou délit infamant</li>
        <li>Démontrer une intégration réelle dans la société marocaine (notamment une connaissance suffisante de la langue arabe)</li>
        <li>Disposer de moyens d'existence suffisants et stables pour subvenir à ses besoins et à ceux de sa famille</li>
      </ul>
      <Warning>
        La condition de résidence "habituelle et régulière" est examinée de près. Un séjour
        entrecoupé de longues absences, ou un titre de séjour qui a connu une rupture de
        validité à un moment donné, peut fragiliser tout le dossier. Le socle, c'est une carte
        de séjour renouvelée sans interruption pendant les cinq années précédant la demande.
      </Warning>
      <P>
        Certaines catégories bénéficient de conditions de résidence allégées, voire supprimées :
        les personnes ayant rendu des services exceptionnels au Maroc, les investisseurs à
        l'origine de créations d'emplois significatives, ou encore les personnes originaires de
        pays arabes ou musulmans. Ces régimes particuliers s'apprécient au cas par cas — un
        dossier de ce type se prépare avec un professionnel du droit, pas seul avec un
        formulaire téléchargé sur internet.
      </P>

      <H3>L'acquisition par mariage avec un(e) Marocain(e)</H3>
      <P>
        L'époux ou l'épouse étranger(ère) d'un(e) ressortissant(e) marocain(e) peut, sous
        conditions, acquérir la nationalité marocaine sans passer par le régime général de la
        naturalisation. Il faut : être marié(e) depuis au moins 5 ans à la date du dépôt de la
        demande, ce mariage devant être enregistré conformément à la législation marocaine ;
        résider habituellement et régulièrement au Maroc ; et justifier d'une bonne moralité et
        d'une intégration réelle dans la société marocaine.
      </P>
      <Info>
        Le mariage avec un(e) Marocain(e) n'ouvre pas la nationalité automatiquement — il ouvre
        seulement le droit de la demander, une fois le délai de cinq ans écoulé et la vie
        commune effective démontrée. J'ai vu plus d'un dossier retoqué faute de justificatifs
        suffisants de cohabitation réelle : quittances, factures communes, attestations de
        voisinage, autant de pièces à conserver dès le début du mariage.
      </Info>

      <H2>Le dossier à réunir</H2>
      <Table
        rows={[
          ['Pièce', 'Remarque'],
          ['Demande manuscrite', 'Adressée au Ministre de la Justice'],
          ['Extrait d\'acte de naissance', 'Traduit et légalisé'],
          ['Copie du passeport', 'En cours de validité'],
          ['Certificat de résidence', 'Délivré par les autorités locales'],
          ['Casier judiciaire du pays d\'origine', 'Traduit et apostillé ou légalisé selon le pays'],
          ['Casier judiciaire marocain', 'À demander une fois installé'],
          ['Justificatifs de ressources', 'Contrat de travail, fiches de paie, relevés bancaires'],
          ['Pour une demande par mariage', 'Acte de mariage marocain et justificatifs de vie commune'],
        ]}
      />
      <Tip>
        Le sort de vos documents étrangers (état civil, casier judiciaire) dépend de la
        convention signée ou non entre le Maroc et votre pays d'origine : simple apostille pour
        les pays signataires de la Convention de La Haye, chaîne de légalisation consulaire pour
        les autres. Anticipez ce point tôt, c'est souvent l'étape la plus lente du dossier.
      </Tip>

      <H2>Où déposer la demande, et combien de temps ça prend réellement</H2>
      <P>
        Le dossier se dépose auprès du Ministère de la Justice, Direction des Affaires Civiles,
        directement ou par l'intermédiaire du Procureur du Roi compétent près le tribunal de
        votre lieu de résidence. Pour une personne encore à l'étranger au moment d'entamer les
        démarches, certaines étapes peuvent être initiées auprès d'un consulat marocain.
      </P>
      <Warning>
        Il n'existe pas de délai légal fixe pour la naturalisation par résidence. En pratique,
        comptez entre deux et cinq ans entre le dépôt d'un dossier complet et la réponse —
        parfois davantage selon la charge des services instructeurs. Pour l'acquisition par
        mariage, la loi prévoit en revanche que le ministre statue dans un délai d'un an à
        compter du dépôt, le silence passé ce délai valant rejet. Dans les deux cas, n'organisez
        jamais votre vie (démission, vente d'un bien, changement de statut) en pariant sur une
        décision imminente.
      </Warning>
      <P>
        Pendant l'instruction, l'administration mène une enquête sur votre situation : vérification
        des antécédents judiciaires, enquête de moralité, contrôle de la réalité de la résidence
        déclarée. C'est cette phase — plus que la constitution du dossier elle-même — qui explique
        la durée totale de la procédure.
      </P>

      <H2>La décision : décret royal et prestation de serment</H2>
      <P>
        En cas d'avis favorable, la naturalisation est accordée par décret royal, publié au
        Bulletin officiel du Royaume. L'intéressé est ensuite convié à prêter serment devant le
        tribunal compétent avant que le nouveau statut ne devienne pleinement effectif. En cas de
        refus, la décision doit être motivée et un recours — d'abord gracieux auprès du Ministère
        de la Justice, puis le cas échéant contentieux devant les juridictions administratives —
        reste ouvert.
      </P>

      <H2>Double nationalité : faut-il renoncer à sa nationalité d'origine ?</H2>
      <P>
        Le droit marocain n'exige pas de renoncer à sa nationalité d'origine pour devenir
        marocain par naturalisation : le Maroc tolère la double nationalité. Mais l'inverse
        n'est pas garanti — certains pays imposent, dans certains cas, la perte automatique de
        leur propre nationalité en cas d'acquisition volontaire d'une nationalité étrangère.
      </P>
      <Warning>
        Ce n'est pas le Maroc qui décide de ce point, mais votre pays d'origine. Avant d'engager
        une démarche de naturalisation, vérifiez précisément auprès de votre consulat ou d'un
        avocat compétent dans votre pays ce que sa législation prévoit dans un cas comme le
        vôtre — les règles varient beaucoup d'un pays à l'autre.
      </Warning>

      <H2>Ce que la naturalisation change concrètement</H2>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Carte d'identité nationale et passeport marocains ; plus besoin de titre de séjour ni de visa TAECHIR pour rester et travailler au Maroc</li>
        <li>Levée des restrictions qui s'appliquent aux étrangers dans certains domaines, notamment l'accès à la propriété foncière agricole</li>
        <li>Droit de vote et éligibilité, dans les conditions prévues par le droit électoral marocain</li>
        <li>Accès élargi à la fonction publique, certains postes ou concours pouvant rester soumis à des conditions particulières après une naturalisation récente — un point à vérifier précisément si votre projet professionnel en dépend</li>
      </ul>
      <Info>
        Depuis 2019, le Maroc a rétabli un service militaire ou civique obligatoire pour les
        citoyens marocains d'un certain âge. Si ce sujet vous concerne au moment de votre
        naturalisation, renseignez-vous directement auprès des autorités compétentes sur son
        application aux personnes naturalisées.
      </Info>

      <H2>Les pièges les plus fréquents</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Déposer un dossier incomplet ou mal légalisé.</strong> Une pièce non traduite,
          non apostillée ou périmée peut suspendre l'instruction pendant des mois, le temps que
          la correction remonte jusqu'au service concerné.
        </li>
        <li>
          <strong>Laisser sa carte de séjour connaître une interruption.</strong> Même quelques
          semaines de retard dans un renouvellement peuvent être interprétées comme une rupture
          de la résidence "régulière" exigée par la loi.
        </li>
        <li>
          <strong>Miser sur le mariage comme un raccourci.</strong> Sans preuves solides et
          régulières de vie commune réelle, un dossier par mariage se heurte aux mêmes exigences
          de sérieux qu'une naturalisation par résidence.
        </li>
        <li>
          <strong>Ne pas vérifier le droit de son pays d'origine sur la double nationalité.</strong>{' '}
          C'est l'oubli qui coûte le plus cher a posteriori, quand il est parfois trop tard pour
          revenir en arrière.
        </li>
      </ul>

      <Divider />

      <LeadBox
        title="Vous envisagez une installation durable au Maroc ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Naturalisation, carte de résident de longue durée, statut de votre famille : chaque
          parcours est différent et mérite un accompagnement adapté. Décrivez-nous votre
          situation, nous pouvons vous orienter vers les bons interlocuteurs.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Après combien d\'années au Maroc un salarié étranger peut-il demander la nationalité marocaine ?', a: 'En principe après 5 ans de résidence habituelle et régulière au Maroc immédiatement avant le dépôt de la demande, sous réserve de remplir les autres conditions (âge, moralité, intégration, ressources). Certaines catégories bénéficient de conditions allégées.' },
          { q: 'Le mariage avec un(e) Marocain(e) donne-t-il automatiquement la nationalité marocaine ?', a: 'Non. Il ouvre seulement le droit de la demander après cinq ans de mariage enregistré au Maroc, sous réserve de justifier d\'une résidence régulière et d\'une vie commune réelle avec le conjoint marocain.' },
          { q: 'Faut-il renoncer à sa nationalité d\'origine pour devenir marocain ?', a: 'Non, le Maroc autorise la double nationalité et n\'exige pas de renonciation. En revanche, certains pays d\'origine imposent leurs propres règles en cas d\'acquisition volontaire d\'une nationalité étrangère : il faut vérifier ce point directement auprès de son pays d\'origine.' },
          { q: 'Combien de temps dure une procédure de naturalisation au Maroc ?', a: 'Il n\'existe pas de délai légal fixe pour la naturalisation par résidence : comptez en pratique entre deux et cinq ans. Pour l\'acquisition par mariage, la loi prévoit une réponse du ministre dans un délai d\'un an, le silence au-delà valant rejet.' },
        ]}
      />
    </>
  );
}

/* ─── Article 31 ────────────────────────────────────────────────────────── */

function Article31Content() {
  return (
    <>
      <Lead>
        Un salarié étranger se casse le poignet sur un chantier, ou reste alité une semaine avec
        une grippe carabinée : dans les deux cas, l'employeur a des obligations précises et des
        délais courts. Sauf que ce ne sont pas les mêmes obligations, ni le même régime. Beaucoup
        d'employeurs découvrent la différence entre accident du travail et maladie ordinaire le
        jour où ils en ont besoin — au pire moment possible.
      </Lead>

      <H2>Deux régimes, pas un seul</H2>
      <P>
        C'est le point que presque personne n'anticipe : au Maroc, l'accident du travail et la
        maladie professionnelle (AT/MP) ne relèvent pas de la CNSS mais d'une assurance privée
        obligatoire, souscrite par l'employeur, régie par le Dahir du 6 février 1963 relatif à la
        réparation des accidents du travail. La maladie ordinaire, elle, relève bien de la CNSS,
        via l'AMO pour les soins et les indemnités journalières « prestations sociales à court
        terme » pour la perte de salaire.
      </P>
      <Table
        rows={[
          ['', 'Accident du travail / maladie professionnelle', 'Maladie ordinaire'],
          ['Qui couvre', 'Assurance AT privée souscrite par l\'employeur', 'CNSS (branche AMO + prestations à court terme)'],
          ['Base légale', 'Dahir du 6 février 1963', 'Code de la sécurité sociale, régime AMO'],
          ['Frais médicaux', 'Pris en charge à 100 % par l\'assureur AT', 'Remboursés selon la grille AMO'],
          ['Perte de salaire', 'Indemnité journalière AT dès le lendemain de l\'arrêt', 'IJ CNSS après un délai de carence, sous conditions de cotisation'],
          ['Séquelles', 'Rente d\'incapacité si IPP reconnue', 'Sans objet (hors invalidité CNSS distincte)'],
        ]}
      />
      <Warning>
        Un salarié étranger nouvellement recruté et pas encore couvert par l'assurance AT de
        l'entreprise (parce que l'employeur n'a pas mis à jour son contrat) se retrouve sans
        filet en cas d'accident dès le premier jour. Vérifiez que le contrat d'assurance AT de
        votre entreprise couvre bien tous les effectifs déclarés, salariés étrangers compris —
        ce n'est pas automatique si votre assureur facture par tête.
      </Warning>

      <H2>Accident du travail : les 48 heures qui comptent</H2>
      <P>
        Dès qu'un accident du travail survient — sur le lieu de travail, pendant les heures de
        service, ou sur le trajet domicile-travail dans certaines conditions (accident de trajet)
        — l'employeur doit le déclarer dans un délai de 48 heures, hors dimanches et jours fériés.
        La déclaration part à la fois vers l'assureur AT de l'entreprise et vers l'inspection du
        travail compétente.
      </P>
      <P>Concrètement, il faut réunir et transmettre :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Le formulaire de déclaration d'accident du travail, daté et signé par l'employeur</li>
        <li>Un certificat médical initial décrivant les blessures et la durée prévisible d'incapacité</li>
        <li>Les circonstances précises de l'accident (lieu, heure, témoins éventuels)</li>
        <li>La copie du contrat de travail et, pour un salarié étranger, une copie du passeport et du visa TAECHIR en cours de validité</li>
      </ul>
      <Info>
        Un accident non déclaré dans les délais reste indemnisable, mais la procédure devient
        plus lourde : l'assureur peut exiger des justificatifs complémentaires, et l'employeur
        s'expose à une contestation de la prise en charge s'il ne peut pas prouver que le retard
        ne lui est pas imputable. Déclarez toujours dans les 48 heures, même si le dossier médical
        n'est pas encore complet — vous pourrez le compléter ensuite.
      </Info>

      <H2>Ce que touche le salarié pendant l'arrêt</H2>
      <P>
        Pendant l'incapacité temporaire, le salarié en accident du travail perçoit une indemnité
        journalière versée par l'assureur AT, généralement égale à une fraction du salaire
        journalier moyen des jours précédant l'accident, dès le lendemain du jour de l'arrêt — sans
        le délai de carence qui s'applique en maladie ordinaire. Les frais médicaux, pharmaceutiques
        et d'hospitalisation liés à l'accident sont pris en charge intégralement par l'assurance AT,
        sur présentation des justificatifs, sans passer par l'avance de frais habituelle de l'AMO.
      </P>
      <P>
        Si l'accident laisse des séquelles, un médecin désigné par l'assureur (ou, en cas de
        désaccord, un expert judiciaire) évalue un taux d'incapacité permanente partielle (IPP).
        Ce taux détermine, selon son importance, soit une indemnité en capital, soit une rente
        viagère. C'est un point sensible : ne laissez jamais un salarié étranger signer un accord
        transactionnel avec l'assureur sans qu'il ait compris — idéalement dans sa langue —
        ce à quoi il renonce.
      </P>

      <H2>Maladie ordinaire : le circuit CNSS</H2>
      <P>
        Pour un arrêt maladie sans lien avec le travail (grippe, intervention chirurgicale,
        épisode de dos non lié à un accident identifié), c'est le circuit CNSS classique qui
        s'applique — le même que pour un salarié marocain. Le salarié doit avoir cotisé un nombre
        minimum de jours sur les mois précédant l'arrêt pour ouvrir droit aux indemnités
        journalières, ce qui rend la déclaration CNSS rapide après l'embauche encore plus critique :
        un salarié étranger déclaré tardivement risque de ne pas avoir assez de cotisations
        enregistrées le jour où il tombe malade.
      </P>
      <Tip>
        C'est un argument de plus, s'il en fallait, pour déclarer un salarié étranger à la CNSS
        dès la date du visa et non à son arrivée effective : chaque mois de retard est un mois de
        cotisations en moins dans le compteur qui ouvre droit aux indemnités journalières maladie.
      </Tip>
      <P>
        L'arrêt de travail doit être transmis à la CNSS dans les délais habituels (48 heures pour
        le volet employeur), accompagné du certificat médical. Un délai de carence de quelques
        jours s'applique avant le versement des indemnités journalières, contrairement à l'accident
        du travail qui est indemnisé dès le lendemain de l'arrêt.
      </P>

      <H2>Le cas particulier du salarié étranger éloigné de sa famille</H2>
      <P>
        Sur le plan strictement légal, un salarié étranger blessé ou malade a exactement les
        mêmes droits qu'un salarié marocain — ni plus, ni moins. Mais dans les faits, deux
        situations reviennent souvent et méritent d'être anticipées par l'employeur :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>
          <strong>Une hospitalisation longue sans famille sur place</strong> — pensez à désigner
          un référent RH qui reste en contact avec le salarié, et le cas échéant avec sa famille
          restée à l'étranger.
        </li>
        <li>
          <strong>Le rapatriement médical</strong> — ni la CNSS ni l'assurance AT ne financent en
          principe un rapatriement vers le pays d'origine. C'est le rôle d'une complémentaire
          santé internationale, si le salarié en dispose (voir notre guide sur l'assurance santé
          de l'expatrié).
        </li>
      </ul>

      <H2>Ce qui coûte cher : l'absence ou le retard de déclaration</H2>
      <Table
        rows={[
          ['Situation', 'Conséquence'],
          ['Accident non déclaré dans les 48h', 'Prise en charge assureur retardée ou contestée'],
          ['Salarié pas encore couvert par l\'assurance AT', 'Frais médicaux et indemnités à la charge directe de l\'employeur'],
          ['Salarié CNSS déclaré en retard', 'Cotisations insuffisantes pour ouvrir droit aux IJ maladie'],
          ['Faute inexcusable de l\'employeur reconnue', 'Majoration de l\'indemnisation due au salarié, à la charge de l\'employeur'],
        ]}
      />
      <P>
        La dernière ligne mérite un mot : si l'accident résulte d'un manquement grave de
        l'employeur aux règles de sécurité (absence de protection individuelle sur une machine
        dangereuse, par exemple), la faute inexcusable peut être retenue et alourdir
        significativement la facture, au-delà de ce que couvre l'assurance AT standard. J'ai vu un
        atelier de menuiserie à Aïn Sebaâ payer, en plus de l'assurance, une majoration substantielle
        après qu'un ouvrier ivoirien s'est blessé sur une machine dont le carter de protection avait
        été retiré « pour aller plus vite ».
      </P>

      <H2>Les pièges les plus fréquents</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Confondre les deux régimes.</strong> Traiter un accident du travail comme une
          maladie ordinaire (ou l'inverse) retarde la prise en charge et peut priver le salarié de
          droits auxquels il a pourtant droit.
        </li>
        <li>
          <strong>Oublier de vérifier la couverture AT dès l'embauche.</strong> Un salarié étranger
          qui commence à travailler avant que l'assureur ait confirmé son ajout à la police AT de
          l'entreprise est un risque pur pour l'employeur.
        </li>
        <li>
          <strong>Laisser le salarié gérer seul les démarches.</strong> Entre la barrière de la
          langue administrative et l'éloignement de sa famille, un salarié étranger accidenté a
          besoin d'un accompagnement RH plus soutenu qu'un salarié local dans la même situation.
        </li>
        <li>
          <strong>Ne pas anticiper le rapatriement médical.</strong> Ni la CNSS ni l'assurance AT
          ne couvrent ce poste : c'est une complémentaire santé internationale qui le fait, et
          uniquement si elle a été souscrite en amont.
        </li>
      </ul>

      <Divider />

      <LeadBox
        title="Un salarié étranger accidenté ou malade dans votre entreprise ?"
        cta="Être mis en relation avec un expert"
      >
        <p>
          Déclaration, assurance AT, coordination avec la CNSS : chaque dossier a ses urgences.
          Décrivez-nous votre situation, nous pouvons vous orienter vers les bons interlocuteurs.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'L\'accident du travail d\'un salarié étranger passe-t-il par la CNSS ?', a: 'Non. L\'accident du travail et la maladie professionnelle relèvent d\'une assurance privée obligatoire souscrite par l\'employeur (Dahir du 6 février 1963), pas de la CNSS. Seule la maladie ordinaire, sans lien avec le travail, passe par le circuit CNSS classique.' },
          { q: 'Dans quel délai un accident du travail doit-il être déclaré ?', a: 'Dans un délai de 48 heures, hors dimanches et jours fériés, à la fois auprès de l\'assureur accidents du travail de l\'entreprise et de l\'inspection du travail compétente.' },
          { q: 'Un salarié étranger a-t-il les mêmes droits qu\'un salarié marocain en cas d\'accident ou de maladie ?', a: 'Oui, ses droits sont strictement identiques. La difficulté pratique vient souvent de l\'éloignement de sa famille et de la barrière administrative, pas d\'une différence de droits.' },
          { q: 'Qui prend en charge un rapatriement médical si nécessaire ?', a: 'Ni la CNSS ni l\'assurance accidents du travail ne financent en principe un rapatriement vers le pays d\'origine. Ce poste doit être couvert par une complémentaire santé internationale souscrite en amont par le salarié ou l\'employeur.' },
        ]}
      />
    </>
  );
}

/* ─── Article 32 — Achat immobilier étranger (affiliation) ──────────────── */

function Article32Content() {
  return (
    <>
      <Lead>
        « Est-ce qu'un étranger a même le droit d'acheter au Maroc ? » — c'est la première
        question que me posent presque tous les salariés étrangers qui s'installent durablement.
        La réponse tient en une phrase : oui, presque comme un Marocain, sauf sur un point précis
        qui bloque plus de dossiers qu'on ne le croit. Voici ce qu'il faut vraiment savoir avant
        de signer un compromis.
      </Lead>
      <AffDisclosure />

      <H2>Ce qu'un étranger peut acheter — et ce qu'il ne peut pas</H2>
      <P>
        Sur le foncier urbain — appartement, villa, local commercial, terrain à bâtir en zone
        urbaine — un étranger achète avec exactement les mêmes droits qu'un Marocain, quel que
        soit son statut (salarié TAECHIR, retraité, ou simple acquéreur sans lien avec le
        travail au Maroc). Aucune autorisation préalable n'est requise pour ce type de bien.
      </P>
      <Warning>
        Le foncier <strong>agricole</strong>, en revanche, reste verrouillé : depuis le Dahir du
        21 juillet 1973, une personne physique ou morale étrangère ne peut pas acquérir de terre
        à vocation agricole sans autorisation du Wali de région. Dans les faits, cette autorisation
        est rarement accordée. Si le bien qui vous intéresse est classé agricole au cadastre —
        même une belle maison avec un grand terrain à la périphérie de Marrakech ou d'Essaouira —
        vérifiez ce classement avant toute chose, pas après avoir versé un acompte.
      </Warning>

      <H2>Titre foncier ou melkia : le point qui décide de tout</H2>
      <P>
        Au Maroc, tous les biens ne sont pas enregistrés de la même façon, et ça change tout pour
        un acheteur étranger.
      </P>
      <Table
        rows={[
          ['', 'Titre foncier (immatriculé)', 'Melkia (non immatriculé)'],
          ['Registre', 'Conservation foncière (ANCFCC)', 'Actes adoulaires, pas de registre central'],
          ['Vérification des charges', 'Certificat de propriété fiable', 'Difficile à sécuriser à 100 %'],
          ['Acte de vente', 'Acte notarié, inscrit au titre', 'Acte adoulaire, procédure plus lourde'],
          ['Risque pour l\'acheteur', 'Faible', 'Réel (hypothèques cachées, indivision non soldée)'],
        ]}
      />
      <Info>
        Mon conseil, sans exception, pour un acheteur étranger qui ne vit pas au Maroc à
        l'année : n'achetez que du titré, ou exigez une immatriculation préalable à votre charge
        contractuelle avant la signature définitive. La différence de sécurité juridique ne se
        discute même pas.
      </Info>

      <H2>De la promesse de vente à l'acte notarié</H2>
      <P>Le déroulé classique d'un achat sécurisé suit à peu près cet ordre :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Certificat de propriété</strong> — demandé à la conservation foncière, il confirme l'identité du propriétaire et l'absence d'hypothèque ou de saisie sur le bien.</li>
        <li><strong>Compromis de vente</strong> — souvent accompagné d'un acompte de 10 %, versé de préférence via un compte séquestre plutôt que directement au vendeur.</li>
        <li><strong>Purge des conditions suspensives</strong> — notamment l'obtention du financement si un crédit est nécessaire.</li>
        <li><strong>Acte de vente authentique</strong> — signé chez un notaire, puis inscrit à la conservation foncière pour le transfert effectif de propriété.</li>
      </ul>
      <Tip>
        Faites systématiquement appel à un notaire indépendant du vendeur et de l'agence, jamais
        « recommandé » par l'une des deux parties. C'est lui qui vérifie les charges et sécurise
        le séquestre — un mauvais choix ici coûte beaucoup plus cher que ses honoraires.
      </Tip>

      <H2>Le vrai coût d'un achat, au-delà du prix affiché</H2>
      <Table
        rows={[
          ['Poste', 'Montant indicatif'],
          ['Droits d\'enregistrement', '4 % du prix de vente'],
          ['Frais de conservation foncière', 'Environ 1 % à 1,5 %'],
          ['Honoraires de notaire', 'Environ 0,5 % à 1 %, hors TVA'],
          ['Commission d\'agence (à la charge de l\'acheteur, usage courant)', 'Environ 2,5 %, hors TVA'],
        ]}
      />
      <P>
        Comptez donc entre 8 % et 10 % du prix affiché en frais annexes — un budget que beaucoup
        de primo-acheteurs étrangers découvrent au moment de signer, plutôt qu'en négociant le
        prix du bien lui-même.
      </P>

      <H2>Financer l'achat depuis l'étranger : ce que la banque va exiger</H2>
      <P>
        Un salarié étranger installé au Maroc peut, comme tout résident, solliciter un crédit
        immobilier auprès d'une banque marocaine. La différence se joue surtout sur l'apport
        personnel exigé — souvent plus élevé pour un non-résident ou un résident récent que pour
        un Marocain avec un historique bancaire local — et sur la traçabilité des fonds.
      </P>
      <P>
        C'est un point que presque personne n'anticipe : si vous financez l'achat, en tout ou
        partie, avec des fonds venus de l'étranger, faites-les transiter par un compte bancaire
        marocain et conservez l'attestation de transfert de devises. Le jour où vous revendrez
        le bien, c'est ce document qui vous permettra de rapatrier le produit de la vente à
        l'étranger sans blocage de l'Office des Changes. Sans cette traçabilité, une partie du
        produit de la revente peut rester coincée en dirhams non transférables.
      </P>

      <AffiliateBox
        title="Transférer l'apport ou le prix d'achat au taux réel du marché"
        cta="Comparer le montant reçu"
        href={affiliates.transfert.url}
      >
        <p>
          Pour un virement de cette ampleur, quelques points de marge de change représentent
          vite plusieurs milliers de dirhams. <strong>{affiliates.transfert.partner}</strong>{' '}
          applique le taux interbancaire réel et affiche une commission transparente avant
          l'envoi — de quoi comparer sérieusement avec le taux proposé par votre banque avant
          de transférer une somme importante.
        </p>
      </AffiliateBox>

      <H2>Non, acheter un bien ne donne pas de titre de séjour</H2>
      <P>
        C'est l'idée reçue la plus répandue, largement importée d'autres pays qui proposent un
        « golden visa » adossé à l'investissement immobilier. Le Maroc ne propose pas ce
        mécanisme : posséder un appartement ou une villa, même d'une valeur importante, ne donne
        aucun droit automatique à une carte de séjour. Pour un salarié étranger, c'est bien le
        contrat de travail et le dossier TAECHIR qui fondent le droit au séjour — l'achat
        immobilier reste une opération patrimoniale totalement distincte.
      </P>

      <H2>Après l'achat : taxe d'habitation et plus-value à la revente</H2>
      <P>
        Une fois propriétaire, deux échéances fiscales à connaître. La taxe d'habitation et la
        taxe de services communaux s'appliquent chaque année sur la base de la valeur locative du
        bien — une résidence principale bénéficie d'une exonération partielle pendant les
        premières années sous conditions. En cas de revente, la plus-value réalisée est soumise
        à la taxe sur le profit immobilier (TPI), calculée sur la différence entre prix d'achat
        et prix de revente, avec un régime plus favorable si le bien constitue votre résidence
        principale depuis plusieurs années.
      </P>

      <H2>Les pièges les plus fréquents</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li><strong>Verser un acompte avant d'avoir le certificat de propriété.</strong> C'est le meilleur moyen de découvrir une hypothèque ou une indivision après coup, quand l'argent est déjà parti.</li>
        <li><strong>Confondre agence « de confiance » et vérification juridique.</strong> Une bonne agence facilite la transaction, elle ne remplace jamais le notaire pour sécuriser le titre.</li>
        <li><strong>Payer une partie du prix « au black », en espèces, hors acte.</strong> Outre le risque fiscal, cette pratique complique énormément la revente et le rapatriement des fonds pour un étranger.</li>
        <li><strong>Oublier la traçabilité du financement.</strong> Sans attestation de transfert de devises, le rapatriement du produit de la revente peut se bloquer des mois.</li>
      </ul>

      <Divider />

      <LeadBox
        title="Un projet d'achat immobilier au Maroc en tant qu'étranger ?"
        cta="Être mis en relation avec un notaire"
      >
        <p>
          Vérification du titre, structuration du financement, sécurisation du compromis :
          décrivez-nous votre projet, nous pouvons vous orienter vers des professionnels habitués
          aux dossiers d'acheteurs étrangers.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Un salarié étranger peut-il acheter un appartement au Maroc ?', a: 'Oui, sans restriction particulière pour un bien urbain (appartement, villa, local commercial), avec les mêmes droits qu\'un acheteur marocain. Seul le foncier agricole reste soumis à autorisation.' },
          { q: 'Acheter un bien immobilier donne-t-il droit à un titre de séjour au Maroc ?', a: 'Non. Le Maroc ne propose pas de mécanisme de type « golden visa ». Le droit au séjour d\'un salarié étranger dépend de son contrat de travail et de son dossier TAECHIR, pas de son patrimoine immobilier.' },
          { q: 'Quels sont les frais réels à prévoir en plus du prix d\'achat ?', a: 'Comptez environ 8 à 10 % du prix : droits d\'enregistrement (4 %), frais de conservation foncière (1 à 1,5 %), honoraires de notaire (0,5 à 1 %) et, le cas échéant, commission d\'agence (environ 2,5 %).' },
          { q: 'Comment être sûr de pouvoir rapatrier l\'argent en cas de revente ?', a: 'En faisant transiter les fonds d\'achat par un compte bancaire marocain et en conservant l\'attestation de transfert de devises correspondante — c\'est ce document que l\'Office des Changes demande pour autoriser le rapatriement du produit de la revente.' },
        ]}
      />
    </>
  );
}

/* ─── Article 33 ────────────────────────────────────────────────────────── */

function Article33Content() {
  return (
    <>
      <Lead>
        « Si je repars dans mon pays avant l'âge de la retraite, mes cotisations CNSS sont
        perdues, non ? » C'est la question que me pose quasiment tout salarié étranger qui
        signe un contrat de deux ou trois ans au Maroc. La réponse a d'ailleurs changé en 2025 :
        une réforme a nettement amélioré la situation de ceux qui ne font qu'un passage au
        Maroc. Voici ce qu'il faut savoir, seuil par seuil.
      </Lead>

      <H2>Les conditions pour toucher une pension : l'âge et les jours cotisés</H2>
      <P>
        La pension de vieillesse CNSS repose sur deux conditions cumulatives : avoir 60 ans
        (55 ans pour les mineurs de fond justifiant 5 ans d'activité souterraine) et avoir
        cessé toute activité salariée. La troisième condition, le nombre de jours cotisés,
        est celle qui change tout pour un salarié étranger en poste quelques années seulement.
      </P>
      <Table
        rows={[
          ['Jours cotisés', 'Situation depuis la réforme de 2025'],
          ['3 240 jours ou plus (≈ 10,8 ans)', 'Pension complète : 50 % du salaire moyen, +1 point par tranche de 216 jours au-delà, plafonnée à 70 %'],
          ['Entre 1 320 et 3 239 jours', 'Pension réduite, proportionnelle au nombre de jours, avec un plancher forfaitaire mensuel'],
          ['Moins de 1 320 jours', 'Pas de pension possible — seul le remboursement des cotisations reste ouvert'],
        ]}
      />
      <P>
        Le salaire moyen servant de base au calcul correspond à la 96ᵉ partie du total des
        salaires déclarés sur les 96 derniers mois cotisés — donc, dans les faits, sur les
        8 dernières années de carrière au Maroc si le salarié n'a pas cette ancienneté.
      </P>

      <H2>La réforme de 2025 : un vrai changement pour les carrières courtes</H2>
      <P>
        Jusqu'en 2025, il fallait impérativement atteindre 3 240 jours (l'équivalent de
        10,8 années de cotisation) pour avoir droit à la moindre pension. En dessous, c'était
        le remboursement pur et simple, sans aucune rente. Beaucoup de salariés étrangers
        passaient sous ce seuil sans même s'en rendre compte.
      </P>
      <Info>
        Depuis le 1ᵉʳ mai 2025 (loi 02.24), le seuil d'ouverture du droit à pension est
        descendu à 1 320 jours, soit un peu moins de 4 ans et demi. Entre 1 320 et 3 239
        jours, la pension est proportionnelle au nombre de jours réellement cotisés, avec un
        montant plancher forfaitaire de l'ordre de 600 à 1 000 Dhs par mois selon la tranche
        atteinte. Ce n'est pas une fortune, mais c'est une pension à vie là où il n'y avait
        rien avant.
      </Info>
      <P>
        Concrètement, un cadre portugais recruté à 45 ans pour un poste de 5 ans à Tanger, qui
        rentre ensuite chez lui, franchit désormais le seuil des 1 320 jours dès sa deuxième
        année complète au Maroc. Avant la réforme, il aurait fini avec un simple remboursement
        de cotisations, sans aucune pension.
      </P>

      <H2>Sous le seuil : le remboursement des cotisations salariales</H2>
      <P>
        Si le salarié quitte le Maroc — ou cesse toute activité — sans avoir atteint 1 320
        jours cotisés, il n'a pas droit à une pension, mais il peut demander le remboursement
        de ses propres cotisations retraite (la part salariale, pas la part patronale) une fois
        l'âge légal de la retraite atteint.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Avoir cumulé moins de 1 320 jours de cotisation</li>
        <li>Avoir atteint l'âge légal de départ à la retraite</li>
        <li>Avoir cessé toute activité salariale au Maroc</li>
        <li>Ne bénéficier d'aucune pension de vieillesse ou d'invalidité par ailleurs</li>
      </ul>
      <Warning>
        Ce remboursement n'est ni automatique ni immédiat : il faut en faire la demande
        auprès de la CNSS, l'âge légal doit être atteint (on ne le récupère pas le jour du
        départ du Maroc à 35 ans), et seule la part salariale est concernée. La part versée
        par l'employeur reste acquise à la caisse.
      </Warning>

      <H2>La vraie meilleure option : la convention bilatérale de sécurité sociale</H2>
      <P>
        Avant de se rabattre sur le remboursement, il faut vérifier une chose : le pays
        d'origine du salarié a-t-il signé une convention de sécurité sociale avec le Maroc ?
        Si oui, c'est presque toujours l'option la plus avantageuse, très loin devant le
        simple remboursement des cotisations.
      </P>
      <P>
        Le Maroc a signé ce type de convention avec la France (1979), la Belgique (1968),
        l'Espagne (1979), les Pays-Bas (1972), ainsi qu'avec l'Allemagne, le Canada (et le
        Québec séparément), la Tunisie et plusieurs autres pays. Ces accords permettent :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>La totalisation des périodes</strong> — les jours cotisés au Maroc s'additionnent à ceux cotisés dans le pays d'origine pour atteindre les seuils d'ouverture des droits, dans les deux sens</li>
        <li><strong>Le maintien de la pension</strong> — chaque caisse verse sa propre quote-part, calculée au prorata de la durée cotisée chez elle, exportable vers le pays de résidence du retraité</li>
        <li><strong>L'absence de double cotisation</strong> pour les salariés détachés temporairement, qui restent affiliés à la caisse de leur pays d'origine</li>
      </ul>
      <Tip>
        La demande de totalisation ne se fait pas uniquement auprès de la CNSS : elle doit
        être déposée en parallèle auprès de la caisse de retraite du pays d'origine (la CNAV
        en France, l'ONSS/ONP en Belgique, etc.), qui se charge ensuite d'échanger les
        attestations de carrière avec la CNSS. Mieux vaut lancer les deux démarches en même
        temps que de faire l'une puis l'autre.
      </Tip>

      <H2>Partir avant 60 ans : la retraite anticipée est-elle possible ?</H2>
      <P>
        Oui, à partir de 55 ans, mais avec une décote : la pension est réduite d'environ 1 %
        par année d'anticipation par rapport à l'âge légal de 60 ans. Un départ à 55 ans
        pile entraîne donc une réduction de l'ordre de 5 % du montant calculé. C'est une
        option rarement utilisée par les salariés étrangers, dont le départ du Maroc coïncide
        généralement avec la fin du contrat plutôt qu'avec un projet de retraite anticipée.
      </P>

      <H2>Continuer à cotiser au Maroc après avoir quitté le pays</H2>
      <P>
        Un salarié qui approche du seuil de 1 320 ou 3 240 jours sans tout à fait l'atteindre
        peut, sous certaines conditions, opter pour l'assurance volontaire auprès de la CNSS
        afin de continuer à cotiser après la fin de son activité salariée au Maroc — une
        option notamment utilisée par des Marocains résidant à l'étranger (MRE), mais ouverte
        plus largement à qui a cotisé un minimum de temps au régime marocain. Ça permet de
        franchir le seuil sans avoir à compter uniquement sur une convention bilatérale.
      </P>

      <Divider />

      <H2>Avant de faire les valises : ce qu'il faut vérifier</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li><strong>Demander son relevé de carrière CNSS</strong> — il indique le nombre exact de jours cotisés, la première chose à connaître avant de choisir une stratégie.</li>
        <li><strong>Vérifier si le pays d'origine a une convention avec le Maroc</strong> — si oui, la totalisation est presque toujours préférable au remboursement.</li>
        <li><strong>Garder précieusement son numéro CNSS</strong> — il reste valable à vie, y compris pour un retour au Maroc des années plus tard chez un autre employeur.</li>
        <li><strong>Ne pas confondre remboursement et pension</strong> — le remboursement solde définitivement les droits liés à ces cotisations ; une fois demandé, il n'est plus possible de les faire compter dans une future totalisation.</li>
      </ul>

      <P>
        Au final, la retraite CNSS d'un salarié étranger n'est presque jamais une case vide.
        Entre la pension complète, la pension proportionnelle depuis 2025, la totalisation
        bilatérale et le remboursement en dernier recours, il y a presque toujours une option
        qui permet de ne pas perdre ce qui a été cotisé — à condition de s'en occuper avant de
        quitter le Maroc, pas des années après.
      </P>

      <LeadBox
        title="Salarié étranger en fin de contrat au Maroc ?"
        cta="Faire le point sur votre dossier CNSS"
      >
        <p>
          Relevé de carrière, seuils atteints, convention bilatérale applicable selon votre
          nationalité : décrivez-nous votre situation, nous pouvons vous orienter avant votre
          départ pour ne pas perdre vos droits.
        </p>
      </LeadBox>

      <FAQ
        items={[
          { q: 'Un salarié étranger qui quitte le Maroc perd-il ses cotisations retraite CNSS ?', a: 'Pas nécessairement. S\'il a cotisé au moins 1 320 jours, il a droit à une pension (complète à partir de 3 240 jours, proportionnelle en dessous). En dessous de 1 320 jours, il peut demander le remboursement de sa part de cotisations, ou bénéficier d\'une totalisation des périodes si son pays a signé une convention de sécurité sociale avec le Maroc.' },
          { q: 'Qu\'est-ce qui a changé avec la réforme de 2025 ?', a: 'La loi 02.24, en vigueur depuis le 1ᵉʳ mai 2025, a abaissé le seuil d\'ouverture du droit à pension de 3 240 à 1 320 jours cotisés, avec une pension proportionnelle et un montant plancher pour les carrières comprises entre 1 320 et 3 239 jours.' },
          { q: 'Comment fonctionne la totalisation des périodes avec une convention bilatérale ?', a: 'Les jours cotisés au Maroc et dans le pays d\'origine s\'additionnent pour atteindre les seuils d\'ouverture des droits. Chaque caisse verse ensuite sa propre quote-part de pension, calculée au prorata de la durée cotisée chez elle, exportable vers le pays de résidence.' },
          { q: 'Le remboursement des cotisations est-il possible dès le départ du Maroc ?', a: 'Non. Il faut avoir atteint l\'âge légal de départ à la retraite et avoir cessé toute activité salariale, en plus d\'être sous le seuil de 1 320 jours cotisés. Ce n\'est pas une démarche disponible au moment du départ du pays si le salarié est encore jeune.' },
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
    description: 'Listes A1 et A2 de l\'ANAPEC : qui est réellement éligible à la procédure allégée (48h, 1 500 Dhs) ? Critères de niveau hiérarchique, métiers concernés et vérification.',
    date: '29 janvier 2026',
    readTime: 5,
    category: 'ANAPEC',
    excerpt: 'Une procédure en 48 heures au lieu de 20 jours, et 1 500 Dhs au lieu de 5 000. Mais l\'éligibilité ne tient pas à l\'intitulé du poste : la liste A1 dépend du niveau hiérarchique et de la taille de l\'entreprise, la liste A2 énumère des métiers précis.',
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
    slug: 'fin-contrat-salarie-etranger-maroc-rupture-licenciement',
    title: 'Fin de contrat d\'un salarié étranger au Maroc : rupture, licenciement et titre de séjour',
    description: 'Que devient un salarié étranger quand son contrat de travail se termine au Maroc : impact sur la carte de séjour, obligations de l\'employeur, changement d\'employeur et licenciement abusif.',
    date: '21 juillet 2026',
    readTime: 7,
    category: 'Rupture',
    excerpt: 'Démission, fin de CDD ou licenciement : la carte de séjour ne s\'arrête pas avec le contrat, mais l\'autorisation de travailler oui. Ce qu\'il faut faire, dans quel ordre, et les pièges du changement d\'employeur.',
    Content: Article20Content,
  },
  {
    slug: 'permis-conduire-etranger-maroc-echange-examen',
    title: 'Permis de conduire au Maroc pour un salarié étranger : échange, examen et démarches',
    description: 'Comment conduire légalement au Maroc en tant que salarié étranger : délai d\'un an, pays avec accord d\'échange, procédure NARSA, coûts et cas où il faut repasser l\'examen.',
    date: '28 juillet 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Un an après votre installation, votre permis étranger n\'est plus valable au Maroc. Échange direct ou examen complet selon votre pays d\'origine : la procédure, les délais et les pièges à éviter.',
    Content: Article21Content,
  },
  {
    slug: 'logement-location-salarie-etranger-maroc',
    title: 'Se loger au Maroc en tant que salarié étranger : bail, dépôt de garantie et pièges à éviter',
    description: 'Comment un salarié étranger loue un logement au Maroc avant même d\'avoir sa carte de séjour : meublé ou non, dépôt de garantie, justificatif de domicile et différences entre Casablanca, Rabat et Tanger.',
    date: '4 août 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Pas besoin d\'attendre la carte de séjour pour signer un bail — c\'est même souvent l\'inverse. Le guide complet du logement pour un salarié étranger : formules, dépôt de garantie, pièges du contrat et spécificités par ville.',
    Content: Article22Content,
  },
  {
    slug: 'regroupement-familial-conjoint-enfants-maroc',
    title: 'Regroupement familial au Maroc : faire venir son conjoint et ses enfants',
    description: 'Comment un salarié étranger fait venir son conjoint et ses enfants au Maroc : carte de séjour "membre de famille", documents requis, délais et droit au travail du conjoint.',
    date: '11 août 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Avoir sa propre carte de séjour ne suffit pas pour faire venir sa famille sans démarche. Ce qu\'il faut préparer, dans quel ordre, et pourquoi le conjoint ne peut pas travailler sans son propre dossier TAECHIR.',
    Content: Article23Content,
  },
  {
    slug: 'cdd-cdi-salarie-etranger-maroc-contrat-taechir',
    title: 'CDD ou CDI pour un salarié étranger au Maroc : quel contrat choisir pour le dossier TAECHIR',
    description: 'CDD ou CDI pour un salarié étranger au Maroc : différences légales, impact sur la durée du visa TAECHIR, sur le renouvellement ANAPEC et sur la rupture anticipée du contrat.',
    date: '18 août 2026',
    readTime: 7,
    category: 'Procédure',
    excerpt: 'Le choix entre CDD et CDI pour un salarié étranger n\'est pas neutre : il détermine la durée de validité du visa TAECHIR, la façon dont il se renouvelle et les conséquences en cas de rupture anticipée.',
    Content: Article24Content,
  },
  {
    slug: 'carte-resident-maroc-salarie-etranger-longue-duree',
    title: 'Carte de résident au Maroc : comment un salarié étranger l\'obtient après plusieurs années',
    description: 'Carte de résident au Maroc pour un salarié étranger : conditions des quatre années de résidence continue, dossier à préparer et ce qui change (ou pas) pour la procédure TAECHIR.',
    date: '25 août 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Après quatre années de renouvellements TAECHIR réussis, un salarié étranger peut prétendre à une carte de résident valable dix ans. Conditions, dossier et ce que ça change vraiment côté employeur.',
    Content: Article25Content,
  },
  {
    slug: 'teletravail-employeur-etranger-maroc-statut',
    title: 'Télétravailler au Maroc pour un employeur étranger : quel statut choisir ?',
    description: 'Vivre au Maroc en télétravail pour une entreprise étrangère : pourquoi TAECHIR ne s\'applique pas, quel titre de séjour obtenir, et ce qu\'il faut savoir côté fiscalité et couverture santé.',
    date: '1 septembre 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Pas d\'employeur marocain, pas de dossier TAECHIR — mais pas non plus de vide juridique. Titre de séjour, résidence fiscale et couverture santé : ce qu\'un télétravailleur installé au Maroc doit réellement mettre en place.',
    Content: Article26Content,
  },
  {
    slug: 'equivalence-diplomes-etrangers-maroc',
    title: 'Équivalence des diplômes étrangers au Maroc : quand est-elle vraiment nécessaire ?',
    description: 'Équivalence, légalisation et traduction du diplôme d\'un salarié étranger au Maroc : ce que demande vraiment un dossier TAECHIR, quand l\'équivalence officielle est réellement obligatoire, et comment l\'obtenir auprès du MESRSI.',
    date: '8 septembre 2026',
    readTime: 7,
    category: 'Documents',
    excerpt: 'Un diplôme légalisé et traduit suffit pour la plupart des dossiers TAECHIR — l\'équivalence officielle, elle, ne devient obligatoire que dans des cas précis. Autorité compétente, pièces, délais et pièges à éviter.',
    Content: Article27Content,
  },
  {
    slug: 'ecole-scolarisation-enfants-etrangers-maroc',
    title: 'Scolariser ses enfants au Maroc : écoles internationales, inscription et pièges à éviter',
    description: 'Comment scolariser les enfants d\'un salarié étranger au Maroc : réseau français, écoles anglophones ou privé bilingue, listes d\'attente, dossier d\'inscription et coûts réels en 2026.',
    date: '15 septembre 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Ce n\'est pas la carte de séjour de l\'enfant qui bloque l\'inscription, ce sont les places disponibles. Réseau français, écoles internationales ou privé bilingue : le guide complet pour scolariser ses enfants au Maroc sans perdre une rentrée.',
    Content: Article28Content,
  },
  {
    slug: 'importer-voiture-etranger-maroc-admission-temporaire',
    title: 'Importer sa voiture au Maroc en tant que salarié étranger : admission temporaire douanière',
    description: 'Comment un salarié étranger peut faire entrer son véhicule personnel au Maroc : régime de l\'admission temporaire douanière, documents requis, durée, renouvellement et options à l\'expiration.',
    date: '22 septembre 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Pas besoin de dédouaner sa voiture pour rouler au Maroc en tant que résident étranger — le régime de l\'admission temporaire le permet, à condition d\'en respecter les règles. Documents, durée, renouvellement et pièges à éviter.',
    Content: Article29Content,
  },
  {
    slug: 'nationalite-marocaine-salarie-etranger-naturalisation',
    title: 'Nationalité marocaine pour un salarié étranger : conditions, procédure et délais de la naturalisation',
    description: 'Peut-on devenir marocain après plusieurs années sous statut TAECHIR ? Conditions de la naturalisation par résidence, acquisition par mariage, dossier à réunir et délais réels.',
    date: '29 septembre 2026',
    readTime: 8,
    category: 'Nationalité',
    excerpt: 'Cinq ans de résidence régulière, un dossier solide et beaucoup de patience : la naturalisation marocaine n\'est jamais automatique. Conditions, documents, délais réels et pièges à éviter pour un salarié étranger qui envisage de s\'installer durablement.',
    Content: Article30Content,
  },
  {
    slug: 'accident-travail-arret-maladie-salarie-etranger-maroc',
    title: 'Accident du travail et arrêt maladie d\'un salarié étranger au Maroc : ce que doit faire l\'employeur',
    description: 'Accident du travail ou maladie ordinaire d\'un salarié étranger au Maroc : deux régimes différents, deux procédures. Déclaration sous 48h, assurance AT, indemnités et pièges à éviter.',
    date: '6 octobre 2026',
    readTime: 8,
    category: 'Obligations',
    excerpt: 'Accident du travail et maladie ordinaire ne relèvent pas du même régime au Maroc — l\'un passe par l\'assurance AT de l\'entreprise, l\'autre par la CNSS. Ce que l\'employeur d\'un salarié étranger doit savoir et faire dans les 48 heures.',
    Content: Article31Content,
  },
  {
    slug: 'achat-immobilier-maroc-salarie-etranger',
    title: 'Acheter un bien immobilier au Maroc en tant que salarié étranger : procédure, coûts et pièges',
    description: 'Un salarié étranger peut-il acheter un bien immobilier au Maroc ? Ce que dit la loi sur le foncier agricole, titre foncier vs melkia, coûts réels (enregistrement, notaire, agence) et transfert de fonds depuis l\'étranger.',
    date: '13 octobre 2026',
    readTime: 8,
    category: 'Expatrié',
    excerpt: 'Un étranger achète un appartement ou une villa au Maroc presque aussi librement qu\'un Marocain — sauf sur le foncier agricole. Titre foncier, coûts réels, transfert de fonds et le mythe du titre de séjour « par l\'achat » : le guide complet.',
    Content: Article32Content,
  },
  {
    slug: 'retraite-cnss-salarie-etranger-maroc',
    title: 'Retraite CNSS d\'un salarié étranger au Maroc : cotisations, seuils et remboursement',
    description: 'Ce que devient la pension de retraite CNSS d\'un salarié étranger qui quitte le Maroc : seuils de jours cotisés depuis la réforme 2025, remboursement des cotisations et conventions bilatérales de totalisation.',
    date: '20 octobre 2026',
    readTime: 7,
    category: 'Expatrié',
    excerpt: 'Depuis la réforme de 2025, le seuil pour toucher une pension CNSS est passé de 3 240 à 1 320 jours cotisés. Ce que ça change pour un salarié étranger, et comment ne pas perdre ses droits en quittant le Maroc.',
    Content: Article33Content,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
