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
        Le détachement de salariés — ou « mise à disposition internationale » — est un mécanisme
        juridique qui permet à une entreprise étrangère d'envoyer temporairement un de ses
        employés travailler au Maroc sans rompre son contrat d'origine. Encadré par des règles
        spécifiques, il se distingue nettement du recrutement classique via Taechir. Ce guide
        détaille le cadre légal, la procédure complète et les pièges à éviter.
      </Lead>

      <H2>Qu'est-ce que le détachement de salariés au sens du droit marocain ?</H2>
      <P>
        Le détachement désigne la situation où un salarié, lié par un contrat de travail à une
        entreprise établie à l'étranger (l'entreprise d'origine), est envoyé au Maroc pour
        exécuter une mission temporaire pour le compte de cette même entreprise ou d'une
        entreprise marocaine liée (filiale, partenaire, client). Pendant toute la durée du
        détachement, le contrat de travail initial n'est pas rompu : le salarié reste juridiquement
        rattaché à son employeur étranger.
      </P>
      <P>
        Cette distinction est fondamentale car elle détermine le régime applicable en matière
        de droit du travail, de sécurité sociale et d'obligations administratives. Le salarié
        détaché n'est pas un salarié recruté localement : il est « prêté » temporairement.
      </P>
      <Info>
        Le détachement est une catégorie dispensée de l'attestation ANAPEC. L'employeur
        n'a pas besoin de prouver l'absence de profil national pour le poste, car il ne s'agit
        pas d'un recrutement mais d'une mission temporaire dans le cadre d'un contrat existant.
      </Info>

      <H2>Détachement vs. recrutement local : les différences clés</H2>
      <Table
        rows={[
          ['Critère', 'Détachement', 'Recrutement local (Taechir)'],
          ['Contrat de travail', 'Maintenu avec l\'employeur étranger', 'Nouveau contrat avec l\'employeur marocain'],
          ['Attestation ANAPEC', 'Dispensé', 'Requise (sauf exceptions)'],
          ['Durée', 'Temporaire (max 12 mois, renouvelable une fois)', 'CDD 1 an renouvelable, possibilité CDI'],
          ['Sécurité sociale', 'Régime du pays d\'origine (si convention)', 'CNSS marocaine obligatoire'],
          ['Rémunération', 'Versée par l\'employeur étranger', 'Versée par l\'employeur marocain'],
          ['Autorité compétente', 'Ministère du Travail (visa obligatoire)', 'Ministère du Travail via Taechir'],
        ]}
      />
      <P>
        La confusion entre ces deux régimes est fréquente et peut avoir des conséquences
        juridiques graves. Un détachement qui se prolonge au-delà des limites légales ou qui
        ne respecte pas les conditions de forme peut être requalifié en contrat de travail
        local, avec toutes les obligations qui en découlent (CNSS, droit du travail marocain,
        indemnités).
      </P>

      <H2>Le cadre juridique du détachement au Maroc</H2>
      <H3>Base légale dans le Code du Travail</H3>
      <P>
        Le Code du Travail marocain (loi 65-99) ne contient pas de chapitre spécifiquement
        consacré au détachement international. Le cadre s'appuie sur plusieurs textes :
        l'article 516 relatif à l'emploi d'étrangers, les dispositions du dahir n° 1-03-196
        relatif à l'entrée et au séjour des étrangers, et les conventions bilatérales de
        sécurité sociale signées par le Maroc.
      </P>
      <P>
        En pratique, c'est la circulaire ministérielle et les instructions internes du
        Ministère du Travail qui précisent les modalités du détachement. Le principe retenu
        est simple : tout étranger exerçant une activité professionnelle au Maroc, même
        temporairement, doit obtenir une autorisation de travail sous forme de visa apposé
        sur un contrat ou une lettre de détachement.
      </P>

      <H3>Conventions bilatérales de sécurité sociale</H3>
      <P>
        Le Maroc a signé des conventions de sécurité sociale avec plusieurs pays (France,
        Belgique, Espagne, Allemagne, Canada, Tunisie, etc.). Ces conventions permettent
        au salarié détaché de rester affilié au régime de sécurité sociale de son pays
        d'origine pendant la durée du détachement, moyennant la production d'un certificat
        de détachement (formulaire conventionnel).
      </P>
      <P>
        En l'absence de convention bilatérale, le salarié détaché doit en principe être
        affilié à la CNSS marocaine pour la durée de sa mission, ce qui complique
        considérablement le montage administratif.
      </P>
      <Info>
        La France étant le premier partenaire commercial du Maroc, la convention
        franco-marocaine de sécurité sociale du 22 octobre 2007 est de loin la plus
        utilisée. Elle prévoit un détachement initial de 3 ans, renouvelable une fois
        pour 3 ans supplémentaires, pendant lesquels le salarié reste affilié à la
        sécurité sociale française.
      </Info>

      <H2>La durée du détachement : limites et renouvellement</H2>
      <P>
        La durée maximale d'un détachement au Maroc dépend de deux cadres :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Droit du travail marocain :</strong> le visa de travail pour détachement est généralement accordé pour une durée de 12 mois, renouvelable une fois pour 12 mois supplémentaires, soit 24 mois maximum.</li>
        <li><strong>Convention de sécurité sociale :</strong> la durée maximale de maintien au régime d'origine varie selon les conventions (36 mois pour la France, 24 mois pour la Belgique, etc.).</li>
      </ul>
      <P>
        La durée effective du détachement est la plus courte des deux limites. Au-delà,
        le détachement n'est plus juridiquement possible : soit le salarié retourne dans
        son pays d'origine, soit l'entreprise marocaine procède à un recrutement local
        via la procédure Taechir classique.
      </P>
      <Warning>
        Prolonger un détachement au-delà de la durée maximale sans procéder à une
        régularisation expose l'employeur marocain (ou la filiale d'accueil) à une
        requalification en contrat de travail local, avec rappel de cotisations CNSS,
        pénalités et éventuelles sanctions pénales.
      </Warning>

      <H2>La procédure de détachement étape par étape</H2>
      <H3>Étape 1 : préparation de la lettre de détachement</H3>
      <P>
        L'entreprise d'origine rédige une lettre de détachement (ou avenant au contrat)
        précisant : l'identité du salarié, le poste occupé au Maroc, la durée prévue,
        la rémunération maintenue, l'entreprise d'accueil au Maroc (le cas échéant) et
        les conditions de rapatriement en fin de mission.
      </P>
      <P>
        Ce document doit être signé par le salarié et l'employeur d'origine. Si le salarié
        est accueilli par une entité marocaine distincte, une convention tripartite
        (employeur d'origine, salarié, entreprise d'accueil) est recommandée.
      </P>

      <H3>Étape 2 : obtention du certificat de détachement de sécurité sociale</H3>
      <P>
        Pour les pays ayant une convention bilatérale avec le Maroc, l'employeur d'origine
        doit obtenir un certificat de détachement auprès de l'organisme de sécurité sociale
        de son pays. Ce document atteste que le salarié reste couvert par son régime d'origine
        et est exonéré de cotisations CNSS au Maroc.
      </P>
      <Table
        rows={[
          ['Pays d\'origine', 'Formulaire', 'Organisme émetteur', 'Durée max'],
          ['France', 'SE 350-01', 'CLEISS / CPAM / URSSAF', '3 ans + 3 ans'],
          ['Belgique', 'MA/BE 101', 'ONSS / INASTI', '2 ans + 2 ans'],
          ['Espagne', 'E/MA 1', 'TGSS', '2 ans'],
          ['Canada/Québec', 'MA/QUE ou MA/CAN', 'RRQ / Service Canada', '3 ans'],
          ['Tunisie', 'TN/MA 101', 'CNSS Tunisie', '3 ans'],
        ]}
      />

      <H3>Étape 3 : dépôt du dossier au Ministère du Travail</H3>
      <P>
        Le dossier de demande d'autorisation de travail pour détachement est déposé auprès
        du service compétent du Ministère du Travail. Il comprend :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>La lettre de détachement ou l'avenant au contrat, légalisé</li>
        <li>Le certificat de détachement de sécurité sociale (si convention bilatérale)</li>
        <li>La copie du passeport valide du salarié</li>
        <li>Les diplômes et certificats de travail (traduits et légalisés si nécessaire)</li>
        <li>Les documents juridiques de l'entreprise d'accueil au Maroc (RC, ICE, statuts)</li>
        <li>Une lettre de l'entreprise d'accueil confirmant la mission et sa durée</li>
      </ul>
      <P>
        Le Ministère dispose du même délai de 10 jours pour apposer le visa. La procédure
        est similaire à celle du recrutement classique, seule la nature du document visé
        diffère (lettre de détachement vs. contrat de travail).
      </P>

      <H3>Étape 4 : carte de séjour et formalités d'entrée</H3>
      <P>
        Une fois le visa obtenu, le salarié détaché doit, comme tout travailleur étranger,
        demander une carte de séjour auprès de la DGSN. Le contrat visé (ou la lettre de
        détachement visée) fait partie des pièces exigées.
      </P>
      <Tip>
        Le salarié détaché peut dans un premier temps entrer au Maroc avec un visa
        d'entrée classique (si son pays est soumis à visa) et déclencher la demande
        de carte de séjour une fois sur place. Pour les ressortissants de pays dispensés
        de visa d'entrée (Union européenne, etc.), l'entrée se fait sur passeport, avec
        un délai de 90 jours pour régulariser la situation.
      </Tip>

      <H2>Implications en matière de sécurité sociale</H2>
      <H3>Avec convention bilatérale</H3>
      <P>
        Le salarié reste affilié à son régime d'origine. L'employeur étranger continue de
        verser les cotisations sociales dans son pays. Aucune cotisation CNSS n'est due
        au Maroc. Le certificat de détachement doit être présenté en cas de contrôle.
      </P>

      <H3>Sans convention bilatérale</H3>
      <P>
        En l'absence de convention, le droit marocain impose en principe l'affiliation
        à la CNSS pour toute personne exerçant une activité salariée sur le territoire
        marocain. Le salarié détaché se retrouve donc potentiellement soumis à une
        double cotisation (pays d'origine + Maroc), sauf si le pays d'origine accepte
        une suspension de l'affiliation.
      </P>
      <Warning>
        Cette situation de double cotisation est un risque financier majeur. Avant
        d'envoyer un salarié d'un pays sans convention bilatérale, analysez précisément
        les coûts et consultez un spécialiste en droit social international.
      </Warning>

      <H2>Quand le détachement devient un recrutement local</H2>
      <P>
        Le détachement est par nature temporaire. Si la présence du salarié au Maroc
        se prolonge au-delà des durées autorisées, ou si les conditions du détachement
        ne sont plus respectées, l'administration peut requalifier la situation :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Dépassement de la durée maximale :</strong> le salarié doit être rapatrié ou recruté localement via Taechir.</li>
        <li><strong>Lien de subordination avec l'entreprise d'accueil :</strong> si le salarié reçoit ses instructions directement de l'entreprise marocaine (et non de l'employeur d'origine), il y a présomption de contrat de travail local.</li>
        <li><strong>Absence de contrat d'origine effectif :</strong> si le salarié n'a plus de lien réel avec l'entreprise étrangère (pas de rémunération versée depuis l'étranger, pas de mission de retour prévue), le détachement est fictif.</li>
        <li><strong>Détachements successifs sans interruption :</strong> enchaîner des lettres de détachement pour contourner la durée maximale constitue un abus de droit.</li>
      </ul>
      <Info>
        La requalification entraîne rétroactivement l'application du droit du travail
        marocain, l'affiliation à la CNSS avec rappel de cotisations majorées de
        pénalités, et potentiellement des sanctions pour emploi irrégulier d'un étranger.
      </Info>

      <H2>Risques et sanctions en cas d'abus</H2>
      <P>
        L'inspection du travail marocaine est habilitée à contrôler la réalité du
        détachement. Les risques en cas d'abus sont multiples :
      </P>
      <Table
        rows={[
          ['Infraction', 'Sanction possible'],
          ['Détachement fictif (pas de contrat d\'origine réel)', 'Requalification en contrat local + rappel CNSS + amendes'],
          ['Dépassement de la durée autorisée', 'Amende de 2 000 à 5 000 Dhs par salarié + régularisation imposée'],
          ['Absence de visa de travail', 'Amende de 2 000 à 5 000 Dhs + expulsion possible du salarié'],
          ['Non-affiliation CNSS (sans convention)', 'Pénalités CNSS rétroactives + majorations de 3% par mois'],
        ]}
      />

      <H2>Obligations fiscales du salarié détaché</H2>
      <P>
        Le salarié détaché au Maroc est, sauf convention fiscale contraire, imposable
        au Maroc sur les revenus perçus au titre de son activité exercée sur le territoire
        marocain, dès lors que son séjour dépasse 183 jours par an. Les conventions
        fiscales bilatérales (le Maroc en a signé plus de 50) peuvent toutefois modifier
        cette règle et attribuer le droit d'imposition au pays d'origine.
      </P>
      <P>
        L'entreprise d'accueil marocaine doit s'assurer que les obligations de retenue
        à la source de l'IR sont respectées. En cas de rémunération versée exclusivement
        depuis l'étranger, le salarié peut être tenu de procéder lui-même à sa
        déclaration fiscale au Maroc.
      </P>
      <Tip>
        Vérifiez systématiquement la convention fiscale entre le Maroc et le pays
        d'origine du salarié avant tout détachement. La clause dite « des 183 jours »
        varie d'une convention à l'autre et peut modifier significativement l'impact
        fiscal du détachement.
      </Tip>

      <Divider />

      <H2>Récapitulatif : quand choisir le détachement ?</H2>
      <P>
        Le détachement est la solution adaptée lorsqu'un salarié étranger doit intervenir
        au Maroc pour une mission temporaire, sans rupture de son contrat d'origine. Il est
        plus rapide à mettre en place qu'un recrutement Taechir (pas d'attestation ANAPEC)
        mais limité dans le temps. Pour une présence durable, le recrutement local reste
        la voie à privilégier.
      </P>
      <P>
        Dans tous les cas, la clé est l'anticipation : certificat de détachement de
        sécurité sociale, lettre de mission, convention fiscale — chaque élément doit être
        vérifié et préparé avant le départ du salarié.
      </P>
    </>
  );
}

