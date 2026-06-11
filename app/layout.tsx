import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav";
import Providers from "@/components/globalprovider/provider";
import { LoaderProvider } from "./context/LoaderContext";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/Footer";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL('https://customgolfapparels.com'),
  title: {
    default: 'Custom Golf Apparels — Premium Clothing Manufacturer | Low MOQ',
    template: '%s | Custom Golf Apparels',
  },
  description:
    'Custom Golf Apparels is a premium clothing manufacturer based in Pakistan offering high-quality custom apparel, activewear, and formal wear with low minimum order quantities starting at 50 pieces.',
  keywords: [
    'clothing manufacturer Pakistan',
    'custom apparel manufacturer',
    'low MOQ clothing',
    'bulk clothing manufacturer',
    'custom activewear',
    'custom sportswear',
    'private label clothing',
    'Custom Golf Apparels',
    'Pakistan garment factory',
  ],
  authors: [{ name: 'Custom Golf Apparels', url: 'https://customgolfapparels.com' }],
  creator: 'Custom Golf Apparels',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Custom Golf Apparels',
    title: 'Custom Golf Apparels — Premium Clothing Manufacturer | Low MOQ',
    description:
      'High-quality custom apparel manufacturing with low MOQ. Activewear, formalwear & more from Pakistan.',
    url: 'https://customgolfapparels.com',
    images: [
      {
        url: 'https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp',
        width: 1200,
        height: 630,
        alt: 'Custom Golf Apparels - Premium Clothing Manufacturer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Golf Apparels — Premium Clothing Manufacturer',
    description:
      'High-quality custom apparel manufacturing with low MOQ. Activewear, formalwear & more from Pakistan.',
    images: ['https://res.cloudinary.com/dhrfua4wp/image/upload/v1780148472/remove_the_text_on_this_202605301840_dqohzp.webp'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* Preconnect to Cloudinary CDN for faster image loads */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://i.pinimg.com" />
      </head>
      <body
        className={`antialiased`}
      >
        {/* Organization structured data — enables Google Knowledge Panel */}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Custom Golf Apparels",
          "url": "https://customgolfapparels.com",
          "logo": "https://customgolfapparels.com/images/logosvg.png",
          "description": "Premium clothing manufacturer in Pakistan offering high-quality custom apparel, activewear, and formal wear with low MOQ starting at 50 pieces.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "PK"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "url": "https://customgolfapparels.com/contact"
          },
          "sameAs": []
        }} />
        <LoaderProvider>
          <Nav />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              className: 'macos-toast',
              duration: 4000,
              style: {
                // Base styles are handled by CSS class .macos-toast
              },
            }}
          />
          <SmoothScroll>
            <Providers>
              {children}
            </Providers>
            <Footer />
          </SmoothScroll>
          <WhatsAppButton />
        </LoaderProvider>
      </body>
    </html>
  );
}