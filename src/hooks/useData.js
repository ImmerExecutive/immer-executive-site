import { useState, useEffect } from 'react';
import { SERVICES_DATA, FULL_SERVICES_CONTENT } from '../data/services';
import { PARTNERS_DATA } from '../data/partners';

export function useData() {
    const [services, setServices] = useState([]);
    const [partners, setPartners] = useState([]);
    const [fullServicesContent, setFullServicesContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch delay
        const fetchData = async () => {
            setLoading(true);
            try {
                // Here you would replace these lines with actual fetch() calls to your external DB
                // const servicesResponse = await fetch('/api/services');
                // const servicesData = await servicesResponse.json();

                setServices(SERVICES_DATA);
                setFullServicesContent(FULL_SERVICES_CONTENT);
                setPartners(PARTNERS_DATA);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { services, fullServicesContent, partners, loading };
}
