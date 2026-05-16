import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const favorites = [
    "APPLE iPhone 14 128GB Purple - Reconditionne - Excellent etat",
    "Casque Bluetooth avec reduction de bruit",
    "Montre connectee sport avec suivi sommeil",
];

export default function Favorites() {
    return (
        <GuestLayout>
            <Head title="Favoris" />

            <section className="utilityPage">
                <div className="utilityHero">
                    <span className="eyebrow">Selection personnelle</span>
                    <h1>Favoris</h1>
                    <p>Gardez sous la main les produits que vous souhaitez comparer ou acheter plus tard.</p>
                </div>

                <div className="utilityGrid single">
                    <article className="utilityCard">
                        <div className="utilityCardHead">
                            <h2>Produits enregistres</h2>
                            <a href="/products">Continuer mes achats</a>
                        </div>
                        <ul className="utilityList">
                            {favorites.map((item) => (
                                <li key={item}>
                                    <span>{item}</span>
                                    <a href="/details">Voir le produit</a>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>
        </GuestLayout>
    );
}
