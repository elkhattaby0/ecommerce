import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { readSearches } from "@/lib/storefront";
import { useEffect, useState } from "react";

export default function Searches() {
    const [searches, setSearches] = useState(readSearches());

    useEffect(() => {
        const sync = () => setSearches(readSearches());
        window.addEventListener("storefront:searches-updated", sync);

        return () => window.removeEventListener("storefront:searches-updated", sync);
    }, []);

    return (
        <GuestLayout>
            <Head title="Mes recherches" />

            <section className="utilityPage">
                <div className="utilityHero">
                    <span className="eyebrow">Historique</span>
                    <h1>Mes recherches</h1>
                    <p>Retrouvez vos derniers mots-cles pour revenir plus vite aux produits qui vous interessent.</p>
                </div>

                <div className="utilityGrid single">
                    <article className="utilityCard">
                        <div className="utilityCardHead">
                            <h2>Recherches recentes</h2>
                            <a href="/products">Voir les resultats</a>
                        </div>
                        <ul className="utilityList">
                            {searches.map((item) => (
                                <li key={item}>
                                    <span>{item}</span>
                                    <a href={`/products?q=${encodeURIComponent(item)}`}>Relancer</a>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>
        </GuestLayout>
    );
}
