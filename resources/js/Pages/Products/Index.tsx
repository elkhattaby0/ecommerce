import GuestLayout from "@/Layouts/GuestLayout";
import ProductCard from "@/Components/ProductCard";

export default function Products() {
    return (
        <GuestLayout>
            <section className="CategoryListing">
            <div className="Listing">
                <aside>
                    <h2>Filters</h2>

                    <div className="tab">
                        <button className="">Catégorie<i className="fa-solid fa-angle-up"></i></button>
                        <ul>
                            <li>Electronics <input type="checkbox" value="Electronics" /></li>
                            <li>Clothing <input type="checkbox" value="Clothing" /></li>
                            <li>Home <input type="checkbox" value="Home" /></li>
                        </ul>
                    </div>
                    <div className="tab">
                        <button className="">Livraison<i className="fa-solid fa-angle-up"></i></button>
                        <ul>
                            <li>Expédié par cdiscount (417) <input type="checkbox" value="Electronics" /></li>
                            <li>Livraison express (417) <input type="checkbox" value="Clothing" /></li>
                            <li>Livraison gratuite (450) <input type="checkbox" value="Home" /></li>
                        </ul>
                    </div>
                    <div className="tab">
                        <button className="">Prix<i className="fa-solid fa-angle-up"></i></button>
                        <ul>
                            <li>100 MAD <input type="checkbox" value="Electronics" /></li>
                            <li>200 MAD <input type="checkbox" value="Clothing" /></li>
                            <li>300 MAD <input type="checkbox" value="Home" /></li>
                        </ul>
                    </div>
                </aside>

                <div className="content">
                    <div className="head">
                        <h1>Vêtements</h1>

                        <div className="sort">
                            <p>
                                <span>417</span> résultats
                            </p>
                            <p>Trier par :</p>
                            <div>
                                <span>Meilleures ventes <i className="fa-solid fa-chevron-down"></i></span>
                            </div>
                        </div>
                    </div>

                    <div className="products">
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

                    <div className="pagination">
                        <button className="btn"><i className="fa-solid fa-chevron-left"></i> Précédent</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                        <button className="btn">Suivant<i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
            </section>
        </GuestLayout>
    )
}