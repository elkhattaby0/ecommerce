import ProductCard from "@/Components/ProductCard";
import GuestLayout from "@/Layouts/GuestLayout";
import Slider from "react-slick";

const rootColors = [
    "var(--Primary)",
    "var(--Secondary)",
    "var(--Accent)",
    "var(--Borders)",
];

const products = Array(8).fill(null).map((_, index) => ({
    id: index,
    image: "https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg",
    flags: index % 2 === 0 ? ["Reconditionne", "Livraison gratuite"] : ["Top ventes", "Garantie 2 ans"],
    title: "APPLE iPhone 14 128GB Midnight - Reconditionne - Excellent etat",
    info: ["Plus facilement reparable", "Batterie testee et controlee"],
    variant: index % 2 === 0 ? "128 Go • Violet" : "256 Go • Minuit",
    trust: index % 3 === 0 ? "Vendu par ecommerce" : "Retour 14 jours",
    colorDots: rootColors,
    nbrAvis: 120 + index * 4,
    oldPrice: 599.99,
    price: 295.99 + index * 2,
    currency: "MAD",
}));

const categories = [
    {
        title: "Telephonie",
        subtitle: "Smartphones et accessoires",
        image: "https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg",
    },
    {
        title: "Audio",
        subtitle: "Casques, ecouteurs et enceintes",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop",
    },
    {
        title: "Maison",
        subtitle: "Objets utiles et deco du quotidien",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1170&auto=format&fit=crop",
    },
    {
        title: "Mobilite",
        subtitle: "Montres et objets connectes",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1164&auto=format&fit=crop",
    },
];

const trendLinks = [
    "Electronique reconditionne",
    "iPhone en promotion",
    "Livraison rapide",
    "Top ventes du moment",
];

export default function Welcome() {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    function NextArrow(props: any) {
        const { onClick } = props;

        return (
            <div
                onClick={onClick}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-2xl slick-arrow"
            >
                <i className="fa-solid fa-angle-right"></i>
            </div>
        );
    }

    function PrevArrow(props: any) {
        const { onClick } = props;

        return (
            <div
                onClick={onClick}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-2xl slick-arrow"
            >
                <i className="fa-solid fa-angle-left"></i>
            </div>
        );
    }

    return (
        <GuestLayout>
            <div className="homepage">
                <Slider {...settings} className="hero">
                    <div className="heroSlide">
                        <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170&auto=format&fit=crop" />
                        <div className="heroOverlay">
                            <span className="eyebrow">Selection du moment</span>
                            <h1>Technologie reconditionnee avec livraison rapide et garantie incluse</h1>
                            <p>
                                Retrouvez des smartphones, accessoires et produits du quotidien controles avant expedition.
                            </p>
                            <div className="actions">
                                <a href="/products" className="primary">Voir les produits</a>
                                <a href="/details" className="secondary">Voir le produit phare</a>
                            </div>
                        </div>
                    </div>
                    <div className="heroSlide">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop" />
                        <div className="heroOverlay">
                            <span className="eyebrow">Bons plans audio</span>
                            <h1>Des offres visibles tout de suite, sans chercher pendant des heures</h1>
                            <p>
                                Produits tries, avis visibles, prix clairs et options de retour rassurantes.
                            </p>
                            <div className="actions">
                                <a href="/products" className="primary">Decouvrir la selection</a>
                                <a href="/details" className="secondary">Voir les meilleures ventes</a>
                            </div>
                        </div>
                    </div>
                    <div className="heroSlide">
                        <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1170&auto=format&fit=crop" />
                        <div className="heroOverlay">
                            <span className="eyebrow">Maison et lifestyle</span>
                            <h1>Un catalogue simple a parcourir, pense pour convertir plus vite</h1>
                            <p>
                                Categories lisibles, produits mis en avant et navigation plus coherente entre accueil, listing et detail.
                            </p>
                            <div className="actions">
                                <a href="/products" className="primary">Parcourir le catalogue</a>
                                <a href="#trends" className="secondary">Voir les tendances</a>
                            </div>
                        </div>
                    </div>
                </Slider>

                <section className="row">
                    <div className="head">
                        <div className="copy">
                            <h2>Inspire de vos visites</h2>
                            <p>Une selection plus courte et plus utile avec badges, variantes et signaux de confiance.</p>
                        </div>
                        <a href="/products">Voir plus</a>
                    </div>
                    <div className="content productsGrid">
                        {products.slice(0, 5).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                <section className="row categoriesRow">
                    <div className="head">
                        <div className="copy">
                            <h2>Top categories</h2>
                            <p>Des entrees plus utiles vers les univers qui convertissent le mieux.</p>
                        </div>
                        <a href="/products">Voir plus</a>
                    </div>
                    <div className="content categoryGrid">
                        {categories.map((category) => (
                            <a key={category.title} href="/products" className="card categoryCard">
                                <img src={category.image} alt={category.title} />
                                <div className="categoryBody">
                                    <h3 className="title">{category.title}</h3>
                                    <p>{category.subtitle}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                <section className="row">
                    <div className="head">
                        <div className="copy">
                            <h2>Meilleures ventes</h2>
                            <p>Une grille propre en une seule rangee pour eviter l'effet de page inachevee.</p>
                        </div>
                        <a href="/products">Voir plus</a>
                    </div>
                    <div className="content productsGrid">
                        {products.slice(0, 5).map((product) => (
                            <ProductCard
                                key={`best-${product.id}`}
                                product={{
                                    ...product,
                                    flags: ["Reconditionne", "Meilleure vente", "-50%"],
                                }}
                            />
                        ))}
                    </div>
                </section>

                <section className="row trendsRow" id="trends">
                    <div className="head">
                        <div className="copy">
                            <h2>Tendance en ce moment</h2>
                            <p>Des acces rapides vers les recherches les plus utiles du moment.</p>
                        </div>
                    </div>
                    <div className="content trendGrid">
                        <a href="/products" className="card trend highlight">
                            <i className="fa-solid fa-fire-flame-curved"></i>
                            <strong>Tendance en ce moment</strong>
                            <span>Offres qui attirent le plus d'attention cette semaine</span>
                        </a>

                        {trendLinks.map((label) => (
                            <a key={label} href="/products" className="card trend">
                                <strong>{label}</strong>
                                <span>Voir les produits associes</span>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
