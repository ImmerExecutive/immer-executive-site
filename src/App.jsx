import React, { useState } from 'react';
import { useData } from './hooks/useData';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { ServiceDetailView } from './components/services/ServiceDetailView';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [targetPrestation, setTargetPrestation] = useState(null);

  const { services, fullServicesContent, partners, loading } = useData();

  const navigateToHomeSection = (id) => {
    setCurrentPage('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const navigateToService = (serviceId, prestationId = null) => {
    setActiveServiceId(serviceId);
    setTargetPrestation(prestationId);
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="animate-pulse text-[#01001e] font-playfair italic text-2xl">
          Immer Executive...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#01001e] font-['Hind',sans-serif] selection:bg-[#01001e] selection:text-white overflow-x-hidden">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        navigateToHomeSection={navigateToHomeSection}
        navigateToService={navigateToService}
        services={services}
      />

      <main>
        {currentPage === 'home' ? (
          <HomeView
            services={services}
            partners={partners}
            onNavigatePrestation={navigateToService}
          />
        ) : (
          <ServiceDetailView
            serviceId={activeServiceId}
            targetPrestation={targetPrestation}
            fullServicesContent={fullServicesContent}
            onBack={() => setCurrentPage('home')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
