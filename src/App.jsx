import React, { useState, useEffect } from 'react';
import { useData } from './hooks/useData';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { ServiceDetailView } from './components/services/ServiceDetailView';
import { MentionsLegales } from './components/legal/MentionsLegales';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [targetPrestation, setTargetPrestation] = useState(null);

  const { services, fullServicesContent, partners, loading } = useData();

  // Initialise l'état history au chargement
  useEffect(() => {
    history.replaceState({ page: 'home' }, '');
  }, []);

  // Écoute le bouton retour/suivant du navigateur
  useEffect(() => {
    const handlePop = (e) => {
      const state = e.state;
      if (!state || state.page === 'home') {
        setCurrentPage('home');
        setActiveServiceId(null);
        setTargetPrestation(null);
      } else if (state.page === 'mentions-legales') {
        setCurrentPage('mentions-legales');
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (state?.sectionId) {
          setTimeout(() => {
            const el = document.getElementById(state.sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        }
      } else if (state.page === 'service-detail') {
        setActiveServiceId(state.serviceId);
        setTargetPrestation(state.prestationId || null);
        setCurrentPage('service-detail');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigateToHomeSection = (id) => {
    setCurrentPage('home');
    history.pushState({ page: 'home', sectionId: id }, '');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    history.pushState({ page }, '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (serviceId, prestationId = null) => {
    setActiveServiceId(serviceId);
    setTargetPrestation(prestationId);
    setCurrentPage('service-detail');
    history.pushState({ page: 'service-detail', serviceId, prestationId }, '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="animate-pulse text-[#01001e] font-playfair text-2xl">
          Immer Executive...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#01001e] font-['Hind',sans-serif] selection:bg-[#01001e] selection:text-white overflow-x-hidden pt-24">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        navigateToHomeSection={navigateToHomeSection}
        navigateToService={navigateToService}
        navigateToPage={navigateToPage}
        services={services}
      />

      <main>
        {currentPage === 'home' && (
          <HomeView
            services={services}
            partners={partners}
            onNavigatePrestation={navigateToService}
          />
        )}
        {currentPage === 'service-detail' && (
          <ServiceDetailView
            serviceId={activeServiceId}
            targetPrestation={targetPrestation}
            fullServicesContent={fullServicesContent}
            onBack={() => history.back()}
          />
        )}
        {currentPage === 'mentions-legales' && (
          <MentionsLegales onBack={() => history.back()} />
        )}
      </main>

      <Footer navigateToPage={navigateToPage} />
    </div>
  );
}
