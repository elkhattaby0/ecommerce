import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <main className="main">
            <Header />

            {children}
            
            <Footer />
        </main>
    );
}