/* ─── Article 8 ─────────────────────────────────────────────────────────── */

function Article8Content() {
  return (
    <>
      <Lead>
        La Caisse Nationale de Sécurité Sociale (CNSS) est un acteur incontournable du
        recrutement d'étrangers au Maroc. Au-delà de l'obligation légale, la régularité
        CNSS de l'employeur conditionne directement la recevabilité des dossiers ANAPEC
        et Taechir. Ce guide détaille toutes les obligations de l'employeur vis-à-vis de
        la CNSS lorsqu'il emploie des salariés étrangers.
      </Lead>

      <H2>Le rôle de la CNSS dans le recrutement d'étrangers</H2>
      <P>
        La CNSS gère le régime de sécurité sociale obligatoire pour tous les salariés
        du secteur privé au Maroc, sans distinction de nationalité. Tout salarié étranger
        titulaire d'un contrat de travail visé par le Ministère du Travail doit être
        affilié à la CNSS, exactement comme un salarié marocain.
      </P>
      <P>
        Mais le rôle de la CNSS va au-delà : l'ANAPEC vérifie systématiquement la
        situation CNSS de l'employeur avant de traiter toute demande d'attestation.
        Un employeur en défaut de cotisations ou de déclarations verra son dossier
        bloqué avant même que la procédure Taechir ne commence.
      </P>
      <Info>
        L'attestation de régularité CNSS est devenue un document pivot : elle est
        exigée par l'ANAPEC pour l'attestation d'activité, par certaines délégations
        du Ministère pour le visa du contrat, et même parfois par la DGSN pour la
        carte de séjour.
      </Info>

      <H2>L'affiliation du salarié étranger à la CNSS</H2>
      <H3>Qui doit être affilié ?</H3>
      <P>
        Tout salarié étranger travaillant au Maroc sous contrat de travail visé doit
        être affilié à la CNSS. Cela inclut les salariés en CDD, CDI, et même les
        salariés en période d'essai. La seule exception concerne les salariés détachés
        couverts par une convention bilatérale de sécurité sociale et disposant d'un
        certificat de détachement valide.
      </P>

      <H3>Le processus d'affiliation</H3>
      <P>
        L'affiliation d'un salarié étranger se fait via le portail en ligne de la CNSS
        (Damancom) ou au guichet de l'agence CNSS compétente. La procédure est identique
        à celle d'un salarié marocain, à quelques spécificités près :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Numéro d'immatriculation CNSS :</strong> un numéro unique est attribué au salarié étranger lors de sa première affiliation. Ce numéro est permanent et sera conservé même en cas de changement d'employeur au Maroc.</li>
        <li><strong>Pièces d'identité :</strong> le passeport en cours de validité remplace la CIN marocaine. La copie du contrat de travail visé est également exigée.</li>
        <li><strong>Date d'effet :</strong> l'affiliation prend effet à la date du visa apposé sur le contrat de travail, qui est la date officielle de début d'activité.</li>
      </ul>
      <Warning>
        Ne confondez pas l'immatriculation de l'entreprise (numéro CNSS employeur) et
        l'affiliation du salarié (numéro CNSS salarié). L'entreprise doit être
        immatriculée à la CNSS avant de pouvoir affilier ses salariés, qu'ils soient
        marocains ou étrangers.
      </Warning>

      <H2>Les taux de cotisation CNSS applicables</H2>
      <P>
        Les taux de cotisation pour un salarié étranger sont strictement identiques à
        ceux applicables aux salariés marocains. Il n'existe aucune majoration ni
        exonération liée à la nationalité du salarié.
      </P>
      <Table
        rows={[
          ['Branche', 'Part patronale', 'Part salariale', 'Plafond mensuel'],
          ['Prestations sociales', '8,98%', '0,52%', 'Pas de plafond'],
          ['Allocations familiales', '6,40%', '—', 'Pas de plafond'],
          ['AMO (Assurance Maladie Obligatoire)', '4,11%', '2,26%', 'Pas de plafond'],
          ['Prestations à court terme', '1,05%', '0,52%', '6 000 Dhs'],
          ['Prestations à long terme', '3,96%', '3,96%', '6 000 Dhs'],
          ['Taxe de formation professionnelle', '1,6%', '—', 'Pas de plafond'],
        ]}
      />
      <P>
        Le coût total pour l'employeur représente environ 26,10% de la masse salariale
        brute (avant plafonnement). Pour le salarié, la retenue totale est d'environ
        7,26%. Ces taux sont susceptibles d'évoluer ; il convient de vérifier les
        barèmes en vigueur sur le site de la CNSS.
      </P>

      <H2>Les déclarations CNSS : calendrier et modalités</H2>
      <H3>La déclaration mensuelle des salaires (DNS)</H3>
      <P>
        Chaque mois, l'employeur doit déclarer les salaires versés à l'ensemble de
        ses salariés (marocains et étrangers) via le système Damancom. La déclaration
        doit être effectuée et les cotisations versées avant le <strong>dernier jour
        du mois suivant le mois de référence</strong>.
      </P>
      <P>
        Exemple : les salaires de mars 2026 doivent être déclarés et les cotisations
        versées au plus tard le 30 avril 2026.
      </P>

      <H3>Le bordereau de paiement</H3>
      <P>
        Le paiement des cotisations s'effectue par virement bancaire, chèque certifié
        ou en ligne via Damancom. Le bordereau de paiement doit détailler les cotisations
        par branche et par salarié.
      </P>

      <H3>La déclaration d'entrée et de sortie du salarié</H3>
      <P>
        L'arrivée d'un nouveau salarié (entrée) et son départ (sortie) doivent être
        déclarés à la CNSS dans les délais suivants :
      </P>
      <Table
        rows={[
          ['Événement', 'Délai de déclaration', 'Support'],
          ['Entrée d\'un salarié', 'Avant le début de l\'activité', 'Damancom ou guichet CNSS'],
          ['Sortie d\'un salarié', 'Dans les 30 jours suivant la fin du contrat', 'Damancom ou guichet CNSS'],
          ['Modification de situation (salaire, poste)', 'Dans le mois suivant', 'Damancom'],
        ]}
      />
      <Tip>
        Utilisez systématiquement Damancom pour toutes les déclarations. Le système
        génère un accusé de réception électronique horodaté qui constitue une preuve
        en cas de contrôle ou de litige.
      </Tip>

      <H2>Pénalités pour retard ou défaut de déclaration</H2>
      <P>
        La CNSS applique un système de pénalités progressives en cas de manquement
        aux obligations déclaratives :
      </P>
      <Table
        rows={[
          ['Infraction', 'Pénalité'],
          ['Retard de déclaration des salaires', 'Majoration de 3% du montant des cotisations dues par mois de retard'],
          ['Défaut total de déclaration', 'Majoration de 3% par mois + taxation d\'office sur base forfaitaire'],
          ['Non-affiliation d\'un salarié', 'Rappel de cotisations depuis la date d\'embauche + majorations de 3%/mois'],
          ['Déclaration minorée (sous-déclaration)', 'Rappel du différentiel + majorations + éventuelle amende'],
          ['Non-paiement des cotisations déclarées', 'Majoration de 3% par mois + mise en demeure + saisie possible'],
        ]}
      />
      <P>
        Ces pénalités sont calculées de manière automatique par le système CNSS et
        s'accumulent rapidement. Un retard de 6 mois sur les cotisations d'un salarié
        rémunéré à 15 000 Dhs bruts peut générer plusieurs milliers de dirhams de
        majorations.
      </P>
      <Warning>
        Au-delà des pénalités financières, un défaut de régularité CNSS bloque
        systématiquement les nouvelles demandes Taechir et les renouvellements de
        contrats étrangers. Un employeur en litige avec la CNSS ne pourra plus
        recruter d'étrangers tant que la situation n'est pas régularisée.
      </Warning>

      <H2>L'attestation de régularité CNSS</H2>
      <P>
        L'attestation de régularité est le document qui certifie que l'employeur est
        à jour de ses obligations envers la CNSS (déclarations et paiements). C'est
        un document clé dans le parcours de recrutement d'un étranger.
      </P>
      <H3>Comment l'obtenir ?</H3>
      <P>
        L'attestation peut être demandée en ligne via Damancom ou au guichet de
        l'agence CNSS dont dépend l'entreprise. Le délai d'obtention varie de
        24 heures (en ligne, si tout est en ordre) à plusieurs jours (si des
        régularisations sont nécessaires).
      </P>
      <H3>Durée de validité</H3>
      <P>
        L'attestation de régularité a une durée de validité limitée, généralement
        de 3 mois. Pour un dossier Taechir, il est recommandé de demander une
        attestation récente (moins de 30 jours) pour éviter qu'elle ne soit
        considérée comme périmée au moment du traitement.
      </P>
      <Tip>
        Bonne pratique : demandez l'attestation de régularité dès le lancement
        de la procédure ANAPEC, de sorte qu'elle soit prête lorsque le dossier
        complet sera constitué pour le dépôt au Ministère.
      </Tip>

      <H2>Comment la situation CNSS affecte les dossiers Taechir</H2>
      <P>
        La vérification de la régularité CNSS intervient à deux étapes du processus
        Taechir :
      </P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Lors de la demande ANAPEC :</strong> l'agence vérifie que l'employeur est immatriculé à la CNSS et à jour de ses cotisations. Un dossier avec une CNSS irrégulière sera rejeté ou suspendu.</li>
        <li><strong>Lors du dépôt au Ministère :</strong> certaines délégations régionales exigent l'attestation de régularité CNSS comme pièce du dossier de demande de visa. Même lorsqu'elle n'est pas formellement exigée, le Ministère peut consulter la base CNSS.</li>
      </ol>

      <H2>Prestations CNSS accessibles aux salariés étrangers</H2>
      <P>
        Les salariés étrangers affiliés à la CNSS bénéficient exactement des mêmes
        prestations que les salariés marocains :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Allocations familiales :</strong> versées pour les enfants à charge, sous conditions</li>
        <li><strong>Indemnités journalières :</strong> en cas de maladie ou de maternité</li>
        <li><strong>Pension de retraite :</strong> accessible après un minimum de 3 240 jours de cotisation</li>
        <li><strong>Pension d'invalidité :</strong> en cas d'incapacité de travail</li>
        <li><strong>Assurance Maladie Obligatoire (AMO) :</strong> couverture médicale pour le salarié et ses ayants droit</li>
        <li><strong>Indemnité de perte d'emploi (IPE) :</strong> sous conditions d'éligibilité</li>
      </ul>
      <Info>
        Point important pour les salariés étrangers quittant définitivement le Maroc :
        les cotisations de retraite peuvent être transférées ou remboursées sous
        certaines conditions, notamment si le salarié n'a pas atteint le seuil
        minimum de 3 240 jours de cotisation. Des conventions bilatérales permettent
        également la totalisation des périodes d'assurance entre pays.
      </Info>

      <H2>Cas particuliers et règles spécifiques</H2>
      <H3>Le salarié étranger à employeurs multiples</H3>
      <P>
        Si un salarié étranger travaille pour plusieurs employeurs au Maroc (situation
        rare mais possible), chaque employeur doit le déclarer et cotiser
        indépendamment. Le numéro CNSS du salarié reste le même.
      </P>
      <H3>Le salarié en CDD renouvelé</H3>
      <P>
        Le renouvellement du contrat de travail (et donc du visa Taechir) n'interrompt
        pas l'affiliation CNSS. Il n'y a pas besoin de procéder à une sortie puis une
        nouvelle entrée : la continuité de l'emploi est maintenue.
      </P>
      <H3>Le salarié étranger licencié</H3>
      <P>
        En cas de rupture du contrat, les règles classiques du droit du travail
        marocain s'appliquent : préavis, indemnités de licenciement, déclaration
        de sortie CNSS. Le salarié étranger dispose des mêmes droits qu'un salarié
        marocain en matière d'indemnités et de contestation devant le tribunal du
        travail.
      </P>

      <Divider />

      <P>
        La gestion CNSS d'un salarié étranger n'est en réalité pas plus complexe
        que celle d'un salarié marocain. La difficulté réside dans l'anticipation :
        être à jour de ses cotisations avant de lancer la procédure, affilier le
        salarié dès le jour du visa, et maintenir une régularité sans faille pour
        ne pas compromettre les futurs recrutements.
      </P>
    </>
  );
}

