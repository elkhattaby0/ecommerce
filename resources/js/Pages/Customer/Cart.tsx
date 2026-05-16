import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const cartItems = [
    {
        name: "APPLE iPhone 14 128GB Purple - Reconditionne - Excellent etat",
        qty: 1,
        price: "295.99 MAD",
    },
    {
        name: "Chargeur USB-C rapide",
        qty: 1,
        price: "49.00 MAD",
    },
];

export default function Cart() {
    return (
        <GuestLayout>
            <Head title="Mon panier" />

            <section className="utilityPage">
                <div className="utilityHero">
                    <span className="eyebrow">Preparation commande</span>
                    <h1>Mon panier</h1>
                    <p>Verifiez vos articles, les quantites et le total avant de passer a l'etape de paiement.</p>
                </div>

                <div className="utilityGrid">
                    <article className="utilityCard">
                        <div className="utilityCardHead">
                            <h2>Articles du panier</h2>
                            <a href="/products">Ajouter un produit</a>
                        </div>
                        <ul className="utilityList">
                            {cartItems.map((item) => (
                                <li key={item.name}>
                                    <div>
                                        <strong>{item.name}</strong>
                                        <small>Quantite : {item.qty}</small>
                                    </div>
                                    <span>{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    <aside className="utilityCard summary">
                        <div className="utilityCardHead">
                            <h2>Resume</h2>
                        </div>
                        <ul className="summaryList">
                            <li><span>Sous-total</span><strong>344.99 MAD</strong></li>
                            <li><span>Livraison</span><strong>Gratuite</strong></li>
                            <li><span>Total</span><strong>344.99 MAD</strong></li>
                        </ul>
                        <a href="/login" className="primaryAction">Passer a la connexion</a>
                    </aside>
                </div>
            </section>
        </GuestLayout>
    );
}
