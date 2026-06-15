import type { ReactNode } from 'react';

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

/* ─── Article 1 ─────────────────────────────────────────────────────────── */

function Article1Content() {
  return (
    <>
      <Lead>
        Recruter un salarié étranger au Maroc ne s'improvise pas. Entre l'attestation ANAPEC,
        la plateforme TAECHIR et le visa du Ministère, la procédure comporte plusieurs étapes
        précises que tout employeur doit maîtriser avant de lancer un recrutement international.
        Ce guide vous donne la feuille de route complète, étape par étape.
      </Lead>

      <H2>Avant tout : vérifier la conformité de votre entreprise</H2>
      <P>
        La première condition pour recruter un étranger au Maroc est d'être une entreprise en règle.
        Le Ministère chargé du Travail et l'ANAPEC vérifient systématiquement la situation
        administrative de l'employeur avant de traiter toute demande.
      </P>
      <P>Trois points sont contrôlés :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Les déclarations CNSS à jour.</strong> Tout retard ou irrégularité dans les déclarations de salaires peut bloquer votre dossier ANAPEC à la source.</li>
        <li><strong>Un registre de commerce valide.</strong> Les sociétés doivent fournir un modèle 7 récent. Les personnes physiques doivent produire un registre de commerce ou une taxe professionnelle en cours de validité.</li>
        <li><strong>Un poste clairement défini.</strong> Le contrat de travail généré via TAECHIR doit correspondre à un métier existant dans la nomenclature marocaine. Une fiche de poste précise facilite grandement le traitement.</li>
      </ul>
      <Info>
        Bonne pratique : avant de lancer toute démarche, demandez une attestation de régularité CNSS
        récente. Ce document, souvent nécessaire en fin de procédure, peut mettre quelques jours à
        être émis.
      </Info>

      <H2>Étape 1 — L'attestation ANAPEC : prouver l'absence de profil national</H2>
      <P>
        L'attestation d'activité de l'ANAPEC est la pièce centrale de tout dossier standard.
        Elle atteste que l'Agence Nationale de Promotion de l'Emploi et des Compétences a recherché
        des candidats marocains pour le poste concerné, sans succès. Ce mécanisme découle directement
        de l'article 516 du Code du Travail, qui pose le principe de priorité nationale à l'emploi.
      </P>
      <P>Trois situations existent selon votre profil de recrutement :</P>
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
        Pour un profil standard, l'ANAPEC diffuse une annonce pendant 20 jours ouvrables sur ses
        canaux officiels. Si aucun candidat national qualifié ne se présente, l'attestation est émise.
        Pour les profils rares (listes A1 et A2), la procédure est allégée : pas d'annonce,
        traitement en 48 heures.
      </P>

      <H2>Étape 2 — La plateforme TAECHIR : créer et soumettre le dossier en ligne</H2>
      <P>
        Une fois l'attestation ANAPEC obtenue (ou si vous êtes dispensé), l'employeur se connecte
        sur la plateforme officielle TAECHIR du Ministère. Cette étape est entièrement dématérialisée.
      </P>
      <H3>Créer un compte employeur</H3>
      <P>
        La première utilisation nécessite la création d'un compte employeur avec les informations
        légales de la société (ICE, RC, données de gérant). Une fois validé, ce compte vous permet
        de gérer l'ensemble de vos demandes de visas de travail.
      </P>
      <H3>Renseigner les données du salarié et générer le contrat</H3>
      <P>
        TAECHIR génère automatiquement un contrat de travail type à partir des informations saisies :
        identité du salarié, nationalité, poste, durée, rémunération. Ce contrat doit ensuite être
        imprimé en <strong>trois exemplaires</strong>, signé par les deux parties, cacheté par l'employeur
        et légalisé.
      </P>
      <Tip>
        Anticipez la légalisation. En pratique, faire légaliser trois exemplaires d'un contrat
        peut prendre une journée selon les bureaux d'adoul ou notaires de votre ville. Ne laissez
        pas cette étape pour le dernier moment.
      </Tip>

      <H2>Étape 3 — Le dépôt physique du dossier au Ministère</H2>
      <P>
        Malgré la dématérialisation de la génération du contrat, le dépôt du dossier complet reste
        physique. Il s'effectue auprès du guichet régional du Ministère de l'Inclusion Économique,
        de la Petite Entreprise, de l'Emploi et des Compétences compétent selon le lieu du poste
        de travail.
      </P>
      <P>Le dossier comprend notamment :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Les 3 exemplaires légalisés du contrat TAECHIR</li>
        <li>L'attestation ANAPEC ou les justificatifs de dispense</li>
        <li>La copie certifiée conforme des diplômes et/ou certificats de travail (avec traduction assermentée si nécessaire)</li>
        <li>La copie du passeport en cours de validité</li>
        <li>Les documents juridiques de l'employeur (statuts, modèle 7, etc.)</li>
      </ul>
      <P>
        Le Ministère dispose d'un délai maximum de <strong>10 jours</strong> pour apposer le visa
        sur le contrat. Ce visa correspond à l'autorisation officielle de travail : c'est la date
        du visa qui constitue la date de prise d'effet du contrat.
      </P>
      <Warning>
        Ne faites jamais commencer le salarié avant l'obtention du visa. Cela constitue une infraction
        à l'article 516 du Code du Travail et expose l'employeur à des sanctions administratives.
      </Warning>

      <H2>Après le visa : les démarches post-recrutement</H2>
      <P>
        L'obtention du visa n'est pas la fin de la procédure. Dès la date du visa, deux démarches
        complémentaires doivent être engagées immédiatement.
      </P>
      <H3>La déclaration CNSS</H3>
      <P>
        Le salarié doit être affilié à la CNSS dès son premier jour de travail. Tout retard dans
        la déclaration génère des pénalités calculées rétroactivement depuis la date du visa.
        N'attendez pas : déclarez dès réception du contrat visé.
      </P>
      <H3>La carte de séjour (DGSN)</H3>
      <P>
        En parallèle, le salarié doit demander sa carte d'immatriculation (carte de séjour) auprès
        du service d'immigration de la Direction Générale de la Sûreté Nationale (DGSN). Ce titre
        de séjour est distinct du visa de travail et relève du Ministère de l'Intérieur. Il faudra
        présenter le contrat visé et les documents personnels du salarié.
      </P>

      <Divider />

      <H2>Récapitulatif : le calendrier réaliste d'un recrutement</H2>
      <Table
        rows={[
          ['Phase', 'Durée estimée', 'Actions clés'],
          ['Préparation du dossier', '3–7 jours', 'Rassembler les docs, légalisation'],
          ['Traitement ANAPEC (standard)', '20 jours ouvrables', 'Annonce publiée, attente retour'],
          ['Traitement ANAPEC (profil rare)', '2 jours', 'Pas d\'annonce nécessaire'],
          ['Dépôt & visa Ministère', '1–10 jours', 'Dépôt physique du dossier complet'],
          ['Carte de séjour DGSN', '7–15 jours', 'Demande indépendante en parallèle'],
        ]}
      />
      <P>
        En pratique, pour un profil standard en première demande, comptez <strong>4 à 6 semaines</strong>
        {' '}de bout en bout si le dossier est préparé rigoureusement. Pour un profil rare ou dispensé,
        la procédure peut être bouclée en moins de deux semaines.
      </P>
    </>
  );
}

/* ─── Article 2 ─────────────────────────────────────────────────────────── */

