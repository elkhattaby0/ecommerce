import { Product } from "@/types"

type Props = {
    product: Product
}

export default function ProductCard({ product }: Props) {
    return (
        <a href="#" className="card">
            <button className="wishlist">
                <i className="fa-regular fa-heart"></i>
            </button>

            {product.flags?.length > 0 && (
                <ul className="flags">
                    {product.flags.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}

            <img
                src={product.image}
                alt={product.title}
            />

            <h3 className="title">
                {product.title}
            </h3>

            <div className="avis">
                <span className="note">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                </span>

                <span className="reviews">
                    {product.nbrAvis} avis
                </span>
            </div>

            <ul className="info">
                {product.info?.map((item, index) => (
                    <li key={index}>
                        <i className="fa-solid fa-caret-right"></i>
                        {item}
                    </li>
                ))}
            </ul>

            {product.oldPrice && (
                <p className="price old">
                    {product.oldPrice}

                    <span className="currency">
                        {product.currency}
                    </span>
                </p>
            )}

            <p className="price">
                {product.price}

                <span className="currency">
                    {product.currency}
                </span>
            </p>
            <button className="panier"><i className="fa-solid fa-basket-shopping"></i> Ajoute au panier</button>
        </a>
    )
}
