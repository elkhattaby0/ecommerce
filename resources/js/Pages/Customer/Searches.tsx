import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const searches = [
    "iPhone 14 reconditionne",
    "ecouteurs bluetooth",
    "livraison gratuite smartphone",
    "montre connectee sport",
];

export default function Searches() {
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
                                    <a href="/products">Relancer</a>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>
        </GuestLayout>
    );
}
