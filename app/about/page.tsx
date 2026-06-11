import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Custom Golf Apparels — a premium clothing manufacturer in Pakistan combining ISO-certified production, 50,000+ units monthly capacity, and low MOQ starting at 50 pieces. Supplying the USA, Europe, and Australia.',
    openGraph: {
        title: 'About Custom Golf Apparels — Premium Pakistani Clothing Manufacturer',
        description: 'ISO-certified production, 50,000+ units/month capacity, low MOQ of 50 pcs. Premium apparel manufacturing for global brands.',
        images: [
            {
                url: 'https://i.pinimg.com/1200x/70/64/3f/70643f7a6e3937ce322314083d60ea8d.jpg',
                width: 1200,
                height: 630,
                alt: 'Custom Golf Apparels Manufacturing Facility',
            },
        ],
    },
};

const page = () => {
    return (
        <AboutClient />
    );
};

export default page;