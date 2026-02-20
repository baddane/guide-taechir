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
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
