import ProductCard from "@/Components/ProductCard";
import GuestLayout from "@/Layouts/GuestLayout";
import { useState } from "react";

const productImages = [
    "https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170&auto=format&fit=crop",
];

const colorOptions = [
    {
        name: "Violet",
        image: productImages[0],
        swatch: "var(--Primary)",
    },
    {
        name: "Minuit",
        image: productImages[1],
        swatch: "var(--Secondary)",
    },
    {
        name: "Bleu",
        image: productImages[2],
        swatch: "var(--Accent)",
    },
    {
        name: "Perle",
        image: productImages[3],
        swatch: "var(--Borders)",
    },
];

const storageOptions = ["128 Go", "256 Go", "512 Go"];

const specs = [
    ["ID", "123456"],
    ["Marque", "Apple"],
    ["Modele", "iPhone 14"],
    ["Etat", "Reconditionne - Excellent etat"],
    ["Batterie", "Capacite minimum 88%"],
    ["Garantie", "2 ans"],
    ["Reseau", "5G"],
    ["Double SIM", "Oui, eSIM + nano SIM"],
];

const reviews = [
    {
        name: "Sara B.",
        title: "Tres bon rapport qualite prix",
        rating: 5,
        date: "14 mai 2026",
        text: "Telephone propre, batterie en bon etat et livraison rapide. Le produit correspond bien a la fiche.",
    },
    {
        name: "Youssef K.",
        title: "Excellent etat confirme",
        rating: 4,
        date: "10 mai 2026",
        text: "Quelques micro-rayures tres discretes, mais rien de genant. Performance fluide et appareil photo impeccable.",
    },
    {
        name: "Meriem L.",
        title: "Bonne surprise",
        rating: 5,
        date: "06 mai 2026",
        text: "Bien emballe, configuration facile et stockage conforme. Je recommande pour un achat reconditionne.",
    },
];

const faqs = [
    {
        question: "Le telephone est-il debloque tous operateurs ?",
        answer: "Oui, le telephone est debloque et fonctionne avec les principaux operateurs au Maroc et a l'international.",
    },
    {
        question: "Que contient la boite ?",
        answer: "Vous recevez le smartphone, un cable de charge compatible, l'outil SIM et un guide de demarrage rapide.",
    },
    {
        question: "La batterie a-t-elle ete testee ?",
        answer: "Oui, chaque appareil est controle, nettoye et teste avant expedition, avec un niveau de sante batterie verifie.",
    },
];

const relatedProducts = Array(5).fill(null).map((_, index) => ({
    id: index,
    image: colorOptions[index]?.image || productImages[0],
    title: `APPLE iPhone 14 ${storageOptions[index % storageOptions.length]} - Reconditionne - Excellent etat`,
    flags: ["Reconditionne", index === 0 ? "Top ventes" : "Livraison rapide"],
    info: ["Garantie 2 ans", "Expedition sous 24h"],
    nbrAvis: 90 + index * 14,
    oldPrice: 649.99 + index * 20,
    price: 319.99 + index * 15,
    currency: "MAD",
}));

type TabKey = "description" | "specs" | "reviews" | "faq";