function Article2Content() {
  return (
    <>
      <Lead>
        L'attestation d'activité ANAPEC est souvent perçue comme un obstacle administratif. En réalité,
        elle répond à une logique bien précise inscrite dans la loi marocaine. Comprendre son fonctionnement
        permet de l'anticiper et de construire un dossier solide dès le départ.
      </Lead>

      <H2>Pourquoi l'ANAPEC est-elle impliquée dans le recrutement d'étrangers ?</H2>
      <P>
        Le fondement juridique est simple : l'article 516 du Code du Travail marocain pose le
        principe de la <strong>priorité nationale à l'emploi</strong>. Avant qu'un employeur puisse
        recruter un ressortissant étranger, il doit démontrer qu'aucun candidat marocain
        présentant des qualifications équivalentes n'est disponible sur le marché.
      </P>
      <P>
        L'Agence Nationale de Promotion de l'Emploi et des Compétences (ANAPEC) est l'organe
        public chargé de vérifier cette condition. Elle constitue en quelque sorte le gardien
        de la priorité nationale, en diffusant l'offre d'emploi et en évaluant les candidatures
        reçues avant de délivrer son attestation.
      </P>
      <Info>
        L'attestation ANAPEC n'est pas un avis négatif sur l'employeur : elle certifie simplement
        qu'une recherche active de profils nationaux a été effectuée et n'a pas abouti pour le poste
        en question.
      </Info>

      <H2>Les trois situations face à l'ANAPEC</H2>
      <P>
        Selon la nature du poste et le profil du salarié, vous vous trouverez dans l'une de ces
        trois configurations :
      </P>

      <H3>1. L'attestation avec obligation d'annonce (profil standard)</H3>
      <P>
        C'est le cas général. L'ANAPEC publie une annonce d'emploi correspondant au poste sur
        ses canaux officiels. Si aucun candidat national qualifié ne se manifeste dans un délai
        de <strong>20 jours ouvrables</strong>, l'attestation est émise.
      </P>
      <P>
        Les frais s'élèvent à <strong>5 000 Dhs HT</strong> pour le premier dossier d'un métier
        donné dans l'année, puis <strong>1 500 Dhs HT</strong> pour chaque dossier supplémentaire
        portant sur le même métier-emploi (dans la limite de 5 par an).
      </P>

      <H3>2. L'attestation sans obligation d'annonce (profils rares — listes A1/A2)</H3>
      <P>
        Pour les profils reconnus comme rares ou inexistants sur le marché marocain, la procédure
        est allégée. Pas d'annonce à publier, traitement en <strong>48 heures</strong> et frais
        réduits à <strong>1 500 Dhs HT</strong>. Les listes A1 (hauts profils) et A2 (profils
        pointus rares) précisent les métiers concernés.
      </P>

      <H3>3. La dispense totale</H3>
      <P>
        Certaines catégories de salariés ou d'employeurs n'ont pas besoin d'attestation ANAPEC.
        C'est le cas notamment des ressortissants algériens, tunisiens et sénégalais (conventions
        bilatérales), des époux de ressortissants marocains, du personnel CFC, des gérants et
        actionnaires, ou encore des salariés détachés.
      </P>

      <H2>Les frais ANAPEC : ce qu'il faut savoir</H2>
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
        Ces frais sont réglés directement auprès de l'ANAPEC lors du dépôt du dossier. Ils sont
        distincts des éventuels honoraires de conseil ou de légalisation. La plateforme TAECHIR
        et l'apposition du visa par le Ministère sont, quant à elles, entièrement gratuites.
      </P>

      <H2>Comment se déroule concrètement la procédure ANAPEC ?</H2>
      <H3>La constitution du dossier</H3>
      <P>
        L'employeur dépose son dossier auprès de l'agence ANAPEC régionale compétente. Ce dossier
        comprend les documents juridiques de l'entreprise, la description du poste à pourvoir,
        et les éléments justifiant le besoin de recruter à l'international (qualifications
        spécifiques, expérience requise, etc.).
      </P>
      <H3>La publication de l'annonce (profil standard)</H3>
      <P>
        L'ANAPEC prend en charge la rédaction et la diffusion de l'offre d'emploi. Les candidatures
        reçues sont évaluées par l'agence. Si un profil national correspondant est trouvé,
        l'ANAPEC peut refuser d'émettre l'attestation et orienter l'employeur vers ce candidat.
        Dans les faits, pour des postes très spécialisés, les candidatures nationales correspondantes
        sont rares.
      </P>
      <H3>La délivrance de l'attestation</H3>
      <P>
        À l'issue du délai, l'ANAPEC émet une attestation d'activité précisant le poste concerné
        et les recherches effectuées. Ce document est ensuite joint au dossier physique déposé
        au Ministère.
      </P>

      <H2>Les points de vigilance à retenir</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>La situation CNSS de l'entreprise est vérifiée.</strong> Un retard dans les
          déclarations ou des arriérés de cotisations peuvent bloquer le traitement du dossier
          ANAPEC avant même la publication de l'annonce.
        </li>
        <li>
          <strong>La description du poste doit être précise et honnête.</strong> Une sur-qualification
          artificielle du poste pour contourner la procédure standard peut être détectée et entraîner
          un rejet.
        </li>
        <li>
          <strong>Les listes A1/A2 évoluent.</strong> Avant de qualifier un profil de "rare",
          il est recommandé de vérifier les listes en vigueur sur le site de l'ANAPEC ou de
          contacter directement l'agence pour confirmation.
        </li>
      </ul>
      <Warning>
        Une attestation ANAPEC est délivrée pour un poste et un employeur précis. Elle ne peut pas
        être utilisée pour un autre recrutement ou une autre entreprise, même si le métier est
        identique.
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
        Tout recrutement étranger au Maroc ne passe pas nécessairement par l'ANAPEC. Plusieurs
        catégories de salariés ou de situations sont totalement dispensées de cette étape, ce qui
        simplifie et accélère considérablement la procédure. Voici un tour d'horizon complet des
        cas d'exemption.
      </Lead>

      <H2>Le principe juridique des dispenses</H2>
      <P>
        Le Code du Travail marocain prévoit des exceptions au principe de priorité nationale à
        l'emploi. Ces exceptions répondent à des logiques différentes : réciprocité diplomatique,
        protection de la famille, développement économique spécifique ou nature particulière
        de la relation de travail.
      </P>
      <P>
        Pour les catégories dispensées, le dossier déposé au Ministère reste complet — il n'est
        pas allégé — mais il remplace les pièces ANAPEC par des documents spécifiques à chaque
        catégorie. Le délai de traitement du visa (10 jours maximum) s'applique également.
      </P>

      <H2>Les conventions bilatérales : Algérie, Tunisie, Sénégal</H2>
      <P>
        Le Maroc a conclu des conventions d'établissement avec trois pays qui prévoient
        explicitement la dispense d'attestation ANAPEC pour leurs ressortissants souhaitant
        travailler au Maroc.
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Algérie</strong> — Convention d'établissement et de commerce franco-algérienne étendue</li>
        <li><strong>Tunisie</strong> — Convention bilatérale Maroc-Tunisie</li>
        <li><strong>Sénégal</strong> — Convention bilatérale Maroc-Sénégal</li>
      </ul>
      <Info>
        Le principe est celui de la réciprocité : si ces pays accordent aux ressortissants marocains
        des facilités d'accès à leur marché du travail, le Maroc leur accorde les mêmes. Le dossier
        TAECHIR reste obligatoire, mais sans pièce ANAPEC.
      </Info>

      <H2>Les époux et épouses de ressortissants marocains</H2>
      <P>
        Un salarié étranger marié(e) à un(e) ressortissant(e) marocain(e) est dispensé(e) de
        l'attestation ANAPEC. La logique est la protection de l'unité familiale et l'encouragement
        de l'installation durable au Maroc.
      </P>
      <P>Documents spécifiques à fournir à la place de l'attestation ANAPEC :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Acte de mariage légalisé et traduit en arabe (si établi à l'étranger)</li>
        <li>Copie de la carte nationale d'identité du conjoint(e) marocain(e)</li>
        <li>Livret de famille si disponible</li>
      </ul>

      <H2>Les gérants, associés et actionnaires</H2>
      <P>
        Les personnes étrangères ayant un lien capitalistique ou de gouvernance avec l'entreprise
        qui les emploie sont également dispensées. Cette dispense repose sur l'idée qu'un
        propriétaire ou un dirigeant ne "prend pas" le travail d'un Marocain : il investit et
        prend des risques.
      </P>
      <Table
        rows={[
          ['Statut', 'Condition', 'Documents justificatifs'],
          ['Gérant désigné', 'Nomination dans les statuts ou PV', 'PV de nomination, statuts'],
          ['Associé', 'Part dans le capital social', 'Statuts, K-bis ou équivalent'],
          ['Actionnaire', 'Détention de titres', 'Registre des actionnaires'],
          ['Fondé de pouvoir', 'Délégation de pouvoirs', 'Procuration notariée'],
        ]}
      />

      <H2>Les salariés détachés</H2>
      <P>
        Un salarié envoyé temporairement par son employeur étranger pour effectuer une mission
        au Maroc — dans le cadre d'un marché public, d'un projet ou d'une assistance à une
        filiale locale — relève du détachement. Il conserve son contrat d'origine et n'en signe
        pas de nouveau au Maroc.
      </P>
      <P>Documents requis pour un détaché :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Lettre de détachement officielle de la société mère</li>
        <li>Contrat de prestation ou de marché concerné</li>
        <li>Attestation d'affiliation à la sécurité sociale du pays d'origine</li>
        <li>Durée du détachement précisée et limitée</li>
      </ul>
      <Warning>
        Le détachement ne peut pas être utilisé comme substitut à un recrutement local permanent.
        Si le salarié s'installe durablement et est intégré dans l'organisation marocaine, le
        Ministère peut requalifier la situation et exiger un dossier TAECHIR complet.
      </Warning>

      <H2>Le personnel des sociétés Casablanca Finance City (CFC)</H2>
      <P>
        Les entreprises bénéficiant du statut CFC — la place financière internationale du Maroc
        — jouissent d'un régime spécial pour l'emploi de salariés étrangers. Le personnel
        d'encadrement de ces sociétés est dispensé d'attestation ANAPEC dans le cadre des
        avantages concédés pour attirer les multinationales.
      </P>
      <P>Pièce requise : une lettre délivrée par Casablanca Finance City confirmant le statut
      de la société et l'appartenance du salarié à l'encadrement éligible.</P>

      <H2>Les profils des listes A1 et A2</H2>
      <P>
        Bien que techniquement soumis à l'ANAPEC (délai 48h, frais 1 500 Dhs), les profils
        A1 et A2 sont souvent assimilés aux dispenses dans la pratique, tant la procédure est
        rapide. Ils ne passent pas par l'annonce publique et bénéficient d'un traitement
        prioritaire.
      </P>

      <Tip>
        Si vous êtes dans une catégorie dispensée, préparez soigneusement les pièces substitutives
        (acte de mariage, statuts, lettre CFC, etc.). Un dossier incomplet sur ce point est
        traité comme un dossier standard, avec l'obligation de repasser par l'ANAPEC.
      </Tip>
    </>
  );
}

/* ─── Article 5 ─────────────────────────────────────────────────────────── */

