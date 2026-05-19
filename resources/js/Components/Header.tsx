import { readCart, readFavorites, readSearches, saveSearch } from "@/lib/storefront";
import { Link, usePage } from "@inertiajs/react";
import { FormEvent, useEffect, useMemo, useState } from "react";

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const [search, setSearch] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [searchCount, setSearchCount] = useState(0);
    const user = usePage().props.auth.user;

    const syncCounts = () => {
        setCartCount(readCart().reduce((sum, item) => sum + item.quantity, 0));
        setFavoriteCount(readFavorites().length);
        setSearchCount(readSearches().length);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY >= 80);
        };

        handleScroll();
        syncCounts();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("storefront:cart-updated", syncCounts);
        window.addEventListener("storefront:favorites-updated", syncCounts);
        window.addEventListener("storefront:searches-updated", syncCounts);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("storefront:cart-updated", syncCounts);
            window.removeEventListener("storefront:favorites-updated", syncCounts);
            window.removeEventListener("storefront:searches-updated", syncCounts);
        };
    }, []);

    const searchHref = useMemo(() => search.trim() ? `/products?q=${encodeURIComponent(search.trim())}` : "/products", [search]);

    const onSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user) {
            window.location.href = "/login";
            return;
        }

        saveSearch(search);
        window.location.href = searchHref;
    };

    return (
        <header id="header" className={isSticky ? "sticky" : ""}>
            <p className="promo">
                Nouveau client ? -10 EUR des 50 EUR d'achat pour votre premiere commande. Profitez-en
            </p>

            <section className="top">
                <Link href="/" className="logo">ecommerce</Link>

                <form className="search" onSubmit={onSearch}>
                    <input type="text" name="search" placeholder="Rechercher sur ecommerce" value={search} onChange={(event) => setSearch(event.target.value)} />
                    <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>

                <ul className="topRight">
                    <li><Link href={user ? "/mes-recherches" : "/login"}><i className="fa-regular fa-bell"></i>Mes recherches {searchCount > 0 ? `(${searchCount})` : ""}</Link></li>
                    <li><Link href={user ? "/favoris" : "/login"}><i className="fa-regular fa-heart"></i>Favoris {favoriteCount > 0 ? `(${favoriteCount})` : ""}</Link></li>
                    <li><Link href="/panier"><i className="fa-solid fa-basket-shopping"></i>Mon panier {cartCount > 0 ? `(${cartCount})` : ""}</Link></li>
                    <li><Link href={user ? "/dashboard" : "/login"}><i className="fa-regular fa-user"></i>{user ? user.name : "Se connecter"}</Link></li>
                </ul>
            </section>

            <section className="bottom">
                <button
                    onClick={() => {
                        document.getElementById("SideHeaderMenu")?.classList.add("active");
                    }}
                ><i className="fa-solid fa-bars"></i>MENU</button>
                <ul>
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/products">Promos</Link></li>
                    <li><Link href="/products">Vetements</Link></li>
                    <li><Link href="/products">Chaussures</Link></li>
                    <li><Link href="/products?category=accessories">Accessoires</Link></li>
                    <li><Link href="/products">Maison</Link></li>
                    <li><Link href="/products">Technologie</Link></li>
                </ul>
            </section>
        </header>
    );
}
