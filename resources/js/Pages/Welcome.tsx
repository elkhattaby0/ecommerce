import ProductCard from "@/Components/ProductCard";
import GuestLayout from "@/Layouts/GuestLayout";
import Slider from "react-slick"


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
        prevArrow: <PrevArrow />
    };

    function NextArrow(props: any) {
        const { onClick } = props

        return (
            <div
            onClick={onClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-2xl slick-arrow"
            >
            <i className="fa-solid fa-angle-right"></i>
            </div>
        )
        }

    function PrevArrow(props: any) {
    const { onClick } = props

    return (
        <div
        onClick={onClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-2xl slick-arrow"
        >
        <i className="fa-solid fa-angle-left"></i>
        </div>
    )
    }

    return (
        <GuestLayout>

            <div className="homepage">
                <Slider {...settings} className="hero">
                    <img src="https://images.unsplash.com/photo-1758520388383-55023490a258?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                    <img src="https://images.unsplash.com/photo-1594968973184-9040a5a79963?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                    <img src="http://images.unsplash.com/photo-1683148754073-cfa906017a10?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </Slider>

                <section className="row">
                    <div className="head">
                        <h2>Inspiré de vos visites</h2>
                        <a href="#">Voir plus</a>
                    </div>
                    <div className="content">
                        {
                            Array(10).fill(null).map((n, index) => {
                                return (
                                    <ProductCard 
                                        key={index}
                                        product={{
                                            id: index,
                                            image: "https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg",
                                            title: "APPLE iPhone 14 128GB Midnight - Reconditionné - Excellent état",
                                            info: ["Plus facilement réparable","Plus facilement réparable"],
                                            nbrAvis: 120,
                                            oldPrice: 599.99,
                                            price: 295.99,
                                            currency: "MAD"
                                        }}
                                    />
                                    
                                )
                            })
                        }
                    </div>
                </section>

                <section className="row two">
                    <div className="head">
                        <h2>Top catégories</h2>
                        <a href="#">Voir others</a>
                    </div>
                    <div className="content">
                        {
                            Array(5).fill(null).map((n, index) => {
                                return (
                                    <a key={index} href="#" className="card">
                                        <img src="https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg" />
                                        <h3 className="title">Téléphonie</h3>

                                    </a>
                                )
                            })
                        }
                    </div>
                </section>

                <section className="row">
                    <div className="head">
                        <h2>Meilleures ventes</h2>
                        <a href="#">Voir plus</a>
                    </div>
                    <div className="content">
                        {
                            Array(6).fill(null).map((n, index) => {
                                return (
                                    <ProductCard
                                        key={index}
                                        product={{
                                            id: index,
                                            image: "https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg",
                                            flags: ["Reconditionné", "Meilleure vente", "-50%"],
                                            title: "APPLE iPhone 14 128GB Midnight - Reconditionné - Excellent état",
                                            info: ["Plus facilement réparable","Plus facilement réparable"],
                                            nbrAvis: 120,
                                            oldPrice: 599.99,
                                            price: 295.99,
                                            currency: "MAD"
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                </section>

                <section className="row">
                    <div className="content">
                        <a href="#" className="card trend">
                            <i className="fa-solid fa-fire-flame-curved"></i>
                            Tendance en ce moment
                        </a>
                        {
                            Array(4).fill(null).map((n, index) => {
                                return (
                                    <a key={index} href="#" className="card trend">
                                        Électronique reconditionné
                                    </a>
                                )
                            })
                        }
                    </div>
                </section>
            </div>

        </GuestLayout>
    )
}