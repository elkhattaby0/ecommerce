import ProductCard from "@/Components/ProductCard";
import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, Product } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Products() {
    const { products, spotlightProducts, filters, categories } = usePage<PageProps<{
        products: Product[];
        spotlightProducts: Product[];
        filters: { q: string; category: string; };
        categories: { id: number; name: string; slug: string; }[];
    }>>().props;

    const [openFilters, setOpenFilters] = useState({
        categorie: false,
        livraison: false,
        prix: false,
    });

    const toggleFilter = (key: keyof typeof openFilters) => {
        setOpenFilters((current) => ({
            ...current,
            [key]: !current[key],
        }));
    };

    return (
        <GuestLayout>
            <Head title="Produits" />

            <section className="CategoryListing">
                <div className="Listing">
                    <aside>
                        <div className="filterTop">
                            <h2>Filtres</h2>
                            <a href="/products" type="button">Effacer les filtres</a>
                        </div>

                        <div className="activeFilters">
                            <span>{filters.q || filters.category ? 1 : 0} filtre actif</span>
                            <div className="chips">
                                {filters.q && <button type="button">{filters.q}</button>}
                                {filters.category && <button type="button">{filters.category}</button>}
                            </div>
                        </div>

                        <div className="tab">
                            <button type="button" onClick={() => toggleFilter("categorie")}>
                                Categorie
                                <i className={`fa-solid ${openFilters.categorie ? "fa-angle-up" : "fa-angle-down"}`}></i>
                            </button>
                            <ul className={openFilters.categorie ? "open" : ""}>
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <a href={`/products?category=${category.slug}`}>{category.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="tab">
                            <button type="button" onClick={() => toggleFilter("livraison")}>
                                Livraison
                                <i className={`fa-solid ${openFilters.livraison ? "fa-angle-up" : "fa-angle-down"}`}></i>
                            </button>
                            <ul className={openFilters.livraison ? "open" : ""}>
                                <li>Livraison rapide</li>
                                <li>Paiement securise</li>
                                <li>Produits actifs uniquement</li>
                            </ul>
                        </div>
                        <div className="tab">
                            <button type="button" onClick={() => toggleFilter("prix")}>
                                Prix
                                <i className={`fa-solid ${openFilters.prix ? "fa-angle-up" : "fa-angle-down"}`}></i>
                            </button>
                            <ul className={openFilters.prix ? "open" : ""}>
                                <li>Prix reels depuis la base de donnees</li>
                            </ul>
                        </div>
                    </aside>

                    <div className="content">
                        <div className="head listingHead">
                            <div className="titleWrap">
                                <h1>{filters.category || filters.q || "Catalogue"}</h1>
                                <p>
                                    Produits charges dynamiquement depuis la base, avec recherche et categories.
                                </p>
                            </div>

                            <div className="sort">
                                <p>
                                    <span>{products.length}</span> resultats
                                </p>
                                <p>
                                    <span>{filters.q || filters.category ? 1 : 0}</span> filtres actifs
                                </p>
                            </div>
                        </div>

                        <div className="products">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="paginationWrap">
                            <p>Affichage de 1 a {products.length} sur {products.length} produits</p>
                        </div>
                    </div>
                </div>

                <section className="listingMerch">
                    <div className="sectionHead">
                        <h2>Produits sponsorises</h2>
                    </div>

                    <div className="spotlightGrid">
                        {spotlightProducts.map((product) => (
                            <ProductCard key={`spotlight-${product.id}`} product={product} />
                        ))}
                    </div>
                </section>
            </section>
        </GuestLayout>
    );
}
