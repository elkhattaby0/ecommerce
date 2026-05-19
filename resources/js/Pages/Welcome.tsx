import ProductCard from "@/Components/ProductCard";
import GuestLayout from "@/Layouts/GuestLayout";
import { PageProps, Product } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import Slider from "react-slick";

export default function Welcome() {
    const { featuredProducts, categories } = usePage<PageProps<{
        featuredProducts: Product[];
        categories: { id: number; name: string; slug: string; }[];
    }>>().props;

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

        return <div onClick={onClick} className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-2xl slick-arrow"><i className="fa-solid fa-angle-right"></i></div>;
    }

    function PrevArrow(props: any) {
        const { onClick } = props;

        return <div onClick={onClick} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-2xl slick-arrow"><i className="fa-solid fa-angle-left"></i></div>;
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
                            <p>Le contenu de la page d'accueil est maintenant alimente par votre catalogue.</p>
                            <div className="actions">
                                <Link href="/products" className="primary">Voir les produits</Link>
                            </div>
                        </div>
                    </div>
                </Slider>

                <section className="row">
                    <div className="head">
                        <div className="copy">
                            <h2>Produits recents</h2>
                            <p>Produits actifs charges depuis la base de donnees.</p>
                        </div>
                        <Link href="/products">Voir plus</Link>
                    </div>
                    <div className="content productsGrid">
                        {featuredProducts.slice(0, 5).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                <section className="row categoriesRow">
                    <div className="head">
                        <div className="copy">
                            <h2>Categories</h2>
                            <p>Navigation dynamique depuis vos categories actives.</p>
                        </div>
                    </div>
                    <div className="content categoryGrid">
                        {categories.map((category) => (
                            <Link key={category.id} href={`/products?category=${category.slug}`} className="card categoryCard">
                                <div className="categoryBody">
                                    <h3 className="title">{category.name}</h3>
                                    <p>Voir les produits</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
