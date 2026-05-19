import GuestLayout from "@/Layouts/GuestLayout";
import ProductCard from "@/Components/ProductCard";
import { addToCart } from "@/lib/storefront";
import { PageProps, Product } from "@/types";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

type TabKey = "description" | "specs";

export default function Details() {
    const { product, relatedProducts } = usePage<PageProps<{
        product: {
            id: number;
            name: string;
            slug: string;
            description?: string | null;
            price: number;
            currency: string;
            category?: string | null;
            brand?: string | null;
            store?: string | null;
            condition: string;
            stock: number;
            image: string;
        };
        relatedProducts: Product[];
    }>>().props;
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<TabKey>("description");

    const currentProduct: Product = {
        id: product.id,
        slug: product.slug,
        image: product.image,
        flags: [product.condition, "Livraison rapide"],
        title: product.name,
        info: [product.category ?? "", product.store ?? ""].filter(Boolean),
        variant: product.brand ?? undefined,
        trust: "Paiement securise",
        colorDots: ["var(--Primary)", "var(--Secondary)", "var(--Accent)"],
        nbrAvis: 120,
        oldPrice: Number((product.price * 1.15).toFixed(2)),
        price: product.price,
        currency: product.currency,
    };

    return (
        <GuestLayout>
            <section className="CategoryListing">
                <div className="Details">
                    <section className="left">
                        <div className="gallery">
                            <div className="mainImage">
                                <img src={product.image} alt={product.name} />
                            </div>
                        </div>
                    </section>

                    <section className="right">
                        <h1>{product.name}</h1>
                        <ul className="flags">
                            <li>{product.condition}</li>
                            <li>{product.category}</li>
                            <li>{product.store}</li>
                        </ul>
                        <ul className="price">
                            <li className="old">{(product.price * 1.15).toFixed(2)}<span className="currency">{product.currency}</span></li>
                            <li className="current">{product.price}<span className="currency">{product.currency}</span></li>
                        </ul>

                        <div className="purchaseBox">
                            <div className="ctaRow">
                                <div className="quantityBox">
                                    <p>Quantite</p>
                                    <div className="quantityControl">
                                        <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>-</button>
                                        <span>{quantity}</span>
                                        <button type="button" onClick={() => setQuantity((current) => current + 1)}>+</button>
                                    </div>
                                </div>
                                <div className="ctaButtons">
                                    <button type="button" className="addCart" onClick={() => addToCart(currentProduct, quantity)}>
                                        <i className="fa-solid fa-basket-shopping"></i>
                                        Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>

                        <ul className="caractristque">
                            <li><span className="name">Marque :</span><span className="value">{product.brand}</span></li>
                            <li><span className="name">Categorie :</span><span className="value">{product.category}</span></li>
                            <li><span className="name">Stock :</span><span className="value">{product.stock}</span></li>
                        </ul>
                    </section>
                </div>

                <div className="tabs productTabs">
                    <div className="head">
                        <button type="button" className={activeTab === "description" ? "tab active" : "tab"} onClick={() => setActiveTab("description")}>Description</button>
                        <button type="button" className={activeTab === "specs" ? "tab active" : "tab"} onClick={() => setActiveTab("specs")}>Caracteristiques</button>
                    </div>

                    <div className="content">
                        {activeTab === "description" && (
                            <div className="description detailPanel">
                                <h2>Description produit</h2>
                                <p>{product.description || "Aucune description detaillee disponible."}</p>
                            </div>
                        )}

                        {activeTab === "specs" && (
                            <div className="detailPanel specsPanel">
                                <div className="specRow"><span>Marque</span><strong>{product.brand}</strong></div>
                                <div className="specRow"><span>Categorie</span><strong>{product.category}</strong></div>
                                <div className="specRow"><span>Condition</span><strong>{product.condition}</strong></div>
                                <div className="specRow"><span>Stock</span><strong>{product.stock}</strong></div>
                            </div>
                        )}
                    </div>
                </div>

                <section className="detailSection relatedSection">
                    <div className="sectionHead">
                        <h2>Produits similaires</h2>
                        <a href="/products">Voir plus</a>
                    </div>

                    <div className="relatedGrid">
                        {relatedProducts.map((relatedProduct) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                    </div>
                </section>
            </section>
        </GuestLayout>
    );
}
