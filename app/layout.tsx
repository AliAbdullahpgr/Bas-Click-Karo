import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Bas Click Karo — Proudly Useless', description: 'Internet pe aaye ho. Ab kuch kaam ka mat karna. A clickable Pakistani street full of chai, chaos and absolutely no productivity.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }