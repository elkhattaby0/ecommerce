import { useEffect, useState } from "react";

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY >= 80);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header id="header" className={isSticky ? "sticky" : ""}>
            <p className="promo">
                Nouveau client ? -10€ dès 50€ d'achat pour votre première commande. Profitez-en
            </p>

            <section className="top">
                <a href="/" className="logo">ecommerce</a>

                <div className="search">
                    <input type="text" name="email" placeholder="Rechercher sur ecommerce" />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>

                <ul className="topRight">
                    <li><a href="/mes-recherches"><i className="fa-regular fa-bell"></i>Mes recherches</a></li>
                    <li><a href="/favoris"><i className="fa-regular fa-heart"></i>Favoris</a></li>
                    {/* <li><a href="#"><i className="fa-regular fa-comment-dots"></i>Messages</a></li> */}
                    <li><a href="/panier"><i className="fa-solid fa-basket-shopping"></i>Mon panier</a></li>
                    <li><a href="/login"><i className="fa-regular fa-user"></i>Se connecter</a></li>
                </ul>
            </section>

            <section className="bottom">
                <button><i className="fa-solid fa-bars"></i>MENU</button>
                <ul>
                    <li><a href="#">Promos</a></li>
                    <li><a href="#">Vêtements</a></li>
                    <li><a href="#">Chaussures</a></li>
                    <li><a href="#">Accessoires</a></li>
                    <li><a href="#">Maison</a></li>
                    <li><a href="#">Technologie</a></li>
                </ul>
            </section>
        </header>
    );
}
