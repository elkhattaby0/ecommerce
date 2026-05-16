import GuestLayout from "@/Layouts/GuestLayout";
import ProductCard from "@/Components/ProductCard";
import { useState } from "react";

const rootColors = [
    "var(--Primary)",
    "var(--Secondary)",
    "var(--Accent)",
    "var(--Borders)",
];

const products = Array(10).fill(null).map((_, index) => ({
    id: index,
    image: "https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg",
    flags: index % 2 === 0 ? ["Reconditionne", "Livraison gratuite"] : ["-50%", "Garantie 2 ans"],
    title: "APPLE iPhone 14 128GB Midnight - Reconditionne - Excellent etat",
    info: ["Plus facilement reparable", "Batterie testee et controlee"],
    variant: index % 2 === 0 ? "128 Go • Violet" : "256 Go • Minuit",
    trust: index % 3 === 0 ? "Vendu par ecommerce" : "Retour 14 jours",
    colorDots: rootColors,
    nbrAvis: 120 + index * 3,
    oldPrice: 599.99,
    price: 295.99 + index,
    currency: "MAD",
}));

const spotlightProducts = products.slice(0, 4);

export default function Products() {
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
            <section className="CategoryListing">
                <div className="Listing">
                    <aside>
                        <div className="filterTop">
                            <h2>Filtres</h2>
                            <button type="button">Effacer les filtres</button>
                        </div>

                        <div className="activeFilters">
                            <span>4 filtres actifs</span>
                            <div className="chips">
                                <button type="button">Reconditionne</button>
                                <button type="button">Livraison gratuite</button>
                                <button type="button">128 Go</button>
                                <button type="button">300 MAD max</button>
                            </div>
                        </div>

                        <div className="tab">
                            <button type="button" onClick={() => toggleFilter("categorie")}>
                                Categorie
                                <i className={`fa-solid ${openFilters.categorie ? "fa-angle-up" : "fa-angle-down"}`}></i>
                            </button>
                            <ul className={openFilters.categorie ? "open" : ""}>
                                <li>Smartphones <input type="checkbox" checked readOnly /></li>
                                <li>Accessoires mobile <input type="checkbox" /></li>
                                <li>Montres connectees <input type="checkbox" /></li>
                            </ul>
                        </div>
                        <div className="tab">
                            <button type="button" onClick={() => toggleFilter("livraison")}>
                                Livraison
                                <i className={`fa-solid ${openFilters.livraison ? "fa-angle-up" : "fa-angle-down"}`}></i>
                            </button>
                            <ul className={openFilters.livraison ? "open" : ""}>
                                <li>Expedie par ecommerce (417) <input type="checkbox" checked readOnly /></li>
                                <li>Livraison express (417) <input type="checkbox" /></li>
                                <li>Livraison gratuite (450) <input type="checkbox" checked readOnly /></li>
                            </ul>
                        </div>
                        <div className="tab">
                            <button type="button" onClick={() => toggleFilter("prix")}>
                                Prix
                                <i className={`fa-solid ${openFilters.prix ? "fa-angle-up" : "fa-angle-down"}`}></i>
                            </button>
                            <ul className={openFilters.prix ? "open" : ""}>
                                <li>Moins de 300 MAD <input type="checkbox" checked readOnly /></li>
                                <li>300 a 500 MAD <input type="checkbox" /></li>
                                <li>500 MAD et plus <input type="checkbox" /></li>
                            </ul>
                        </div>
                    </aside>

                    <div className="content">
                        <div className="head listingHead">
                            <div className="titleWrap">
                                <h1>Vetements</h1>
                                <p>
                                    Une selection de produits reconditionnes avec livraison rapide,
                                    garantie incluse et service client local.
                                </p>
                            </div>

                            <div className="sort">
                                <p>
                                    <span>417</span> resultats
                                </p>
                                <p>
                                    <span>4</span> filtres actifs
                                </p>
                                <div>
                                    <span>Trier par : Meilleures ventes <i className="fa-solid fa-chevron-down"></i></span>
                                </div>
                            </div>
                        </div>

                        <div className="products">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="paginationWrap">
                            <p>Affichage de 1 a 10 sur 417 produits</p>

                            <div className="pagination">
                                <button className="btn"><i className="fa-solid fa-chevron-left"></i> Precedent</button>
                                <button className="active">1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>4</button>
                                <button>5</button>
                                <button className="btn">Suivant<i className="fa-solid fa-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="listingMerch">
                    <div className="sectionHead">
                        <h2>Produits sponsorises</h2>
                        <a href="/details">Voir plus</a>
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