/* ─── Article 9 ─────────────────────────────────────────────────────────── */

function Article9Content() {
  return (
    <>
      <Lead>
        Obtenir un visa de travail via Taechir ne suffit pas pour résider légalement
        au Maroc. Tout travailleur étranger doit également obtenir une carte de séjour
        (carte d'immatriculation) auprès de la Direction Générale de la Sûreté Nationale
        (DGSN). Ce guide détaille les types de cartes, les démarches complètes, les
        documents requis et les pièges à éviter.
      </Lead>

      <H2>Carte de séjour et visa de travail : deux documents distincts</H2>
      <P>
        Une confusion fréquente consiste à penser que le visa de travail apposé sur
        le contrat Taechir autorise automatiquement le séjour au Maroc. En réalité,
        ce sont deux autorisations indépendantes, délivrées par deux ministères
        différents :
      </P>
      <Table
        rows={[
          ['Document', 'Autorité', 'Objet', 'Base légale'],
          ['Visa de travail (contrat visé)', 'Ministère du Travail', 'Autorisation d\'exercer une activité salariée', 'Code du Travail, art. 516'],
          ['Carte de séjour', 'DGSN (Ministère de l\'Intérieur)', 'Autorisation de résider sur le territoire', 'Loi 02-03 relative à l\'entrée et au séjour des étrangers'],
        ]}
      />
      <P>
        Un salarié étranger peut avoir un visa de travail valide mais être en
        situation irrégulière de séjour s'il n'a pas de carte de séjour. Inversement,
        un étranger peut avoir une carte de séjour (par exemple pour regroupement
        familial) mais ne pas être autorisé à travailler s'il n'a pas de visa de
        travail.
      </P>
      <Warning>
        L'absence de carte de séjour expose le salarié à des amendes, voire à
        une mesure de reconduite à la frontière. L'employeur peut également être
        sanctionné pour avoir employé un étranger en situation irrégulière de séjour.
      </Warning>

      <H2>Les types de cartes de séjour au Maroc</H2>
      <P>
        La loi 02-03 relative à l'entrée et au séjour des étrangers au Maroc
        prévoit plusieurs types de titres de séjour :
      </P>

      <H3>La carte d'immatriculation (titre de séjour temporaire)</H3>
      <P>
        C'est le titre le plus courant pour les travailleurs étrangers. La carte
        d'immatriculation est délivrée pour une durée de 1 an (en général alignée
        sur la durée du contrat de travail) et est renouvelable. Elle porte la
        mention du motif de séjour : « activité salariée ».
      </P>

      <H3>La carte de résidence (titre de séjour de longue durée)</H3>
      <P>
        Après plusieurs années de séjour régulier au Maroc (généralement 4 ans
        consécutifs avec carte d'immatriculation), l'étranger peut demander une
        carte de résidence d'une durée de 10 ans. Cette carte offre une plus
        grande stabilité et dispense de renouvellement annuel.
      </P>

      <H3>Autres titres</H3>
      <P>
        Il existe également des titres spécifiques pour les étudiants, les
        conjoints de Marocains, les réfugiés et les apatrides. Pour les
        travailleurs étrangers recrutés via Taechir, c'est la carte
        d'immatriculation avec mention « activité salariée » qui est pertinente.
      </P>

      <H2>La procédure de demande auprès de la DGSN</H2>
      <H3>Où déposer la demande ?</H3>
      <P>
        La demande de carte de séjour se dépose au bureau des étrangers de la
        préfecture de police ou de la sûreté régionale dont dépend le lieu de
        résidence du salarié. À Casablanca, c'est le service des étrangers de
        la préfecture de police. À Rabat, c'est le commissariat central ou le
        service régional de la sûreté.
      </P>

      <H3>Délai pour déposer la demande</H3>
      <P>
        Le salarié étranger dispose d'un délai de <strong>90 jours</strong>
        à compter de son entrée sur le territoire marocain pour déposer sa
        demande de carte de séjour. Passé ce délai, il est en situation
        irrégulière de séjour.
      </P>
      <Tip>
        En pratique, ne tardez pas. Déposez la demande dès que vous avez le
        contrat visé en main. Les délais de traitement varient selon les villes
        et la période de l'année, et il vaut mieux avoir son récépissé de
        demande en cours de traitement qu'être pris de court.
      </Tip>

      <H3>Les documents requis</H3>
      <P>
        Le dossier de demande de carte de séjour comprend :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Formulaire de demande</strong> rempli et signé (disponible au guichet ou sur le site de la DGSN)</li>
        <li><strong>Passeport valide</strong> (original + copie de toutes les pages utilisées)</li>
        <li><strong>Copie du contrat de travail visé</strong> par le Ministère du Travail</li>
        <li><strong>Photos d'identité récentes</strong> (6 photos format passeport, fond blanc)</li>
        <li><strong>Justificatif de domicile</strong> au Maroc (contrat de bail légalisé, attestation d'hébergement légalisée, ou quittance d'eau/électricité au nom du demandeur)</li>
        <li><strong>Certificat médical</strong> délivré par un médecin agréé (attestant l'absence de maladies contagieuses)</li>
        <li><strong>Extrait de casier judiciaire</strong> du pays d'origine (traduit et légalisé, datant de moins de 3 mois)</li>
        <li><strong>Attestation d'affiliation CNSS</strong> (ou copie de la déclaration CNSS)</li>
        <li><strong>Timbre fiscal</strong> (le montant varie selon le type de carte demandé)</li>
      </ul>
      <Info>
        Les documents à fournir peuvent varier légèrement d'une préfecture à
        l'autre. Il est recommandé de contacter le bureau des étrangers de votre
        préfecture avant de constituer le dossier pour obtenir la liste exacte
        et actualisée.
      </Info>

      <H2>Traitement de la demande et délais</H2>
      <P>
        Lors du dépôt du dossier, le bureau des étrangers délivre un
        <strong> récépissé de demande de carte de séjour</strong>. Ce récépissé,
        valable 3 mois et renouvelable, tient lieu de titre de séjour provisoire
        pendant l'instruction du dossier.
      </P>
      <Table
        rows={[
          ['Étape', 'Délai indicatif', 'Observation'],
          ['Dépôt du dossier', 'Jour J', 'Remise du récépissé'],
          ['Instruction du dossier', '2 à 8 semaines', 'Vérifications administratives et sécuritaires'],
          ['Convocation pour prise d\'empreintes', 'Variable', 'Passage obligatoire pour la biométrie'],
          ['Remise de la carte', '1 à 4 semaines après empreintes', 'Carte plastifiée avec photo'],
        ]}
      />
      <P>
        Le délai total entre le dépôt et la remise de la carte varie
        considérablement selon les villes. À Casablanca et Rabat, où les volumes
        sont importants, le délai peut atteindre 2 à 3 mois. Dans les villes plus
        petites, il est souvent plus court.
      </P>

      <H2>Le renouvellement de la carte de séjour</H2>
      <H3>Quand renouveler ?</H3>
      <P>
        La demande de renouvellement doit être déposée au moins <strong>30 jours
        avant la date d'expiration</strong> de la carte en cours. Ne pas
        renouveler dans les délais place le salarié en situation irrégulière,
        même si le contrat de travail est encore valide.
      </P>

      <H3>Documents spécifiques au renouvellement</H3>
      <P>
        Le dossier de renouvellement est similaire à la première demande, avec
        en plus :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>L'ancienne carte de séjour (ou sa copie si elle est périmée)</li>
        <li>Le nouveau contrat de travail visé (si le contrat a été renouvelé)</li>
        <li>Une attestation de travail récente de l'employeur</li>
        <li>Les derniers bulletins de paie (3 mois minimum)</li>
      </ul>
      <Tip>
        Synchronisez le renouvellement de la carte de séjour avec le
        renouvellement du contrat de travail Taechir. Si le contrat expire
        en mars, lancez le renouvellement Taechir en janvier et le
        renouvellement de la carte de séjour en février, de sorte que
        le nouveau contrat visé soit disponible pour le dossier de
        renouvellement de la carte.
      </Tip>

      <H2>Changement d'adresse</H2>
      <P>
        Tout changement de domicile doit être signalé au bureau des étrangers
        dans un délai de <strong>30 jours</strong>. La procédure implique
        la présentation de :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>La carte de séjour en cours</li>
        <li>Le nouveau justificatif de domicile (bail légalisé ou attestation d'hébergement)</li>
        <li>Un formulaire de déclaration de changement d'adresse</li>
      </ul>
      <P>
        Le non-signalement d'un changement d'adresse peut entraîner des
        complications lors du renouvellement de la carte ou en cas de
        contrôle.
      </P>

      <H2>Que se passe-t-il si la carte expire ?</H2>
      <P>
        Si la carte de séjour expire sans renouvellement, le salarié se
        retrouve en situation irrégulière de séjour. Les conséquences sont
        potentiellement graves :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Amende :</strong> de 500 à 2 000 Dhs pour séjour irrégulier</li>
        <li><strong>Interdiction de quitter le territoire :</strong> un étranger en situation irrégulière peut se voir refuser l'embarquement à l'aéroport tant qu'il n'a pas régularisé sa situation</li>
        <li><strong>Reconduite à la frontière :</strong> dans les cas les plus graves ou en cas de récidive, une mesure d'expulsion peut être prononcée</li>
        <li><strong>Impact sur l'employeur :</strong> l'employeur qui maintient en poste un salarié sans carte de séjour valide s'expose à des sanctions</li>
      </ul>
      <Warning>
        En cas d'expiration, ne paniquez pas : rendez-vous immédiatement au
        bureau des étrangers avec un dossier de renouvellement complet. Un
        léger retard est généralement traité avec souplesse si vous êtes
        de bonne foi et que tous les autres documents sont en règle. En
        revanche, un retard de plusieurs mois sera beaucoup plus difficile
        à régulariser.
      </Warning>

      <H2>Carte de séjour pour les membres de la famille</H2>
      <P>
        Le salarié étranger peut faire venir sa famille au Maroc dans le
        cadre du regroupement familial. Le conjoint et les enfants mineurs
        peuvent obtenir une carte de séjour avec mention « regroupement
        familial ».
      </P>
      <H3>Documents spécifiques pour le regroupement familial</H3>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Acte de mariage traduit et légalisé (pour le conjoint)</li>
        <li>Actes de naissance traduits et légalisés (pour les enfants)</li>
        <li>Copie de la carte de séjour du salarié (demandeur principal)</li>
        <li>Justificatif de revenus suffisants (bulletins de paie, attestation de travail)</li>
        <li>Justificatif de logement adapté à la taille de la famille</li>
      </ul>
      <P>
        Le conjoint titulaire d'une carte de séjour « regroupement familial »
        n'est pas automatiquement autorisé à travailler. S'il souhaite exercer
        une activité professionnelle, il devra obtenir un visa de travail
        distinct via la procédure Taechir.
      </P>
      <Info>
        Cas particulier : le conjoint d'un ressortissant marocain bénéficie
        d'un régime spécifique et peut obtenir une carte de séjour sans
        condition de visa de travail. Ce cas ne relève pas du regroupement
        familial classique.
      </Info>

      <Divider />

      <H2>Checklist carte de séjour : les points à retenir</H2>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>La carte de séjour est obligatoire en plus du visa de travail</li>
        <li>Déposez la demande dans les 90 jours suivant l'entrée au Maroc</li>
        <li>Préparez un dossier complet avec tous les originaux et copies</li>
        <li>Conservez le récépissé : il tient lieu de titre de séjour provisoire</li>
        <li>Renouvelez au moins 30 jours avant l'expiration</li>
        <li>Signalez tout changement d'adresse dans les 30 jours</li>
        <li>Synchronisez les renouvellements avec le contrat de travail</li>
      </ol>
      <P>
        La carte de séjour est la dernière pièce du puzzle administratif pour
        le travailleur étranger au Maroc. Une fois obtenue, elle simplifie
        considérablement le quotidien : ouverture de compte bancaire, location
        de logement, inscription des enfants à l'école, et déplacements
        internationaux sans risque de refus d'entrée au retour.
      </P>
    </>
  );
}

/* ─── Article 10 ────────────────────────────────────────────────────────── */

function Article10Content() {
  return (
    <>
      <Lead>
        Le Maroc s'est imposé comme un hub majeur de l'offshoring en Afrique.
        Casanearshore, Technopolis, Fès Shore, Oujda Shore : les zones dédiées
        se multiplient, et avec elles les besoins en talents internationaux.
        Le recrutement d'étrangers dans le secteur de l'offshoring bénéficie
        d'avantages spécifiques et de procédures parfois allégées. Décryptage
        complet.
      </Lead>

      <H2>L'offshoring au Maroc : panorama du secteur</H2>
      <P>
        Le secteur de l'offshoring au Maroc emploie plus de 150 000 personnes
        et génère un chiffre d'affaires annuel dépassant les 15 milliards de
        dirhams. Le pays s'est positionné sur plusieurs segments à forte
        valeur ajoutée : centres d'appels (BPO), externalisation des processus
        métier, développement informatique (ITO), ingénierie et R&D (KPO).
      </P>
      <P>
        La stratégie nationale d'offshoring, lancée en 2006 et renforcée par
        le plan d'accélération industrielle, a créé un écosystème attractif
        combinant infrastructures modernes, main-d'œuvre qualifiée et
        francophone, et avantages fiscaux significatifs.
      </P>

      <H2>Les zones d'offshoring et leurs avantages</H2>
      <H3>Casanearshore (Casablanca)</H3>
      <P>
        Plus grande zone d'offshoring du Maroc, Casanearshore s'étend sur plus
        de 53 hectares et accueille plus de 100 entreprises. Elle est située à
        proximité immédiate du centre-ville de Casablanca, avec un accès direct
        aux principaux axes de transport.
      </P>

      <H3>Technopolis (Rabat)</H3>
      <P>
        Située à Sala Al Jadida, Technopolis est la zone d'offshoring de la
        capitale. Elle se distingue par sa spécialisation dans les activités
        technologiques, la R&D et l'ingénierie. Elle accueille notamment des
        centres de développement et des laboratoires de recherche de groupes
        internationaux.
      </P>

      <H3>Fès Shore, Oujda Shore, Tétouan Shore</H3>
      <P>
        Ces zones régionales complètent le dispositif national. Elles offrent
        des coûts d'exploitation encore plus compétitifs que Casablanca et
        Rabat, et permettent aux entreprises de recruter dans des bassins
        d'emploi moins saturés.
      </P>
      <Table
        rows={[
          ['Zone', 'Ville', 'Superficie', 'Spécialisation'],
          ['Casanearshore', 'Casablanca', '53 ha', 'BPO, ITO, KPO'],
          ['Technopolis', 'Rabat-Salé', '107 ha', 'R&D, ingénierie, TIC'],
          ['Fès Shore', 'Fès', '20 ha', 'BPO, nearshoring francophone'],
          ['Oujda Shore', 'Oujda', '10 ha', 'BPO, services partagés'],
          ['Tétouan Shore', 'Tétouan', '5 ha', 'BPO hispanophone, services'],
        ]}
      />

      <H2>Le statut CFC (Casablanca Finance City)</H2>
      <P>
        Casablanca Finance City (CFC) est une place financière internationale
        créée pour attirer les sièges régionaux de groupes internationaux
        et les sociétés de services financiers. Les entreprises ayant obtenu
        le statut CFC bénéficient d'avantages fiscaux majeurs et, surtout,
        d'une procédure de recrutement d'étrangers considérablement simplifiée.
      </P>
      <H3>Avantages fiscaux CFC</H3>
      <Table
        rows={[
          ['Avantage', 'Détail'],
          ['IS (Impôt sur les sociétés)', '15% sur le CA export (au lieu de 31% en régime normal)'],
          ['IR des salariés étrangers', 'Taux forfaitaire de 20% pendant 10 ans'],
          ['Exonération de TVA', 'Sur les prestations de services à l\'export'],
          ['Libre rapatriement des bénéfices', 'Aucune restriction sur le transfert de dividendes'],
        ]}
      />

      <H3>Avantages CFC pour le recrutement d'étrangers</H3>
      <P>
        Le principal avantage CFC en matière de recrutement international est
        la <strong>dispense totale d'attestation ANAPEC</strong>. Les entreprises
        CFC peuvent recruter des salariés étrangers sans avoir à prouver
        l'absence de profils nationaux. Cette dispense concerne l'ensemble
        du personnel, pas uniquement les postes de direction.
      </P>
      <P>
        De plus, la procédure Taechir pour les entreprises CFC est souvent
        traitée en priorité par le Ministère du Travail, réduisant les délais
        de visa à quelques jours.
      </P>
      <Info>
        Le statut CFC est attribué par la Commission CFC après examen du
        dossier de l'entreprise. Il n'est pas automatique : la société doit
        démontrer qu'elle exerce une activité de portée régionale ou
        internationale. Les entreprises purement domestiques ne sont pas
        éligibles.
      </Info>

      <H2>Exemptions ANAPEC spécifiques au secteur de l'offshoring</H2>
      <P>
        Au-delà du statut CFC, les entreprises d'offshoring installées dans
        les zones dédiées bénéficient de facilités pour le recrutement
        d'étrangers :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Postes d'encadrement et de management :</strong> les profils de direction (directeurs, managers seniors) recrutés par les entreprises d'offshoring bénéficient généralement de la procédure allégée ANAPEC (listes A1/A2), voire de la dispense complète selon le statut de la zone.</li>
        <li><strong>Experts techniques rares :</strong> les développeurs spécialisés dans des technologies de niche, les architectes logiciels seniors et les experts en cybersécurité sont souvent classés dans les profils rares (liste A2), permettant un traitement en 48 heures.</li>
        <li><strong>Personnel de formation et de transfert de compétences :</strong> les formateurs envoyés par le siège pour assurer le transfert de savoir-faire peuvent bénéficier du régime de détachement, dispensé d'ANAPEC.</li>
      </ul>

      <H2>Avantages fiscaux pour les salariés d'offshoring</H2>
      <P>
        Les salariés des entreprises d'offshoring installées dans les zones
        dédiées bénéficient d'avantages fiscaux significatifs en matière
        d'impôt sur le revenu (IR) :
      </P>
      <Table
        rows={[
          ['Régime', 'Détail IR', 'Conditions'],
          ['Zone d\'offshoring standard', 'Exonération IR pendant 5 ans, puis taux réduit', 'Emploi dans une zone d\'offshoring reconnue'],
          ['Statut CFC', 'IR forfaitaire de 20% pendant 10 ans', 'Statut CFC attribué à l\'employeur'],
          ['Zone franche d\'exportation', 'Exonération IR pendant 5 ans', 'Emploi dans une zone franche'],
          ['Régime de droit commun', 'Barème progressif IR (0% à 38%)', 'Entreprise hors zone spéciale'],
        ]}
      />
      <Tip>
        Pour un cadre étranger rémunéré à 30 000 Dhs bruts par mois, la
        différence entre le régime CFC (20% forfaitaire) et le barème
        progressif de droit commun peut représenter plusieurs milliers de
        dirhams d'économie par mois. C'est un argument de recrutement
        puissant pour attirer des talents internationaux.
      </Tip>

      <H2>Profils étrangers les plus recrutés dans l'offshoring</H2>
      <P>
        Les entreprises d'offshoring au Maroc recrutent principalement des
        étrangers pour des postes à forte expertise ou de management :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Directeurs de site / Country managers :</strong> pilotage des opérations locales pour le compte d'un groupe international</li>
        <li><strong>Directeurs techniques (CTO, VP Engineering) :</strong> encadrement des équipes de développement et définition de l'architecture technique</li>
        <li><strong>Experts DevOps / Cloud / Data :</strong> mise en place des infrastructures et des pipelines de données</li>
        <li><strong>Formateurs et coaches agiles :</strong> transfert de méthodologies et montée en compétences des équipes locales</li>
        <li><strong>Responsables qualité et conformité :</strong> mise en place des processus ISO, CMMI, SOC2</li>
        <li><strong>Experts en cybersécurité :</strong> conception et audit des systèmes de sécurité</li>
      </ul>

      <H2>Procédure Taechir pour les entreprises d'offshoring : les différences</H2>
      <P>
        La procédure Taechir reste la même dans ses grandes lignes
        (saisie en ligne, génération du contrat, dépôt physique, visa
        ministériel), mais avec quelques spécificités pour les entreprises
        d'offshoring :
      </P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>ANAPEC :</strong> souvent dispensé ou allégé (48h) selon le statut de l'entreprise et le profil recruté</li>
        <li><strong>Documents supplémentaires :</strong> attestation CFC ou attestation d'installation dans la zone d'offshoring à joindre au dossier</li>
        <li><strong>Délai de traitement :</strong> généralement plus rapide car les dossiers des entreprises structurées sont mieux préparés et les volumes sont récurrents</li>
        <li><strong>Contrat de travail :</strong> les clauses spécifiques (confidentialité, non-concurrence, transfert de données) sont intégrées en annexe du contrat Taechir standard</li>
      </ol>

      <H2>Les défis du recrutement international dans l'offshoring</H2>
      <P>
        Malgré les avantages, recruter des étrangers dans l'offshoring au
        Maroc comporte des défis spécifiques :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Concurrence internationale :</strong> les talents que le Maroc cherche à attirer reçoivent souvent des offres d'autres pays (Tunisie, Maurice, Europe de l'Est). La rapidité de la procédure est un facteur déterminant.</li>
        <li><strong>Décalage salarial :</strong> les grilles salariales marocaines, même pour l'offshoring, sont parfois inférieures aux attentes des candidats internationaux. Les avantages fiscaux et le coût de la vie compensent partiellement.</li>
        <li><strong>Intégration culturelle :</strong> au-delà de l'administratif, l'intégration du salarié étranger dans l'équipe et dans la vie locale est un facteur de rétention crucial.</li>
      </ul>
      <Warning>
        Ne sous-estimez pas le temps nécessaire pour les formalités administratives,
        même avec les avantages sectoriels. Un délai de 2 à 4 semaines reste
        réaliste pour une procédure Taechir dans l'offshoring, contre 4 à 6
        semaines en procédure standard.
      </Warning>

      <Divider />

      <P>
        Le secteur de l'offshoring au Maroc offre un cadre particulièrement
        favorable au recrutement international : procédures allégées, avantages
        fiscaux, infrastructures modernes. Pour les entreprises qui savent
        naviguer dans les spécificités administratives, c'est un levier
        puissant pour attirer les compétences nécessaires à leur croissance.
      </P>
    </>
  );
}

/* ─── Article 11 ────────────────────────────────────────────────────────── */

function Article11Content() {
  return (
    <>
      <Lead>
        L'article 516 du Code du Travail marocain est la pierre angulaire de la
        réglementation de l'emploi d'étrangers au Maroc. Il pose le principe de
        la priorité nationale, définit les obligations de l'employeur et prévoit
        les sanctions en cas de non-respect. Analyse détaillée de ce texte
        fondamental et de ses implications pratiques.
      </Lead>

      <H2>Le texte de l'article 516 : ce qu'il dit réellement</H2>
      <P>
        L'article 516 du Code du Travail (loi 65-99) dispose que tout employeur
        qui souhaite recruter un salarié de nationalité étrangère doit obtenir
        une autorisation de l'autorité gouvernementale chargée du travail,
        matérialisée par le visa apposé sur le contrat de travail. Ce visa est
        obligatoire pour tout étranger exerçant une activité salariée au Maroc,
        quelle que soit la durée du contrat.
      </P>
      <P>
        Le texte ajoute que cette autorisation ne peut être accordée que si
        l'employeur justifie qu'il n'a pas pu trouver, parmi les candidats de
        nationalité marocaine, un profil présentant les qualifications requises
        pour le poste. C'est le principe de <strong>la priorité nationale à
        l'emploi</strong>, fondement de toute la procédure Taechir et ANAPEC.
      </P>
      <Info>
        L'article 516 ne vise pas à interdire le recrutement d'étrangers : il
        vise à s'assurer que le recours à la main-d'œuvre étrangère intervient
        en complément, et non en substitution, de la main-d'œuvre nationale.
        C'est une logique de complémentarité, pas de protectionnisme absolu.
      </Info>

      <H2>Les obligations légales de l'employeur</H2>
      <H3>Obligation d'obtenir le visa de travail</H3>
      <P>
        L'obligation centrale est claire : aucun salarié étranger ne peut
        exercer une activité professionnelle salariée au Maroc sans qu'un
        contrat de travail ait été préalablement visé par le Ministère du
        Travail. Cette obligation s'applique même pour des missions de courte
        durée et même si l'étranger est entré au Maroc avec un visa
        touristique.
      </P>
      <P>
        Le visa de travail ne doit pas être confondu avec le visa d'entrée
        (délivré par le consulat pour entrer sur le territoire). Il s'agit
        d'un tampon officiel apposé sur le contrat de travail Taechir,
        attestant que le Ministère autorise l'emploi de cet étranger pour
        ce poste spécifique, chez cet employeur précis.
      </P>

      <H3>Obligation de justifier l'absence de profils nationaux</H3>
      <P>
        L'employeur doit prouver qu'il a effectué des recherches sérieuses
        pour trouver un candidat marocain. Cette preuve passe par l'attestation
        ANAPEC : l'agence publie l'offre d'emploi, et si aucun candidat
        national ne répond dans les délais, elle délivre l'attestation. Sans
        cette pièce (ou un justificatif de dispense), le Ministère ne visera
        pas le contrat.
      </P>

      <H3>Obligation de conformité du contrat de travail</H3>
      <P>
        Le contrat de travail soumis au visa doit respecter les dispositions
        du Code du Travail marocain en matière de :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Salaire minimum :</strong> la rémunération ne peut être inférieure au SMIG ou au minimum conventionnel applicable au secteur</li>
        <li><strong>Durée du travail :</strong> la durée légale hebdomadaire de 44 heures doit être respectée</li>
        <li><strong>Congés :</strong> le salarié étranger a droit aux mêmes congés annuels que les salariés marocains (18 jours ouvrables minimum)</li>
        <li><strong>Couverture sociale :</strong> l'affiliation à la CNSS et l'AMO sont obligatoires</li>
        <li><strong>Durée du contrat :</strong> le CDD initial est généralement de 1 an, renouvelable</li>
      </ul>

      <H3>Obligation de déclaration à la CNSS</H3>
      <P>
        Comme mentionné dans notre guide CNSS, l'employeur doit affilier le
        salarié étranger à la CNSS dès la date du visa et procéder aux
        déclarations mensuelles de salaire. Cette obligation est directement
        liée à l'article 516 : un employeur qui ne déclare pas son salarié
        étranger à la CNSS commet une infraction distincte, cumulable avec
        celle de l'absence de visa.
      </P>

      <H2>Les sanctions prévues par le Code du Travail</H2>
      <P>
        Le non-respect de l'article 516 est sanctionné par les articles
        suivants du Code du Travail. Les amendes sont prononcées par le
        tribunal compétent, sur procès-verbal de l'inspecteur du travail.
      </P>
      <Table
        rows={[
          ['Infraction', 'Amende', 'Base légale'],
          ['Emploi d\'un étranger sans visa de travail', '2 000 à 5 000 Dhs par salarié en infraction', 'Art. 521 du Code du Travail'],
          ['Récidive (emploi sans visa)', 'Double de l\'amende + emprisonnement de 3 à 6 mois possible', 'Art. 521 du Code du Travail'],
          ['Non-déclaration CNSS du salarié étranger', 'Rappel de cotisations + majorations de 3% par mois', 'Dahir portant loi n° 1-72-184'],
          ['Contrat non conforme aux conditions légales', 'Refus de visa + amende éventuelle', 'Art. 516-517 du Code du Travail'],
          ['Obstacle à l\'inspection du travail', '25 000 à 30 000 Dhs', 'Art. 546 du Code du Travail'],
        ]}
      />
      <Warning>
        Les amendes sont prononcées <strong>par salarié en infraction</strong>.
        Un employeur qui emploie 5 étrangers sans visa s'expose à une amende
        totale de 10 000 à 25 000 Dhs, sans compter les sanctions CNSS et
        les éventuelles poursuites pénales en cas de récidive.
      </Warning>

      <H2>L'inspection du travail : pouvoirs et procédures de contrôle</H2>
      <P>
        L'inspection du travail est l'organe chargé de vérifier le respect
        de l'article 516 sur le terrain. Les inspecteurs disposent de
        pouvoirs étendus :
      </P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Droit d'accès :</strong> les inspecteurs peuvent pénétrer dans tout lieu de travail, à tout moment des heures de travail, sans préavis</li>
        <li><strong>Droit de vérification :</strong> ils peuvent exiger la présentation des contrats de travail, des registres du personnel, des déclarations CNSS et de tout document relatif à l'emploi</li>
        <li><strong>Procès-verbal :</strong> en cas d'infraction constatée, l'inspecteur dresse un procès-verbal transmis au tribunal compétent</li>
        <li><strong>Mise en demeure :</strong> l'inspecteur peut mettre en demeure l'employeur de régulariser la situation dans un délai déterminé</li>
      </ul>

      <H3>Le déroulement type d'un contrôle</H3>
      <P>
        Un contrôle de l'inspection du travail concernant l'emploi d'étrangers
        se déroule généralement ainsi :
      </P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>L'inspecteur demande le registre du personnel et identifie les salariés de nationalité étrangère</li>
        <li>Pour chaque salarié étranger, il vérifie l'existence d'un contrat de travail visé par le Ministère</li>
        <li>Il contrôle la validité du visa (date d'expiration, correspondance du poste)</li>
        <li>Il peut vérifier les déclarations CNSS correspondantes</li>
        <li>En cas d'anomalie, il dresse un procès-verbal et fixe un délai de régularisation</li>
      </ol>

      <H2>Études de cas : les situations d'infraction les plus fréquentes</H2>
      <H3>Cas 1 : le salarié qui commence avant le visa</H3>
      <P>
        Situation : un employeur fait travailler un salarié étranger en
        attendant l'obtention du visa Taechir, avec l'intention de
        régulariser « dès que possible ». Lors d'un contrôle, l'inspecteur
        constate que le salarié travaille sans contrat visé depuis 3 mois.
      </P>
      <P>
        Conséquences : amende de 2 000 à 5 000 Dhs, mise en demeure de
        régulariser immédiatement, rappel de cotisations CNSS depuis la
        date effective de début de travail (et non depuis la date du visa
        ultérieur).
      </P>

      <H3>Cas 2 : le contrat expiré sans renouvellement</H3>
      <P>
        Situation : le contrat de travail d'un an a expiré mais le
        renouvellement n'a pas été lancé à temps. Le salarié continue de
        travailler pendant 2 mois sans visa en cours de validité.
      </P>
      <P>
        Conséquences : techniquement, le salarié travaille sans autorisation
        pendant la période sans visa. L'employeur s'expose à la même amende
        que pour un emploi initial sans visa. La régularisation passe par
        une nouvelle demande Taechir, et le salarié peut devoir suspendre
        son activité pendant l'instruction.
      </P>

      <H3>Cas 3 : le changement de poste sans nouveau visa</H3>
      <P>
        Situation : un salarié étranger recruté comme développeur est promu
        chef d'équipe sans que le contrat Taechir soit modifié en conséquence.
        Le visa porte toujours sur le poste de développeur.
      </P>
      <P>
        Conséquences : en théorie, le visa est délivré pour un poste précis.
        Un changement significatif de fonction devrait faire l'objet d'un
        avenant visé. En pratique, les inspecteurs font preuve de souplesse
        pour les promotions internes, mais un changement radical de poste
        (par exemple, de technicien à commercial) sera considéré comme une
        infraction.
      </P>
      <Tip>
        En cas de promotion ou de changement de fonction significatif,
        faites un avenant au contrat et soumettez-le au visa du Ministère.
        C'est une démarche rapide qui vous met à l'abri de tout litige.
      </Tip>

      <H2>Articles connexes du Code du Travail</H2>
      <P>
        L'article 516 ne peut être lu isolément. Plusieurs autres articles
        du Code du Travail complètent le dispositif :
      </P>
      <Table
        rows={[
          ['Article', 'Contenu', 'Lien avec l\'art. 516'],
          ['Art. 517', 'Conditions de fond du contrat étranger (diplômes, qualifications)', 'Précise les critères d\'éligibilité'],
          ['Art. 518', 'Durée du contrat de travail étranger', 'Fixe les durées autorisées (CDD/CDI)'],
          ['Art. 519', 'Renouvellement du contrat étranger', 'Procédure de renouvellement du visa'],
          ['Art. 520', 'Résiliation du contrat étranger', 'Obligations en fin de contrat'],
          ['Art. 521', 'Sanctions pénales', 'Amendes et peines d\'emprisonnement'],
          ['Art. 135', 'Dispenses d\'ANAPEC (conventions bilatérales)', 'Catégories exemptées de l\'obligation de preuve'],
        ]}
      />

      <H2>Comment assurer la conformité : les bonnes pratiques</H2>
      <P>
        Pour éviter tout risque de sanction lié à l'article 516, voici les
        bonnes pratiques à mettre en place :
      </P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Tenir un registre à jour</strong> de tous les salariés étrangers avec les dates de visa, d'expiration et de renouvellement</li>
        <li><strong>Mettre en place des alertes</strong> automatiques 3 mois avant chaque expiration de contrat pour lancer le renouvellement à temps</li>
        <li><strong>Conserver tous les originaux</strong> (contrats visés, attestations ANAPEC, récépissés CNSS) dans un dossier physique accessible en cas de contrôle</li>
        <li><strong>Ne jamais faire travailler</strong> un salarié étranger avant l'obtention effective du visa, même « en attendant »</li>
        <li><strong>Déclarer immédiatement</strong> à la CNSS tout salarié étranger dès la date du visa</li>
        <li><strong>Vérifier les changements de poste :</strong> toute modification significative de fonction doit faire l'objet d'un avenant visé</li>
        <li><strong>Former votre équipe RH</strong> aux spécificités du recrutement d'étrangers et aux obligations légales associées</li>
      </ol>
      <Info>
        Un tableau de suivi Excel ou un outil RH dédié avec des alertes
        d'expiration est l'investissement le plus rentable pour un employeur
        qui emploie régulièrement des étrangers. Le coût d'un oubli de
        renouvellement (amende + régularisation + interruption de travail)
        dépasse largement celui d'un simple outil de suivi.
      </Info>

      <Divider />

      <P>
        L'article 516 est le texte que tout employeur de salariés étrangers au
        Maroc doit connaître. Son message est simple : pas de visa, pas de
        travail. Les sanctions sont réelles et les contrôles, bien que non
        systématiques, sont de plus en plus fréquents. La conformité n'est
        pas un luxe, c'est une obligation légale dont le coût de non-respect
        est bien supérieur au coût de la mise en conformité.
      </P>
    </>
  );
}

/* ─── Article 12 ────────────────────────────────────────────────────────── */

function Article12Content() {
  return (
    <>
      <Lead>
        Préparer un dossier Taechir complet et sans erreur est la condition sine
        qua non d'un recrutement international rapide au Maroc. Un document
        manquant, une légalisation oubliée ou un formulaire mal rempli peut
        retarder votre dossier de plusieurs semaines. Cette checklist complète
        vous guide pas à pas pour ne rien oublier.
      </Lead>

      <H2>Avant de commencer : les prérequis à vérifier</H2>
      <P>
        Avant même de constituer le dossier, vérifiez que les conditions
        préalables sont réunies. Sans ces fondations, il est inutile de
        lancer la procédure.
      </P>

      <H3>Côté employeur</H3>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>L'entreprise est immatriculée au registre de commerce (RC valide)</li>
        <li>L'ICE (Identifiant Commun de l'Entreprise) est actif</li>
        <li>L'entreprise est immatriculée à la CNSS</li>
        <li>Les cotisations et déclarations CNSS sont à jour</li>
        <li>Les statuts de la société sont disponibles et à jour</li>
        <li>Le modèle 7 du registre de commerce date de moins de 3 mois</li>
        <li>Le poste à pourvoir est clairement défini (intitulé, qualifications, description)</li>
      </ul>

      <H3>Côté salarié étranger</H3>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Le passeport est valide (idéalement pour au moins 18 mois)</li>
        <li>Les diplômes sont disponibles en version originale</li>
        <li>Les certificats de travail des expériences passées sont rassemblés</li>
        <li>Le casier judiciaire du pays d'origine est récent (moins de 3 mois)</li>
        <li>Le CV est à jour et en français ou en arabe</li>
      </ul>
      <Warning>
        Si le passeport du salarié expire dans moins de 6 mois, faites-le
        renouveler avant de lancer la procédure. Un contrat Taechir ne peut
        pas être visé si le passeport est sur le point d'expirer.
      </Warning>

      <H2>Phase 1 : préparation des documents (J-30 à J-15)</H2>
      <P>
        Lancez la préparation des documents au moins 30 jours avant la date
        souhaitée de dépôt. Certaines pièces nécessitent des délais
        incompressibles.
      </P>

      <H3>Documents de l'employeur</H3>
      <Table
        rows={[
          ['Document', 'Source', 'Délai d\'obtention', 'Validité'],
          ['Modèle 7 du registre de commerce', 'Tribunal de commerce', '24-48h', '3 mois'],
          ['Attestation de régularité CNSS', 'CNSS / Damancom', '24h à 1 semaine', '3 mois'],
          ['Copie des statuts de la société', 'Archives de la société', 'Immédiat', 'Pas de limite'],
          ['Copie de la CIN du gérant / représentant légal', 'Gérant', 'Immédiat', 'En cours de validité'],
          ['Attestation d\'activité ANAPEC', 'ANAPEC', '2 à 20 jours ouvrables', '6 mois'],
        ]}
      />

      <H3>Documents du salarié étranger</H3>
      <Table
        rows={[
          ['Document', 'Source', 'Délai d\'obtention', 'Action requise'],
          ['Copie du passeport (toutes pages)', 'Salarié', 'Immédiat', 'Scanner toutes les pages utilisées'],
          ['Diplômes originaux', 'Salarié', 'Variable', 'Légalisation + traduction si nécessaire'],
          ['Certificats de travail', 'Anciens employeurs', '1-3 semaines', 'Légalisation + traduction si nécessaire'],
          ['CV détaillé', 'Salarié', '1-2 jours', 'Rédaction en français, format PDF'],
          ['Photos d\'identité', 'Salarié', 'Immédiat', '6 photos format passeport, fond blanc'],
          ['Casier judiciaire', 'Autorités du pays d\'origine', '1-4 semaines', 'Apostille ou légalisation consulaire'],
        ]}
      />
      <Tip>
        Lancez la demande de casier judiciaire et la légalisation des diplômes
        en tout premier : ce sont les pièces qui prennent le plus de temps.
        Si le salarié est dans un pays signataire de la Convention de La Haye,
        l'apostille est plus rapide qu'une légalisation consulaire classique.
      </Tip>

      <H2>Phase 2 : la procédure ANAPEC (J-15 à J+5)</H2>
      <H3>Checklist ANAPEC</H3>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>Déterminer votre situation : profil standard, profil rare (A1/A2), ou catégorie dispensée</li>
        <li>Si profil standard : préparer le dossier ANAPEC (description du poste, docs entreprise, frais de 5 000 Dhs HT)</li>
        <li>Si profil rare : préparer le dossier allégé (frais de 1 500 Dhs HT, traitement 48h)</li>
        <li>Si dispensé : rassembler les justificatifs de dispense (convention bilatérale, statut CFC, attestation de lien familial, etc.)</li>
        <li>Déposer le dossier à l'agence ANAPEC régionale compétente</li>
        <li>Suivre l'avancement et répondre aux éventuelles demandes de compléments</li>
        <li>Réceptionner l'attestation d'activité</li>
      </ol>

      <H3>Erreurs fréquentes à cette étape</H3>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Déposer un dossier ANAPEC alors que l'attestation de régularité CNSS est expirée</li>
        <li>Mal identifier la catégorie du profil (standard vs. rare) et payer des frais inutiles</li>
        <li>Fournir une description de poste vague ou incohérente avec les qualifications du salarié</li>
        <li>Oublier de joindre le modèle 7 récent du RC</li>
      </ul>

      <H2>Phase 3 : la plateforme Taechir (J+5 à J+7)</H2>
      <H3>Checklist de saisie en ligne</H3>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>Se connecter au portail Taechir (créer un compte employeur si première utilisation)</li>
        <li>Renseigner les informations de l'entreprise (ICE, RC, coordonnées, gérant)</li>
        <li>Renseigner les informations du salarié (identité complète, nationalité, date de naissance)</li>
        <li>Préciser le poste (intitulé exact, classification, secteur d'activité)</li>
        <li>Indiquer la rémunération (salaire brut mensuel, avantages en nature le cas échéant)</li>
        <li>Préciser la durée du contrat (date de début, date de fin pour CDD)</li>
        <li>Générer le contrat de travail en PDF</li>
        <li>Imprimer le contrat en 3 exemplaires</li>
      </ol>
      <Info>
        Vérifiez minutieusement chaque information saisie sur Taechir avant
        de générer le contrat. Une erreur dans le nom, la nationalité ou le
        numéro de passeport obligera à régénérer un nouveau contrat et à
        recommencer les signatures et légalisations.
      </Info>

      <H2>Phase 4 : signatures et légalisation (J+7 à J+10)</H2>
      <P>
        Cette étape est souvent sous-estimée en termes de temps. Elle implique
        la coordination entre l'employeur et le salarié (qui peut être à
        l'étranger) et le passage par les autorités de légalisation.
      </P>
      <H3>Checklist signatures et légalisation</H3>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Signature de l'employeur :</strong> les 3 exemplaires sont signés par le représentant légal de l'entreprise et cachetés</li>
        <li><strong>Signature du salarié :</strong> si le salarié est au Maroc, signature directe. S'il est à l'étranger, envoi des exemplaires par courrier express pour signature</li>
        <li><strong>Légalisation des signatures :</strong> les 3 exemplaires signés sont légalisés auprès des autorités compétentes (commune pour l'employeur, consulat ou notaire pour le salarié à l'étranger)</li>
      </ol>
      <Tip>
        Si le salarié est à l'étranger, envisagez d'utiliser un service de
        courrier express (DHL, FedEx) avec retour prépayé pour la signature.
        Comptez 3 à 5 jours ouvrables pour l'aller-retour. Certains pays
        permettent la légalisation au consulat du Maroc sur place, ce qui
        évite un aller-retour supplémentaire.
      </Tip>

      <H2>Phase 5 : constitution du dossier physique (J+10 à J+11)</H2>
      <P>
        Avant de vous rendre au Ministère, rassemblez l'intégralité du dossier
        physique et vérifiez chaque pièce une par une.
      </P>
      <H3>Checklist du dossier physique complet</H3>
      <Table
        rows={[
          ['Pièce', 'Nombre d\'exemplaires', 'Statut (à cocher)'],
          ['Contrats de travail Taechir signés et légalisés', '3', ''],
          ['Attestation d\'activité ANAPEC (ou justificatif de dispense)', '1 original', ''],
          ['Copie certifiée conforme des diplômes', '1', ''],
          ['Traduction assermentée des diplômes (si langue étrangère)', '1', ''],
          ['Légalisation / apostille des diplômes', '1', ''],
          ['Certificats de travail (copie certifiée + traduction)', '1', ''],
          ['Copie du passeport valide (toutes pages)', '1', ''],
          ['CV du salarié', '1', ''],
          ['Modèle 7 du RC de l\'entreprise (< 3 mois)', '1', ''],
          ['Copie des statuts de la société', '1', ''],
          ['Attestation de régularité CNSS (< 3 mois)', '1', ''],
          ['Copie de la CIN du gérant', '1', ''],
          ['Lettre de motivation de l\'employeur (optionnel)', '1', ''],
        ]}
      />
      <Warning>
        Vérifiez chaque pièce avant le dépôt : un original manquant, une
        traduction oubliée ou une attestation CNSS expirée signifie un
        aller-retour inutile au Ministère. Prenez 30 minutes pour tout
        revérifier la veille du dépôt.
      </Warning>

      <H2>Phase 6 : dépôt au Ministère et suivi (J+11 à J+21)</H2>
      <H3>Le jour du dépôt</H3>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>Se rendre au guichet régional du Ministère du Travail compétent (selon le lieu du poste)</li>
        <li>Présenter le dossier complet à l'agent du guichet</li>
        <li>L'agent vérifie la complétude du dossier (pas le fond, juste la forme)</li>
        <li>Si le dossier est complet : remise d'un récépissé de dépôt avec numéro de suivi</li>
        <li>Si le dossier est incomplet : liste des pièces manquantes à fournir</li>
      </ol>

      <H3>Le suivi de l'instruction</H3>
      <P>
        Le Ministère dispose d'un délai maximum de <strong>10 jours
        ouvrables</strong> pour apposer le visa ou notifier un refus motivé.
        En pratique, le délai varie de 3 à 10 jours selon la charge du
        service et la complexité du dossier.
      </P>
      <P>
        Certaines délégations régionales proposent un suivi en ligne via
        le portail Taechir. Vous pouvez également contacter le guichet
        par téléphone pour connaître l'état d'avancement.
      </P>

      <H2>Phase 7 : après le visa — les démarches immédiates (J+21 à J+35)</H2>
      <P>
        L'obtention du visa n'est pas la fin de la procédure. Deux actions
        doivent être lancées immédiatement :
      </P>
      <H3>Déclaration CNSS du salarié</H3>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>Affilier le salarié étranger à la CNSS (si première affiliation au Maroc)</li>
        <li>Déclarer l'entrée du salarié avec la date du visa comme date d'effet</li>
        <li>Conserver l'accusé de réception de la déclaration</li>
      </ol>

      <H3>Demande de carte de séjour DGSN</H3>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>Constituer le dossier de demande de carte de séjour (cf. notre guide dédié)</li>
        <li>Déposer la demande au bureau des étrangers de la préfecture de police</li>
        <li>Récupérer le récépissé de demande</li>
        <li>Se présenter pour la prise d'empreintes biométriques sur convocation</li>
        <li>Retirer la carte de séjour une fois prête</li>
      </ol>

      <H2>Planning récapitulatif : calendrier type d'un dossier Taechir</H2>
      <Table
        rows={[
          ['Phase', 'Période', 'Durée', 'Actions principales'],
          ['Préparation des documents', 'J-30 à J-15', '15 jours', 'Casier judiciaire, légalisations, CNSS'],
          ['Procédure ANAPEC', 'J-15 à J+5', '2 à 20 jours', 'Dépôt, annonce (si standard), attestation'],
          ['Saisie Taechir', 'J+5 à J+7', '2 jours', 'Saisie en ligne, génération du contrat'],
          ['Signatures et légalisation', 'J+7 à J+10', '3 jours', 'Signature, cachet, légalisation'],
          ['Constitution du dossier', 'J+10 à J+11', '1 jour', 'Vérification et assemblage'],
          ['Dépôt au Ministère', 'J+11', '1 jour', 'Dépôt physique, récépissé'],
          ['Instruction et visa', 'J+11 à J+21', '3-10 jours', 'Traitement par le Ministère'],
          ['Démarches post-visa', 'J+21 à J+35', '2 semaines', 'CNSS + carte de séjour DGSN'],
        ]}
      />

      <H2>Les 10 erreurs les plus fréquentes : checklist de vérification finale</H2>
      <P>
        Avant de déposer votre dossier, passez en revue ces 10 points
        critiques :
      </P>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-6">
        <li>Le passeport du salarié est-il valide pour toute la durée du contrat ?</li>
        <li>Les diplômes sont-ils légalisés (apostille ou légalisation consulaire) ET traduits en français ou en arabe ?</li>
        <li>L'attestation CNSS de l'entreprise date-t-elle de moins de 3 mois ?</li>
        <li>Le modèle 7 du RC date-t-il de moins de 3 mois ?</li>
        <li>Les 3 exemplaires du contrat Taechir sont-ils signés par les deux parties ET légalisés ?</li>
        <li>L'attestation ANAPEC correspond-elle bien au poste et au salarié concernés ?</li>
        <li>Le salaire indiqué respecte-t-il le SMIG et les minima conventionnels ?</li>
        <li>Le contrat généré ne contient-il aucune erreur (nom, nationalité, n° de passeport) ?</li>
        <li>Avez-vous bien les originaux de toutes les pièces (pas uniquement des copies) ?</li>
        <li>Avez-vous préparé les démarches post-visa (formulaire CNSS, dossier carte de séjour) pour les lancer immédiatement ?</li>
      </ol>
      <Tip>
        Imprimez cette checklist et cochez chaque point un par un. Faites-le
        vérifier par une deuxième personne (un collègue RH, un comptable,
        un conseiller juridique). Un regard neuf détecte souvent les oublis
        que l'on ne voit plus à force de travailler sur le dossier.
      </Tip>

      <Divider />

      <P>
        La préparation d'un dossier Taechir est un exercice de rigueur et
        d'anticipation. Aucune étape n'est intrinsèquement difficile, mais
        chaque oubli ou retard se paie en temps perdu. En suivant cette
        checklist méthodiquement et en lançant les démarches les plus longues
        en premier (casier judiciaire, légalisations, ANAPEC), vous
        maximisez vos chances d'obtenir le visa dans les meilleurs délais.
      </P>
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
    slug: 'detachement-salaries-etrangers-maroc-procedure',
    title: 'Le détachement de salariés étrangers au Maroc : cadre juridique et procédure complète',
    description: 'Cadre juridique du détachement de salariés étrangers au Maroc : différences avec le recrutement local, durée, sécurité sociale, procédure complète et risques d\'abus.',
    date: '5 mars 2026',
    readTime: 7,
    category: 'Procédure',
    excerpt: 'Le détachement permet d\'envoyer un salarié au Maroc sans rompre son contrat d\'origine. Cadre juridique, procédure, conventions de sécurité sociale et risques de requalification : tout ce qu\'il faut savoir.',
    Content: Article7Content,
  },
  {
    slug: 'guide-cnss-employeurs-salaries-etrangers-maroc',
    title: 'Guide CNSS pour les employeurs de salariés étrangers au Maroc',
    description: 'Tout savoir sur la CNSS pour les employeurs de salariés étrangers : affiliation, taux de cotisation, déclarations, pénalités et impact sur les dossiers Taechir.',
    date: '12 mars 2026',
    readTime: 7,
    category: 'Guide',
    excerpt: 'La régularité CNSS conditionne la recevabilité des dossiers Taechir. Affiliation, taux de cotisation, calendrier des déclarations, pénalités et attestation de régularité : le guide complet pour les employeurs.',
    Content: Article8Content,
  },
  {
    slug: 'carte-sejour-maroc-travailleurs-etrangers-dgsn',
    title: 'Carte de séjour au Maroc pour travailleurs étrangers : démarches DGSN complètes',
    description: 'Guide complet de la carte de séjour au Maroc : types de titres, procédure DGSN, documents requis, renouvellement, changement d\'adresse et regroupement familial.',
    date: '19 mars 2026',
    readTime: 8,
    category: 'Guide',
    excerpt: 'La carte de séjour DGSN est obligatoire en plus du visa de travail. Types de cartes, documents requis, délais, renouvellement et regroupement familial : toutes les démarches détaillées.',
    Content: Article9Content,
  },
  {
    slug: 'recrutement-offshoring-maroc-avantages-procedure',
    title: 'Recruter dans l\'offshoring au Maroc : avantages sectoriels et procédure spécifique',
    description: 'Les avantages du recrutement d\'étrangers dans l\'offshoring au Maroc : zones dédiées, statut CFC, exemptions ANAPEC, avantages fiscaux et procédure Taechir adaptée.',
    date: '26 mars 2026',
    readTime: 6,
    category: 'Guide',
    excerpt: 'Casanearshore, Technopolis, statut CFC : le secteur de l\'offshoring au Maroc offre des avantages uniques pour le recrutement international. Zones, fiscalité, procédure allégée et profils recherchés.',
    Content: Article10Content,
  },
  {
    slug: 'article-516-code-travail-marocain-obligations-sanctions',
    title: 'Article 516 du Code du Travail marocain : obligations légales et sanctions pour l\'emploi d\'étrangers',
    description: 'Analyse complète de l\'article 516 du Code du Travail marocain : obligations de l\'employeur, sanctions, procédures d\'inspection et bonnes pratiques de conformité.',
    date: '2 avril 2026',
    readTime: 7,
    category: 'Conseils',
    excerpt: 'L\'article 516 est la pierre angulaire du recrutement d\'étrangers au Maroc. Obligations légales, sanctions financières et pénales, contrôles de l\'inspection du travail et études de cas pratiques.',
    Content: Article11Content,
  },
  {
    slug: 'checklist-complete-dossier-taechir-preparation',
    title: 'Checklist complète : préparer son dossier Taechir sans erreur',
    description: 'Checklist complète et chronologique pour préparer un dossier Taechir : documents, délais, vérifications et erreurs fréquentes à chaque étape de la procédure.',
    date: '9 avril 2026',
    readTime: 6,
    category: 'Conseils',
    excerpt: 'De la préparation des documents au suivi post-visa, cette checklist chronologique vous guide pas à pas pour constituer un dossier Taechir complet et éviter les retours au guichet.',
    Content: Article12Content,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
