import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { BlogList } from './blog/BlogList.tsx';
import { BlogPost } from './blog/BlogPost.tsx';
import { PrivacyPolicy } from './pages/PrivacyPolicy.tsx';
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import { Checklist } from './pages/Checklist.tsx';
import { Admin } from './pages/Admin.tsx';
import { MentionsLegales } from './pages/MentionsLegales.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { DocumentsUtiles } from './pages/DocumentsUtiles.tsx';
import { GuideComplet } from './pages/GuideComplet.tsx';
import { GuideMerci } from './pages/GuideMerci.tsx';
import { ConditionsVente } from './pages/ConditionsVente.tsx';
import { CookieBanner } from './components/CookieBanner.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/documents-utiles" element={<DocumentsUtiles />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/guide-complet" element={<GuideComplet />} />
        <Route path="/guide-complet/merci" element={<GuideMerci />} />
        <Route path="/conditions-de-vente" element={<ConditionsVente />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  </StrictMode>,
);
