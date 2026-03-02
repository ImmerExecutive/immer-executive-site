import React from 'react';
import * as LucideIcons from 'lucide-react';

export function Icon({ name, className = "w-6 h-6" }) {
    const IconComponent = LucideIcons[name];

    if (!IconComponent) {
        // Default fallback icon
        return <LucideIcons.HelpCircle className={className} />;
    }

    return <IconComponent className={className} />;
}
