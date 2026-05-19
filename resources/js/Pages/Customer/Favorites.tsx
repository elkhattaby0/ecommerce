import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { readFavorites, toggleFavorite } from "@/lib/storefront";
import { useEffect, useState } from "react";

export default function Favorites() {
    const [favorites, setFavorites] = useState(readFavorites());

    useEffect(() => {
        const sync = () => setFavorites(readFavorites());
        window.addEventListener("storefront:favorites-updated", sync);

        return () => window.removeEventListener("storefront:favorites-updated", sync);
    }, []);

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
                                <li key={item.id}>
                                    <span>{item.title}</span>
                                    <div style={{ display: "flex", gap: 10 }}>
                                        <a href={item.slug ? route('details.show', item.slug) : "/products"}>Voir le produit</a>
                                        <button type="button" onClick={() => toggleFavorite(item)}>Retirer</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>
        </GuestLayout>
    );
}