export default function Details() {
    const [activeImage, setActiveImage] = useState(productImages[0]);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
    const [selectedStorage, setSelectedStorage] = useState(storageOptions[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<TabKey>("description");

    const averageRating = 4.8;
    const reviewBreakdown = [
        { stars: 5, percent: 82 },
        { stars: 4, percent: 13 },
        { stars: 3, percent: 3 },
        { stars: 2, percent: 1 },
        { stars: 1, percent: 1 },
    ];

    return (
        <GuestLayout>
            <section className="CategoryListing">
                <div className="Details">
                    <section className="left">
                        <div className="gallery">
                            <div className="mainImage">
                                <img src={activeImage} alt="APPLE iPhone 14" />
                            </div>

                            <div className="thumbnails">
                                {productImages.map((image, index) => (
                                    <button
                                        key={image}
                                        type="button"
                                        className={activeImage === image ? "active" : ""}
                                        onClick={() => setActiveImage(image)}
                                        aria-label={`Voir image ${index + 1}`}
                                    >
                                        <img src={image} alt={`Vue produit ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="right">
                        <h1>APPLE iPhone 14 128GB Purple - Reconditionne - Excellent etat</h1>

                        <ul className="flags">
                            <li>Reconditionne</li>
                            <li>Excellent etat</li>
                            <li>Garantie 2 ans</li>
                        </ul>

                        <div className="avis">
                            <span className="note">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </span>

                            <span className="score">{averageRating}/5</span>

                            <span className="reviews">300 avis verifies</span>
                        </div>

                        <ul className="price">
                            <li className="old">599.99<span className="currency">MAD</span></li>
                            <li className="current">295.99<span className="currency">MAD</span></li>
                            <li className="saving">Vous economisez 304.00 MAD</li>
                        </ul>

                        <div className="purchaseBox">
                            <div className="variantBlock">
                                <p>Couleur :</p>
                                <div className="content colors">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.name}
                                            type="button"
                                            className={selectedColor.name === color.name ? "active" : ""}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                setActiveImage(color.image);
                                            }}
                                        >
                                            <span
                                                className="swatch"
                                                style={{ backgroundColor: color.swatch }}
                                                aria-hidden="true"
                                            ></span>
                                            <span>{color.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="variantBlock">
                                <p>Stockage :</p>
                                <div className="content storage">
                                    {storageOptions.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            className={selectedStorage === size ? "active" : ""}
                                            onClick={() => setSelectedStorage(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="ctaRow">
                                <div className="quantityBox">
                                    <p>Quantite</p>
                                    <div className="quantityControl">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                        >
                                            -
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => setQuantity((current) => current + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="ctaButtons">
                                    {/* <button type="button" className="buyNow">
                                        <i className="fa-solid fa-bolt"></i>
                                        Acheter maintenant
                                    </button> */}
                                    <button type="button" className="addCart">
                                        <i className="fa-solid fa-basket-shopping"></i>
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>

                            <div className="deliverySummary">
                                <div>
                                    <i className="fa-solid fa-truck-fast"></i>
                                    <span>Livraison estimee entre le 18 et le 20 mai</span>
                                </div>
                                <div>
                                    <i className="fa-solid fa-rotate-left"></i>
                                    <span>Retour possible sous 14 jours</span>
                                </div>
                                <div>
                                    <i className="fa-solid fa-shield-heart"></i>
                                    <span>Paiement securise et produit controle avant envoi</span>
                                </div>
                            </div>
                        </div>

                        <ul className="caractristque">
                            <li><span className="name">ID :</span><span className="value">123456</span></li>
                            <li><span className="name">Stockage :</span><span className="value">{selectedStorage}</span></li>
                            <li><span className="name">Couleur :</span><span className="value">{selectedColor.name}</span></li>
                            <li><span className="name">Etat :</span><span className="value">Reconditionne - Excellent etat</span></li>
                            <li><span className="name">Stock :</span><span className="value">1025 unites</span></li>
                            <li><span className="name">Garantie :</span><span className="value">2 ans</span></li>
                            <li>
                                <span className="name">Livraison :</span>
                                <ul>
                                    <ol><span className="value">Livraison gratuite standard</span></ol>
                                    <ol><span className="value">Livraison express : 5 MAD</span></ol>
                                    <ol><span className="value">Point relais : 10 MAD</span></ol>
                                </ul>
                            </li>
                        </ul>

                        <div className="trustGrid">
                            <article className="trustCard">
                                <h3>Vendu par ecommerce</h3>
                                <p>Expedie depuis Casablanca avec controle qualite avant emballage.</p>
                            </article>
                            <article className="trustCard">
                                <h3>Engagement vendeur</h3>
                                <p>98% d'avis positifs, support client 6j/7 et prise en charge rapide en cas de souci.</p>
                            </article>
                        </div>
                    </section>
                </div>

                <div className="tabs productTabs">
                    <div className="head">
                        <button
                            type="button"
                            className={activeTab === "description" ? "tab active" : "tab"}
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </button>
                        <button
                            type="button"
                            className={activeTab === "specs" ? "tab active" : "tab"}
                            onClick={() => setActiveTab("specs")}
                        >
                            Caracteristiques
                        </button>
                        <button
                            type="button"
                            className={activeTab === "reviews" ? "tab active" : "tab"}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Avis
                        </button>
                        <button
                            type="button"
                            className={activeTab === "faq" ? "tab active" : "tab"}
                            onClick={() => setActiveTab("faq")}
                        >
                            FAQ
                        </button>
                    </div>

                    <div className="content">
                        {activeTab === "description" && (
                            <div className="description detailPanel">
                                <h2>Un smartphone premium a prix malin</h2>
                                <p>
                                    Cet iPhone 14 reconditionne en excellent etat combine un design propre, un ecran
                                    lumineux, une bonne autonomie et la puissance necessaire pour les usages quotidiens.
                                    C'est une option solide pour un client qui veut la qualite Apple sans payer le prix du neuf.
                                </p>
                                <ul>
                                    <li>Puce performante pour photo, video, navigation et jeux.</li>
                                    <li>Ecran OLED net avec couleurs precises et bonne lisibilite.</li>
                                    <li>Appareil verifie, nettoye et teste avant mise en vente.</li>
                                    <li>Compatible 5G, Face ID et services Apple recents.</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "specs" && (
                            <div className="detailPanel specsPanel">
                                {specs.map(([label, value]) => (
                                    <div key={label} className="specRow">
                                        <span>{label}</span>
                                        <strong>{value}</strong>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="detailPanel reviewsPanel">
                                <div className="reviewsSummary">
                                    <div className="summaryScore">
                                        <strong>{averageRating}</strong>
                                        <span>sur 5</span>
                                        <p>Base sur 300 avis verifies</p>
                                    </div>

                                    <div className="summaryBars">
                                        {reviewBreakdown.map((item) => (
                                            <div key={item.stars} className="barRow">
                                                <span>{item.stars} etoiles</span>
                                                <div className="barTrack">
                                                    <div className="barValue" style={{ width: `${item.percent}%` }}></div>
                                                </div>
                                                <strong>{item.percent}%</strong>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="reviewList">
                                    {reviews.map((review) => (
                                        <article key={review.name + review.date} className="reviewCard">
                                            <div className="reviewHead">
                                                <div>
                                                    <h3>{review.title}</h3>
                                                    <p>{review.name} - {review.date}</p>
                                                </div>
                                                <span>{review.rating}.0/5</span>
                                            </div>
                                            <p>{review.text}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "faq" && (
                            <div className="detailPanel faqPanel">
                                {faqs.map((faq) => (
                                    <article key={faq.question} className="faqItem">
                                        <h3>{faq.question}</h3>
                                        <p>{faq.answer}</p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <section className="detailSection sellerSection">
                    <div className="sectionHead">
                        <h2>Livraison, retours et vendeur</h2>
                    </div>

                    <div className="sellerGrid">
                        <article className="sellerCard">
                            <i className="fa-solid fa-store"></i>
                            <h3>Vendeur de confiance</h3>
                            <p>Produit vendu et expedie par ecommerce avec suivi de commande depuis votre espace client.</p>
                        </article>
                        <article className="sellerCard">
                            <i className="fa-solid fa-truck"></i>
                            <h3>Options de livraison</h3>
                            <p>Standard offerte, express a 5 MAD et point relais a 10 MAD selon votre adresse.</p>
                        </article>
                        <article className="sellerCard">
                            <i className="fa-solid fa-arrows-rotate"></i>
                            <h3>Retours simplifies</h3>
                            <p>Vous disposez de 14 jours pour changer d'avis avec une procedure de retour claire.</p>
                        </article>
                        <article className="sellerCard">
                            <i className="fa-solid fa-shield"></i>
                            <h3>Garantie incluse</h3>
                            <p>Garantie commerciale 2 ans et service client disponible en cas de besoin.</p>
                        </article>
                    </div>
                </section>

                <section className="detailSection relatedSection">
                    <div className="sectionHead">
                        <h2>Produits similaires</h2>
                        <a href="/products">Voir plus</a>
                    </div>

                    <div className="relatedGrid">
                        {relatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </section>
        </GuestLayout>
    );
}