function Article5Content() {
  return (
    <>
      <Lead>
        Le premier visa de travail est souvent le plus complexe à obtenir. Le renouvellement,
        lui, est une procédure plus légère — à condition de bien l'anticiper et de comprendre
        ce qui a changé par rapport à la demande initiale.
      </Lead>

      <H2>Pourquoi le renouvellement est différent</H2>
      <P>
        Lors d'un renouvellement chez le même employeur et pour le même poste, le Ministère
        et l'ANAPEC considèrent que la situation est connue et que la priorité nationale a déjà
        été vérifiée. La procédure est donc simplifiée sur deux aspects clés : le délai ANAPEC
        est ramené à 48 heures et les frais tombent à 1 500 Dhs HT.
      </P>
      <P>
        En revanche, si l'une des conditions change — nouvel employeur, nouveau poste, promotion
        avec changement de fonction —, le dossier sera traité comme un nouveau recrutement.
      </P>
      <Info>
        La règle à retenir : même employeur + même poste = procédure de renouvellement simplifiée.
        Tout autre changement = nouvelle procédure complète.
      </Info>

      <H2>Quand anticiper la demande de renouvellement ?</H2>
      <P>
        C'est la question la plus souvent négligée. Nombreux sont les employeurs qui attendent
        l'approche de la date d'expiration pour lancer la démarche, ce qui crée une période de
        flottement juridique pour le salarié.
      </P>
      <P>
        Il est recommandé de déposer la demande de renouvellement <strong>2 à 3 mois avant
        l'expiration</strong> du contrat en cours. Ce délai tient compte :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Du délai de traitement ANAPEC (48 heures) + obtention de l'attestation</li>
        <li>De la préparation et légalisation des nouveaux exemplaires du contrat via TAECHIR</li>
        <li>Du délai de visa Ministère (jusqu'à 10 jours)</li>
        <li>D'éventuelles demandes de pièces complémentaires</li>
      </ul>
      <Warning>
        Un contrat expiré sans renouvellement en cours place le salarié en situation irrégulière
        de facto, même si la demande est en cours de traitement. Anticipez toujours.
      </Warning>

      <H2>Les nouveaux documents spécifiques au renouvellement</H2>
      <P>
        Par rapport à la première demande, le renouvellement nécessite des pièces supplémentaires
        qui prouvent la continuité de la relation de travail et la régularité de la situation :
      </P>
      <Table
        rows={[
          ['Document', 'Spécificité renouvellement', 'Notes'],
          ['Contrat TAECHIR', '3 exemplaires légalisés', 'Généré sur TAECHIR comme pour le premier'],
          ['Attestation CNSS', '3 derniers mois de déclarations', 'Justifie que le salarié a bien été déclaré'],
          ['Titre de séjour', 'Copie de la carte DGSN en cours', 'La carte doit être valide ou en cours de renouvellement'],
          ['Attestation ANAPEC', 'Délai 48h, 1 500 Dhs', 'Sauf catégorie dispensée'],
          ['RC ou statuts', 'Seulement si modification', 'Non requis si inchangés'],
        ]}
      />

      <H2>La carte de séjour : à renouveler en parallèle</H2>
      <P>
        Le visa de travail et la carte de séjour (carte d'immatriculation) sont deux titres
        distincts, délivrés par deux administrations différentes : le Ministère chargé du Travail
        pour le visa, et la DGSN (Direction Générale de la Sûreté Nationale) pour la carte
        de séjour.
      </P>
      <P>
        Ces deux procédures doivent idéalement être menées en parallèle, car chacune peut
        nécessiter l'autre comme pièce justificative. Pour le renouvellement du visa de travail,
        la carte de séjour en cours est requise. Pour le renouvellement de la carte de séjour
        auprès de la DGSN, le contrat de travail visé est nécessaire.
      </P>
      <Tip>
        En pratique, commencez par le renouvellement ANAPEC et le dépôt au Ministère, puis
        enchaînez avec la carte de séjour DGSN dès réception du nouveau contrat visé.
        Certains bureaux DGSN acceptent de lancer la démarche en parallèle sur présentation
        d'un récépissé de dépôt Ministère.
      </Tip>

      <H2>Changement de poste : quand repasser par la procédure complète</H2>
      <P>
        Une promotion est une bonne nouvelle pour le salarié, mais elle peut déclencher une
        nouvelle procédure complète. Si le changement de poste implique :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Un nouveau titre de fonction ou un nouveau niveau hiérarchique</li>
        <li>Une modification substantielle des missions et responsabilités</li>
        <li>Un changement de branche ou de département</li>
      </ul>
      <P>
        … alors le Ministère peut considérer qu'il s'agit d'un nouveau contrat de travail, et
        non d'un renouvellement. Dans ce cas, la procédure standard s'applique : nouveau passage
        ANAPEC, nouveau dossier complet. Si le profil correspond à une liste A1/A2, la procédure
        reste allégée (48h).
      </P>
      <P>
        Pour éviter toute ambiguïté, en cas de promotion, il est recommandé de prendre contact
        avec le guichet Ministère en amont pour vérifier comment la situation sera qualifiée.
      </P>
    </>
  );
}

/* ─── Article 6 ─────────────────────────────────────────────────────────── */

function Article6Content() {
  return (
    <>
      <Lead>
        Après avoir accompagné de nombreux dossiers de recrutement international au Maroc, certaines
        erreurs reviennent avec une régularité troublante. Elles ne sont pas toutes liées à un manque
        de connaissance : certaines viennent d'une gestion du temps défaillante, d'autres d'un
        excès de confiance. Voici les 7 pièges les plus coûteux — et comment les éviter.
      </Lead>

      <H2>Erreur n°1 — Faire commencer le salarié avant l'obtention du visa</H2>
      <P>
        C'est l'erreur la plus grave. L'article 516 du Code du Travail marocain est sans ambiguïté :
        aucun salarié étranger ne peut commencer à travailler avant que le visa sur son contrat
        de travail n'ait été apposé par le Ministère. La date du visa est la date de prise d'effet
        du contrat.
      </P>
      <P>
        En faisant commencer un salarié "en attendant", l'employeur s'expose à des sanctions
        administratives, à une potentielle invalidation du dossier et à des complications pour
        tous les recrutements futurs auprès du Ministère.
      </P>
      <Warning>
        Il n'existe pas de "délai de grâce" ou de tolérance officielle pour cette règle. Même
        un seul jour de travail avant le visa constitue une infraction.
      </Warning>

      <H2>Erreur n°2 — Attendre le dernier moment pour lancer la procédure</H2>
      <P>
        La procédure la plus rapide — profil dispensé ou liste A1/A2 — prend encore 10 à 12 jours
        entre le dépôt et la réception du visa. Pour un profil standard, comptez 4 à 6 semaines.
        Sans compter la préparation du dossier, la légalisation des documents et les éventuels
        allers-retours pour pièces manquantes.
      </P>
      <P>
        Lancer la démarche 2 semaines avant la date de prise de poste souhaitée est une recette
        garantie pour rater l'onboarding et créer une pression inutile sur toutes les parties.
        Anticipez au minimum 6 à 8 semaines pour un profil standard, 3 à 4 semaines pour un
        profil rare.
      </P>

      <H2>Erreur n°3 — Mal qualifier le profil (standard vs rare)</H2>
      <P>
        Cocher "profil rare" pour éviter le délai de 20 jours sans vérifier que le poste figure
        bien sur les listes A1/A2 est une erreur fréquente. Si l'ANAPEC ne reconnaît pas le
        profil comme rare, elle requalifie le dossier en procédure standard — avec la mise en
        attente et les frais supplémentaires que cela implique.
      </P>
      <P>
        Inversement, qualifier un profil de "standard" quand il est éligible aux listes A1/A2
        vous coûte 3 500 Dhs de plus et 18 jours de délai supplémentaire inutilement.
      </P>
      <Tip>
        En cas de doute, un simple appel à l'agence ANAPEC régionale avant de constituer le
        dossier suffit souvent à trancher la question.
      </Tip>

      <H2>Erreur n°4 — Négliger la légalisation et la traduction des documents étrangers</H2>
      <P>
        Les diplômes, certificats de travail et tout document émis à l'étranger doivent être :
      </P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Légalisés</strong> — soit par apostille (pour les pays signataires de la convention de La Haye), soit par légalisation consulaire marocaine dans le pays d'émission.</li>
        <li><strong>Traduits</strong> en arabe ou en français par un traducteur assermenté, si le document est dans une autre langue.</li>
      </ol>
      <P>
        Un diplôme non légalisé est systématiquement rejeté. Comme ce processus peut prendre
        1 à 3 semaines selon les pays, il doit être lancé en parallèle des autres démarches,
        bien avant la constitution du dossier final.
      </P>

      <H2>Erreur n°5 — Une situation CNSS non régularisée</H2>
      <P>
        L'ANAPEC et le Ministère vérifient la régularité CNSS de l'employeur avant de traiter
        toute demande. Des cotisations en retard, des déclarations manquantes ou un litige CNSS
        non résolu peuvent bloquer le dossier à n'importe quelle étape.
      </P>
      <P>
        Une anomalie CNSS découverte en cours de procédure oblige à régulariser, puis à relancer
        — perdant ainsi des semaines. La règle simple : avant de déposer quoi que ce soit, obtenez
        une attestation de régularité CNSS de moins de 30 jours.
      </P>

      <H2>Erreur n°6 — Confondre le visa de travail et la carte de séjour</H2>
      <P>
        Ce sont deux documents distincts, délivrés par deux administrations différentes :
      </P>
      <Table
        rows={[
          ['Document', 'Délivré par', 'Objectif', 'Délai'],
          ['Visa de travail (contrat visé)', 'Ministère du Travail', 'Autorisation d\'exercer une activité professionnelle', '10 jours max'],
          ['Carte de séjour / carte d\'immatriculation', 'DGSN (Ministère de l\'Intérieur)', 'Autorisation de résider légalement au Maroc', '7–15 jours'],
        ]}
      />
      <P>
        Certains employeurs pensent que le visa de travail suffit et omettent de déclencher
        la démarche carte de séjour. Or, sans carte de séjour valide, le salarié est en
        situation irrégulière du point de vue du droit des étrangers, même s'il a un visa
        de travail en règle.
      </P>

      <H2>Erreur n°7 — Retarder la déclaration CNSS après l'obtention du visa</H2>
      <P>
        Le réflexe naturel est parfois d'attendre que le salarié soit physiquement présent et
        opérationnel pour le déclarer à la CNSS. C'est une erreur : la déclaration doit
        intervenir dès la date du visa, qui est la date de prise d'effet du contrat.
      </P>
      <P>
        Tout retard de déclaration génère des pénalités calculées rétroactivement depuis la
        date du visa. Plus le retard s'accumule, plus la régularisation ultérieure est coûteuse
        et compliquée.
      </P>
      <Tip>
        Mettez en place un processus interne simple : dès réception du contrat visé, votre
        service RH ou votre comptable reçoit immédiatement la copie pour déclencher l'affiliation
        CNSS le jour même.
      </Tip>

      <Divider />

      <P>
        Ces 7 erreurs ont en commun d'être entièrement évitables avec un peu d'organisation et
        une bonne compréhension de la procédure. Si vous avez un doute à n'importe quelle étape,
        l'assistant guidé disponible sur ce site peut vous aider à construire un plan d'action
        adapté à votre situation précise.
      </P>
    </>
  );
}

/* ─── Article 7 ─────────────────────────────────────────────────────────── */

function Article7Content() {
  return (
    <>
      <Lead>
        Une fois le visa de travail obtenu auprès du Ministère, le salarié étranger doit impérativement
        obtenir une carte de séjour auprès de la Direction Générale de la Sûreté Nationale (DGSN).
        Ce titre de séjour, distinct du visa de travail, est indispensable pour résider légalement
        au Maroc. Voici tout ce qu'il faut savoir pour l'obtenir et le renouveler.
      </Lead>

      <H2>Carte de séjour et visa de travail : deux documents, deux administrations</H2>
      <P>
        La confusion entre ces deux documents est l'une des erreurs les plus fréquentes dans le
        recrutement international au Maroc. Il est essentiel de comprendre la distinction :
      </P>
      <Table
        rows={[
          ['Caractéristique', 'Visa de travail', 'Carte de séjour'],
          ['Administration', 'Ministère du Travail', 'DGSN (Ministère de l\'Intérieur)'],
          ['Objet', 'Autorisation d\'exercer une activité professionnelle', 'Autorisation de résider sur le territoire'],
          ['Base légale', 'Code du Travail (art. 516)', 'Loi n° 02-03 relative à l\'entrée et au séjour des étrangers'],
          ['Validité', 'Durée du contrat de travail', '1 an renouvelable, puis 10 ans'],
          ['Délai d\'obtention', '10 jours max', '2 à 6 semaines'],
        ]}
      />
      <Warning>
        Sans carte de séjour valide, un salarié étranger est en situation irrégulière au regard du
        droit des étrangers, même s'il dispose d'un contrat de travail visé par le Ministère.
        Les deux documents sont complémentaires et obligatoires.
      </Warning>

      <H2>Qui doit demander la carte de séjour ?</H2>
      <P>
        Tout ressortissant étranger séjournant au Maroc pour une durée supérieure à 90 jours doit
        demander une carte d'immatriculation (carte de séjour). Cela inclut les salariés étrangers
        titulaires d'un visa de travail, les conjoints de marocains, les étudiants étrangers, les
        investisseurs et les retraités étrangers résidant au Maroc.
      </P>
      <P>
        Pour les salariés, la demande est généralement initiée dès réception du contrat de travail
        visé par le Ministère. Le salarié lui-même effectue la démarche, bien que l'employeur
        soit souvent impliqué dans la préparation des pièces justificatives.
      </P>

      <H2>Documents requis pour la première demande</H2>
      <P>
        Le dossier de première demande de carte de séjour pour un salarié étranger comprend :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Formulaire de demande</strong> rempli et signé (disponible au guichet DGSN ou en préfecture)</li>
        <li><strong>Contrat de travail visé</strong> par le Ministère du Travail (original + copie)</li>
        <li><strong>Passeport en cours de validité</strong> (original + copie des pages d'identité et du tampon d'entrée)</li>
        <li><strong>4 photos d'identité</strong> récentes aux normes marocaines (fond blanc)</li>
        <li><strong>Justificatif de domicile au Maroc</strong> : contrat de bail légalisé, attestation d'hébergement ou certificat de résidence</li>
        <li><strong>Extrait de casier judiciaire</strong> du pays d'origine, légalisé et traduit</li>
        <li><strong>Certificat médical</strong> délivré par un médecin agréé au Maroc</li>
        <li><strong>Timbre fiscal</strong> de 100 Dhs</li>
      </ul>
      <Info>
        La liste exacte des pièces peut varier selon les préfectures et les situations particulières.
        Il est recommandé de contacter le service des étrangers de votre préfecture de résidence
        avant de constituer le dossier pour obtenir la liste à jour.
      </Info>

      <H2>La procédure pas à pas</H2>
      <H3>Étape 1 : préparer le dossier complet</H3>
      <P>
        Rassemblez l'ensemble des pièces listées ci-dessus. Les documents étrangers doivent être
        légalisés (apostille ou légalisation consulaire) et traduits en arabe ou en français par
        un traducteur assermenté. Prévoyez des copies supplémentaires de chaque document.
      </P>
      <H3>Étape 2 : déposer le dossier au service des étrangers</H3>
      <P>
        Le dépôt se fait auprès du service des étrangers de la préfecture de police ou de la
        Sûreté nationale du lieu de résidence du salarié. Un récépissé de dépôt est délivré,
        servant de justificatif provisoire de séjour le temps du traitement.
      </P>
      <H3>Étape 3 : relevé des empreintes biométriques</H3>
      <P>
        Lors du dépôt ou à une convocation ultérieure, le salarié doit se présenter en personne
        pour le relevé de ses empreintes digitales. Cette étape est obligatoire et ne peut pas
        être effectuée par un mandataire.
      </P>
      <H3>Étape 4 : retrait de la carte</H3>
      <P>
        Le délai de traitement varie de 2 à 6 semaines selon les préfectures et la période.
        La carte est retirée en personne sur présentation du récépissé de dépôt et d'une
        pièce d'identité.
      </P>

      <H2>Renouvellement de la carte de séjour</H2>
      <P>
        La carte de séjour doit être renouvelée avant sa date d'expiration. Le renouvellement
        suit une procédure similaire à la première demande, avec quelques différences :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Le contrat de travail visé en cours de validité (nouveau contrat si renouvellement)</li>
        <li>L'ancienne carte de séjour (originale)</li>
        <li>Les 3 derniers bulletins de paie ou attestation CNSS récente</li>
        <li>Le justificatif de domicile actuel</li>
        <li>Les photos d'identité récentes</li>
      </ul>
      <Tip>
        Lancez la démarche de renouvellement au moins 2 mois avant l'expiration de la carte.
        Un retard peut entraîner des complications administratives et rendre le salarié
        temporairement en situation irrégulière, même si le contrat de travail est en cours.
      </Tip>

      <H2>La carte de séjour de 10 ans</H2>
      <P>
        Après avoir résidé légalement au Maroc pendant une période continue (généralement 4 ans
        pour les salariés), le ressortissant étranger peut demander une carte de résidence de
        10 ans. Cette carte offre une stabilité administrative considérable et simplifie les
        formalités de renouvellement.
      </P>
      <P>
        Les conditions d'éligibilité incluent : la régularité du séjour sur toute la période,
        l'absence d'antécédents judiciaires, la stabilité professionnelle et la justification
        de ressources suffisantes. L'appréciation reste à la discrétion de l'administration.
      </P>

      <Divider />

      <H2>Erreurs fréquentes à éviter</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Confondre récépissé et carte de séjour.</strong> Le récépissé est un document
          provisoire qui ne remplace pas la carte de séjour définitive. Certains services
          (banques, location) peuvent exiger la carte définitive.
        </li>
        <li>
          <strong>Négliger le délai de renouvellement.</strong> Une carte expirée place le salarié
          en situation irrégulière, ce qui peut compliquer le renouvellement du visa de travail.
        </li>
        <li>
          <strong>Oublier de signaler un changement d'adresse.</strong> Tout déménagement doit
          être signalé au service des étrangers dans un délai de 30 jours.
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
        La déclaration à la Caisse Nationale de Sécurité Sociale (CNSS) est une obligation légale
        dès le premier jour du contrat de travail visé. Pour un salarié étranger, cette déclaration
        présente des particularités qu'il est essentiel de maîtriser pour éviter les pénalités
        et garantir les droits sociaux du travailleur.
      </Lead>

      <H2>L'obligation légale : déclarer dès la date du visa</H2>
      <P>
        Le Code du Travail et la législation sur la sécurité sociale sont formels : tout salarié,
        quelle que soit sa nationalité, doit être déclaré à la CNSS dès le premier jour de sa
        relation de travail. Pour un salarié étranger recruté via TAECHIR, la date de prise
        d'effet du contrat est la date d'apposition du visa par le Ministère.
      </P>
      <P>
        Cette obligation s'applique sans exception, que le salarié soit physiquement présent
        au Maroc ou non à cette date. L'employeur ne peut pas conditionner la déclaration à
        l'arrivée effective du salarié ou au début de ses fonctions opérationnelles.
      </P>
      <Warning>
        Tout retard de déclaration CNSS génère des majorations de retard calculées rétroactivement
        depuis la date du visa. Plus le retard s'accumule, plus la régularisation est coûteuse.
        Les pénalités peuvent atteindre 3,5 % du montant des cotisations par mois de retard.
      </Warning>

      <H2>La procédure d'affiliation du salarié étranger</H2>
      <H3>Étape 1 : l'immatriculation de l'employeur</H3>
      <P>
        Si l'entreprise n'est pas encore affiliée à la CNSS (cas rare pour une entreprise
        établie), cette immatriculation doit être effectuée préalablement. La grande majorité
        des employeurs marocains disposent déjà d'un numéro d'affiliation CNSS.
      </P>
      <H3>Étape 2 : la déclaration d'entrée du salarié</H3>
      <P>
        L'employeur doit déclarer le salarié étranger via le portail en ligne DAMANCOM ou
        directement auprès de l'agence CNSS de rattachement. Les informations requises sont :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Identité complète du salarié (nom, prénom, date de naissance, nationalité)</li>
        <li>Numéro de passeport et copie du passeport</li>
        <li>Copie du contrat de travail visé par le Ministère</li>
        <li>Date d'effet de l'embauche (= date du visa)</li>
        <li>Salaire brut mensuel convenu</li>
        <li>Poste occupé et qualification</li>
      </ul>
      <Info>
        Le salarié étranger reçoit un numéro d'immatriculation CNSS personnel, identique dans
        son format à celui d'un salarié marocain. Ce numéro le suivra tout au long de sa carrière
        au Maroc, même en cas de changement d'employeur.
      </Info>

      <H3>Étape 3 : les déclarations mensuelles</H3>
      <P>
        Chaque mois, l'employeur doit déclarer le salaire brut versé au salarié étranger dans
        le cadre de la Déclaration Nominative des Salaires (DNS). Cette déclaration inclut le
        salarié étranger au même titre que les salariés marocains, sans distinction.
      </P>
      <P>
        Les taux de cotisation applicables sont identiques à ceux des salariés marocains :
      </P>
      <Table
        rows={[
          ['Branche', 'Part patronale', 'Part salariale', 'Total'],
          ['Prestations sociales', '8,98 %', '0,52 %', '9,50 %'],
          ['Assurance Maladie Obligatoire (AMO)', '4,11 %', '2,26 %', '6,37 %'],
          ['Allocations familiales', '6,40 %', '0 %', '6,40 %'],
          ['Formation professionnelle', '1,60 %', '0 %', '1,60 %'],
        ]}
      />

      <H2>Les droits sociaux du salarié étranger au Maroc</H2>
      <P>
        Contrairement à une idée reçue, le salarié étranger déclaré à la CNSS bénéficie des
        mêmes prestations sociales qu'un salarié marocain. Ces droits comprennent :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>L'Assurance Maladie Obligatoire (AMO)</strong> : couverture médicale pour le salarié et ses ayants droit résidant au Maroc</li>
        <li><strong>Les indemnités journalières</strong> : en cas de maladie ou d'accident du travail</li>
        <li><strong>Les allocations familiales</strong> : pour les enfants résidant au Maroc</li>
        <li><strong>La pension de retraite</strong> : calculée sur la base des cotisations versées (sous réserve de conventions bilatérales)</li>
        <li><strong>L'indemnité pour perte d'emploi (IPE)</strong> : sous conditions d'éligibilité</li>
      </ul>

      <H2>Les conventions bilatérales de sécurité sociale</H2>
      <P>
        Le Maroc a conclu des conventions bilatérales de sécurité sociale avec plusieurs pays,
        notamment la France, la Belgique, l'Espagne, les Pays-Bas, le Canada, la Tunisie et
        l'Allemagne. Ces conventions permettent :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>La <strong>totalisation des périodes d'assurance</strong> : les périodes cotisées dans chaque pays sont cumulées pour le calcul des droits à pension</li>
        <li>L'<strong>exportation des prestations</strong> : le salarié peut percevoir sa pension marocaine dans son pays d'origine</li>
        <li>L'<strong>exemption de double cotisation</strong> pour les salariés détachés temporairement</li>
      </ul>
      <Tip>
        Pour un salarié originaire d'un pays ayant une convention avec le Maroc, il est recommandé
        de se renseigner auprès de la CNSS sur les modalités de totalisation. Cela peut avoir
        un impact significatif sur les droits à la retraite du salarié.
      </Tip>

      <H2>Pénalités en cas de non-déclaration ou de retard</H2>
      <P>
        Les conséquences d'un défaut de déclaration CNSS sont multiples et sérieuses :
      </P>
      <Table
        rows={[
          ['Infraction', 'Sanction'],
          ['Retard de déclaration', 'Majorations de 3,5 % par mois de retard'],
          ['Non-déclaration d\'un salarié', 'Amende de 5 000 à 10 000 Dhs par salarié'],
          ['Sous-déclaration de salaire', 'Régularisation + majorations + sanctions'],
          ['Non-paiement des cotisations', 'Poursuites judiciaires possibles'],
        ]}
      />
      <P>
        Au-delà des sanctions financières, une situation CNSS non régulière bloque également
        toute future demande ANAPEC et TAECHIR. L'employeur qui ne déclare pas ses salariés
        étrangers se prive de facto de la possibilité de recruter de nouveaux travailleurs
        étrangers tant que la situation n'est pas régularisée.
      </P>

      <Divider />

      <P>
        La déclaration CNSS d'un salarié étranger n'est ni plus compliquée ni plus coûteuse que
        celle d'un salarié marocain. Elle obéit aux mêmes règles, aux mêmes taux et aux mêmes
        échéances. Le point critique est le timing : déclarer dès la date du visa, sans attendre
        l'arrivée physique ou la prise de poste effective du salarié.
      </P>
    </>
  );
}

/* ─── Article 9 ─────────────────────────────────────────────────────────── */

function Article9Content() {
  return (
    <>
      <Lead>
        La légalisation des documents étrangers est une étape souvent sous-estimée dans la
        procédure TAECHIR. Pourtant, un diplôme non légalisé ou une traduction non assermentée
        entraîne systématiquement le rejet du dossier. Ce guide détaille les deux systèmes
        en vigueur — apostille et légalisation consulaire — et vous donne un plan d'action
        concret pour chaque pays d'origine.
      </Lead>

      <H2>Légalisation et apostille : quelle différence ?</H2>
      <P>
        La légalisation est le processus par lequel un document officiel émis dans un pays est
        authentifié pour être reconnu dans un autre pays. Deux systèmes coexistent au niveau
        international :
      </P>
      <Table
        rows={[
          ['Système', 'Base légale', 'Procédure'],
          ['Apostille', 'Convention de La Haye (1961)', 'Tampon unique délivré par l\'autorité compétente du pays d\'émission'],
          ['Légalisation consulaire', 'Droit international coutumier', 'Chaîne de légalisation : autorité locale → MAE → consulat du Maroc'],
        ]}
      />

      <H2>Le Maroc et la Convention de La Haye</H2>
      <P>
        Le Maroc a adhéré à la Convention de La Haye supprimant l'exigence de la légalisation
        des actes publics étrangers. Cela signifie que pour les documents émis dans un pays
        également membre de cette convention, une simple apostille suffit. L'apostille est un
        tampon ou un certificat standardisé apposé par l'autorité compétente du pays d'émission.
      </P>
      <P>
        Parmi les pays signataires les plus fréquemment concernés dans le cadre du recrutement
        TAECHIR : la France, l'Espagne, l'Allemagne, l'Italie, les Pays-Bas, le Portugal,
        la Belgique, le Royaume-Uni, les États-Unis, le Canada (pour certaines provinces),
        le Japon et la Corée du Sud.
      </P>
      <Info>
        La liste complète des pays signataires est disponible sur le site de la Conférence de
        La Haye de droit international privé. Elle évolue régulièrement — vérifiez toujours
        le statut du pays d'origine avant de constituer le dossier.
      </Info>

      <H2>Procédure d'apostille (pays signataires)</H2>
      <H3>Étape 1 : identifier l'autorité compétente</H3>
      <P>
        L'autorité qui délivre l'apostille varie selon les pays. En France, c'est la Cour
        d'appel du lieu de résidence ou du lieu d'émission du document. En Espagne, le Ministerio
        de Justicia. Aux États-Unis, le Secretary of State de l'État fédéré concerné.
      </P>
      <H3>Étape 2 : soumettre le document original</H3>
      <P>
        Le document original (diplôme, certificat de travail, extrait de casier judiciaire)
        est présenté à l'autorité compétente. L'apostille est apposée directement sur le document
        ou sur une feuille annexée (allonge).
      </P>
      <H3>Étape 3 : délai et coût</H3>
      <P>
        Le délai d'obtention de l'apostille varie de quelques jours à 2-3 semaines selon les
        pays et les périodes. Le coût est généralement modique (10 à 50 euros selon les pays).
        En France, l'apostille est gratuite auprès de la Cour d'appel.
      </P>

      <H2>Procédure de légalisation consulaire (pays non signataires)</H2>
      <P>
        Pour les documents émis dans des pays non signataires de la Convention de La Haye —
        notamment certains pays d'Afrique subsaharienne, du Moyen-Orient et d'Asie — la
        procédure est plus longue et plus complexe :
      </P>
      <ol className="list-decimal pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Authentification par l'autorité locale</strong> : le document est d'abord
          certifié par l'autorité qui l'a émis (université, tribunal, administration).
        </li>
        <li>
          <strong>Légalisation par le Ministère des Affaires Étrangères</strong> du pays
          d'émission : le MAE authentifie la signature de l'autorité locale.
        </li>
        <li>
          <strong>Légalisation par le consulat ou l'ambassade du Maroc</strong> dans le
          pays d'émission : le consulat authentifie la signature du MAE.
        </li>
      </ol>
      <Warning>
        Cette chaîne de légalisation peut prendre 2 à 6 semaines selon les pays et la
        disponibilité des services consulaires marocains. Dans certains pays, le consulat
        du Maroc n'est présent que dans la capitale, ce qui ajoute des délais logistiques.
        Anticipez cette étape le plus tôt possible.
      </Warning>

      <H2>La traduction assermentée : quand et comment ?</H2>
      <P>
        Tout document rédigé dans une langue autre que l'arabe ou le français doit être traduit
        par un traducteur assermenté. Cette obligation s'applique quel que soit le système de
        légalisation utilisé (apostille ou consulaire).
      </P>
      <P>Points importants concernant la traduction :</P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>La traduction doit être effectuée par un <strong>traducteur assermenté</strong> inscrit auprès d'une cour d'appel (au Maroc ou dans le pays d'origine)</li>
        <li>La traduction elle-même doit être <strong>légalisée</strong> (signature du traducteur légalisée)</li>
        <li>Il est recommandé de faire traduire au Maroc par un traducteur assermenté marocain pour éviter tout problème de reconnaissance</li>
        <li>Les documents en <strong>anglais</strong> sont parfois acceptés sans traduction dans certains guichets, mais ce n'est pas garanti — la traduction reste recommandée</li>
      </ul>

      <H2>Quels documents doivent être légalisés ?</H2>
      <Table
        rows={[
          ['Document', 'Légalisation requise', 'Traduction requise'],
          ['Diplômes universitaires', 'Oui (apostille ou consulaire)', 'Oui, si non francophone/arabophone'],
          ['Certificats de travail', 'Oui', 'Oui, si non francophone/arabophone'],
          ['Extrait de casier judiciaire', 'Oui', 'Oui'],
          ['Acte de mariage (si dispense)', 'Oui', 'Oui'],
          ['Passeport', 'Non (copie certifiée conforme suffit)', 'Non'],
          ['Contrat TAECHIR', 'Légalisation au Maroc uniquement', 'Non (généré en français)'],
        ]}
      />

      <H2>Conseils pratiques par pays d'origine</H2>
      <H3>France</H3>
      <P>
        Apostille gratuite auprès de la Cour d'appel (délai 5-10 jours). Les diplômes français
        sont reconnus sans traduction. Les certificats de travail doivent être récents.
      </P>
      <H3>Pays d'Afrique francophone</H3>
      <P>
        Légalisation consulaire nécessaire dans la plupart des cas. Les documents sont
        généralement en français, ce qui évite la traduction. Prévoir 3-4 semaines pour la
        chaîne de légalisation complète.
      </P>
      <H3>Pays anglophones (UK, USA, Canada)</H3>
      <P>
        Apostille disponible (pays signataires). Traduction assermentée obligatoire de tous les
        documents. Prévoir un budget de 200 à 500 Dhs par page traduite au Maroc.
      </P>
      <Tip>
        Commencez la légalisation et la traduction dès que la décision de recruter est prise,
        sans attendre le lancement de la procédure ANAPEC. Ces démarches peuvent se faire en
        parallèle et constituent souvent le goulot d'étranglement du calendrier global.
      </Tip>
    </>
  );
}

/* ─── Article 10 ────────────────────────────────────────────────────────── */

function Article10Content() {
  return (
    <>
      <Lead>
        Le secteur de l'offshoring — centres d'appels, BPO, ITO, KPO — est l'un des piliers de
        la stratégie d'attractivité économique du Maroc. Pour les entreprises de ce secteur,
        le recrutement de talents étrangers obéit à des règles spécifiques qui s'écartent
        parfois sensiblement du régime général. Voici le cadre complet à maîtriser.
      </Lead>

      <H2>L'offshoring au Maroc : un secteur stratégique sous statut spécial</H2>
      <P>
        Le secteur de l'offshoring marocain recouvre plusieurs activités : les centres de relation
        client (CRC), les activités de traitement de processus métier (BPO — Business Process
        Outsourcing), les services informatiques externalisés (ITO — IT Outsourcing), et les
        prestations intellectuelles à haute valeur ajoutée (KPO — Knowledge Process Outsourcing).
        Ces activités sont regroupées sous l'appellation générique "offshoring" dans la politique
        industrielle marocaine, notamment le Plan d'Accélération Industrielle.
      </P>
      <P>
        Pour exercer en tant qu'opérateur d'offshoring, les entreprises doivent être enregistrées
        auprès de la Commission des Investissements ou de l'AMDIE (Agence Marocaine de Développement
        des Investissements et des Exportations), et sont souvent implantées dans des zones
        dédiées telles que Casablanca Nearshore, Rabat Technopolis, Fès Shore, Marrakech Shore
        ou Oujda Shore.
      </P>
      <Info>
        Le statut d'opérateur d'offshoring reconnu ouvre des avantages fiscaux spécifiques
        (IS réduit à 15 % après exonération de 5 ans, exonération de droits de douane sur
        équipements, etc.) mais aussi des facilitations administratives pour le recrutement
        international qui sont distinctes du régime CFC.
      </Info>

      <H2>Statut CFC vs statut offshoring : deux régimes à ne pas confondre</H2>
      <P>
        La confusion la plus fréquente oppose le statut Casablanca Finance City (CFC) et le
        statut offshoring. Ces deux régimes coexistent mais s'appliquent à des réalités
        différentes.
      </P>
      <H3>Le statut CFC</H3>
      <P>
        Casablanca Finance City est une plateforme financière internationale localisée à
        Casablanca qui accueille des sièges régionaux, des sociétés de gestion d'actifs, des
        banques d'investissement et des prestataires de services aux entreprises multinationales.
        Les entreprises bénéficiant du statut CFC jouissent d'un régime dérogatoire explicitement
        prévu par la loi : leurs salariés étrangers sont <strong>totalement dispensés de
        l'attestation ANAPEC</strong> et bénéficient d'un traitement accéléré de leurs dossiers
        TAECHIR. Ce traitement préférentiel est inscrit dans les textes réglementaires encadrant
        CFC.
      </P>
      <H3>Le statut offshoring "classique"</H3>
      <P>
        Pour les opérateurs d'offshoring hors CFC — ce qui représente l'immense majorité des
        centres d'appels et BPO implantés en zones shore —, la dispense totale d'ANAPEC
        n'est pas automatique. En revanche, plusieurs mécanismes facilitent le recrutement
        international.
      </P>
      <Table
        rows={[
          ['Critère', 'Statut CFC', 'Offshoring hors CFC'],
          ['Dispense ANAPEC automatique', 'Oui, pour tout le personnel', 'Non (sauf catégories générales)'],
          ['Procédure allégée encadrement', 'Oui', 'Oui (listes A1/A2 applicables)'],
          ['Zones dédiées', 'Casablanca Finance City', 'Zones shore (Nearshore, Technopolis…)'],
          ['Secteurs couverts', 'Finance, conseil, holdings', 'BPO, ITO, centres d\'appels, KPO'],
          ['Base réglementaire', 'Textes CFC spécifiques', 'Code du Travail + circulaires ANAPEC'],
        ]}
      />

      <H2>Les facilitations spécifiques pour l'encadrement des entreprises d'offshoring</H2>
      <P>
        Si les opérateurs d'offshoring hors CFC ne bénéficient pas d'une dispense générale,
        le personnel d'encadrement et de direction peut très souvent bénéficier de la procédure
        allégée via les <strong>listes A1 et A2</strong> de l'ANAPEC. En pratique, une grande
        partie des profils seniors de l'offshoring — directeurs de site, responsables qualité
        internationaux, chefs de projet bilingues avec expertise sectorielle — entre dans les
        critères A1 (séniorité) ou A2 (spécialité pointue).
      </P>
      <P>
        Le traitement ANAPEC pour ces profils se limite alors à <strong>48 heures et 1 500 Dhs</strong>,
        sans obligation de publier une annonce. Cela rend le recrutement international de
        cadres d'offshoring beaucoup plus fluide qu'il n'y paraît au premier abord.
      </P>
      <Tip>
        Avant de lancer un dossier ANAPEC standard pour un cadre supérieur de votre centre
        d'offshoring, vérifiez systématiquement si le profil relève des listes A1 ou A2.
        Un directeur des opérations bilingue avec plus de 8 ans d'expérience en management
        de BPO a toutes les chances de relever de la liste A1.
      </Tip>

      <H2>Les profils opérationnels : agents et superviseurs étrangers</H2>
      <P>
        La situation est différente pour les profils opérationnels — agents de centres d'appels,
        chargés de relation client, superviseurs d'équipe juniors. Ces postes ne relèvent
        généralement ni des listes A1/A2 ni d'une catégorie dispensée. Ils nécessitent donc
        a priori une attestation ANAPEC standard (20 jours, 5 000 Dhs pour le premier dossier).
      </P>
      <P>
        Toutefois, en pratique, les entreprises d'offshoring qui recrutent des profils
        étrangers pour des compétences linguistiques spécifiques — locuteurs natifs d'une
        langue peu représentée au Maroc (néerlandais, scandinaves, flamand, etc.) —
        peuvent argumenter que le profil est rare du fait de la langue requise. Cette
        argumentation, si elle est bien documentée, peut permettre d'obtenir un traitement
        accéléré ou de basculer sur une procédure A2.
      </P>
      <Warning>
        Le seul critère linguistique n'est pas formellement suffisant pour qualifier un profil
        de rare au sens strict des listes A1/A2. La décision reste à la discrétion de l'agence
        ANAPEC régionale. Une démarche préalable auprès de l'agence pour présenter le besoin
        est fortement recommandée avant de déposer un dossier.
      </Warning>

      <H2>Le traitement ANAPEC régional pour les zones offshoring</H2>
      <P>
        Les dossiers des entreprises implantées dans les zones shore sont traités par l'agence
        ANAPEC régionale compétente selon la localisation géographique du site. Casablanca
        Nearshore relève de l'agence ANAPEC de Casablanca, Rabat Technopolis de celle de Rabat,
        etc. Il n'existe pas d'agence ANAPEC dédiée aux opérateurs d'offshoring, contrairement
        à ce que certains employeurs supposent.
      </P>
      <P>
        Cette réalité a une conséquence pratique importante : la connaissance du secteur
        offshoring et la sensibilité aux enjeux de recrutement international varient selon
        les agences. Certaines agences régionales ont développé une expertise spécifique du
        secteur et traitent les dossiers d'opérateurs d'offshoring avec plus d'efficacité.
        Il est utile d'établir un contact préalable avec l'agence régionale pour présenter
        le profil de votre entreprise et vos besoins en recrutement international.
      </P>

      <H2>La procédure TAECHIR pour les opérateurs d'offshoring</H2>
      <P>
        Sur la plateforme TAECHIR elle-même, les entreprises d'offshoring hors CFC suivent
        la procédure standard. Il n'existe pas de tunnel dédié ni de traitement prioritaire
        au niveau de la plateforme. La différenciation intervient en amont (au niveau de
        l'ANAPEC) et en aval (au niveau du Ministère).
      </P>
      <H3>La mention de la zone shore dans le dossier</H3>
      <P>
        Il est recommandé de mentionner explicitement dans le dossier TAECHIR que l'entreprise
        est un opérateur d'offshoring implanté dans une zone shore, et de joindre les
        justificatifs correspondants (convention d'implantation, attestation de la zone, etc.).
        Ces éléments contextualisent la demande et peuvent faciliter le traitement par les
        agents du Ministère.
      </P>
      <H3>Le contrat de travail TAECHIR pour l'offshoring</H3>
      <P>
        Le contrat généré sur TAECHIR ne comporte pas de mention spécifique au secteur
        de l'offshoring. Il suit le format standard du Code du Travail marocain. Veillez
        à ce que l'intitulé du poste corresponde aux appellations reconnues dans la
        nomenclature des emplois de l'ANAPEC. "Agent de relation client" ou "Superviseur
        centre de relation client" sont des intitulés généralement bien reconnus.
      </P>

      <Divider />

      <H2>Guide pratique : quelle procédure selon le profil ?</H2>
      <Table
        rows={[
          ['Profil', 'Statut', 'Procédure recommandée', 'Délai estimé'],
          ['Directeur de site ou DG', 'Liste A1', 'ANAPEC 48h + TAECHIR standard', '2–3 semaines'],
          ['Responsable IT / CTO offshore', 'Liste A1 ou A2', 'ANAPEC 48h + TAECHIR standard', '2–3 semaines'],
          ['Expert sectoriel senior (KPO)', 'Liste A2', 'ANAPEC 48h + TAECHIR standard', '2–3 semaines'],
          ['Agent langue rare (néerlandais, etc.)', 'À qualifier avec ANAPEC', 'Démarche préalable ANAPEC recommandée', '3–5 semaines'],
          ['Agent langue courante (français, anglais)', 'Procédure standard', 'ANAPEC 20j + TAECHIR standard', '5–7 semaines'],
          ['Personnel CFC (finance, conseil)', 'Dispensé ANAPEC', 'TAECHIR direct', '1–2 semaines'],
        ]}
      />
      <P>
        La clé pour les entreprises d'offshoring est de <strong>qualifier correctement chaque
        profil en amont</strong>, avant d'engager les démarches administratives. Un mauvais
        classement peut coûter plusieurs semaines et plusieurs milliers de dirhams de frais
        inutiles. Un avocat spécialisé en droit du travail marocain ou un consultant en
        immigration d'entreprise peut apporter une valeur réelle à ce stade de qualification.
      </P>
      <Tip>
        Les entreprises d'offshoring qui recrutent régulièrement à l'international ont intérêt
        à négocier un "profil type entreprise" avec leur agence ANAPEC régionale. Cela permet
        d'établir en amont quels types de postes relèvent de quelle procédure, et d'accélérer
        sensiblement les dossiers futurs.
      </Tip>
    </>
  );
}

/* ─── Article 11 ────────────────────────────────────────────────────────── */

function Article11Content() {
  return (
    <>
      <Lead>
        Recruter un salarié étranger au Maroc entraîne des coûts souvent sous-estimés par les
        employeurs. Au-delà des frais ANAPEC bien connus, une série de dépenses annexes — légalisation,
        traductions, notaire, DGSN, déplacements — s'accumulent rapidement. Voici le budget
        détaillé et honnête pour 2026, par profil de recrutement.
      </Lead>

      <H2>Vue d'ensemble : les postes de coût à anticiper</H2>
      <P>
        Un recrutement étranger via le programme TAECHIR mobilise plusieurs types de dépenses
        qui interviennent à des étapes différentes de la procédure. Certains sont obligatoires
        dans tous les cas, d'autres dépendent du profil du salarié ou de la nature du dossier.
      </P>
      <P>On distingue six grandes familles de coûts :</P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>Les frais ANAPEC (attestation d'activité)</li>
        <li>Les frais de légalisation des documents</li>
        <li>Les frais de traduction assermentée</li>
        <li>Les honoraires de notaire ou d'adoul</li>
        <li>Les frais DGSN pour la carte de séjour</li>
        <li>Les coûts de déplacement et le temps administratif interne</li>
      </ol>
      <Info>
        Ces coûts sont à la charge de l'employeur dans leur quasi-totalité. Mettre ces dépenses
        à la charge du salarié étranger serait non seulement contraire à l'éthique du recrutement
        international, mais potentiellement problématique sur le plan juridique.
      </Info>

      <H2>1. Les frais ANAPEC</H2>
      <P>
        C'est le poste le plus connu et le mieux documenté. Il varie selon le type de dossier :
      </P>
      <Table
        rows={[
          ['Type de dossier', 'Montant HT', 'Notes'],
          ['1er dossier standard (profil nouveau)', '5 000 Dhs', 'Annonce obligatoire, 20 jours ouvrables'],
          ['Dossier supplémentaire (même métier, même année)', '1 500 Dhs', 'Jusqu\'à 5 dossiers/an par métier'],
          ['Profil rare (liste A1 ou A2)', '1 500 Dhs', 'Traitement 48h, pas d\'annonce'],
          ['Renouvellement chez même employeur', '1 500 Dhs', 'Traitement accéléré'],
          ['Catégorie dispensée (CFC, conventions, etc.)', '0 Dhs', 'Aucune démarche ANAPEC'],
        ]}
      />
      <P>
        La TVA marocaine (20 %) s'applique sur les frais ANAPEC, portant le premier dossier
        standard à <strong>6 000 Dhs TTC</strong>. Les entreprises assujetties à la TVA peuvent
        récupérer cette TVA dans leurs déclarations. Les structures non assujetties la supportent
        définitivement.
      </P>

      <H2>2. Les frais de légalisation des documents</H2>
      <P>
        La légalisation des signatures est une étape incontournable : le contrat de travail
        TAECHIR doit être imprimé en trois exemplaires et légalisé (signature du salarié ET
        de l'employeur). Les diplômes étrangers doivent parfois également être légalisés.
      </P>
      <H3>Légalisation au Maroc</H3>
      <P>
        La légalisation d'une signature au Maroc s'effectue auprès d'un adoul ou d'un notaire,
        ou dans certains cas auprès de l'autorité locale (caïd). Le coût par document est
        faible — généralement entre <strong>20 et 50 Dhs par signature légalisée</strong> —
        mais le délai peut varier selon la localité et l'affluence. Comptez une journée pour
        légaliser les trois exemplaires du contrat.
      </P>
      <H3>Légalisation à l'étranger (apostille)</H3>
      <P>
        Pour les diplômes obtenus dans un pays ayant ratifié la Convention de La Haye de 1961,
        une apostille suffit. Son coût dépend du pays émetteur et varie de <strong>30 à 150 euros</strong>
        {' '}selon les administrations. Pour les pays non membres de la Convention de La Haye,
        une légalisation consulaire en chaîne (pays d'origine → ambassade marocaine locale)
        est nécessaire et peut coûter entre <strong>100 et 300 euros</strong>, avec des délais
        parfois supérieurs à 3 semaines.
      </P>
      <Warning>
        La légalisation consulaire en chaîne est l'étape la plus imprévisible en termes de
        délai. Certaines ambassades marocaines n'ont pas de rendez-vous disponibles avant
        plusieurs semaines. Anticipez cette démarche dès que vous avez identifié le candidat,
        bien avant de déposer le dossier au Ministère.
      </Warning>

      <H2>3. Les frais de traduction assermentée</H2>
      <P>
        Tous les documents étrangers doivent être traduits en langue arabe par un traducteur
        assermenté auprès des tribunaux marocains. Les documents concernés incluent typiquement :
        diplômes, relevés de notes, certificats de travail, extrait de casier judiciaire (parfois
        demandé), acte de mariage (pour les conjoints de marocains).
      </P>
      <P>
        Les tarifs des traducteurs assermentés au Maroc varient selon la langue source et la
        complexité du document. Voici une fourchette réaliste pour 2026 :
      </P>
      <Table
        rows={[
          ['Type de document', 'Tarif indicatif (Dhs HT)', 'Notes'],
          ['Diplôme ou relevé de notes (français → arabe)', '200–350 Dhs/page', 'Plus économique, langue courante'],
          ['Diplôme ou relevé de notes (anglais → arabe)', '300–500 Dhs/page', 'Disponibilité large'],
          ['Certificat de travail (anglais/français → arabe)', '200–400 Dhs', 'Document court'],
          ['Diplôme (langue rare : néerlandais, polonais, etc.)', '600–1 200 Dhs/page', 'Traducteurs rares, délais plus longs'],
          ['Acte de mariage étranger traduit et certifié', '400–700 Dhs', 'Selon pays d\'origine'],
        ]}
      />
      <P>
        Pour un dossier standard comprenant 1 diplôme (2 pages) et 1 certificat de travail,
        comptez entre <strong>700 et 1 500 Dhs</strong> de traductions selon la langue. Pour
        des profils avec plusieurs diplômes ou des documents complexes, la facture peut dépasser
        <strong>3 000 Dhs</strong>.
      </P>

      <H2>4. Les honoraires de notaire ou d'adoul</H2>
      <P>
        La légalisation des trois exemplaires du contrat TAECHIR peut s'effectuer chez un
        adoul (légalisation de droit coutumier) ou chez un notaire (légalisation de droit
        civil). Les honoraires sont modestes dans les deux cas mais méritent d'être budgétés.
      </P>
      <P>
        Chez un adoul : <strong>100 à 200 Dhs</strong> pour les trois légalisations du contrat,
        avec généralement un délai d'une heure à une journée. Chez un notaire, les tarifs
        peuvent être légèrement supérieurs (200 à 400 Dhs) mais la procédure est identique.
      </P>
      <Tip>
        Certaines entreprises passent par un prestataire de services administratifs (conciergerie
        juridique ou bureau de légalisation privé) qui prend en charge l'ensemble des légalisations
        moyennant des honoraires de service de 300 à 800 Dhs. C'est une solution qui peut valoir
        son prix si vos équipes internes n'ont pas le temps de gérer ces démarches physiques.
      </Tip>

      <H2>5. Les frais DGSN pour la carte de séjour</H2>
      <P>
        La carte d'immatriculation (carte de séjour) est délivrée par la Direction Générale
        de la Sûreté Nationale (DGSN), indépendamment du visa de travail du Ministère. Elle
        constitue le titre de séjour officiel du salarié étranger au Maroc et est renouvelable
        annuellement.
      </P>
      <P>
        Les droits de timbre et frais administratifs pour la carte de séjour s'élèvent à environ
        <strong>200 à 500 Dhs</strong> selon le type et la durée. La visite médicale auprès
        du médecin agréé de la DGSN, obligatoire pour tout primo-demandeur, coûte entre
        <strong>200 et 400 Dhs</strong>. Des photos d'identité aux normes biométriques sont
        également nécessaires (coût négligeable : 30 à 60 Dhs).
      </P>
      <P>
        Au total, la procédure carte de séjour représente environ <strong>500 à 1 000 Dhs</strong>
        {' '}de frais directs hors déplacements. Elle mobilise en outre une ou plusieurs demi-journées
        du salarié pour se présenter physiquement au service d'immigration.
      </P>

      <H2>6. Coûts de déplacement et temps administratif</H2>
      <P>
        Ces coûts sont souvent oubliés dans les estimations, mais ils peuvent représenter
        une part significative du budget total, notamment pour des recrutements internationaux
        avec entretiens en présentiel ou pour des dossiers physiques à déposer dans plusieurs
        administrations.
      </P>
      <H3>Déplacements du salarié</H3>
      <P>
        Si le recrutement implique que le candidat vienne au Maroc avant l'obtention de son
        visa de travail pour signer le contrat, les frais de voyage international sont à
        anticiper. Selon l'origine, un aller-retour peut coûter entre <strong>300 et 1 500 euros</strong>.
        Certains employeurs gèrent ce point en faisant signer le contrat à l'étranger et en
        le faisant légaliser auprès du consulat marocain compétent, mais cette approche ajoute
        de la complexité.
      </P>
      <H3>Temps administratif interne</H3>
      <P>
        La gestion d'un dossier TAECHIR complet représente, pour une équipe RH ou juridique,
        entre <strong>4 et 12 heures de travail</strong> selon la complexité du profil et
        l'expérience de l'équipe. Pour un premier dossier sans expérience préalable, le temps
        de prise en main et les éventuelles erreurs à corriger peuvent doubler cette estimation.
        En valorisant ce temps au coût horaire moyen d'un chargé RH ou d'un office manager
        (50 à 100 Dhs/heure), le coût interne représente entre <strong>200 et 1 200 Dhs</strong>.
      </P>

      <Divider />

      <H2>Tableau comparatif : budget total par profil en 2026</H2>
      <Table
        rows={[
          ['Poste de coût', 'Profil standard', 'Profil rare (A1/A2)', 'Profil dispensé (ex. CFC)'],
          ['Frais ANAPEC TTC', '6 000 Dhs (1er dossier)', '1 800 Dhs', '0 Dhs'],
          ['Légalisation contrat (adoul/notaire)', '150–400 Dhs', '150–400 Dhs', '150–400 Dhs'],
          ['Traductions assermentées', '700–3 000 Dhs', '700–3 000 Dhs', '700–3 000 Dhs'],
          ['Légalisation diplômes (pays Convention)', '100–400 Dhs (apostille)', '100–400 Dhs', '100–400 Dhs'],
          ['Frais DGSN carte de séjour', '500–1 000 Dhs', '500–1 000 Dhs', '500–1 000 Dhs'],
          ['Temps administratif interne', '500–1 200 Dhs', '300–800 Dhs', '200–500 Dhs'],
          ['TOTAL estimé (hors déplacements)', '7 950–12 000 Dhs', '3 550–6 600 Dhs', '1 650–5 300 Dhs'],
        ]}
      />
      <P>
        Ces estimations excluent les éventuels honoraires de conseil juridique externe et les
        frais de déplacement international du salarié. Pour les entreprises faisant appel à un
        avocat spécialisé ou un cabinet de conseil en immigration, il faut ajouter entre
        <strong>3 000 et 8 000 Dhs</strong> d'honoraires selon la complexité du dossier et le
        cabinet retenu.
      </P>

      <H2>Les coûts cachés que les employeurs oublient</H2>
      <H3>La mise à jour annuelle de la carte de séjour</H3>
      <P>
        La carte de séjour est renouvelable annuellement. Chaque renouvellement engendre les
        mêmes frais DGSN (500 à 1 000 Dhs) ainsi qu'une nouvelle visite médicale lors des
        premières années. Sur 3 ans, ce poste représente 1 500 à 3 000 Dhs supplémentaires.
      </P>
      <H3>Le coût du renouvellement du visa de travail</H3>
      <P>
        Le contrat de travail TAECHIR est en général conclu pour un an et doit être renouvelé.
        Les frais ANAPEC de renouvellement s'élèvent à 1 500 Dhs (traitement accéléré 48h),
        auxquels s'ajoutent les frais de légalisation du nouveau contrat et le temps administratif.
        Sur la durée de vie d'un salarié étranger dans votre entreprise, ce poste est récurrent.
      </P>
      <H3>Le coût d'opportunité des délais</H3>
      <P>
        Pour un profil standard, les 20 jours ouvrables d'attente ANAPEC représentent environ
        un mois calendaire pendant lequel le poste reste vacant. Si le profil génère une valeur
        mensuelle estimée à 50 000 Dhs, le coût d'opportunité du délai atteint cette somme.
        Ce coût invisible n'apparaît dans aucune facture mais est bien réel. C'est une raison
        supplémentaire de tout faire pour qualifier le profil en A1/A2 lorsque c'est possible.
      </P>

      <H2>Conseils pour optimiser le budget</H2>
      <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
        <li>
          <strong>Mutualiser les dossiers ANAPEC.</strong> Si vous recrutez plusieurs étrangers
          pour le même type de poste dans l'année, le 2e dossier et suivants n'ont que 1 500 Dhs
          de frais (au lieu de 5 000 Dhs). Regroupez vos recrutements dans une même année
          civile pour maximiser cet avantage.
        </li>
        <li>
          <strong>Anticiper les traductions et légalisations.</strong> Demandez au candidat
          de faire légaliser et apostiller ses diplômes dès le début du processus de sélection,
          avant même d'être certain de le retenir. Le gain de temps est significatif.
        </li>
        <li>
          <strong>Vérifier la qualification A1/A2 avant de payer.</strong> Les 5 000 Dhs du
          premier dossier standard sont économisés en totalité si le profil relève de la liste
          A1 ou A2. Cette vérification préalable ne coûte rien et peut éviter une dépense importante.
        </li>
        <li>
          <strong>Constituer un dossier type réutilisable.</strong> Les documents juridiques
          de l'entreprise (statuts, RC, ICE, attestation CNSS) sont les mêmes pour tous les
          dossiers. Maintenez à jour un "kit entreprise" prêt à l'emploi pour éviter de refaire
          ces démarches à chaque recrutement.
        </li>
      </ul>
      <Tip>
        Pour une entreprise qui recrute régulièrement à l'international (3 salariés étrangers
        ou plus par an), l'investissement dans une formation interne ou dans un prestataire
        spécialisé se rentabilise rapidement. Le gain en temps et en erreurs évitées dépasse
        généralement le coût de l'accompagnement dès la deuxième ou troisième procédure.
      </Tip>
    </>
  );
}


/* ─── Article registry ───────────────────────────────────────────────────── */

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
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
