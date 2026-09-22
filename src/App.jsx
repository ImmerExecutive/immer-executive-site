import React, { useState, useEffect } from 'react';
import { useData } from './hooks/useData';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { ServiceDetailView } from './components/services/ServiceDetailView';
import { MentionsLegales } from './components/legal/MentionsLegales';

const SERVICE_URL_MAP = {
  soutenir:  'soutenir',
  construire: 'construire',
  reactiver:  'reactiver',
  renforcer:  'renforcer',
  digital:    'solutions',
};

const URL_SERVICE_MAP = Object.fromEntries(
  Object.entries(SERVICE_URL_MAP).map(([id, slug]) => [slug, id])
);

function parseLocation() {
  const path = window.location.pathname;
  if (path === '/' || path === '') return { page: 'home' };
  if (path === '/mentions-legales') return { page: 'mentions-legales' };
  const match = path.match(/^\/services\/([^/]+)(?:\/([^/]+))?/);
  if (match) {
    const serviceId = URL_SERVICE_MAP[match[1]];
    if (serviceId) return { page: 'service-detail', serviceId, prestationId: match[2] || null };
  }
  return { page: 'home' };
}

export default function App() {
  const initial = parseLocation();
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [activeServiceId, setActiveServiceId] = useState(initial.serviceId || null);
  const [targetPrestation, setTargetPrestation] = useState(initial.prestationId || null);

  const { services, fullServicesContent, partners, loading } = useData();

  useEffect(() => {
    history.replaceState({}, '', window.location.pathname);
  }, []);

  useEffect(() => {
    const handlePop = () => {
      const { page, serviceId, prestationId } = parseLocation();
      setCurrentPage(page);
      setActiveServiceId(serviceId || null);
      setTargetPrestation(prestationId || null);
      if (page !== 'service-detail') window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigateToHomeSection = (id) => {
    setCurrentPage('home');
    setActiveServiceId(null);
    setTargetPrestation(null);
    history.pushState({}, '', '/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setActiveServiceId(null);
    setTargetPrestation(null);
    const url = page === 'mentions-legales' ? '/mentions-legales' : '/';
    history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (serviceId, prestationId = null) => {
    setActiveServiceId(serviceId);
    setTargetPrestation(prestationId);
    setCurrentPage('service-detail');
    const slug = SERVICE_URL_MAP[serviceId] || serviceId;
    const url = prestationId ? `/services/${slug}/${prestationId}` : `/services/${slug}`;
    history.pushState({}, '', url);
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
