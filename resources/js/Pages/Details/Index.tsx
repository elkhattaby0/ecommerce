import GuestLayout from "@/Layouts/GuestLayout";


export default function Details() {
    return (
        <GuestLayout>

            <section className="CategoryListing">
                <div className="Details">
                    <section className="left">
                        <img src="https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg"  />
                        <img src="https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg"  />
                        <img src="https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg"  />
                        <img src="https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg"  />
                        <img src="https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg"  />
                        <img src="https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg"  />
                    </section>

                    <section className="right">
                        <h1>APPLE iPhone 14 128GB Purple - Reconditionné - Excellent état</h1>
                        
                        <ul className="flags">
                            <li>Reconditionné</li>
                            <li>Excellent état</li>
                        </ul>

                        <div className="avis">
                            <span className="note">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </span>

                            <span className="reviews">
                                300 avis
                            </span>
                        </div>

                        <div className="colors">
                            <p>Couleur(s) : </p>
                            <div className="content">
                            {
                                Array(10).fill(null).map((n, index) => {
                                    return (
                                        <button>
                                            <img src="https://www.cdiscount.com/pdt2/e/x/e/1/700x700/rcdapp0038253exe/rw/apple-iphone-14-128gb-midnight-reconditionne-e.jpg" />
                                        </button>
                                    )
                                })
                            }
                            </div>
                        </div>

                        <ul className="caractristque">
                            <li><span className="name">ID : </span><span className="value">123456</span></li>
                            <li><span className="name">Stockage : </span><span className="value">128 Go</span></li>
                            <li><span className="name">Couleur : </span><span className="value">Violet</span></li>
                            <li><span className="name">État : </span><span className="value">Reconditionné - Excellent état</span></li>
                            <li><span className="name">Taille : </span><span className="value">Sans taille</span></li>
                            <li><span className="name">Stock : </span><span className="value">1025</span></li>
                            <li><span className="name">Garantie : </span><span className="value">2 ans</span></li>
                            <li><span className="name">Livraison : </span>
                                <ul>
                                    <ol><span className="value">Livraison gratuite</span></ol>
                                    <ol><span className="value">Livraison express : 5MAD</span></ol>
                                    <ol><span className="value">Livraison en point relais : 10MAD</span></ol>
                                </ul>
                            </li>
                        </ul>

                        <ul className="price">
                            <li className="old">599.99<span className="currency">MAD</span></li>
                            <li className="current">295.99<span className="currency">MAD</span></li>
                        </ul>

                        <p className="shortDescription">

                        </p>
                        
                    </section>
                </div>
            </section>

        </GuestLayout>
    )
}